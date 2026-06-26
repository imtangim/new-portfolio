"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useInView } from "@/hooks/useInView";

import type { SiteSettings } from "@/types/portfolio";

function MagneticLink({
  href,
  label,
  external = true,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "power3.out" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      data-cursor-hover
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center justify-between gap-4 border-b border-ink/10 py-4 group"
    >
      <span className="font-display text-2xl md:text-3xl tracking-tight group-hover:text-signal transition-colors duration-300">
        {label}
      </span>
      <span className="text-ink/30 group-hover:text-signal group-hover:translate-x-1 transition-all duration-300">↗</span>
    </a>
  );
}

export default function Contact({ settings }: { settings: SiteSettings }) {
  const { ref: headerRef, inView: headerInView } = useInView(0.3);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sent");
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      <div
        className="absolute right-[-15%] bottom-[-10%] w-[500px] h-[500px] opacity-30 pointer-events-none"
        style={{
          backgroundImage: "url(/assets/images/red-glow-overlay.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div
          ref={headerRef as any}
          className="mb-16 transition-all duration-700"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal">{settings.contactLabel}</span>
          <h2 className="font-display text-[10vw] md:text-[4.2vw] lg:text-[64px] leading-[1.02] tracking-tight mt-4 max-w-3xl text-balance">
            {settings.contactHeadline}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-ink/15 py-4 text-lg focus:border-signal outline-none transition-colors duration-300 placeholder:text-ink/30"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-ink/15 py-4 text-lg focus:border-signal outline-none transition-colors duration-300 placeholder:text-ink/30"
              />
            </div>
            <div className="relative">
              <textarea
                required
                placeholder="Tell me about your project"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-ink/15 py-4 text-lg focus:border-signal outline-none transition-colors duration-300 placeholder:text-ink/30 resize-none"
              />
            </div>
            <button
              type="submit"
              data-cursor-hover
              className="group self-start mt-4 inline-flex items-center gap-3 bg-ink text-paper px-8 py-4 rounded-full text-sm font-medium overflow-hidden relative"
            >
              <span className="relative z-10">
                {status === "sent" ? "Message sent" : "Send message"}
              </span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                {status === "sent" ? "✓" : "→"}
              </span>
              <span className="absolute inset-0 bg-signal scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
            </button>
          </form>

          {/* Direct links */}
          <div className="flex flex-col">
            {settings.contactLinks.map((link) => (
              <MagneticLink
                key={link.href}
                href={link.href}
                label={link.label}
                external={link.external}
              />
            ))}

            <p className="mt-10 text-sm text-ink/50 max-w-sm leading-relaxed">
              {settings.contactNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
