"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Radio } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { PERSONAL } from "@/lib/data";
import { useInView } from "@/lib/hooks";

/**
 * FR-009: Contact — "dead drop" spy terminal. Terminal-style TO/SUBJECT/MESSAGE,
 * EmailJS transmission (mailto fallback), channel-styled social links.
 */
export default function Contact({ unlocked }: { unlocked: boolean }) {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const transmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          { from_email: from, subject, message, to_email: PERSONAL.email },
          { publicKey }
        );
        setStatus("sent");
      } else {
        // EmailJS not configured yet — graceful mailto fallback keeps FR-009.3 functional
        window.location.href = `mailto:${PERSONAL.email}?subject=${encodeURIComponent(
          subject || "Contact from portfolio"
        )}&body=${encodeURIComponent(`From: ${from}\n\n${message}`)}`;
        setStatus("sent");
      }
      setFrom("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative overflow-hidden py-28 transition-all duration-1000 ${
        unlocked ? "opacity-100" : "pointer-events-none opacity-30 blur-[2px]"
      }`}
      aria-hidden={!unlocked}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[130px]"
        style={{ background: "#06B6D4" }}
      />

      <div className="relative mx-auto max-w-[860px] px-6">
        <p
          className={`section-eyebrow transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          FINAL CHAPTER — DEAD DROP
        </p>
        <h2
          className={`section-title mt-3 transition-all delay-100 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          Open A Channel
        </h2>

        <div
          className={`mt-6 flex items-center gap-3 font-mono-ui text-[12px] text-[#94A3B8] transition-all delay-200 duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#10B981]" />
          </span>
          OPEN TO OPPORTUNITIES — full-time · internship · freelance
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          {/* Terminal form */}
          <form
            onSubmit={transmit}
            className="overflow-hidden rounded-xl border"
            style={{
              borderColor: "rgba(6,182,212,0.2)",
              background: "rgba(0,0,0,0.45)",
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
              <span className="ml-3 font-mono-ui text-[11px] text-[#475569]">
                secure_dead_drop.sh — encrypted
              </span>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label
                  htmlFor="dd-from"
                  className="mb-1.5 block font-mono-ui text-[11px] tracking-[0.2em] text-[#06B6D4]"
                >
                  &gt; FROM:
                </label>
                <input
                  id="dd-from"
                  type="email"
                  required
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="terminal-input"
                  placeholder="your.email@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="dd-subject"
                  className="mb-1.5 block font-mono-ui text-[11px] tracking-[0.2em] text-[#06B6D4]"
                >
                  &gt; SUBJECT:
                </label>
                <input
                  id="dd-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="terminal-input"
                  placeholder="opportunity / project / collaboration"
                />
              </div>
              <div>
                <label
                  htmlFor="dd-message"
                  className="mb-1.5 block font-mono-ui text-[11px] tracking-[0.2em] text-[#06B6D4]"
                >
                  &gt; MESSAGE:
                </label>
                <textarea
                  id="dd-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="terminal-input resize-none"
                  placeholder="type your transmission..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="neon-btn cyan w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Radio size={15} />
                {status === "sending" ? "ENCRYPTING ..." : "TRANSMIT"}
              </button>

              {status === "sent" && (
                <div
                  className="border-t border-[#10B981]/30 pt-3 font-mono-ui text-[12px] leading-relaxed text-[#10B981]"
                  style={{ animation: "ticker 0.8s steps(40)" }}
                  role="status"
                >
                  ✓ MESSAGE ENCRYPTED. TRANSMISSION QUEUED. EXPECT RESPONSE WITHIN 24H.
                </div>
              )}
              {status === "error" && (
                <div className="border-t border-[#EF4444]/30 pt-3 font-mono-ui text-[12px] text-[#EF4444]" role="alert">
                  ✗ TRANSMISSION FAILED — email {PERSONAL.email} directly.
                </div>
              )}
            </div>
          </form>

          {/* Channels */}
          <div className="space-y-4">
            {[
              {
                n: "01",
                icon: GithubIcon,
                label: "GITHUB",
                value: "saumok_k",
                href: PERSONAL.github,
              },
              {
                n: "02",
                icon: LinkedinIcon,
                label: "LINKEDIN",
                value: "Saumok",
                href: PERSONAL.linkedin,
              },
              {
                n: "03",
                icon: Mail,
                label: "DIRECT MAIL",
                value: PERSONAL.email,
                href: `mailto:${PERSONAL.email}`,
              },
            ].map((ch, i) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.n}
                  href={ch.href}
                  target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`glass-card interactive flex items-center gap-4 !rounded-xl p-5 transition-all duration-700 ${
                    inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + i * 120}ms` }}
                >
                  <span className="font-mono-ui text-[10px] text-[#475569]">
                    CH
                    <br />
                    {ch.n}
                  </span>
                  <Icon size={20} className="text-[#06B6D4]" />
                  <div className="min-w-0">
                    <div className="font-mono-ui text-[10px] tracking-[0.25em] text-[#475569]">
                      {ch.label}
                    </div>
                    <div className="truncate text-[13px] text-[#CBD5E1]">{ch.value}</div>
                  </div>
                </a>
              );
            })}

            <div className="px-2 pt-4 font-mono-ui text-[11px] leading-relaxed text-[#334155]">
              LOCATION: {PERSONAL.location.toUpperCase()}
              <br />
              STATUS: ACCEPTING NEW MISSIONS
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </section>
  );
}
