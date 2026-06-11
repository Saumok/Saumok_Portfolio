"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, Unlock, ChevronRight, Bot, SkipForward } from "lucide-react";
import { TRIVIA, CODE_PUZZLE, ARIA_RESPONSES, ARIA_DEFAULT } from "@/lib/data";
import { useInView } from "@/lib/hooks";

type Stage = 0 | 1 | 2 | 3; // 0..2 active stage index, 3 = complete

/**
 * FR-008: ACCESS TERMINAL — 3-stage gamified lock before contact.
 * Stage 1 trivia, Stage 2 code puzzle, Stage 3 ARIA chatbot. Skip link included.
 */
export default function AccessChallenge({ onUnlock }: { onUnlock: () => void }) {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const [stage, setStage] = useState<Stage>(0);
  const [celebrating, setCelebrating] = useState(false);

  const complete = () => {
    setCelebrating(true);
    setTimeout(() => {
      setStage(3);
      onUnlock();
    }, 1800);
  };

  return (
    <section id="challenge" ref={ref} className="relative overflow-hidden py-28">
      <div className="relative mx-auto max-w-[860px] px-6">
        <p
          className={`section-eyebrow transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          CHAPTER 06 — SECURITY CHECKPOINT
        </p>
        <h2
          className={`section-title mt-3 flex items-center gap-4 transition-all delay-100 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {stage === 3 ? (
            <Unlock className="text-[#10B981]" size={28} />
          ) : (
            <Lock className="text-[#EF4444]" size={28} />
          )}
          Access Terminal
        </h2>
        <p
          className={`mt-4 max-w-[560px] text-[14px] leading-relaxed text-[#94A3B8] transition-all delay-200 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          Direct contact is encrypted behind a 3-stage clearance protocol. Prove
          you were paying attention — or take the recruiters&apos; bypass.
        </p>

        {/* Progress indicator (FR-008.6) */}
        <div
          className={`mt-8 flex items-center gap-3 transition-all delay-300 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {["TRIVIA", "DEBUG", "ARIA"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono-ui text-[11px] transition-all duration-500 ${
                  stage > i
                    ? "border-[#10B981]/50 text-[#10B981]"
                    : stage === i
                    ? "border-[#06B6D4]/60 text-[#67E8F9]"
                    : "border-white/10 text-[#475569]"
                }`}
                style={{
                  boxShadow:
                    stage === i ? "0 0 16px rgba(6,182,212,0.25)" : "none",
                }}
              >
                <span>
                  {stage > i ? "✓" : `${i + 1}`}
                </span>
                STAGE {i + 1}/3 · {label}
              </div>
              {i < 2 && <ChevronRight size={14} className="text-[#334155]" />}
            </div>
          ))}
        </div>

        {/* Stage container */}
        <div
          className={`glass-card relative mt-8 overflow-hidden transition-all delay-400 duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {celebrating && <Confetti />}
          {celebrating ? (
            <div className="flex h-[380px] flex-col items-center justify-center gap-4">
              <div
                className="glitch-wrap font-display text-3xl font-black tracking-[0.2em] text-[#10B981]"
                style={{ textShadow: "0 0 40px rgba(16,185,129,0.6)" }}
              >
                ACCESS GRANTED
              </div>
              <div className="font-mono-ui text-[12px] tracking-[0.3em] text-[#475569]">
                DECRYPTING CONTACT CHANNELS ...
              </div>
            </div>
          ) : stage === 0 ? (
            <TriviaStage onPass={() => setStage(1)} />
          ) : stage === 1 ? (
            <CodePuzzleStage onPass={() => setStage(2)} />
          ) : stage === 2 ? (
            <AriaStage onPass={complete} />
          ) : (
            <div className="flex h-[200px] flex-col items-center justify-center gap-3">
              <Unlock size={28} className="text-[#10B981]" />
              <div className="font-mono-ui text-[13px] text-[#10B981]">
                CLEARANCE LEVEL: ARCHITECT — contact channels unlocked below.
              </div>
            </div>
          )}
        </div>

        {/* Skip (FR-008.7) */}
        {stage < 3 && !celebrating && (
          <button
            onClick={complete}
            className="mt-4 flex cursor-pointer items-center gap-2 font-mono-ui text-[11px] text-[#475569] transition-colors hover:text-[#94A3B8]"
          >
            <SkipForward size={12} />
            recruiter in a hurry? skip the challenge — no penalty
          </button>
        )}
      </div>
    </section>
  );
}

/* ── Stage 1: Trivia ── */
function TriviaStage({ onPass }: { onPass: () => void }) {
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const q = TRIVIA[qIndex];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.correctIndex) {
      setTimeout(() => {
        setPicked(null);
        if (qIndex === TRIVIA.length - 1) onPass();
        else setQIndex(qIndex + 1);
      }, 750);
    } else {
      setWrong(true);
      setTimeout(() => {
        setPicked(null);
        setWrong(false);
      }, 900);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between font-mono-ui text-[11px] text-[#475569]">
        <span>INTEL VERIFICATION · QUESTION {qIndex + 1}/{TRIVIA.length}</span>
        <span className="flex gap-1">
          {TRIVIA.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${
                i < qIndex ? "bg-[#10B981]" : i === qIndex ? "bg-[#06B6D4]" : "bg-white/10"
              }`}
            />
          ))}
        </span>
      </div>
      <h3 className="mt-5 text-[16px] font-medium leading-relaxed text-white">
        {q.question}
      </h3>
      <div className="mt-6 grid gap-3">
        {q.options.map((opt, i) => {
          const state =
            picked === null
              ? "idle"
              : i === q.correctIndex && picked === i
              ? "correct"
              : picked === i
              ? "wrong"
              : "idle";
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              className={`cursor-pointer rounded-lg border px-5 py-3.5 text-left text-[14px] transition-all duration-200 ${
                state === "correct"
                  ? "border-[#10B981] bg-[#10B981]/10 text-[#10B981]"
                  : state === "wrong"
                  ? "border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444]"
                  : "border-white/10 text-[#CBD5E1] hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/5"
              }`}
              style={
                state === "wrong" ? { animation: "shake 0.4s ease-in-out" } : undefined
              }
            >
              <span className="mr-3 font-mono-ui text-[12px] text-[#475569]">
                [{String.fromCharCode(65 + i)}]
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {wrong && (
        <p className="mt-4 font-mono-ui text-[12px] text-[#EF4444]">
          ✗ INCORRECT — the answer is in the project vault. Try again.
        </p>
      )}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

/* ── Stage 2: Code puzzle — click the two buggy lines ── */
function CodePuzzleStage({ onPass }: { onPass: () => void }) {
  const lines = CODE_PUZZLE.broken.split("\n");
  const [found, setFound] = useState<number[]>([]);
  const [misses, setMisses] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const clickLine = (i: number) => {
    if (found.includes(i)) return;
    if (CODE_PUZZLE.bugLines.includes(i)) {
      const next = [...found, i];
      setFound(next);
      if (next.length === CODE_PUZZLE.bugLines.length) {
        setTimeout(onPass, 1100);
      }
    } else {
      setMisses((m) => m + 1);
      if (misses >= 2) setShowHint(true);
    }
  };

  const solved = found.length === CODE_PUZZLE.bugLines.length;

  return (
    <div className="p-8">
      <div className="font-mono-ui text-[11px] text-[#475569]">
        DEBUG PROTOCOL · This function shipped with {CODE_PUZZLE.bugLines.length} bugs.
        Click the {CODE_PUZZLE.bugLines.length} faulty lines. ({found.length}/
        {CODE_PUZZLE.bugLines.length} found)
      </div>

      <div
        className="mt-5 overflow-x-auto rounded-lg border border-white/10 font-mono-ui text-[12.5px] leading-[1.7]"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
          <span className="ml-3 text-[11px] text-[#475569]">fetchLeadScore.js — 2 problems</span>
        </div>
        <div className="py-3">
          {lines.map((line, i) => (
            <button
              key={i}
              onClick={() => clickLine(i)}
              className={`block w-full cursor-pointer px-4 text-left transition-colors duration-150 ${
                found.includes(i)
                  ? "bg-[#10B981]/15"
                  : "hover:bg-white/5"
              }`}
            >
              <span className="mr-4 inline-block w-6 select-none text-right text-[#334155]">
                {i + 1}
              </span>
              <span
                className={
                  found.includes(i)
                    ? "text-[#10B981]"
                    : line.trimStart().startsWith("//")
                    ? "text-[#475569]"
                    : "text-[#D1D5DB]"
                }
              >
                {line || " "}
              </span>
              {found.includes(i) && (
                <span className="ml-3 text-[10px] text-[#10B981]">✓ BUG CONFIRMED</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {showHint && !solved && (
        <p className="mt-4 font-mono-ui text-[12px] text-[#F59E0B]">
          HINT: trace what the function returns when response is NOT ok... and when it throws.
        </p>
      )}
      {solved && (
        <p className="mt-4 font-mono-ui text-[12.5px] leading-relaxed text-[#10B981]">
          ✓ BOTH BUGS NEUTRALIZED. {CODE_PUZZLE.explanation}
        </p>
      )}
    </div>
  );
}

/* ── Stage 3: ARIA chatbot ── */
function AriaStage({ onPass }: { onPass: () => void }) {
  const [messages, setMessages] = useState<{ from: "aria" | "user"; text: string }[]>([
    {
      from: "aria",
      text: "Hello, recruiter. I'm ARIA — Saumok's AI assistant. Ask me anything about his skills, projects, or availability. Ask 2 questions and I'll grant you clearance.",
    },
  ]);
  const [input, setInput] = useState("");
  const [asked, setAsked] = useState(0);
  const [granted, setGranted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [messages]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || granted) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text }]);

    const lower = text.toLowerCase();
    const match = ARIA_RESPONSES.find((r) =>
      r.keywords.some((k) => lower.includes(k))
    );
    const reply = match?.response ?? ARIA_DEFAULT;
    const newAsked = asked + 1;

    setTimeout(() => {
      setMessages((m) => [...m, { from: "aria", text: reply }]);
      setAsked(newAsked);
      if (newAsked >= 2) {
        setGranted(true);
        setTimeout(() => {
          setMessages((m) => [
            ...m,
            {
              from: "aria",
              text: "Verification complete. You ask good questions — clearance granted. Opening secure contact channel...",
            },
          ]);
          setTimeout(onPass, 1600);
        }, 800);
      }
    }, 600 + Math.random() * 500);
  };

  return (
    <div className="flex h-[440px] flex-col p-6">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono-ui text-[11px] text-[#475569]">
        <Bot size={14} className="text-[#A78BFA]" />
        ARIA v2.6 · NEURAL INTERFACE ACTIVE · {Math.min(asked, 2)}/2 QUERIES
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto py-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                m.from === "user"
                  ? "bg-[#7C3AED]/20 text-[#E9D5FF]"
                  : "border border-white/10 bg-white/5 text-[#CBD5E1]"
              }`}
              style={{ animation: "msg-in 0.3s ease-out" }}
            >
              {m.from === "aria" && (
                <span className="mb-1 block font-mono-ui text-[10px] tracking-[0.2em] text-[#A78BFA]">
                  ARIA
                </span>
              )}
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input"
          placeholder='try: "what are his strongest skills?"'
          aria-label="Ask ARIA a question"
          disabled={granted}
        />
        <button type="submit" className="neon-btn !px-5 !py-2 !text-xs" disabled={granted}>
          SEND
        </button>
      </form>
      <style jsx>{`
        @keyframes msg-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ── Confetti burst (FR-008.5) ── */
const CONFETTI_COLORS = ["#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#A78BFA", "#67E8F9"];

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.2 + Math.random() * 1.2,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      w: 4 + Math.random() * 6,
      tall: Math.random() > 0.5,
      rot: Math.random() * 360,
    }))
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-[-12px] block"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.w * (p.tall ? 2.4 : 1),
            background: p.color,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          to {
            transform: translateY(440px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
