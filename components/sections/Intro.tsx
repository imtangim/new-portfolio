"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import type { SiteSettings } from "@/types/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface IntroProps {
  settings: SiteSettings;
}

export default function Intro({ settings }: IntroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLParagraphElement>(null);
  const frontImgRef = useRef<HTMLDivElement>(null);
  const sideImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(lineRef.current, { scaleX: 1 });
      gsap.set(".intro-word", { opacity: 1 });
      gsap.set(frontImgRef.current, { opacity: 1 });
      gsap.set(sideImgRef.current, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 10%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".intro-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: wordsContainerRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );

      // Profile transition: side -> front as user scrolls through section
      gsap.to(sideImgRef.current, {
        opacity: 0,
        rotateY: 60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 30%",
          end: "bottom 60%",
          scrub: true,
        },
      });
      gsap.fromTo(
        frontImgRef.current,
        { opacity: 0, rotateY: -60 },
        {
          opacity: 1,
          rotateY: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-[1fr_320px] gap-16 items-center">
        <div>
          <div ref={lineRef} className="h-[2px] bg-signal origin-left mb-12 w-full" style={{ transform: "scaleX(0)" }} />
          <p
            ref={wordsContainerRef}
            className="font-display text-[7vw] md:text-[2.6vw] lg:text-[42px] leading-[1.2] tracking-tight max-w-3xl text-balance"
          >
            {settings.introNarration.split(" ").map((word, i) => (
              <span key={i} className="intro-word inline-block mr-[0.28em]">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Profile transition portrait small accent */}
        <div className="relative h-[320px] hidden md:block" style={{ perspective: "1000px" }}>
          <div
            ref={sideImgRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={settings.introSidePortrait}
              alt=""
              width={300}
              height={348}
              className="w-[200px] h-auto object-contain opacity-90"
              aria-hidden="true"
            />
          </div>
          <div
            ref={frontImgRef}
            className="absolute inset-0 flex items-center justify-center opacity-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={settings.introFrontPortrait}
              alt=""
              width={300}
              height={300}
              className="w-[220px] h-auto object-contain rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
