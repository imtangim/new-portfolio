"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";
import type { AchievementItem, SiteSettings } from "@/types/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Achievements({
  settings,
  achievements,
}: {
  settings: SiteSettings;
  achievements: AchievementItem[];
}) {
  const { ref: headerRef, inView: headerInView } = useInView(0.3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".trophy-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, filter: "brightness(0.3)" },
          {
            opacity: 1,
            y: 0,
            filter: "brightness(1)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 bg-ink text-paper overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/assets/images/red-glow-overlay.png)",
          backgroundSize: "1000px 1000px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url(/assets/svg/grid-pattern.svg)",
          backgroundSize: "80px 80px",
          filter: "invert(1)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto z-10">
        <div
          ref={headerRef as any}
          className="mb-16 transition-all duration-700"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal">{settings.achievementsLabel}</span>
          <h2 className="font-display text-[9vw] md:text-[3.4vw] lg:text-[52px] leading-[1.05] tracking-tight mt-4 max-w-2xl text-balance text-paper">
            {settings.achievementsHeadline}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`trophy-card relative rounded-2xl border p-8 ${
                a.featured
                  ? "md:col-span-2 border-signal/40 bg-signal/[0.06]"
                  : "border-paper/10 bg-paper/[0.02]"
              }`}
            >
              <span
                className={`font-display ${a.featured ? "text-5xl md:text-6xl text-signal" : "text-3xl text-paper/40"}`}
              >
                {a.rank}
              </span>
              <h3 className="font-display text-xl md:text-2xl mt-4 tracking-tight">{a.title}</h3>
              <p className="text-paper/50 text-sm mt-2 font-mono">{a.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
