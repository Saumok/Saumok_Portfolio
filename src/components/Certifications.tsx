"use client";

import { useEffect, useState } from "react";
import { Trophy, BadgeCheck, ExternalLink } from "lucide-react";
import { CERTIFICATIONS, type Certification } from "@/lib/data";
import { useInView, useCounter } from "@/lib/hooks";

const RARITY_STYLE: Record<Certification["rarity"], { color: string; glow: string }> = {
  LEGENDARY: { color: "#F59E0B", glow: "rgba(245,158,11,0.4)" },
  EPIC: { color: "#A78BFA", glow: "rgba(167,139,250,0.4)" },
};

/** FR-007: Certifications — achievement-unlock cards + toast notifications + XP ticker. */
export default function Certifications() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  const [unlocked, setUnlocked] = useState<number>(0);
  const [toast, setToast] = useState<Certification | null>(null);
  const [selected, setSelected] = useState<Certification | null>(null);

  const totalXP = CERTIFICATIONS.slice(0, unlocked).reduce((a, c) => a + c.xp, 0);
  const xp = useCounter(totalXP, true, 1200);

  /* Sequential achievement-unlock cascade (FR-007.1) */
  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    CERTIFICATIONS.forEach((cert, i) => {
      timers.push(
        setTimeout(() => {
          setUnlocked(i + 1);
          setToast(cert);
        }, 600 + i * 1800)
      );
      timers.push(
        setTimeout(() => setToast((t) => (t?.id === cert.id ? null : t)), 600 + i * 1800 + 1500)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="certifications" ref={ref} className="relative overflow-hidden py-28">
      <div
        aria-hidden
        className="absolute left-[50%] top-[30%] h-[300px] w-[500px] -translate-x-1/2 rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: "#F59E0B" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p
              className={`section-eyebrow !text-[#F59E0B] transition-all duration-700 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            >
              CHAPTER 05 — TROPHY ROOM
            </p>
            <h2
              className={`section-title mt-3 transition-all delay-100 duration-700 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            >
              Achievements Unlocked
            </h2>
          </div>
          <div
            className={`font-mono-ui text-[12px] text-[#475569] transition-all delay-200 duration-700 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            TOTAL XP:{" "}
            <span className="text-lg text-[#F59E0B]">
              +{Math.round(xp).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CERTIFICATIONS.map((cert, i) => {
            const style = RARITY_STYLE[cert.rarity];
            const isUnlocked = unlocked > i;
            return (
              <button
                key={cert.id}
                onClick={() => isUnlocked && setSelected(cert)}
                className={`glass-card interactive relative overflow-hidden p-7 text-left transition-all duration-700 ${
                  isUnlocked
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-30 grayscale"
                }`}
                style={{
                  borderColor: isUnlocked ? style.color + "44" : undefined,
                }}
                aria-label={`View ${cert.name} details`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      borderColor: style.color + "55",
                      background: style.color + "11",
                      boxShadow: isUnlocked ? `0 0 24px ${style.glow}` : "none",
                      animation: isUnlocked ? "trophy-spin 6s linear infinite" : "none",
                    }}
                  >
                    <Trophy size={26} style={{ color: style.color }} />
                  </div>
                  <span
                    className="rounded-full border px-3 py-1 font-display text-[9px] font-bold tracking-[0.25em]"
                    style={{ borderColor: style.color + "66", color: style.color }}
                  >
                    {cert.rarity}
                  </span>
                </div>

                <h3 className="mt-5 text-[16px] font-semibold leading-snug text-white">
                  {cert.name}
                </h3>
                <p className="mt-2 text-[13px] text-[#94A3B8]">
                  {cert.issuer} · {cert.platform} · {cert.date}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-mono-ui text-[12px]" style={{ color: style.color }}>
                    +{cert.xp.toLocaleString()} XP
                  </span>
                  <span className="flex items-center gap-1 font-mono-ui text-[10px] tracking-[0.2em] text-[#475569]">
                    <BadgeCheck size={12} />
                    {isUnlocked ? "VERIFIED" : "LOCKED"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Achievement toast (design.md §5.4) */}
      {toast && (
        <div
          className="fixed right-6 top-20 z-[86] w-[min(360px,calc(100vw-48px))] rounded-xl border-l-4 p-5"
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.3)",
            borderLeft: "4px solid #F59E0B",
            backdropFilter: "blur(20px)",
            animation: "toast-in 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}
          role="status"
        >
          <div className="flex items-center gap-2 font-display text-[10px] font-bold tracking-[0.25em] text-[#F59E0B]">
            <Trophy size={13} />
            ACHIEVEMENT UNLOCKED
          </div>
          <div className="mt-2 text-[15px] font-semibold text-white">{toast.name}</div>
          <div className="mt-1 text-[12px] text-[#94A3B8]">
            {toast.issuer} · {toast.date}
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]"
              style={{ animation: "xp-fill 1s ease-out forwards" }}
            />
          </div>
        </div>
      )}

      {/* Detail modal (FR-007.4) */}
      {selected && (
        <div
          className="fixed inset-0 z-[87] flex items-center justify-center p-6"
          style={{ background: "rgba(5,5,16,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="glass-card w-full max-w-[460px] p-8"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "toast-in 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
          >
            <span
              className="rounded-full border px-3 py-1 font-display text-[9px] font-bold tracking-[0.25em]"
              style={{
                borderColor: RARITY_STYLE[selected.rarity].color + "66",
                color: RARITY_STYLE[selected.rarity].color,
              }}
            >
              {selected.rarity}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-white">{selected.name}</h3>
            <div className="mt-4 space-y-2 font-mono-ui text-[12.5px] text-[#94A3B8]">
              <div>ISSUER ........ {selected.issuer}</div>
              <div>PLATFORM ...... {selected.platform}</div>
              <div>DATE .......... {selected.date}</div>
              <div>
                XP VALUE ......{" "}
                <span style={{ color: RARITY_STYLE[selected.rarity].color }}>
                  +{selected.xp.toLocaleString()}
                </span>
              </div>
            </div>
            <a
              href="https://www.coursera.org"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn mt-6 !px-5 !py-2.5 !text-xs"
            >
              <ExternalLink size={13} />
              Verify Credential
            </a>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes trophy-spin {
          0%, 100% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(180deg);
          }
        }
        @keyframes toast-in {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes xp-fill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
