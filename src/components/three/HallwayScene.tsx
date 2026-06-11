"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PROJECTS } from "@/lib/data";

/**
 * FR-006: First-person corridor. Camera Z driven by scroll progress (prop via ref),
 * 7 doors with project-colored emissive frames, floor light pools, name plates.
 * Hover → glow boost + callback; click → blast-door open animation → onEnter.
 */
export default function HallwayScene({
  progressRef,
  onHover,
  onEnter,
}: {
  progressRef: React.MutableRefObject<number>;
  onHover: (projectId: string | null) => void;
  onEnter: (projectId: string) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onHoverRef = useRef(onHover);
  const onEnterRef = useRef(onEnter);
  useEffect(() => {
    onHoverRef.current = onHover;
    onEnterRef.current = onEnter;
  }, [onHover, onEnter]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = 8; // corridor width
    const H = 5; // height
    const LEN = 84;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050510, 0.055);
    scene.background = new THREE.Color(0x050510);

    const camera = new THREE.PerspectiveCamera(
      62,
      mount.clientWidth / mount.clientHeight,
      0.1,
      60
    );
    camera.position.set(0, 1.7, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // ── Corridor shell ──
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x07071a,
      metalness: 0.95,
      roughness: 0.18,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, LEN), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, LEN / 2);
    scene.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a1e,
      metalness: 0.6,
      roughness: 0.7,
    });
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(LEN, H), wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-W / 2, H / 2, LEN / 2);
    scene.add(leftWall);
    const rightWall = leftWall.clone();
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = W / 2;
    scene.add(rightWall);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(W, LEN),
      new THREE.MeshStandardMaterial({ color: 0x08081a, metalness: 0.5, roughness: 0.8 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, H, LEN / 2);
    scene.add(ceiling);

    // End wall (corridor terminus)
    const endWall = new THREE.Mesh(new THREE.PlaneGeometry(W, H), wallMat.clone());
    endWall.position.set(0, H / 2, LEN);
    endWall.rotation.y = Math.PI;
    scene.add(endWall);

    // ── Ceiling LED strips (violet, full length) ──
    const stripMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed });
    [-W / 2 + 0.4, W / 2 - 0.4].forEach((x) => {
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, LEN), stripMat);
      strip.position.set(x, H - 0.05, LEN / 2);
      scene.add(strip);
    });

    // Wall panel seams — subtle emissive ticks every 4 units
    const seamMat = new THREE.MeshBasicMaterial({
      color: 0x131334,
    });
    for (let z = 4; z < LEN; z += 4) {
      [-1, 1].forEach((side) => {
        const seam = new THREE.Mesh(new THREE.BoxGeometry(0.02, H, 0.05), seamMat);
        seam.position.set(side * (W / 2 - 0.01), H / 2, z);
        scene.add(seam);
      });
    }

    // Ambient + travel light
    scene.add(new THREE.AmbientLight(0x222255, 2.2));
    scene.add(new THREE.HemisphereLight(0x4433aa, 0x07071a, 1.2));
    const camLight = new THREE.PointLight(0x7c3aed, 60, 14);
    scene.add(camLight);

    // ── Doors ──
    interface DoorRig {
      id: string;
      group: THREE.Group;
      leftPanel: THREE.Mesh;
      rightPanel: THREE.Mesh;
      frameMat: THREE.MeshBasicMaterial;
      light: THREE.PointLight;
      pool: THREE.Mesh;
      baseIntensity: number;
      openT: number; // -1 idle, >=0 animating
      opened: boolean;
      hitbox: THREE.Mesh;
      z: number;
    }
    const doors: DoorRig[] = [];

    const makeNamePlate = (text: string, color: string) => {
      const cnv = document.createElement("canvas");
      cnv.width = 512;
      cnv.height = 96;
      const c = cnv.getContext("2d")!;
      c.fillStyle = "rgba(5,5,16,0.9)";
      c.fillRect(0, 0, 512, 96);
      c.strokeStyle = color;
      c.lineWidth = 3;
      c.strokeRect(4, 4, 504, 88);
      c.font = "bold 44px Orbitron, Arial, sans-serif";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillStyle = color;
      c.shadowColor = color;
      c.shadowBlur = 18;
      c.fillText(text.toUpperCase(), 256, 50);
      const tex = new THREE.CanvasTexture(cnv);
      tex.colorSpace = THREE.SRGBColorSpace;
      return new THREE.Mesh(
        new THREE.PlaneGeometry(1.8, 0.34),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true })
      );
    };

    const doorPanelMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f28,
      metalness: 0.7,
      roughness: 0.5,
    });

    PROJECTS.forEach((p) => {
      const color = new THREE.Color(p.color);
      const side = p.doorSide === "left" ? -1 : 1;
      const group = new THREE.Group();
      // Place door flush against wall, rotated to face corridor center
      group.position.set(side * (W / 2 - 0.12), 0, p.doorZ);
      group.rotation.y = side === -1 ? Math.PI / 2 : -Math.PI / 2;

      const DW = 2.6; // door opening width
      const DH = 3.4;

      // Recess (dark void behind door)
      const recess = new THREE.Mesh(
        new THREE.PlaneGeometry(DW, DH),
        new THREE.MeshBasicMaterial({ color: 0x020208 })
      );
      recess.position.set(0, DH / 2, -0.05);
      group.add(recess);

      // Panels
      const panelGeo = new THREE.BoxGeometry(DW / 2, DH, 0.12);
      const leftPanel = new THREE.Mesh(panelGeo, doorPanelMat.clone());
      leftPanel.position.set(-DW / 4, DH / 2, 0);
      const rightPanel = new THREE.Mesh(panelGeo, doorPanelMat.clone());
      rightPanel.position.set(DW / 4, DH / 2, 0);
      group.add(leftPanel, rightPanel);

      // Center gap glow strip
      const frameMat = new THREE.MeshBasicMaterial({ color });
      const gap = new THREE.Mesh(new THREE.BoxGeometry(0.05, DH, 0.06), frameMat);
      gap.position.set(0, DH / 2, 0.04);
      group.add(gap);

      // Frame glow strips
      const mkStrip = (w: number, h: number, x: number, y: number) => {
        const s = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.06), frameMat);
        s.position.set(x, y, 0.07);
        group.add(s);
      };
      mkStrip(0.07, DH + 0.14, -DW / 2 - 0.06, DH / 2); // left
      mkStrip(0.07, DH + 0.14, DW / 2 + 0.06, DH / 2); // right
      mkStrip(DW + 0.2, 0.07, 0, DH + 0.06); // top

      // Name plate above door
      const plate = makeNamePlate(p.name, p.color);
      plate.position.set(0, DH + 0.45, 0.08);
      group.add(plate);

      // Floor light pool (additive gradient disc in front of the door)
      const poolCnv = document.createElement("canvas");
      poolCnv.width = poolCnv.height = 128;
      const pc = poolCnv.getContext("2d")!;
      const pg = pc.createRadialGradient(64, 64, 4, 64, 64, 64);
      pg.addColorStop(0, p.color + "AA");
      pg.addColorStop(1, p.color + "00");
      pc.fillStyle = pg;
      pc.fillRect(0, 0, 128, 128);
      const poolTex = new THREE.CanvasTexture(poolCnv);
      const pool = new THREE.Mesh(
        new THREE.PlaneGeometry(3.4, 2.6),
        new THREE.MeshBasicMaterial({
          map: poolTex,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      pool.rotation.x = -Math.PI / 2;
      pool.position.set(side * (W / 2 - 1.1), 0.012, p.doorZ);
      scene.add(pool);

      // Door light
      const light = new THREE.PointLight(color, 40, 9);
      light.position.set(side * (W / 2 - 1.0), 2.2, p.doorZ);
      scene.add(light);

      // Invisible hitbox covering the doorway
      const hitbox = new THREE.Mesh(
        new THREE.PlaneGeometry(DW + 0.4, DH + 0.6),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitbox.position.set(0, DH / 2, 0.1);
      hitbox.userData.projectId = p.id;
      group.add(hitbox);

      scene.add(group);
      doors.push({
        id: p.id,
        group,
        leftPanel,
        rightPanel,
        frameMat,
        light,
        pool,
        baseIntensity: 40,
        openT: -1,
        opened: false,
        hitbox,
        z: p.doorZ,
      });
    });

    // End-of-corridor sigil
    const sigil = makeNamePlate("MORE LOADING ...", "#67E8F9");
    sigil.position.set(0, 2.4, LEN - 0.3);
    sigil.rotation.y = Math.PI;
    scene.add(sigil);

    // ── Interaction ──
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-10, -10); // off-screen until first move (raycast only)
    const aim = new THREE.Vector2(0, 0); // camera look offset — always valid
    let hoveredDoor: DoorRig | null = null;
    let entering = false;

    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      aim.x += (pointer.x - aim.x) * 0.5;
      aim.y += (pointer.y - aim.y) * 0.5;
    };
    mount.addEventListener("pointermove", onPointerMove);

    const onClick = () => {
      if (hoveredDoor && !entering && !hoveredDoor.opened) {
        entering = true;
        hoveredDoor.openT = 0;
      }
    };
    mount.addEventListener("click", onClick);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(mount);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    let smoothedZ = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Scroll-driven camera (FR-006.2) — heavy smoothing for buttery motion
      // stop 4 units before the last door so it stays in frame at full scroll
      const targetZ = 1 + progressRef.current * 67;
      smoothedZ += (targetZ - smoothedZ) * Math.min(1, dt * 6);
      camera.position.z = smoothedZ;
      camera.position.y = 1.7 + Math.sin(t * 1.8) * 0.015; // breathing walk
      camera.position.x = aim.x * 0.35;
      camera.lookAt(aim.x * 1.2, 1.6 + aim.y * 0.5, smoothedZ + 6);
      camLight.position.set(camera.position.x, 2.6, smoothedZ + 1.5);

      // Hover raycast — only doors within range (FR-006.4)
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(
        doors.filter((d) => Math.abs(d.z - smoothedZ) < 14).map((d) => d.hitbox)
      );
      const hit = hits[0]?.object.userData.projectId as string | undefined;
      const next = hit ? doors.find((d) => d.id === hit) ?? null : null;
      if (next !== hoveredDoor) {
        hoveredDoor = next;
        onHoverRef.current(next ? next.id : null);
        mount.style.cursor = next ? "pointer" : "default";
      }

      // Door glow pulse + hover intensity
      doors.forEach((d) => {
        const isHov = d === hoveredDoor;
        const pulse = 1 + Math.sin(t * 2 + d.z) * 0.12;
        d.light.intensity = (isHov ? 110 : d.baseIntensity) * pulse;
        (d.pool.material as THREE.MeshBasicMaterial).opacity = isHov ? 0.85 : 0.5;

        // Blast-door open animation (FR-006.5) — 1.2s split + flash
        if (d.openT >= 0) {
          d.openT += dt;
          const p = Math.min(d.openT / 1.2, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          d.leftPanel.position.x = -0.65 - ease * 1.25;
          d.rightPanel.position.x = 0.65 + ease * 1.25;
          d.light.intensity = 40 + ease * 300;
          if (p >= 0.55 && !d.opened) {
            d.opened = true;
            onEnterRef.current(d.id);
            // reset after OS opens so the hall is intact on return
            setTimeout(() => {
              d.leftPanel.position.x = -0.65;
              d.rightPanel.position.x = 0.65;
              d.openT = -1;
              d.opened = false;
              entering = false;
            }, 900);
          }
        }
      });

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("click", onClick);
      renderer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((m) => {
            const mat = m as THREE.MeshBasicMaterial;
            if (mat.map) mat.map.dispose();
            m.dispose();
          });
        }
      });
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, [progressRef]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
