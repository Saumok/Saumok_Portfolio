"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Mic, MessageSquare, Kanban, TrendingUp, CreditCard, Leaf, ShieldCheck,
  Languages, History, Store, Users, UserCheck, Pencil, Save, Sparkles, Box,
  PenTool, ShoppingCart, BookOpen, Radar, Cloud, Crosshair, Mail, Film,
  Mountain, Zap, Images, LayoutGrid, Send, Wand2, BarChart3, Bot,
  TerminalSquare, X, ExternalLink, FileText,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  Mic, MessageSquare, Kanban, TrendingUp, CreditCard, Leaf, ShieldCheck,
  Languages, History, Store, Users, UserCheck, Pencil, Save, Sparkles, Box,
  PenTool, ShoppingCart, BookOpen, Radar, Cloud, Crosshair, Mail, Film,
  Mountain, Zap, Images, LayoutGrid, Send, Wand2, BarChart3, Bot,
};

interface OSWindow {
  id: string;
  title: string;
  kind: "feature" | "terminal" | "readme";
  featureIndex?: number;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
}

let zCounter = 10;

/**
 * FR-006.6–006.10: The Hacker OS. Project-colored desktop, app icons per feature,
 * draggable windows, working terminal (`./launch_demo` opens live URL), taskbar, ESC exits.
 */
