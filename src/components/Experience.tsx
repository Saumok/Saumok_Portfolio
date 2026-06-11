"use client";

import { useEffect, useState } from "react";
import { MapPin, Star } from "lucide-react";
import { EXPERIENCES, GLOBE_PINS } from "@/lib/data";
import { useInView, useDecrypt } from "@/lib/hooks";
import Globe from "./Globe";

function DecryptLine({ text, start, delay }: { text: string; start: boolean; delay: number }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [start, delay]);
  const decrypted = useDecrypt(text, go, 18);
  return (
    <p className="font-mono-ui text-[12.5px] leading-[1.8] text-[#CBD5E1]">
      <span className="mr-2 text-[#EF4444]">▸</span>
      {go ? decrypted : ""}
      {!go && <span className="text-[#1e293b]">{"█".repeat(Math.min(text.length, 60))}</span>}
    </p>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[number];
  index: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setRevealed(true), 600 + index * 200);
      return () => clearTimeout(t);
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      className={`glass-card relative overflow-hidden p-8 transition-all duration-700 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ borderColor: "rgba(239,68,68,0.15)" }}
    >
      {/* CLASSIFIED stamp — fades as card reveals (FR-005.5) */}
      <div
        aria-hidden
        className={`classified-stamp absolute right-8 top-8 text-sm transition-all duration-1000 ${
          revealed ? "scale-[2.2] opacity-0" : "scale-100 opacity-90"
        }`}
      >
        CLASSIFIED
      </div>

      <div className="font-mono-ui text-[10px] tracking-[0.3em] text-[#EF4444]">
        TRANSMISSION {String(index + 1).padStart(2, "0")} · DECRYPTED
      </div>

      <h3 className="font-display mt-3 text-lg font-bold tracking-[0.1em] text-white md:text-xl">
        {exp.role}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#94A3B8]">
        <span className="text-[#A78BFA]">{exp.company}</span>
        <span className="flex items-center gap-1 font-mono-ui text-[11px]">
          <MapPin size={11} />
          {exp.location} [{exp.flag}]
        </span>
      </div>
      <div className="mt-1 font-mono-ui text-[11px] text-[#475569]">
        {exp.type} · {exp.duration}
        {exp.rating && (
          <span className="ml-3 inline-flex items-center gap-1 text-[#F59E0B]">
            <Star size={10} fill="#F59E0B" />
            RATED {exp.rating}
          </span>
        )}
      </div>

      <div className="mt-6 space-y-1.5">
        {exp.achievements.map((a, i) => (
          <DecryptLine key={i} text={a} start={revealed} delay={i * 350} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {exp.tech.map((t) => (
          <span
            key={t}
            className="tech-badge"
            style={{ borderColor: "rgba(239,68,68,0.2)" }}
          >
            {t}
          </span>
        ))}
      </div>

      <div
        className={`mt-6 border-t border-white/5 pt-4 text-[12.5px] italic leading-relaxed text-[#64748B] transition-opacity delay-1000 duration-1000 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        {exp.significance}
      </div>
    </div>
  );
}

/** FR-005: Experience — classified transmissions + transmission globe with arcs. */
export default function Experience() {
  const { ref, inView } = useInView<HTMLElement>(0.1);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden py-28 md:py-36"
    >
      <div
        aria-hidden
        className="absolute right-[15%] top-[15%] h-[400px] w-[400px] rounded-full opacity-[0.07] blur-[130px]"
        style={{ background: "#EF4444" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <p
          className={`section-eyebrow !text-[#EF4444] transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          CHAPTER 03 — FIELD OPERATIONS
        </p>
        <h2
          className={`section-title mt-3 transition-all delay-100 duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          International Missions
        </h2>
        <p
          className={`mt-4 max-w-[560px] text-[14px] leading-relaxed text-[#94A3B8] transition-all delay-200 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          Two simultaneous international deployments at age 20 — transmissions
          intercepted from Chengdu and Melbourne.
        </p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>

          {/* Transmission globe (FR-005.2/3) */}
          <div
            className={`relative hidden h-[520px] lg:block transition-all delay-500 duration-1000 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="sticky top-24 h-[480px]">
              <Globe
                pins={GLOBE_PINS}
                arcs={[
                  {
                    from: { lat: 22.5, lon: 88.4 },
                    to: { lat: 30.7, lon: 104.1 },
                    color: "#EF4444",
                  },
                  {
                    from: { lat: 22.5, lon: 88.4 },
                    to: { lat: -37.8, lon: 145.0 },
                    color: "#F59E0B",
                  },
                ]}
              />
              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono-ui text-[10px] tracking-[0.25em] text-[#475569]">
                LIVE TRANSMISSION ARCS · KOL ⇄ CTU · KOL ⇄ MEL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
