"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";
import { PERSONAL } from "@/lib/data";
import { useTypewriter, useMediaQuery } from "@/lib/hooks";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

/**
 * FR-002: Hero — 3D character, glitch name reveal, role typewriter, CTAs.
 * Mobile (<768px) gets a CSS-animated 2D treatment instead of WebGL.
 */
export default function Hero({ booted }: { booted: boolean }) {
  const typed = useTypewriter(PERSONAL.roles);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (booted) {
      const t = setTimeout(() => setRevealed(true), 150);
      return () => clearTimeout(t);
    }
  }, [booted]);

  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #050510 0%, #0D0D2B 50%, #100820 100%)",
      }}
    >
      {/* 3D layer */}
      {isDesktop && booted && (
        <div
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeroScene />
        </div>
      )}

      {/* Mobile: character hologram as CSS-animated image */}
      {!isDesktop && (
        <div aria-hidden className="absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, #7C3AED 0%, #06B6D4 60%, transparent 100%)",
            }}
          />
          <div
            className="scanlines absolute right-[-10%] top-[7%] w-[52vw] max-w-[250px] overflow-hidden rounded-lg opacity-40"
            style={{
              boxShadow: "0 0 50px rgba(124,58,237,0.3)",
              animation: "holo-bob 4s ease-in-out infinite alternate",
              maskImage:
                "linear-gradient(180deg, black 0%, black 65%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, black 0%, black 65%, transparent 100%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/models/character.png"
              alt=""
              className="block w-full"
              loading="eager"
            />
          </div>
          <style jsx>{`
            @keyframes holo-bob {
              from {
                transform: translateY(0);
              }
              to {
                transform: translateY(-12px);
              }
            }
          `}</style>
        </div>
      )}

      {/* Vignette to keep text readable over 3D */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,16,0.85) 0%, rgba(5,5,16,0.4) 38%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <div className="max-w-[640px]">
          <p
            className={`section-eyebrow mb-5 transition-all duration-700 ${
              revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {"// "}
            {PERSONAL.tagline}
          </p>

          <h1
            className={`glitch-wrap font-display text-[clamp(2.6rem,7vw,4.6rem)] font-black leading-[1.05] text-white transition-all duration-700 delay-150 ${
              revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ textShadow: "0 0 60px rgba(124,58,237,0.45)" }}
          >
            <span aria-hidden className="glitch-layer l1">
              SAUMOK
              <br />
              KUNDU
            </span>
            <span aria-hidden className="glitch-layer l2">
              SAUMOK
              <br />
              KUNDU
            </span>
            SAUMOK
            <br />
            KUNDU
          </h1>

          <div
            className={`mt-6 flex h-8 items-center font-mono-ui text-lg text-[#94A3B8] transition-all duration-700 delay-300 ${
              revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="mr-3 text-[#06B6D4]">&gt;</span>
            <span className="text-[#67E8F9]">{typed}</span>
            <span className="blink ml-0.5 text-[#06B6D4]">|</span>
          </div>

          <div
            className={`mt-10 flex flex-col gap-4 sm:flex-row transition-all duration-700 delay-500 ${
              revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("chapter-nav", { detail: "projects" })
                )
              }
              className="neon-btn"
            >
              Explore My Work
              <ArrowRight size={16} />
            </button>
            <a
              href={`mailto:${PERSONAL.email}?subject=Requesting%20CV%20—%20Saumok%20Kundu`}
              className="neon-btn cyan"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>

          <div
            className={`mt-14 flex items-center gap-3 font-mono-ui text-[12px] text-[#475569] transition-all duration-700 delay-700 ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10B981]" />
            </span>
            OPEN TO OPPORTUNITIES · {PERSONAL.location.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-ui text-[11px] tracking-[0.3em] text-[#475569] transition-opacity duration-1000 delay-1000 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          SCROLL TO EXPLORE
          <div className="h-8 w-px animate-pulse bg-gradient-to-b from-[#7C3AED] to-transparent" />
        </div>
      </div>
    </section>
  );
}
