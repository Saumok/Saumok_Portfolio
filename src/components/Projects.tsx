"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { PROJECTS, type Project } from "@/lib/data";
import { useMediaQuery, useInView } from "@/lib/hooks";
import HackerOS from "./HackerOS";

const HallwayScene = dynamic(() => import("./three/HallwayScene"), { ssr: false });

/**
 * FR-006: Projects chapter. Desktop — 400vh scroll-pinned 3D corridor; the camera
 * walks as you scroll. Click a door → Hacker OS. Mobile — swipeable card stack.
 */
export default function Projects() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [depth, setDepth] = useState(0);

  /* Scroll progress through the pinned section */
  useEffect(() => {
    if (!isDesktop) return;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / Math.max(total, 1)));
      progressRef.current = p;
      setDepth((d) => (Math.abs(d - p) > 0.005 ? p : d));
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [isDesktop]);

  /* Lock page scroll while OS is open */
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (activeProject) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const hovered = PROJECTS.find((p) => p.id === hoveredId) ?? null;

  return (
    <section id="projects" ref={sectionRef} className="relative" style={{ height: isDesktop ? "420vh" : "auto" }}>
      {isDesktop ? (
        <div className="sticky top-0 h-screen overflow-hidden">
          <HallwayScene
            progressRef={progressRef}
            onHover={setHoveredId}
            onEnter={(id) => {
              const p = PROJECTS.find((x) => x.id === id);
              if (p) setActiveProject(p);
            }}
          />

          {/* HUD overlay */}
          <div className="pointer-events-none absolute inset-0 z-10">
            {/* Header */}
            <div className="absolute left-10 top-24">
              <p className="section-eyebrow">CHAPTER 04 — THE VAULT</p>
              <h2 className="section-title mt-2 !text-[1.6rem]">
                Seven Doors. Seven Systems.
              </h2>
              <p className="mt-2 max-w-[380px] font-mono-ui text-[12px] leading-relaxed text-[#94A3B8]">
                Scroll to walk the corridor. Click a glowing door to enter its OS.
              </p>
            </div>

            {/* Hovered door callout */}
            {hovered && (
              <div
                className="absolute left-1/2 top-[18%] -translate-x-1/2 text-center"
                style={{ animation: "fade-up 0.25s ease-out" }}
              >
                <div
                  className="font-display text-2xl font-bold tracking-[0.2em]"
                  style={{ color: hovered.color, textShadow: `0 0 30px ${hovered.color}` }}
                >
                  {hovered.name.toUpperCase()}
                </div>
                <div className="mt-1 font-mono-ui text-[11px] tracking-[0.2em] text-[#94A3B8]">
                  {hovered.category.toUpperCase()} · CLICK TO ENTER
                </div>
              </div>
            )}

            {/* Corridor depth gauge */}
            <div className="absolute bottom-10 left-1/2 w-[min(420px,70vw)] -translate-x-1/2">
              <div className="flex justify-between font-mono-ui text-[10px] tracking-[0.2em] text-[#475569]">
                <span>ENTRANCE</span>
                <span>SECTOR {Math.min(7, Math.floor(depth * 7) + 1)}/7</span>
                <span>VAULT END</span>
              </div>
              <div className="mt-2 h-[3px] overflow-hidden rounded bg-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]"
                  style={{ width: `${depth * 100}%` }}
                />
              </div>
              {/* Door markers */}
              <div className="relative mt-1 h-2">
                {PROJECTS.map((p) => (
                  <span
                    key={p.id}
                    className="absolute top-0 h-2 w-1 rounded-sm"
                    style={{
                      left: `${(p.doorZ / 84) * 100}%`,
                      background: p.color,
                      opacity: hoveredId === p.id ? 1 : 0.5,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fade-up {
              from {
                opacity: 0;
                transform: translate(-50%, 8px);
              }
              to {
                opacity: 1;
                transform: translate(-50%, 0);
              }
            }
          `}</style>
        </div>
      ) : (
        <MobileProjects onOpen={setActiveProject} />
      )}

      {/* Hacker OS */}
      {activeProject && (
        <HackerOS project={activeProject} onExit={() => setActiveProject(null)} />
      )}
    </section>
  );
}

/* ── Mobile: horizontal swipeable cards (design.md §9.2) ── */
function MobileProjects({ onOpen }: { onOpen: (p: Project) => void }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <div ref={ref} className="py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <p
          className={`section-eyebrow transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          CHAPTER 04 — THE VAULT
        </p>
        <h2
          className={`section-title mt-3 transition-all delay-100 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          Seven Systems
        </h2>
        <p className="mt-3 font-mono-ui text-[12px] text-[#475569]">
          SWIPE → · TAP A CARD TO ENTER ITS OS
        </p>
      </div>

      <div className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6">
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onOpen(p)}
            className={`glass-card interactive group relative w-[min(300px,84vw)] shrink-0 snap-center overflow-hidden p-6 text-left transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
            aria-label={`Open ${p.name} details`}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-1"
              style={{ background: p.color, boxShadow: `0 0 16px ${p.color}` }}
            />
            <div
              className="font-mono-ui text-[10px] tracking-[0.25em]"
              style={{ color: p.color }}
            >
              {String(i + 1).padStart(2, "0")} · {p.status}
            </div>
            <h3 className="font-display mt-3 text-lg font-bold tracking-[0.08em] text-white">
              {p.name}
            </h3>
            <p className="mt-1 text-[11px] text-[#64748B]">{p.category}</p>
            <p className="mt-3 line-clamp-4 text-[13px] leading-relaxed text-[#94A3B8]">
              {p.oneLiner}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.techStack.slice(0, 4).map((t) => (
                <span key={t} className="tech-badge !text-[10px]">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4">
              <span
                className="flex items-center gap-1.5 font-mono-ui text-[11px]"
                style={{ color: p.color }}
              >
                ENTER OS <ArrowRight size={12} />
              </span>
              {p.liveUrl && <ExternalLink size={13} className="text-[#475569]" />}
              <GithubIcon size={13} className="text-[#475569]" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
