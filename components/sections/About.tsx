"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

import type { SiteSettings } from "@/types/portfolio";

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.15);

  useEffect(() => {
    if (inView) {
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
      });
    }
  }, [inView, delay, ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.04,
        y: y * 0.04,
        rotateX: -y * 0.02,
        rotateY: x * 0.02,
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      data-cursor-hover
      style={{ opacity: 0, transform: "translateY(30px)", transformStyle: "preserve-3d" }}
      className={`group relative rounded-2xl border border-ink/[0.08] bg-paper p-7 md:p-8 overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_40px_-10px_rgba(217,4,41,0.25)] ${className}`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-signal/[0.04] to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

export default function About({ settings }: { settings: SiteSettings }) {
  const { ref: headerRef, inView: headerInView } = useInView(0.3);

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={headerRef as any}
          className="mb-16 transition-all duration-700"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal">
            {settings.aboutLabel}
          </span>
          <h2 className="font-display text-[9vw] md:text-[3.4vw] lg:text-[52px] leading-[1.05] tracking-tight mt-4 max-w-2xl text-balance">
            {settings.aboutHeadline}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {/* Experience - large */}
          <BentoCard className="md:col-span-2 md:row-span-1" delay={0}>
            <div className="flex flex-col h-full justify-between gap-6">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-ink/40">Experience</span>
                <Image
                  src={settings.aboutPortrait}
                  alt="MD Tangim Haque portrait"
                  width={90}
                  height={90}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover grayscale"
                />
              </div>
              <div>
                <div className="font-display text-[20vw] md:text-[7vw] lg:text-[110px] leading-none tracking-tightest">
                  {settings.aboutYears}<span className="text-signal">+</span>
                </div>
                <p className="text-ink/60 mt-2 text-sm md:text-base max-w-sm">
                  {settings.aboutYearsText}
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Fun facts */}
          <BentoCard delay={0.1}>
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-ink/40">Fun Facts</span>
            <ul className="mt-5 space-y-3 text-sm text-ink/70">
              {settings.aboutFunFacts.map((fact) => (
                <li key={fact} className="flex gap-2">
                  <span className="text-signal">—</span> {fact}
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* Skills */}
          <BentoCard delay={0.15}>
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-ink/40">Core Stack</span>
            <div className="mt-5 flex flex-wrap gap-2">
              {settings.aboutCoreStack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1.5 rounded-full border border-ink/10 text-ink/70"
                >
                  {s}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Technologies */}
          <BentoCard delay={0.2}>
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-ink/40">Specialty</span>
            <p className="font-display text-2xl md:text-3xl mt-5 leading-tight tracking-tight">
              {settings.aboutSpecialty}
            </p>
          </BentoCard>

          {/* Achievements - wide */}
          <BentoCard className="md:col-span-2" delay={0.25}>
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-ink/40">Achievements</span>
            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              {settings.aboutBentoAchievements.map((item) => (
                <div key={item.text}>
                  <div className={`font-display text-3xl ${item.icon === "🏆" ? "text-signal" : "text-ink/30"}`}>
                    {item.icon}
                  </div>
                  <p className="text-sm text-ink/70 mt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
