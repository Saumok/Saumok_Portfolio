"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Per-project gateway transition — plays full-screen between the door click and
 * the Hacker OS. Each project gets a custom scene that tells its story in ~2.5s.
 * Click/tap or any key skips. Reduced motion → short crossfade with static emblem.
 * Used by both the desktop hallway and the mobile card stack.
 */

const STATUS_LINES: Record<string, [string, string, string]> = {
  leadstiq: ["RECORDING LIVE CALL …", "TRANSCRIBING · ANALYZING INTENT …", "LEAD SCORED: HOT ✓"],
  krishivision: ["SCANNING LEAF TISSUE …", "DISEASE DETECTED: LEAF BLIGHT 96.2%", "REMEDY APPLIED — CROP TREATED ✓"],
  cowrite: ["2 EDITORS CONNECTED …", "SYNCING CURSORS + DOODLES …", "DOCUMENT LIVE ✓"],
  likhitpens: ["UNCAPPING THE NIB …", "ENGRAVING PREVIEW IN GOLD …", "EST. 1957 — READY ✓"],
  agenticbros: ["SCANNING GOOGLE MAPS …", "4 TARGETS ACQUIRED · ANALYZING WEAKNESSES", "OUTREACH DISPATCHED ✓"],
  yaatraexpress: ["PLOTTING TREK ROUTE …", "ASCENDING TO 4,270M …", "EXPEDITION READY ✓"],
  socialpilot: ["GENERATING PLATFORM CONTENT …", "SCHEDULING 12 POSTS …", "ENGAGEMENT AUTOMATED ✓"],
};

