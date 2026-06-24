"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timeline = [
  {
    role: "Software Engineer",
    company: "Nagorik Technologies LTD",
    period: "2025 — Present",
    points: [
      "Develop scalable Flutter applications for Android and iOS",
      "Integrate REST APIs and Firebase (Auth, Firestore)",
      "Implement real-time chat and push notifications",
    ],
  },
  {
    role: "Junior Software Engineer",
    company: "Sumash Tech Limited",
    period: "2023 — 2025",
    points: [
      "Built cross-platform apps using Flutter and Dart",
      "Developed secure Firebase authentication systems",
      "Implemented WireGuard and OpenVPN networking",
    ],
  },
  {
    role: "Part-Time App Developer",
    company: "Great Technical Solution",
    period: "2024 — Present",
    points: [
      "Developed invoice and expense management apps",
      "Implemented offline-first data sync",
      "Published to Google Play and the App Store",
    ],
  },
];

export default function Experience() {
  const { ref: headerRef, inView: headerInView } = useInView(0.3);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, trackRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={headerRef as any}
          className="mb-8 md:mb-16 transition-all duration-700"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal">03 — Experience</span>
          <h2 className="font-display text-[9vw] md:text-[3.4vw] lg:text-[52px] leading-[1.05] tracking-tight mt-4 max-w-2xl text-balance">
            Three years, three roles, one craft.
          </h2>
        </div>

        <div ref={trackRef} className="relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-ink/[0.07] hidden md:block" />
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-[2px] bg-signal origin-left hidden md:block"
            style={{ transform: "scaleX(0)", width: "100%" }}
          />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 md:pt-12">
            {timeline.map((item, i) => (
              <div key={item.role} className="timeline-card relative">
                <div className="absolute -top-[42px] left-0 w-3 h-3 rounded-full bg-signal hidden md:block" />
                <span className="font-mono text-xs text-signal tracking-wide">{item.period}</span>
                <h3 className="font-display text-xl md:text-2xl mt-3 tracking-tight">{item.role}</h3>
                <p className="text-ink/50 text-sm mt-1">{item.company}</p>
                <ul className="mt-5 space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="text-sm text-ink/65 flex gap-2 leading-relaxed">
                      <span className="text-signal mt-0.5 flex-shrink-0">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
