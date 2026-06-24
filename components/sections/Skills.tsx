"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useInView } from "@/hooks/useInView";

const orbitSkills = [
  "Flutter", "Dart", "Firebase", "GetX", "REST APIs",
  "Swift", "Python", "Java", "WireGuard", "OpenVPN",
];

const orbitPositions = orbitSkills.map((skill, i) => {
  const angle = (i / orbitSkills.length) * 2 * Math.PI;
  const radius = 47;
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return {
    skill,
    left: `${x.toFixed(4)}%`,
    top: `${y.toFixed(4)}%`,
  };
});

const proficiencies = [
  { name: "Flutter & Dart", level: 95 },
  { name: "Firebase & Backend Integration", level: 88 },
  { name: "Clean Architecture", level: 85 },
  { name: "Networking (WireGuard / OpenVPN)", level: 80 },
  { name: "Real-time & Offline-first Systems", level: 90 },
];

export default function Skills() {
  const { ref: headerRef, inView: headerInView } = useInView(0.3);
  const orbitRef = useRef<HTMLDivElement>(null);
  const { ref: barsInViewRef, inView: barsInView } = useInView(0.2);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 60,
      repeat: -1,
      ease: "none",
    });
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!barsInView || !barsInViewRef.current) return;

    const fills = barsInViewRef.current.querySelectorAll<HTMLElement>(".skill-bar-fill");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      fills.forEach((fill) => {
        fill.style.transform = "scaleX(1)";
      });
      return;
    }

    gsap.to(fills, {
      scaleX: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      transformOrigin: "left center",
    });
  }, [barsInView, barsInViewRef]);

  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(/assets/images/particle-texture.png)",
          backgroundSize: "500px 500px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto">
        <div
          ref={headerRef as any}
          className="mb-16 transition-all duration-700"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal">02 — Skills</span>
          <h2 className="font-display text-[9vw] md:text-[3.4vw] lg:text-[52px] leading-[1.05] tracking-tight mt-4 max-w-2xl text-balance">
            A toolkit built for production, not demos.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Orbital visualization */}
          <div className="relative h-[420px] md:h-[480px] flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: "url(/assets/svg/orbital-ring.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            />
            <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
              <div ref={orbitRef} className="absolute inset-0">
                {orbitPositions.map(({ skill, left, top }) => (
                  <div
                    key={skill}
                    data-cursor-hover
                    className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-paper border border-ink/10 text-xs font-medium whitespace-nowrap hover:border-signal hover:text-signal transition-colors duration-300 cursor-default"
                    style={{ left, top }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display text-4xl md:text-5xl tracking-tightest">10+</div>
                  <div className="text-xs text-ink/50 mt-1 font-mono uppercase tracking-wide">
                    Technologies
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proficiency bars */}
          <div ref={barsInViewRef as any} className="flex flex-col gap-7">
            {proficiencies.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-baseline mb-2.5">
                  <span className="text-sm md:text-[15px] font-medium">{skill.name}</span>
                  <span className="font-mono text-xs text-ink/40">{skill.level}%</span>
                </div>
                <div className="h-[3px] bg-ink/[0.06] rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full bg-signal rounded-full origin-left"
                    style={{ transform: "scaleX(0)", width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
