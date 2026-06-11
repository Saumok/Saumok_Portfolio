"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Lenis from "lenis";
import BootSequence from "@/components/BootSequence";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ChapterTransition from "@/components/ChapterTransition";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import AccessChallenge from "@/components/AccessChallenge";
import Contact from "@/components/Contact";
import { PERSONAL } from "@/lib/data";

/* Boot-once-per-session flag (FR-001.6) — sessionStorage as external store. */
const subscribeNoop = () => () => {};
const useAlreadyBooted = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => sessionStorage.getItem("saumok-os-booted") === "1",
    () => false
  );

export default function Home() {
  const alreadyBooted = useAlreadyBooted();
  const [bootFinished, setBootFinished] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [contactUnlocked, setContactUnlocked] = useState(false);

  const booted = alreadyBooted || bootFinished;
  const showBoot = hydrated && !booted;

  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Lenis smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  const finishBoot = () => {
    sessionStorage.setItem("saumok-os-booted", "1");
    setBootFinished(true);
  };

  return (
    <>
      {showBoot && <BootSequence onDone={finishBoot} />}
      <CustomCursor />
      <ChapterTransition />
      <Navbar />

      <main>
        <Hero booted={booted} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <AccessChallenge onUnlock={() => setContactUnlocked(true)} />
        <Contact unlocked={contactUnlocked} />
      </main>

      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-6 text-center">
          <div className="font-display text-[11px] tracking-[0.3em] text-[#475569]">
            SAUMOK.OS — END OF TRANSMISSION
          </div>
          <p className="font-mono-ui text-[11px] text-[#334155]">
            Designed & engineered by {PERSONAL.firstName} · Next.js · Three.js ·
            no template was harmed in the making
          </p>
        </div>
      </footer>
    </>
  );
}
