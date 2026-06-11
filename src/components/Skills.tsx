"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  SKILLS,
  SKILL_CONNECTIONS,
  SKILL_PROJECTS,
  CLUSTER_COLORS,
  type Skill,
  type SkillCluster,
} from "@/lib/data";
import { useInView } from "@/lib/hooks";

const CLUSTERS = Object.keys(CLUSTER_COLORS) as SkillCluster[];

/* Deterministic pseudo-random for stable star layout */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Node extends Skill {
  x: number; // 0..1 layout space
  y: number;
  phase: number;
}

/** FR-004: Skills constellation — stars, cluster colors, hover glow, click detail, terminal. */
export default function Skills() {
  const { ref, inView } = useInView<HTMLElement>(0.15);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<Node | null>(null);
  const [filter, setFilter] = useState<SkillCluster | null>(null);
  const [challenge, setChallenge] = useState("");
  const [challengeResult, setChallengeResult] = useState<string>("");
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const hoveredRef = useRef(hovered);
  const filterRef = useRef(filter);
  const highlightedRef = useRef(highlighted);
  useEffect(() => {
    hoveredRef.current = hovered;
    filterRef.current = filter;
    highlightedRef.current = highlighted;
  }, [hovered, filter, highlighted]);

  /* Layout: cluster anchors in a loose ring, stars scattered around anchors */
  const nodes = useMemo<Node[]>(() => {
    const rand = mulberry32(20260611);
    const anchors: Record<SkillCluster, { x: number; y: number }> = {
      "AI/ML": { x: 0.5, y: 0.3 },
      "Web/Full-Stack": { x: 0.82, y: 0.4 },
      Programming: { x: 0.18, y: 0.34 },
      Data: { x: 0.28, y: 0.74 },
      "Automation/IoT": { x: 0.62, y: 0.76 },
      "Cloud/Tools": { x: 0.89, y: 0.74 },
    };
    /* Golden-angle spiral per cluster — even spread, no two stars stacked */
    const clusterCount: Partial<Record<SkillCluster, number>> = {};
    return SKILLS.map((s) => {
      const a = anchors[s.cluster];
      const k = (clusterCount[s.cluster] = (clusterCount[s.cluster] ?? 0) + 1);
      const ang = k * 2.39996 + rand() * 0.5;
      const r = 0.035 + Math.sqrt(k) * 0.052 + rand() * 0.015;
      return {
        ...s,
        x: Math.min(0.95, Math.max(0.05, a.x + Math.cos(ang) * r * 1.25)),
        y: Math.min(0.9, Math.max(0.08, a.y + Math.sin(ang) * r * 0.85)),
        phase: rand() * Math.PI * 2,
      };
    });
  }, []);

  const nodeByName = useMemo(() => {
    const m = new Map<string, Node>();
    nodes.forEach((n) => m.set(n.name, n));
    return m;
  }, [nodes]);

  /* Canvas render loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio, 2);

    /* CSS vars don't resolve inside ctx.font — read the real family name once */
    const monoFamily =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-jetbrains")
        .trim() || '"JetBrains Mono", monospace';

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => (running = e.isIntersecting));
    io.observe(canvas);

    const px = (n: Node, t: number) => ({
      x: (n.x + Math.sin(t * 0.0004 + n.phase) * 0.006) * canvas.width,
      y: (n.y + Math.cos(t * 0.0005 + n.phase) * 0.008) * canvas.height,
    });

    const isActive = (n: Node) => {
      const f = filterRef.current;
      return !f || n.cluster === f;
    };

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hov = hoveredRef.current;
      const hl = highlightedRef.current;

      // Connections
      for (const [a, b] of SKILL_CONNECTIONS) {
        const na = nodeByName.get(a);
        const nb = nodeByName.get(b);
        if (!na || !nb) continue;
        const pa = px(na, t);
        const pb = px(nb, t);
        const lit =
          hov === a || hov === b || hl === a || hl === b;
        const dim = !isActive(na) || !isActive(nb);
        ctx.strokeStyle = lit
          ? CLUSTER_COLORS[na.cluster] + "99"
          : dim
          ? "rgba(255,255,255,0.025)"
          : "rgba(255,255,255,0.08)";
        ctx.lineWidth = (lit ? 1.6 : 1) * dpr;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // Stars
      ctx.textAlign = "center";
      for (const n of nodes) {
        const p = px(n, t);
        const color = CLUSTER_COLORS[n.cluster];
        const active = isActive(n);
        const lit = hov === n.name || hl === n.name;
        const baseR = (2 + (n.proficiency / 100) * 3) * dpr;
        const r = lit ? baseR * 1.8 : baseR;
        const twinkle = 0.75 + Math.sin(t * 0.002 + n.phase * 4) * 0.25;

        ctx.globalAlpha = active ? 1 : 0.15;
        ctx.shadowColor = color;
        ctx.shadowBlur = (lit ? 26 : 10 * twinkle) * dpr;
        ctx.fillStyle = lit ? "#FFFFFF" : color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Labels — readable by default, brighter + larger when lit (FR-004.3)
        if (lit || n.proficiency >= 70) {
          const ly = p.y - r - 9 * dpr;
          ctx.font = `${lit ? "600 " : "500 "}${(lit ? 14 : 12) * dpr}px ${monoFamily}`;
          /* dark halo so labels stay legible over stars and lines */
          ctx.strokeStyle = "rgba(5,5,16,0.9)";
          ctx.lineWidth = 3.5 * dpr;
          ctx.lineJoin = "round";
          ctx.strokeText(n.name, p.x, ly);
          ctx.fillStyle = lit ? "#FFFFFF" : "rgba(214,222,235,0.92)";
          ctx.fillText(n.name, p.x, ly);
        }
        ctx.globalAlpha = 1;
      }
    };
    raf = requestAnimationFrame(draw);

    /* Hover + click hit detection */
    const hit = (clientX: number, clientY: number): Node | null => {
      const rect = canvas.getBoundingClientRect();
      const mx = ((clientX - rect.left) / rect.width) * canvas.width;
      const my = ((clientY - rect.top) / rect.height) * canvas.height;
      let best: Node | null = null;
      let bestD = 24 * dpr;
      for (const n of nodes) {
        const p = px(n, performance.now());
        const d = Math.hypot(p.x - mx, p.y - my);
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      return best;
    };

    const onMove = (e: PointerEvent) => {
      const n = hit(e.clientX, e.clientY);
      setHovered(n?.name ?? null);
      canvas.style.cursor = n ? "pointer" : "default";
    };
    const onClick = (e: MouseEvent) => {
      const n = hit(e.clientX, e.clientY);
      if (n) setSelected(n);
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("click", onClick);
    };
  }, [nodes, nodeByName]);

  /* FR-004.5: Challenge terminal */
  const runChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    const q = challenge.trim().toLowerCase();
    if (!q) return;
    const found = nodes.find(
      (n) =>
        n.name.toLowerCase() === q ||
        n.name.toLowerCase().includes(q) ||
        q.includes(n.name.toLowerCase())
    );
    if (found) {
      setHighlighted(found.name);
      setFilter(null);
      setChallengeResult(
        `MATCH: ${found.name} — ${found.proficiency}% proficiency, ${found.years} yr${found.years !== 1 ? "s" : ""}. Cluster: ${found.cluster}. Constellation locked on.`
      );
      setSelected(found);
    } else {
      setHighlighted(null);
      setChallengeResult(
        `NO MATCH for "${challenge.trim()}". But Saumok learns fast — this could be on the map within weeks.`
      );
    }
    setChallenge("");
  };

  const totalXP = useMemo(
    () => SKILLS.reduce((acc, s) => acc + Math.round(s.proficiency * s.years), 0),
    []
  );

  return (
    <section id="skills" ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <p
          className={`section-eyebrow transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          CHAPTER 02 — SKILL CONSTELLATION
        </p>
        <h2
          className={`section-title mt-3 transition-all delay-100 duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          The Night Sky of Craft
        </h2>
        <p
          className={`mt-4 max-w-[560px] text-[14px] leading-relaxed text-[#94A3B8] transition-all delay-200 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          Every star is a skill. Every line is a relationship. Hover to inspect,
          click to open the dossier — or challenge the terminal below.
        </p>

        {/* Filters + XP */}
        <div
          className={`mt-8 flex flex-wrap items-center gap-2 transition-all delay-300 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => {
              setFilter(null);
              setHighlighted(null);
            }}
            className={`cursor-pointer rounded-full border px-4 py-2 font-mono-ui text-[11px] transition-all duration-200 ${
              filter === null
                ? "border-white/40 text-white"
                : "border-white/10 text-[#94A3B8] hover:text-white"
            }`}
          >
            ALL SYSTEMS
          </button>
          {CLUSTERS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(filter === c ? null : c);
                setHighlighted(null);
              }}
              className="cursor-pointer rounded-full border px-4 py-2 font-mono-ui text-[11px] transition-all duration-200"
              style={{
                borderColor:
                  filter === c ? CLUSTER_COLORS[c] : "rgba(255,255,255,0.1)",
                color: filter === c ? CLUSTER_COLORS[c] : "#94A3B8",
                boxShadow:
                  filter === c ? `0 0 16px ${CLUSTER_COLORS[c]}55` : "none",
              }}
            >
              {c.toUpperCase()}
            </button>
          ))}
          <div className="ml-auto hidden font-mono-ui text-[11px] text-[#475569] md:block">
            DEV LEVEL:{" "}
            <span className="text-[#F59E0B]">
              {Math.floor(totalXP / 500)} · {totalXP.toLocaleString()} XP
            </span>
          </div>
        </div>

        {/* Constellation canvas */}
        <div
          ref={wrapRef}
          className={`relative mt-6 h-[480px] overflow-hidden rounded-2xl border md:h-[560px] transition-all delay-400 duration-1000 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background:
              "radial-gradient(ellipse at 50% 40%, #0A0A22 0%, #050510 75%)",
          }}
        >
          <canvas ref={canvasRef} className="h-full w-full" aria-label="Interactive skill constellation map" />

          {/* Challenge terminal — bottom-left (design.md §8.3) */}
          <form
            onSubmit={runChallenge}
            className="absolute bottom-4 left-4 w-[min(340px,calc(100%-32px))] rounded-lg border p-3"
            style={{
              background: "rgba(5,5,16,0.8)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(6,182,212,0.25)",
            }}
          >
            <div className="mb-2 font-mono-ui text-[10px] tracking-[0.2em] text-[#475569]">
              CHALLENGE TERMINAL
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono-ui text-[13px] text-[#06B6D4]">&gt;</span>
              <input
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="type any skill... e.g. RAG"
                className="w-full bg-transparent font-mono-ui text-[13px] text-[#67E8F9] placeholder-[#334155] outline-none"
                aria-label="Challenge terminal — type a skill name"
              />
            </div>
            {challengeResult && (
              <div className="mt-2 border-t border-white/5 pt-2 font-mono-ui text-[11px] leading-relaxed text-[#94A3B8]">
                {challengeResult}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Skill detail card (FR-004.4) */}
      {selected && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center p-6"
          style={{ background: "rgba(5,5,16,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} skill details`}
        >
          <div
            className="glass-card relative max-h-[85svh] w-full max-w-[420px] overflow-y-auto p-6 md:p-8"
            style={{ animation: "skill-fly-in 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 cursor-pointer text-[#475569] transition-colors hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div
              className="font-mono-ui text-[10px] tracking-[0.25em]"
              style={{ color: CLUSTER_COLORS[selected.cluster] }}
            >
              {selected.cluster.toUpperCase()}
            </div>
            <h3 className="font-display mt-2 text-xl font-bold tracking-[0.1em] text-white">
              {selected.name}
            </h3>

            <div className="mt-6">
              <div className="flex justify-between font-mono-ui text-[11px] text-[#94A3B8]">
                <span>PROFICIENCY</span>
                <span style={{ color: CLUSTER_COLORS[selected.cluster] }}>
                  {selected.proficiency}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${selected.proficiency}%`,
                    background: `linear-gradient(90deg, ${CLUSTER_COLORS[selected.cluster]}, #FFFFFF66)`,
                    boxShadow: `0 0 12px ${CLUSTER_COLORS[selected.cluster]}`,
                  }}
                />
              </div>
            </div>

            <div className="mt-5 flex gap-8 font-mono-ui text-[12px]">
              <div>
                <div className="text-[#475569]">EXPERIENCE</div>
                <div className="mt-1 text-white">
                  {selected.years} year{selected.years !== 1 ? "s" : ""}
                </div>
              </div>
              <div>
                <div className="text-[#475569]">XP EARNED</div>
                <div className="mt-1 text-[#F59E0B]">
                  +{Math.round(selected.proficiency * selected.years).toLocaleString()}
                </div>
              </div>
            </div>

            {SKILL_PROJECTS[selected.name] && (
              <div className="mt-5">
                <div className="font-mono-ui text-[11px] text-[#475569]">
                  DEPLOYED IN
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SKILL_PROJECTS[selected.name].map((p) => (
                    <span key={p} className="tech-badge">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes skill-fly-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
