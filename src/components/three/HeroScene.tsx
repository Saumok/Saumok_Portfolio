"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/**
 * FR-002: Hero 3D scene — the character renders as a holographic projection
 * panel (artwork extracted from the provided FBX files), with projector beam,
 * scanlines, 3 orbit rings (8s/13s/20s), 2000-particle field, bloom,
 * cursor parallax, click → hologram glitch.
 */
export default function HeroScene({ onReady }: { onReady?: () => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);
  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.35, 5.2);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    // Character anchor — right of center so the name column stays clear (design.md §8.2)
    const CX = 1.15;

    // ── Lighting — design.md §7.1 ──
    scene.add(new THREE.AmbientLight(0x0a0a2e, 1.2));
    const rim1 = new THREE.DirectionalLight(0x06b6d4, 2.4);
    rim1.position.set(-3, -2, 2);
    scene.add(rim1);
    const rim2 = new THREE.DirectionalLight(0x7c3aed, 1.6);
    rim2.position.set(3, 1, 1);
    scene.add(rim2);
    const keyLight = new THREE.PointLight(0x7c3aed, 30, 12);
    keyLight.position.set(CX, 2, 3);
    scene.add(keyLight);
    const underGlow = new THREE.PointLight(0x06b6d4, 4, 5);
    underGlow.position.set(CX, 0.2, 1.2);
    scene.add(underGlow);

    // ── Ground — dark mirror-ish plane ──
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({
        color: 0x0a0a1a,
        metalness: 0.95,
        roughness: 0.3,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Glow disc under character
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(1.4, 48),
      new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.12,
      })
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.set(CX, 0.01, 0);
    scene.add(disc);

    // ── Orbit rings ──
    const ringSpecs = [
      { r: 1.2, tube: 0.012, color: 0x7c3aed, tilt: (15 * Math.PI) / 180, period: 8 },
      { r: 1.8, tube: 0.01, color: 0x06b6d4, tilt: (-25 * Math.PI) / 180, period: -13 },
      { r: 2.4, tube: 0.007, color: 0xa78bfa, tilt: (40 * Math.PI) / 180, period: 20 },
    ];
    const rings: { pivot: THREE.Group; period: number }[] = [];
    ringSpecs.forEach((s) => {
      const pivot = new THREE.Group();
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(s.r, s.tube, 12, 128),
        new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.85 })
      );
      ring.rotation.x = Math.PI / 2;
      pivot.add(ring);
      pivot.rotation.z = s.tilt;
      pivot.position.set(CX, 1.05, 0);
      scene.add(pivot);
      rings.push({ pivot, period: s.period });
    });

    // ── Particle field — 2000 drifting points (design.md §7.4) ──
    const COUNT = 2000;
    const positions = new Float32Array(COUNT * 3);
    const phases = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;
      phases[i] = Math.random() * Math.PI * 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.025,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Character: holographic projection panel ──
    const characterGroup = new THREE.Group();
    characterGroup.position.set(CX, 0, 0);
    scene.add(characterGroup);

    let modelLoaded = false;
    let holoMat: THREE.MeshBasicMaterial | null = null;
    let scanTex: THREE.Texture | null = null;
    let glitchT = -1;

    // Scanline texture (procedural)
    const scanCnv = document.createElement("canvas");
    scanCnv.width = 4;
    scanCnv.height = 64;
    const sc = scanCnv.getContext("2d")!;
    sc.fillStyle = "rgba(6,182,212,0)";
    sc.fillRect(0, 0, 4, 64);
    sc.fillStyle = "rgba(103,232,249,0.5)";
    sc.fillRect(0, 0, 4, 2);
    scanTex = new THREE.CanvasTexture(scanCnv);
    scanTex.wrapS = scanTex.wrapT = THREE.RepeatWrapping;
    scanTex.repeat.set(1, 26);

    new THREE.TextureLoader().load(
      "/models/character.png",
      (tex) => {
        if (disposed) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        const aspect = tex.image.width / tex.image.height; // ~1.01
        const PH = 2.3; // panel height (units)
        const PW = PH * aspect;
        const cy = 1.32; // panel center height

        // Character artwork panel
        holoMat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.96,
        });
        const panel = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), holoMat);
        panel.position.y = cy;
        characterGroup.add(panel);

        // Cyan holo frame (4 thin emissive edges)
        const frameMat = new THREE.MeshBasicMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.85,
        });
        const edge = (w: number, h: number, x: number, y: number) => {
          const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), frameMat);
          m.position.set(x, y, 0.012);
          characterGroup.add(m);
        };
        const T = 0.018;
        edge(PW + 0.06, T, 0, cy + PH / 2 + 0.03);
        edge(PW + 0.06, T, 0, cy - PH / 2 - 0.03);
        edge(T, PH + 0.06, -PW / 2 - 0.03, cy);
        edge(T, PH + 0.06, PW / 2 + 0.03, cy);

        // Corner accents
        const cornMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
        [
          [-PW / 2 - 0.03, cy + PH / 2 + 0.03],
          [PW / 2 + 0.03, cy + PH / 2 + 0.03],
          [-PW / 2 - 0.03, cy - PH / 2 - 0.03],
          [PW / 2 + 0.03, cy - PH / 2 - 0.03],
        ].forEach(([x, y]) => {
          const c = new THREE.Mesh(new THREE.PlaneGeometry(0.07, 0.07), cornMat);
          c.position.set(x, y, 0.013);
          characterGroup.add(c);
        });

        // Scanlines overlay (animated upward drift)
        const scanMat = new THREE.MeshBasicMaterial({
          map: scanTex,
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const scan = new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), scanMat);
        scan.position.set(0, cy, 0.011);
        characterGroup.add(scan);

        // Glow backplane
        const glowCnv = document.createElement("canvas");
        glowCnv.width = glowCnv.height = 128;
        const gc = glowCnv.getContext("2d")!;
        const gg = gc.createRadialGradient(64, 64, 8, 64, 64, 64);
        gg.addColorStop(0, "rgba(124,58,237,0.55)");
        gg.addColorStop(0.6, "rgba(6,182,212,0.18)");
        gg.addColorStop(1, "rgba(6,182,212,0)");
        gc.fillStyle = gg;
        gc.fillRect(0, 0, 128, 128);
        const glowTex = new THREE.CanvasTexture(glowCnv);
        const glow = new THREE.Mesh(
          new THREE.PlaneGeometry(PW * 1.9, PH * 1.6),
          new THREE.MeshBasicMaterial({
            map: glowTex,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        glow.position.set(0, cy, -0.08);
        characterGroup.add(glow);

        // Projector beam from the floor disc up to the panel
        const beamMat = new THREE.MeshBasicMaterial({
          color: 0x06b6d4,
          transparent: true,
          opacity: 0.07,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        const beam = new THREE.Mesh(
          new THREE.CylinderGeometry(PW * 0.42, 0.5, cy - PH / 2 + 0.35, 24, 1, true),
          beamMat
        );
        beam.position.y = (cy - PH / 2) / 2 + 0.1;
        characterGroup.add(beam);

        modelLoaded = true;
        readyRef.current?.();
      },
      undefined,
      () => {
        if (disposed) return;
        modelLoaded = true;
        readyRef.current?.();
      }
    );

    // ── Post-processing: bloom ──
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      0.6,
      0.4,
      0.85
    );
    composer.addPass(bloom);

    // ── Interaction ──
    const mouse = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Click hologram → glitch flicker
    const raycaster = new THREE.Raycaster();
    const clickVec = new THREE.Vector2();
    const onClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      clickVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      clickVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(clickVec, camera);
      if (raycaster.intersectObject(characterGroup, true).length > 0) glitchT = 0;
    };
    mount.addEventListener("click", onClick);

    // ── Visibility pause ──
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    // ── Resize ──
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ──
    const clock = new THREE.Clock();
    let raf: number;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      rings.forEach(({ pivot, period }) => {
        pivot.rotation.y += ((Math.PI * 2) / Math.abs(period)) * dt * Math.sign(period);
      });

      // Particle drift
      const pos = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 1] += 0.012 * dt * 10;
        pos[i * 3] += Math.sin(t * 0.5 + phases[i]) * 0.0006;
        if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = 0;
      }
      pGeo.attributes.position.needsUpdate = true;

      if (modelLoaded) {
        // Hologram idle float + cursor parallax tilt
        characterGroup.position.y = Math.sin(t * 1.2) * 0.04;
        const targetRY = mouse.x * 0.22;
        const targetRX = -mouse.y * 0.08;
        characterGroup.rotation.y += (targetRY - characterGroup.rotation.y) * 0.06;
        characterGroup.rotation.x += (targetRX - characterGroup.rotation.x) * 0.06;

        // Scanline drift
        if (scanTex) scanTex.offset.y = -t * 0.18;

        // Holo flicker (subtle, always on) + click glitch burst
        if (holoMat) {
          let opacity = 0.96 + Math.sin(t * 13) * 0.015;
          if (glitchT >= 0) {
            glitchT += dt;
            const p = glitchT / 0.55;
            if (p >= 1) {
              glitchT = -1;
              characterGroup.position.x = CX;
            } else {
              opacity = 0.55 + Math.random() * 0.45;
              characterGroup.position.x = CX + (Math.random() - 0.5) * 0.06;
            }
          }
          holoMat.opacity = opacity;
        }
      }

      // Camera micro-parallax
      camera.position.x += (mouse.x * 0.25 - camera.position.x) * 0.04;
      camera.position.y += (1.35 - mouse.y * 0.15 - camera.position.y) * 0.04;
      camera.lookAt(0, 1.0, 0);

      keyLight.position.x = CX + Math.sin(t * 0.4) * 2.5;
      keyLight.position.z = 3 + Math.cos(t * 0.4) * 1.0;

      composer.render();
    };
    loop();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("click", onClick);
      renderer.dispose();
      composer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach(
            (m) => m.dispose()
          );
        }
      });
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