export default function HackerOS({
  project,
  onExit,
}: {
  project: Project;
  onExit: () => void;
}) {
  const [windows, setWindows] = useState<OSWindow[]>([]);
  const [clock, setClock] = useState("");
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const i = setInterval(tick, 10_000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  const openWindow = useCallback(
    (kind: OSWindow["kind"], title: string, featureIndex?: number) => {
      const id = `${kind}-${featureIndex ?? 0}`;
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, z: ++zCounter } : w
          );
        }
        const offset = prev.length * 28;
        // Clamp so windows never spawn off-screen on small viewports
        return [
          ...prev,
          {
            id,
            title,
            kind,
            featureIndex,
            x: Math.max(12, Math.min(80 + offset, window.innerWidth - 640)),
            y: Math.max(52, Math.min(70 + offset, window.innerHeight - 480)),
            z: ++zCounter,
            minimized: false,
          },
        ];
      });
    },
    []
  );

  const closeWindow = (id: string) =>
    setWindows((prev) => prev.filter((w) => w.id !== id));
  const minimizeWindow = (id: string) =>
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  const focusWindow = (id: string) =>
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, z: ++zCounter, minimized: false } : w
      )
    );

  return (
    <div
      className="fixed inset-0 z-[88] overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — project operating system`}
      style={{
        background: `
          radial-gradient(ellipse at 20% 10%, ${project.color}14 0%, transparent 50%),
          radial-gradient(ellipse at 80% 90%, ${project.color}0d 0%, transparent 50%),
          linear-gradient(135deg, #050510 0%, #0A0A1E 100%)`,
        animation: booting ? undefined : "os-in 0.5s cubic-bezier(0,0,0.2,1)",
      }}
    >
      {/* Boot flash */}
      {booting && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-white"
          style={{ animation: "os-flash 0.7s ease-out forwards" }}
        >
          <span className="font-mono-ui text-sm tracking-[0.4em] text-black/60">
            ENTERING {project.name.toUpperCase()}_OS
          </span>
        </div>
      )}

      {/* Desktop watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="font-display select-none text-[28vw] font-black leading-none opacity-[0.04]"
          style={{ color: project.color }}
        >
          {project.name[0]}
        </span>
      </div>

      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top status bar */}
      <div
        className="relative z-10 flex h-10 items-center justify-between border-b px-5 font-mono-ui text-[11px]"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(5,5,16,0.8)",
        }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: project.color }}>●</span>
          <span className="tracking-[0.2em] text-white">
            {project.name.toUpperCase()}_OS
          </span>
          <span className="hidden text-[#475569] sm:inline">
            {"// "}
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="rounded-full border px-2.5 py-0.5 text-[10px]"
            style={{ borderColor: project.color + "66", color: project.color }}
          >
            {project.status}
          </span>
          <button
            onClick={onExit}
            className="flex cursor-pointer items-center gap-1.5 text-[#94A3B8] transition-colors hover:text-white"
            aria-label="Exit OS and return to hallway"
          >
            <X size={14} />
            EXIT [ESC]
          </button>
        </div>
      </div>

      {/* Desktop icons */}
      <div className="relative z-10 flex flex-col flex-wrap content-start gap-2 overflow-x-auto p-5" style={{ height: "calc(100% - 88px)" }}>
        {project.features.map((f, i) => {
          const Icon = ICONS[f.icon] ?? Box;
          return (
            <button
              key={i}
              onDoubleClick={() => openWindow("feature", f.title, i)}
              onClick={(e) => {
                // single click also opens after slight delay UX on touch; dblclick standard on desktop
                if (e.detail === 1 && "ontouchstart" in window)
                  openWindow("feature", f.title, i);
              }}
              className="group flex w-24 cursor-pointer flex-col items-center gap-2 rounded-lg p-3 transition-colors duration-200 hover:bg-white/5"
              aria-label={`Open ${f.title}`}
              title="Double-click to open"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-200 group-hover:scale-105"
                style={{
                  background: project.color + "14",
                  borderColor: project.color + "44",
                  boxShadow: `0 0 18px ${project.color}22`,
                }}
              >
                <Icon size={24} style={{ color: project.color }} />
              </span>
              <span className="text-center text-[11px] font-medium leading-tight text-[#CBD5E1]">
                {f.title.length > 26 ? f.title.slice(0, 24) + "…" : f.title}
              </span>
            </button>
          );
        })}

        {/* System icons */}
        <button
          onDoubleClick={() => openWindow("terminal", "TERMINAL")}
          onClick={(e) => {
            if (e.detail === 1 && "ontouchstart" in window)
              openWindow("terminal", "TERMINAL");
          }}
          className="group flex w-24 cursor-pointer flex-col items-center gap-2 rounded-lg p-3 transition-colors duration-200 hover:bg-white/5"
          aria-label="Open terminal"
          title="Double-click to open"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#06B6D4]/40 bg-[#06B6D4]/10 transition-all duration-200 group-hover:scale-105" style={{ boxShadow: "0 0 18px rgba(6,182,212,0.15)" }}>
            <TerminalSquare size={24} className="text-[#06B6D4]" />
          </span>
          <span className="text-[11px] font-medium text-[#CBD5E1]">Terminal</span>
        </button>

        <button
          onDoubleClick={() => openWindow("readme", "README.md")}
          onClick={(e) => {
            if (e.detail === 1 && "ontouchstart" in window)
              openWindow("readme", "README.md");
          }}
          className="group flex w-24 cursor-pointer flex-col items-center gap-2 rounded-lg p-3 transition-colors duration-200 hover:bg-white/5"
          aria-label="Open readme"
          title="Double-click to open"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-all duration-200 group-hover:scale-105">
            <FileText size={24} className="text-[#94A3B8]" />
          </span>
          <span className="text-[11px] font-medium text-[#CBD5E1]">README.md</span>
        </button>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-24 cursor-pointer flex-col items-center gap-2 rounded-lg p-3 transition-colors duration-200 hover:bg-white/5"
          aria-label={`${project.name} GitHub repository`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-all duration-200 group-hover:scale-105">
            <GithubIcon size={24} className="text-[#94A3B8]" />
          </span>
          <span className="text-[11px] font-medium text-[#CBD5E1]">GitHub</span>
        </a>
      </div>

      {/* Windows */}
      {windows
        .filter((w) => !w.minimized)
        .map((w) => (
          <OSWindowFrame
            key={w.id}
            win={w}
            project={project}
            onClose={() => closeWindow(w.id)}
            onMinimize={() => minimizeWindow(w.id)}
            onFocus={() => focusWindow(w.id)}
            onExit={onExit}
          />
        ))}

      {/* Taskbar (FR-006.6) */}
      <div
        className="absolute bottom-0 left-0 right-0 z-40 flex h-12 items-center gap-2 border-t px-4"
        style={{
          background: "rgba(5,5,16,0.95)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <span
          className="font-display mr-2 text-[10px] font-bold tracking-[0.2em]"
          style={{ color: project.color }}
        >
          {project.name.toUpperCase()}
        </span>
        <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
          {windows.map((w) => (
            <button
              key={w.id}
              onClick={() => focusWindow(w.id)}
              className={`cursor-pointer whitespace-nowrap rounded border px-3 py-1 font-mono-ui text-[10px] transition-colors duration-200 ${
                w.minimized
                  ? "border-white/10 text-[#475569]"
                  : "border-white/20 text-[#CBD5E1]"
              } hover:text-white`}
            >
              {w.title}
            </button>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-1.5 font-mono-ui text-[10px] text-[#10B981] transition-colors hover:text-[#34D399]"
          >
            <ExternalLink size={11} />
            LIVE DEMO
          </a>
        )}
        <span className="ml-3 font-mono-ui text-[11px] text-[#475569]">{clock}</span>
      </div>

      <style jsx>{`
        @keyframes os-flash {
          0% {
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
        @keyframes os-in {
          from {
            opacity: 0.6;
            transform: scale(1.02);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

/* ── Draggable window frame ── */
function OSWindowFrame({
  win,
  project,
  onClose,
  onMinimize,
  onFocus,
  onExit,
}: {
  win: OSWindow;
  project: Project;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onExit: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ dx: number; dy: number; active: boolean }>({
    dx: 0,
    dy: 0,
    active: false,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    onFocus();
    const el = ref.current;
    if (!el) return;
    drag.current = {
      dx: e.clientX - el.offsetLeft,
      dy: e.clientY - el.offsetTop,
      active: true,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active || !ref.current) return;
    const el = ref.current;
    el.style.left = `${Math.max(0, Math.min(e.clientX - drag.current.dx, window.innerWidth - 200))}px`;
    el.style.top = `${Math.max(40, Math.min(e.clientY - drag.current.dy, window.innerHeight - 120))}px`;
  };
  const onPointerUp = () => {
    drag.current.active = false;
  };

  const feature =
    win.kind === "feature" && win.featureIndex !== undefined
      ? project.features[win.featureIndex]
      : null;

  return (
    <div
      ref={ref}
      className="absolute flex w-[min(620px,92vw)] flex-col overflow-hidden rounded-xl border"
      style={{
        left: win.x,
        top: win.y,
        zIndex: win.z,
        minHeight: win.kind === "terminal" ? 380 : 300,
        maxHeight: "72vh",
        borderColor: "rgba(255,255,255,0.1)",
        background: "rgba(8,8,24,0.92)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
        animation: "win-in 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onPointerDown={() => onFocus()}
    >
      {/* Title bar */}
      <div
        className="flex h-10 shrink-0 cursor-grab select-none items-center gap-2 border-b px-4 active:cursor-grabbing"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(5,5,16,0.6)" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <button
          onClick={onClose}
          className="h-3 w-3 cursor-pointer rounded-full bg-[#EF4444] transition-opacity hover:opacity-70"
          aria-label="Close window"
        />
        <button
          onClick={onMinimize}
          className="h-3 w-3 cursor-pointer rounded-full bg-[#F59E0B] transition-opacity hover:opacity-70"
          aria-label="Minimize window"
        />
        <span className="h-3 w-3 rounded-full bg-[#10B981]/40" />
        <span className="ml-3 font-mono-ui text-[11px] tracking-wider text-[#94A3B8]">
          {win.title}
        </span>
      </div>

      {/* Body */}
      <div className="overflow-y-auto">
        {feature && (
          <div className="p-6">
            <h4 className="font-display text-[15px] font-bold tracking-[0.1em] text-white">
              {feature.title}
            </h4>
            <div className="mt-4 space-y-3">
              {feature.points.map((pt, i) => (
                <p key={i} className="text-[13.5px] leading-[1.7] text-[#CBD5E1]">
                  <span className="mr-2" style={{ color: project.color }}>
                    ▸
                  </span>
                  {pt}
                </p>
              ))}
            </div>
          </div>
        )}
        {win.kind === "readme" && (
          <div className="p-6">
            <h4 className="font-display text-[15px] font-bold tracking-[0.1em] text-white">
              {project.name}
            </h4>
            <p className="mt-1 font-mono-ui text-[11px]" style={{ color: project.color }}>
              {project.category} · {project.status}
            </p>
            <p className="mt-4 text-[13.5px] leading-[1.75] text-[#CBD5E1]">
              {project.oneLiner}
            </p>
            <div className="mt-5">
              <div className="font-mono-ui text-[10px] tracking-[0.25em] text-[#475569]">
                TECH STACK
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span key={t} className="tech-badge">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        {win.kind === "terminal" && (
          <OSTerminal project={project} onExit={onExit} />
        )}
      </div>

      <style jsx>{`
        @keyframes win-in {
          from {
            transform: scale(0.92) translateY(12px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

/* ── Terminal (FR-006.8) ── */
function OSTerminal({ project, onExit }: { project: Project; onExit: () => void }) {
  const [history, setHistory] = useState<string[]>([
    `${project.name}_OS v1.0 — secure shell`,
    `type 'help' for available commands`,
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [history]);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    const out: string[] = [`$ ${cmd}`];

    switch (cmd.toLowerCase()) {
      case "help":
        out.push(
          "  ./launch_demo   — open the live project",
          "  stack           — list tech stack",
          "  features        — list feature modules",
          "  github          — open repository",
          "  clear           — clear terminal",
          "  exit            — leave this OS"
        );
        break;
      case "./launch_demo":
      case "launch_demo":
        if (project.liveUrl) {
          out.push(`LAUNCHING ${project.liveUrl} ...`);
          window.open(project.liveUrl, "_blank", "noopener,noreferrer");
        } else {
          out.push(
            "NO PUBLIC URL — this system runs locally / was delivered to a client.",
            `Contact saumokkundu14814@gmail.com for a walkthrough.`
          );
        }
        break;
      case "stack":
        out.push(...project.techStack.map((t) => `  - ${t}`));
        break;
      case "features":
        out.push(...project.features.map((f, i) => `  [${i + 1}] ${f.title}`));
        break;
      case "github":
        out.push(`OPENING ${project.github} ...`);
        window.open(project.github, "_blank", "noopener,noreferrer");
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        onExit();
        return;
      case "sudo rm -rf /":
        out.push("nice try. ARIA has revoked your sudo privileges.");
        break;
      default:
        out.push(`command not found: ${cmd} — try 'help'`);
    }
    setHistory((h) => [...h, ...out]);
    setInput("");
  };

  return (
    <div
      className="flex h-[330px] flex-col p-4 font-mono-ui text-[12.5px]"
      style={{ background: "rgba(0,0,0,0.55)" }}
    >
      <div className="flex-1 space-y-1 overflow-y-auto">
        {history.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("$")
                ? "text-[#67E8F9]"
                : "whitespace-pre-wrap text-[#D1D5DB]"
            }
          >
            {line}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={run} className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
        <span className="text-[#06B6D4]">$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-transparent text-[#67E8F9] outline-none placeholder-[#334155]"
          placeholder="./launch_demo"
          aria-label="Terminal command input"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
