"use client";

import { useState } from "react";
import {
  GraduationCap,
  Mountain,
  Target,
  Languages,
  X,
  Download,
} from "lucide-react";
import { PERSONAL, STATS, GLOBE_PINS } from "@/lib/data";
import { useInView, useCounter } from "@/lib/hooks";
import Globe from "./Globe";

interface InfoCard {
  id: string;
  icon: typeof GraduationCap;
  title: string;
  brief: string;
  detail: string[];
}

const CARDS: InfoCard[] = [
  {
    id: "education",
    icon: GraduationCap,
    title: "EDUCATION",
    brief: "B.Tech CSE (AI-ML) · CGPA 7.86",
    detail: [
      "Bachelor of Technology in Computer Science Engineering, specialization in Artificial Intelligence and Machine Learning.",
      "Sister Nivedita University, Kolkata — April 2022 to June 2026 — CGPA 7.86.",
      "Higher Secondary: Pramila Memorial Institute — 82%.",
    ],
  },
  {
    id: "explorer",
    icon: Mountain,
    title: "EXPLORER",
    brief: "Trekking · Hiking · Road Trips",
    detail: [
      "Trekking, hiking, backpacking, camping, and road trips — the same drive to explore unknown terrain powers how I approach new technology.",
      "Regular at hackathons. Mind-maps problems before solving them. Learns new stacks at speed.",
    ],
  },
  {
    id: "mission",
    icon: Target,
    title: "MISSION",
    brief: "AI Systems Architect in the making",
    detail: [
      "Open to internships, full-time roles, and freelance projects.",
      "Target roles: AI/ML Engineer, Full-Stack Developer, IoT Developer, AI Systems Architect.",
      "Open to remote work and relocation — already collaborated internationally with teams in China and Australia.",
    ],
  },
  {
    id: "comms",
    icon: Languages,
    title: "COMMS",
    brief: "English (Expert) · German (Beginner)",
    detail: [
      "English — expert/fluent. German — beginner and learning.",
      "Quick learner, communicative, team player, critical thinker, problem solver.",
    ],
  },
];

function StatBlock({
  label,
  value,
  decimals,
  start,
}: {
  label: string;
  value: number;
  decimals: number;
  start: boolean;
}) {
  const v = useCounter(value, start, 2000, decimals);
  return (
    <div className="text-center">
      <div
        className="font-display text-3xl font-bold text-white md:text-4xl"
        style={{ textShadow: "0 0 30px rgba(6,182,212,0.5)" }}
      >
        {v.toFixed(decimals)}
      </div>
      <div className="mt-2 font-mono-ui text-[11px] uppercase tracking-[0.2em] text-[#475569]">
        {label}
      </div>
    </div>
  );
}

/** FR-003: About chapter — holographic briefing aesthetic, 4 expanding cards, globe, stats. */
export default function About() {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const [expanded, setExpanded] = useState<InfoCard | null>(null);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden py-28 md:py-36"
    >
      {/* Ambient */}
      <div
        aria-hidden
        className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "#7C3AED" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[10%] right-[5%] h-[350px] w-[350px] rounded-full opacity-[0.1] blur-[120px]"
        style={{ background: "#06B6D4" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <p
          className={`section-eyebrow transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          CHAPTER 01 — INTELLIGENCE BRIEFING
        </p>
        <h2
          className={`section-title mt-3 transition-all delay-100 duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Who Is Saumok?
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: bio + stats + globe */}
          <div>
            <div
              className={`relative scanlines glass-card p-6 md:p-8 transition-all delay-200 duration-700 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="mb-4 flex items-center gap-2 font-mono-ui text-[11px] text-[#06B6D4]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
                SUBJECT DOSSIER · DECRYPTED
              </div>
              <div
                className="scanlines relative mb-5 overflow-hidden rounded-lg border"
                style={{
                  borderColor: "rgba(6,182,212,0.25)",
                  boxShadow: "0 0 40px rgba(6,182,212,0.12)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/models/character_sheet.png"
                  alt="Saumok Kundu — 3-view character reference render"
                  className="block w-full"
                  loading="lazy"
                />
                <span className="absolute bottom-2 right-3 font-mono-ui text-[9px] tracking-[0.25em] text-[#67E8F9]/70">
                  HOLOGRAPHIC RECONSTRUCTION
                </span>
              </div>
              <p className="text-[15px] leading-[1.75] text-[#CBD5E1]">
                {PERSONAL.bio}
              </p>
              <div className="mt-6">
                <a
                  href={PERSONAL.cv}
                  download="Saumok_Kundu_Resume.pdf"
                  className="neon-btn !px-5 !py-2.5 !text-xs"
                >
                  <Download size={14} />
                  Download CV
                </a>
              </div>
            </div>

            <div
              className={`mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 transition-all delay-300 duration-700 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {STATS.map((s) => (
                <StatBlock key={s.label} {...s} start={inView} />
              ))}
            </div>

            <div
              className={`relative mt-10 h-[300px] transition-all delay-500 duration-1000 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            >
              <Globe pins={GLOBE_PINS} />
              <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono-ui text-[10px] tracking-[0.25em] text-[#475569]">
                GLOBAL OPERATIONS MAP
              </div>
            </div>
          </div>

          {/* Right: 4 holographic info cards */}
          <div className="grid content-start gap-5 sm:grid-cols-2">
            {CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => setExpanded(card)}
                  className={`glass-card interactive group p-6 text-left transition-all duration-700 ${
                    inView
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${200 + i * 120}ms`,
                    animation: inView
                      ? `float-card 3s ease-in-out ${i * 0.75}s infinite alternate`
                      : undefined,
                  }}
                  aria-label={`Open ${card.title} details`}
                >
                  <Icon
                    size={22}
                    className="text-[#06B6D4] transition-colors group-hover:text-[#67E8F9]"
                  />
                  <h3 className="font-display mt-4 text-[13px] font-bold tracking-[0.18em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#94A3B8]">
                    {card.brief}
                  </p>
                  <span className="mt-4 inline-block font-mono-ui text-[10px] tracking-[0.2em] text-[#475569] transition-colors group-hover:text-[#A78BFA]">
                    [ EXPAND ]
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Expanded card modal — flies toward camera (FR-003.4) */}
      {expanded && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center p-6"
          style={{ background: "rgba(5,5,16,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setExpanded(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${expanded.title} details`}
        >
          <div
            className="glass-card relative max-h-[85svh] w-full max-w-[520px] overflow-y-auto p-6 md:p-8"
            style={{ animation: "card-fly-in 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpanded(null)}
              className="absolute right-5 top-5 cursor-pointer text-[#475569] transition-colors hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <expanded.icon size={26} className="text-[#06B6D4]" />
            <h3 className="font-display mt-4 text-lg font-bold tracking-[0.15em] text-white">
              {expanded.title}
            </h3>
            <div className="mt-5 space-y-3">
              {expanded.detail.map((d, i) => (
                <p key={i} className="text-[14px] leading-[1.7] text-[#CBD5E1]">
                  <span className="mr-2 font-mono-ui text-[#06B6D4]">▸</span>
                  {d}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float-card {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-6px);
          }
        }
        @keyframes card-fly-in {
          from {
            transform: scale(0.7) translateZ(0);
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