export default function ProjectGateway({
  project,
  onDone,
}: {
  project: Project;
  onDone: () => void;
}) {
  const reduced = usePrefersReducedMotion();
  const duration = reduced ? 650 : 2700;
  const [step, setStep] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    const t = setTimeout(() => finishRef.current(), duration);
    const onKey = () => finishRef.current();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [duration]);

  useEffect(() => {
    if (reduced) return;
    const a = setTimeout(() => setStep(1), 950);
    const b = setTimeout(() => setStep(2), 1850);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduced]);

  const lines = STATUS_LINES[project.id] ?? ["ACCESSING …", "DECRYPTING …", "READY ✓"];

  return (
    <div
      className="fixed inset-0 z-[87] flex cursor-pointer flex-col items-center justify-center overflow-hidden"
      role="status"
      aria-label={`Entering ${project.name}`}
      onClick={finish}
      style={{
        background: `
          radial-gradient(ellipse at 50% 45%, ${project.color}1f 0%, transparent 55%),
          linear-gradient(160deg, #050510 0%, #08081a 100%)`,
        animation: "gw-shell-in 0.35s cubic-bezier(0,0,0.2,1)",
      }}
    >
      {/* Themed scene */}
      {!reduced && (
        <div className="relative h-[min(46vh,380px)] w-full max-w-[640px]">
          <Scene project={project} />
        </div>
      )}

      {/* Project name reveal */}
      <div className="relative z-10 mt-6 px-6 text-center">
        <div
          className="font-display text-[clamp(1.5rem,5vw,2.6rem)] font-black"
          style={{
            color: project.color,
            textShadow: `0 0 40px ${project.color}88`,
            animation: reduced ? undefined : "gw-name-in 0.8s cubic-bezier(0.16,1,0.3,1) both",
          }}
        >
          {project.name.toUpperCase()}
        </div>
        <div className="mt-2 font-mono-ui text-[11px] tracking-[0.3em] text-[#94A3B8]">
          {project.category.toUpperCase()}
        </div>
      </div>

      {/* Status + progress */}
      <div className="relative z-10 mt-8 w-[min(360px,80vw)]">
        <div
          aria-live="polite"
          className="h-5 text-center font-mono-ui text-[11.5px] tracking-[0.15em] text-[#CBD5E1]"
        >
          {lines[step]}
        </div>
        <div className="mt-3 h-[3px] overflow-hidden rounded bg-white/10">
          <div
            className="h-full rounded"
            style={{
              background: project.color,
              boxShadow: `0 0 12px ${project.color}`,
              animation: `gw-progress ${duration}ms linear both`,
            }}
          />
        </div>
        <div className="mt-3 text-center font-mono-ui text-[10px] tracking-[0.2em] text-[#475569]">
          CLICK TO SKIP
        </div>
      </div>

      <style jsx global>{`
        @keyframes gw-shell-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gw-name-in {
          from { opacity: 0; letter-spacing: 0.6em; filter: blur(6px); }
          to { opacity: 1; letter-spacing: 0.15em; filter: blur(0); }
        }
        @keyframes gw-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        /* ── shared scene atoms ── */
        @keyframes gw-pop {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gw-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gw-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes gw-pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        /* ── krishivision ── */
        @keyframes gw-leaf-fall {
          from { transform: translateY(-12vh) rotate(0deg); opacity: 0; }
          12% { opacity: 0.8; }
          to { transform: translateY(52vh) rotate(140deg); opacity: 0; }
        }
        @keyframes gw-scan-beam {
          0% { top: 4%; opacity: 0; }
          10% { opacity: 1; }
          48% { top: 92%; }
          52% { top: 92%; }
          90% { top: 4%; opacity: 1; }
          100% { top: 4%; opacity: 0; }
        }
        @keyframes gw-blight-heal {
          0%, 45% { fill: #ef4444; opacity: 0.95; }
          70% { fill: #f59e0b; opacity: 0.6; }
          100% { fill: #10b981; opacity: 0; }
        }
        @keyframes gw-leaf-glow {
          0%, 50% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.25)); }
          100% { filter: drop-shadow(0 0 26px rgba(16, 185, 129, 0.9)); }
        }
        @keyframes gw-droplet {
          0% { transform: translateY(-60px); opacity: 0; }
          30% { opacity: 1; }
          85% { transform: translateY(46px); opacity: 1; }
          100% { transform: translateY(54px) scaleY(0.3); opacity: 0; }
        }
        @keyframes gw-reticle-spin {
          to { transform: rotate(360deg); }
        }
        /* ── leadstiq ── */
        @keyframes gw-wave {
          0%, 100% { transform: scaleY(0.25); }
          50% { transform: scaleY(1); }
        }
        @keyframes gw-card-file {
          0%, 55% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          80% { transform: translate(calc(-50% - 110px), 74px) scale(0.62); opacity: 1; }
          100% { transform: translate(calc(-50% - 110px), 74px) scale(0.62); opacity: 0.95; }
        }
        @keyframes gw-slot-light {
          0%, 70% { box-shadow: none; border-color: rgba(255,255,255,0.12); }
          100% { box-shadow: 0 0 26px rgba(239,68,68,0.5); border-color: #ef4444; }
        }
        /* ── cowrite ── */
        @keyframes gw-typeline {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes gw-caret-a {
          0% { left: 6%; top: 18%; }
          45% { left: 78%; top: 18%; }
          55% { left: 8%; top: 42%; }
          100% { left: 64%; top: 42%; }
        }
        @keyframes gw-caret-b {
          0% { left: 70%; top: 66%; }
          40% { left: 12%; top: 66%; }
          60% { left: 30%; top: 86%; }
          100% { left: 82%; top: 86%; }
        }
        /* ── likhitpens ── */
        @keyframes gw-nib-glide {
          from { offset-distance: 0%; }
          to { offset-distance: 100%; }
        }
        @keyframes gw-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50% { opacity: 1; transform: scale(1); }
        }
        /* ── agenticbros ── */
        @keyframes gw-radar-sweep {
          to { transform: rotate(360deg); }
        }
        @keyframes gw-blip {
          0% { opacity: 0; transform: scale(0); }
          12% { opacity: 1; transform: scale(1.4); }
          24%, 100% { opacity: 0.9; transform: scale(1); }
        }
        @keyframes gw-mail-fly-1 {
          0%, 60% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          68% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { transform: translate(108px, -84px) scale(0.8); opacity: 0; }
        }
        @keyframes gw-mail-fly-2 {
          0%, 66% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          74% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { transform: translate(-122px, -58px) scale(0.8); opacity: 0; }
        }
        @keyframes gw-mail-fly-3 {
          0%, 72% { transform: translate(0, 0) scale(0.4); opacity: 0; }
          80% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { transform: translate(86px, 92px) scale(0.8); opacity: 0; }
        }
        /* ── yaatraexpress ── */
        @keyframes gw-ridge-rise {
          from { transform: translateY(60px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes gw-cloud-drift {
          from { transform: translateX(-30px); }
          to { transform: translateX(30px); }
        }
        @keyframes gw-flag-pop {
          0%, 75% { opacity: 0; transform: scale(0) translateY(6px); }
          90% { opacity: 1; transform: scale(1.25) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        /* ── socialpilot ── */
        @keyframes gw-post-fly-1 {
          0%, 25% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          35% { opacity: 1; }
          70%, 100% { transform: translate(-128px, -66px) scale(0.9); opacity: 0; }
        }
        @keyframes gw-post-fly-2 {
          0%, 40% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          85%, 100% { transform: translate(132px, -52px) scale(0.9); opacity: 0; }
        }
        @keyframes gw-post-fly-3 {
          0%, 55% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          65% { opacity: 1; }
          100% { transform: translate(0, 110px) scale(0.9); opacity: 0; }
        }
        @keyframes gw-heart-rise {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(-90px) scale(1.1); opacity: 0; }
        }
        @keyframes gw-orbit {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ───────────────────────── Scenes ───────────────────────── */

function Scene({ project }: { project: Project }) {
  switch (project.id) {
    case "krishivision":
      return <KrishiScene />;
    case "leadstiq":
      return <LeadsScene />;
    case "cowrite":
      return <CowriteScene />;
    case "likhitpens":
      return <LikhitScene />;
    case "agenticbros":
      return <AgenticScene />;
    case "yaatraexpress":
      return <YaatraScene />;
    case "socialpilot":
      return <SocialScene />;
    default:
      return (
        <div className="flex h-full items-center justify-center">
          <span
            className="font-display text-[18vh] font-black"
            style={{ color: project.color, animation: "gw-pulse 1.4s ease-in-out infinite" }}
          >
            {project.name[0]}
          </span>
        </div>
      );
  }
}

const LEAF_PATH =
  "M50 2 C82 18 98 56 50 98 C2 56 18 18 50 2 Z";

/** KrishiVision — leaves drift down while a center leaf is scanned and treated. */
function KrishiScene() {
  const drifters = [
    { left: "12%", size: 26, delay: 0, dur: 3.2 },
    { left: "26%", size: 18, delay: 1.1, dur: 2.7 },
    { left: "64%", size: 22, delay: 0.5, dur: 3.0 },
    { left: "78%", size: 16, delay: 1.5, dur: 2.5 },
    { left: "88%", size: 24, delay: 0.2, dur: 3.4 },
    { left: "40%", size: 14, delay: 1.9, dur: 2.4 },
  ];
  return (
    <div className="absolute inset-0">
      {/* Drifting leaves */}
      {drifters.map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 100 100"
          className="absolute top-0"
          style={{
            left: d.left,
            width: d.size,
            height: d.size,
            animation: `gw-leaf-fall ${d.dur}s linear ${d.delay}s infinite`,
          }}
        >
          <path d={LEAF_PATH} fill="#10B981" opacity="0.55" />
        </svg>
      ))}

      {/* Center leaf under treatment */}
      <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2">
        {/* Rotating reticle */}
        <svg
          viewBox="0 0 220 220"
          className="absolute inset-0"
          style={{ animation: "gw-reticle-spin 7s linear infinite" }}
        >
          <circle
            cx="110"
            cy="110"
            r="102"
            fill="none"
            stroke="#10B981"
            strokeWidth="1.5"
            strokeDasharray="30 18"
            opacity="0.5"
          />
        </svg>

        <svg
          viewBox="0 0 100 100"
          className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2"
          style={{ animation: "gw-leaf-glow 2.7s ease-out forwards" }}
        >
          <path d={LEAF_PATH} fill="#0B3B2A" stroke="#10B981" strokeWidth="2" />
          <path d="M50 8 L50 92" stroke="#10B981" strokeWidth="1.6" opacity="0.7" />
          <path d="M50 30 L32 44 M50 30 L68 44 M50 52 L30 66 M50 52 L70 66" stroke="#10B981" strokeWidth="1.1" opacity="0.5" />
          {/* Blight spots — heal as the scan passes */}
          <circle cx="38" cy="36" r="5.5" style={{ animation: "gw-blight-heal 2.7s ease-out forwards" }} />
          <circle cx="60" cy="56" r="4.5" style={{ animation: "gw-blight-heal 2.7s ease-out 0.2s forwards" }} />
          <circle cx="46" cy="72" r="3.5" style={{ animation: "gw-blight-heal 2.7s ease-out 0.35s forwards" }} />
        </svg>

        {/* Scan beam */}
        <div
          className="absolute left-[6%] right-[6%] h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, #34D399, transparent)",
            boxShadow: "0 0 16px #34D399",
            animation: "gw-scan-beam 2.7s ease-in-out forwards",
          }}
        />

        {/* Treatment droplets */}
        {[38, 52, 66].map((left, i) => (
          <span
            key={i}
            className="absolute top-[12%] h-3 w-[5px] rounded-full"
            style={{
              left: `${left}%`,
              background: "#67E8F9",
              boxShadow: "0 0 8px #67E8F9",
              animation: `gw-droplet 0.9s ease-in ${1.2 + i * 0.22}s 2`,
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** LeadsTiq — live call waveform, then the lead card files itself under HOT. */
function LeadsScene() {
  const bars = Array.from({ length: 26 });
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {/* Waveform */}
      <div className="flex h-[90px] items-center gap-[5px]">
        {bars.map((_, i) => (
          <span
            key={i}
            className="w-[5px] rounded-full"
            style={{
              height: `${22 + Math.abs(Math.sin(i * 1.7)) * 64}px`,
              background: i % 3 === 0 ? "#EF4444" : "#F87171",
              opacity: 0.85,
              transformOrigin: "center",
              animation: `gw-wave ${0.7 + (i % 5) * 0.12}s ease-in-out ${i * 0.045}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Lead card that files itself */}
      <div
        className="absolute left-1/2 top-[34%] w-[150px] rounded-lg border border-white/15 bg-[#0f0f28] p-3 text-left"
        style={{ animation: "gw-card-file 2.7s cubic-bezier(0.16,1,0.3,1) forwards", boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}
      >
        <div className="font-mono-ui text-[9px] tracking-[0.2em] text-[#94A3B8]">LEAD #4821</div>
        <div className="mt-1 h-1.5 w-3/4 rounded bg-white/20" />
        <div className="mt-1 h-1.5 w-1/2 rounded bg-white/10" />
        <div className="mt-2 inline-block rounded-full border border-[#EF4444] px-2 py-[2px] font-mono-ui text-[9px] text-[#EF4444]">
          INTENT: HIGH
        </div>
      </div>

      {/* Pipeline slots */}
      <div className="mt-16 flex gap-3">
        {(["HOT", "WARM", "COLD"] as const).map((s, i) => (
          <div
            key={s}
            className="w-[92px] rounded-lg border px-3 py-2 text-center font-mono-ui text-[10px] tracking-[0.2em]"
            style={{
              borderColor: "rgba(255,255,255,0.12)",
              color: i === 0 ? "#EF4444" : i === 1 ? "#F59E0B" : "#64748B",
              animation: i === 0 ? "gw-slot-light 2.7s ease-out forwards" : undefined,
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Cowrite — two live cursors type a shared doc while a doodle draws itself. */
function CowriteScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[240px] w-[min(420px,84vw)] rounded-xl border border-white/12 bg-[#0c0c22] p-5" style={{ boxShadow: "0 18px 50px rgba(0,0,0,0.5)" }}>
        {/* Doc chrome */}
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#EF4444]/70" />
          <span className="h-2 w-2 rounded-full bg-[#F59E0B]/70" />
          <span className="h-2 w-2 rounded-full bg-[#10B981]/70" />
          <span className="ml-2 font-mono-ui text-[9px] tracking-[0.2em] text-[#475569]">shared-doc.md</span>
        </div>

        {/* Typed lines */}
        {[
          { top: "26%", width: "78%", color: "#A78BFA", delay: 0 },
          { top: "42%", width: "62%", color: "#A78BFA", delay: 0.5 },
          { top: "62%", width: "70%", color: "#67E8F9", delay: 0.9 },
          { top: "78%", width: "48%", color: "#67E8F9", delay: 1.4 },
        ].map((l, i) => (
          <div key={i} className="absolute left-[8%] h-[7px] overflow-hidden rounded" style={{ top: l.top, width: l.width }}>
            <div
              className="h-full rounded"
              style={{
                background: `linear-gradient(90deg, ${l.color}55, ${l.color}22)`,
                animation: `gw-typeline 1s cubic-bezier(0.4,0,0.2,1) ${l.delay}s both`,
              }}
            />
          </div>
        ))}

        {/* Cursor A (purple) */}
        <div className="absolute" style={{ animation: "gw-caret-a 2.6s ease-in-out infinite" }}>
          <span className="block h-4 w-[2.5px] rounded bg-[#8B5CF6]" style={{ boxShadow: "0 0 8px #8B5CF6" }} />
          <span className="mt-1 block rounded bg-[#8B5CF6] px-1.5 py-[1px] font-mono-ui text-[8px] text-white">saumok</span>
        </div>
        {/* Cursor B (cyan) */}
        <div className="absolute" style={{ animation: "gw-caret-b 2.6s ease-in-out infinite" }}>
          <span className="block h-4 w-[2.5px] rounded bg-[#06B6D4]" style={{ boxShadow: "0 0 8px #06B6D4" }} />
          <span className="mt-1 block rounded bg-[#06B6D4] px-1.5 py-[1px] font-mono-ui text-[8px] text-black">guest</span>
        </div>

        {/* Doodle squiggle */}
        <svg viewBox="0 0 120 40" className="absolute bottom-3 right-4 h-[40px] w-[120px]">
          <path
            d="M6 30 C 22 6, 38 6, 50 24 S 80 38, 92 18 S 110 8, 114 14"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset="220"
            style={{ animation: "gw-draw 1.6s ease-out 0.8s forwards" }}
          />
        </svg>
      </div>
    </div>
  );
}

/** Likhit Pens — a gold nib glides along a signature stroke as it draws. */
function LikhitScene() {
  const SIG = "M20 110 C 60 30, 110 30, 140 95 S 200 150, 250 80 S 320 40, 360 100 S 420 130, 460 70";
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[200px] w-[min(500px,88vw)]">
        <svg viewBox="0 0 480 160" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          {/* Faint guide */}
          <path d={SIG} fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.12" />
          {/* Drawn gold stroke */}
          <path
            d={SIG}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="760"
            strokeDashoffset="760"
            style={{
              animation: "gw-draw 2.3s cubic-bezier(0.4,0,0.2,1) 0.15s forwards",
              filter: "drop-shadow(0 0 6px rgba(245,158,11,0.7))",
            }}
          />
        </svg>

        {/* Nib gliding along the same path */}
        <div
          className="absolute left-0 top-0"
          style={{
            offsetPath: `path("${SIG}")`,
            offsetRotate: "auto 45deg",
            animation: "gw-nib-glide 2.3s cubic-bezier(0.4,0,0.2,1) 0.15s forwards",
          }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26" style={{ transform: "translate(-6px, -20px)" }}>
            <path d="M12 2 L19 16 L12 22 L5 16 Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.2" />
            <circle cx="12" cy="15" r="1.6" fill="#0a0a1a" />
            <path d="M12 16.5 L12 22" stroke="#0a0a1a" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Gold sparkles */}
        {[
          { left: "18%", top: "30%", d: 0.6 },
          { left: "46%", top: "62%", d: 1.2 },
          { left: "72%", top: "34%", d: 1.8 },
          { left: "88%", top: "52%", d: 2.2 },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rotate-45 bg-[#FDE68A]"
            style={{
              left: s.left,
              top: s.top,
              boxShadow: "0 0 10px #F59E0B",
              animation: `gw-sparkle 0.9s ease-in-out ${s.d}s 2`,
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Agentic Bros — radar sweep acquires targets, then emails launch at them. */
function AgenticScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[260px] w-[260px]">
        {/* Radar rings */}
        {[100, 72, 44].map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-[#94A3B8]/25"
            style={{
              left: `${50 - r / 2}%`,
              top: `${50 - r / 2}%`,
              width: `${r}%`,
              height: `${r}%`,
            }}
          />
        ))}
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#94A3B8]/15" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-[#94A3B8]/15" />

        {/* Sweep */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(100,116,139,0.55) 0deg, rgba(100,116,139,0.12) 50deg, transparent 90deg)",
            animation: "gw-radar-sweep 1.8s linear infinite",
            maskImage: "radial-gradient(circle, black 0 50%, transparent 50%)",
            WebkitMaskImage: "radial-gradient(circle, black 0 50%, transparent 50%)",
          }}
        />

        {/* Blips */}
        {[
          { left: "72%", top: "26%", d: 0.3 },
          { left: "24%", top: "36%", d: 0.8 },
          { left: "64%", top: "70%", d: 1.3 },
          { left: "38%", top: "62%", d: 1.7 },
        ].map((b, i) => (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 rounded-full bg-[#67E8F9]"
            style={{
              left: b.left,
              top: b.top,
              boxShadow: "0 0 12px #67E8F9",
              animation: `gw-blip 2.7s ease-out ${b.d}s forwards`,
              opacity: 0,
            }}
          />
        ))}

        {/* Center bot core */}
        <div
          className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#64748B]"
          style={{ boxShadow: "0 0 18px #94A3B8", animation: "gw-pulse 1.2s ease-in-out infinite" }}
        />

        {/* Outbound mail */}
        {["gw-mail-fly-1", "gw-mail-fly-2", "gw-mail-fly-3"].map((anim, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="absolute left-1/2 top-1/2 -ml-2.5 -mt-2.5"
            style={{ animation: `${anim} 2.7s cubic-bezier(0.4,0,0.2,1) forwards`, opacity: 0 }}
          >
            <rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="#CBD5E1" strokeWidth="1.6" />
            <path d="M2 7 L12 14 L22 7" fill="none" stroke="#CBD5E1" strokeWidth="1.6" />
          </svg>
        ))}
      </div>
    </div>
  );
}

/** YaatraExpress — mountain ridges rise, the trail draws to a summit flag. */
function YaatraScene() {
  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
      {/* Clouds */}
      {[
        { left: "16%", top: "16%", w: 90, d: 0 },
        { left: "62%", top: "9%", w: 120, d: 1 },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/10 blur-[2px]"
          style={{
            left: c.left,
            top: c.top,
            width: c.w,
            height: c.w * 0.3,
            animation: `gw-cloud-drift 4s ease-in-out ${c.d}s infinite alternate`,
          }}
        />
      ))}

      <svg viewBox="0 0 480 240" className="h-full w-full max-w-[560px]" preserveAspectRatio="xMidYMax meet">
        {/* Back ridge */}
        <path
          d="M0 240 L70 140 L140 200 L220 90 L300 180 L380 120 L480 220 L480 240 Z"
          fill="#0c1c33"
          style={{ animation: "gw-ridge-rise 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}
        />
        {/* Mid ridge */}
        <path
          d="M0 240 L90 170 L170 220 L260 130 L350 210 L430 160 L480 200 L480 240 Z"
          fill="#102a4d"
          style={{ animation: "gw-ridge-rise 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
        />
        {/* Front ridge */}
        <path
          d="M0 240 L60 210 L150 165 L240 225 L330 175 L420 230 L480 215 L480 240 Z"
          fill="#163a6b"
          style={{ animation: "gw-ridge-rise 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both" }}
        />
        {/* Trail to summit */}
        <path
          d="M40 232 C 120 220, 150 200, 196 158 S 230 110, 224 96"
          fill="none"
          stroke="#67E8F9"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 7"
          pathLength="300"
          style={{
            strokeDashoffset: 300,
            animation: "gw-draw 1.6s ease-out 0.9s forwards",
            filter: "drop-shadow(0 0 5px rgba(103,232,249,0.8))",
          }}
        />
        {/* Summit flag */}
        <g style={{ animation: "gw-flag-pop 2.7s ease-out forwards", transformOrigin: "224px 96px" }}>
          <line x1="224" y1="96" x2="224" y2="74" stroke="#F8FAFC" strokeWidth="2" />
          <path d="M224 74 L244 80 L224 87 Z" fill="#0EA5E9" />
        </g>
        {/* Snow caps */}
        <path d="M212 104 L220 90 L228 104 Z" fill="rgba(248,250,252,0.65)" style={{ animation: "gw-fade-in 0.6s ease-out 1s both" }} />
      </svg>
    </div>
  );
}

/** SocialPilot — the bot core fires posts at platform nodes; engagement rises. */
function SocialScene() {
  const nodes = [
    { label: "X", x: "-128px", y: "-66px" },
    { label: "IG", x: "132px", y: "-52px" },
    { label: "IN", x: "0px", y: "110px" },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[260px] w-[300px]">
        {/* Bot core + orbit */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#F97316]/60 bg-[#F97316]/15"
            style={{ boxShadow: "0 0 30px rgba(249,115,22,0.4)", animation: "gw-pulse 1.4s ease-in-out infinite" }}
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#FB923C" strokeWidth="1.8">
              <rect x="5" y="7" width="14" height="11" rx="2.5" />
              <circle cx="9.5" cy="12.5" r="1.3" fill="#FB923C" stroke="none" />
              <circle cx="14.5" cy="12.5" r="1.3" fill="#FB923C" stroke="none" />
              <path d="M12 7 V4 M9 4 h6" />
            </svg>
          </div>
          <div
            className="absolute -inset-4 rounded-full border border-dashed border-[#F97316]/35"
            style={{ animation: "gw-orbit 6s linear infinite" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#FB923C]" style={{ boxShadow: "0 0 8px #FB923C" }} />
          </div>
        </div>

        {/* Platform nodes */}
        {nodes.map((n, i) => (
          <div
            key={n.label}
            className="absolute left-1/2 top-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#0f0f28] font-mono-ui text-[11px] font-bold text-[#CBD5E1]"
            style={{
              transform: `translate(calc(-50% + ${n.x}), calc(-50% + ${n.y}))`,
              animation: `gw-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.2 + i * 0.15}s both`,
              boxShadow: "0 0 14px rgba(255,255,255,0.08)",
            }}
          >
            {n.label}
          </div>
        ))}

        {/* Flying post cards */}
        {["gw-post-fly-1", "gw-post-fly-2", "gw-post-fly-3"].map((anim, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -ml-6 -mt-4 w-12 rounded border border-[#FB923C]/60 bg-[#1a1030] p-1"
            style={{ animation: `${anim} 2.7s cubic-bezier(0.4,0,0.2,1) forwards`, opacity: 0 }}
          >
            <div className="h-1 w-3/4 rounded bg-[#FB923C]/70" />
            <div className="mt-0.5 h-1 w-1/2 rounded bg-white/25" />
          </div>
        ))}

        {/* Rising hearts */}
        {[
          { left: "30%", d: 1.6 },
          { left: "58%", d: 2.0 },
          { left: "72%", d: 1.3 },
        ].map((h, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            width="14"
            height="14"
            className="absolute bottom-[18%]"
            style={{ left: h.left, animation: `gw-heart-rise 1.1s ease-out ${h.d}s 1`, opacity: 0 }}
          >
            <path
              d="M12 21s-7.5-4.8-10-9.3C0.5 8 2.5 4.5 6 4.5c2.2 0 3.6 1.2 6 3.8 2.4-2.6 3.8-3.8 6-3.8 3.5 0 5.5 3.5 4 7.2C19.5 16.2 12 21 12 21z"
              fill="#FB7185"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
