"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/**
 * FR-010: Persistent glassmorphic navbar.
 * Chapter navigation triggers the terminal `> cd /chapter` transition
 * before smooth-scrolling (handled by navigateToChapter on window).
 */
export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("chapter-nav", { detail: id }));
  };

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-[80] h-16 border-b"
      style={{
        background: "rgba(5, 5, 16, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <button
          onClick={() => go("hero")}
          className="font-display text-sm font-700 tracking-[0.2em] text-white cursor-pointer"
          aria-label="Back to top"
        >
          SAUMOK<span className="text-[#7C3AED]">.</span>OS
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`relative cursor-pointer rounded-md px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                active === l.id
                  ? "text-[#A78BFA]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              {l.label}
              {active === l.id && (
                <span className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]" />
              )}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={`mailto:saumokkundu14814@gmail.com?subject=Requesting%20CV%20—%20Saumok%20Kundu`}
            className="neon-btn !px-5 !py-2.5 !text-xs"
          >
            <Download size={14} />
            Download CV
          </a>
        </div>

        <button
          className="cursor-pointer text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t md:hidden"
          style={{
            background: "rgba(5, 5, 16, 0.95)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="block w-full cursor-pointer px-8 py-4 text-left text-sm text-[#94A3B8] transition-colors hover:text-white"
            >
              <span className="font-mono-ui text-[#06B6D4] mr-2">&gt;</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
