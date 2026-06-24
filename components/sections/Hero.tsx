"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleLine1 = useRef<HTMLSpanElement>(null);
  const titleLine2 = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tl = gsap.timeline({ delay: reduced ? 0 : 2.2 });

    tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    tl.fromTo(
      titleLine1.current,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
      "-=0.3"
    );
    tl.fromTo(
      titleLine2.current,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
      "-=0.7"
    );
    tl.fromTo(subRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4");
    tl.fromTo(
      portraitRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );
    tl.fromTo(ctaRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5");

    // Ambient glow pulse
    if (!reduced) {
      gsap.to(glowRef.current, {
        opacity: 0.8,
        scale: 1.08,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Mouse parallax
    if (!reduced && window.matchMedia("(hover: hover)").matches) {
      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(portraitRef.current, {
          x: x * 18,
          y: y * 14,
          rotateY: x * 4,
          duration: 0.8,
          ease: "power2.out",
        });
        gsap.to(glowRef.current, {
          x: x * 30,
          y: y * 20,
          duration: 1.2,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-20 md:pt-20 md:pb-0"
    >
      {/* Ambient red glow */}
      <div
        ref={glowRef}
        className="absolute right-[-10%] top-[10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-50 pointer-events-none"
        style={{
          backgroundImage: "url(/assets/images/red-glow-overlay.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: "url(/assets/svg/grid-pattern.svg)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "url(/assets/images/particle-texture.png)",
          backgroundSize: "600px 600px",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] w-full mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-center z-10">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="md:col-start-1 md:row-start-1 flex items-center gap-3 mb-1 md:mb-6 opacity-0"
        >
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-ink/60">
            Open to remote · Bangladesh
          </span>
        </div>

        {/* Portrait — centered under eyebrow on mobile, right column on desktop */}
        <div
          className="md:col-start-2 md:row-start-1 md:row-span-4 flex justify-center md:justify-end"
          style={{ perspective: "1000px" }}
        >
          <div
            ref={portraitRef}
            className="relative w-[150px] sm:w-[180px] md:w-[400px] lg:w-[440px] opacity-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-[40px] md:h-[60px] opacity-70"
              style={{
                backgroundImage: "url(/assets/images/portrait-shadow.png)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              aria-hidden="true"
            />
            <Image
              src="/assets/images/hero-side-profile.png"
              alt="MD Tangim Haque, Software Engineer"
              width={1100}
              height={1274}
              priority
              className="relative w-full h-auto select-none drop-shadow-2xl"
              draggable={false}
            />
            {/* Orbital ring accent */}
            <div
              className="absolute -inset-10 -z-10 opacity-50 pointer-events-none hidden md:block"
              style={{
                backgroundImage: "url(/assets/svg/orbital-ring.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="md:col-start-1 md:row-start-2 font-display font-medium tracking-tightest text-balance text-center md:text-left">
          <span className="block overflow-hidden pb-[0.15em] text-[11vw] sm:text-[10vw] md:text-[5.2vw] lg:text-[78px] leading-[1.15]">
            <span ref={titleLine1} className="block">
              Building elegant
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.2em] text-[11vw] sm:text-[10vw] md:text-[5.2vw] lg:text-[78px] leading-[1.15]">
            <span ref={titleLine2} className="block">
              mobile <span className="text-signal italic">experiences</span>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="md:col-start-1 md:row-start-3 mt-1 md:mt-6 max-w-md mx-auto md:mx-0 font-body text-base md:text-lg text-ink/65 leading-relaxed text-center md:text-left opacity-0"
        >
          Software Engineer crafting secure, high-performance applications
          — from encrypted VPN tunnels to real-time, offline-first systems.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="md:col-start-1 md:row-start-4 mt-2 md:mt-10 flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 opacity-0"
        >
          <a
            href="#projects"
            data-cursor-hover
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#projects");
              (window as any).__lenis?.scrollTo(el, { duration: 1.4 }) ?? el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 md:px-7 md:py-3.5 rounded-full text-sm font-medium overflow-hidden relative"
          >
            <span className="relative z-10">View Projects</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 bg-signal scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400 ease-out" />
          </a>
          <a
            href="/assets/MD-Tangim-Haque-Resume.pdf"
            data-cursor-hover
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-ink/15 px-6 py-3 md:px-7 md:py-3.5 rounded-full text-sm font-medium hover:border-signal hover:text-signal transition-all duration-300"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            data-cursor-hover
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#contact");
              (window as any).__lenis?.scrollTo(el, { duration: 1.4 }) ?? el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-2 py-3 md:py-3.5 text-sm font-medium text-ink/60 hover:text-ink transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-[1px] h-10 bg-ink/30 overflow-hidden">
          <div className="w-full h-1/2 bg-ink animate-[scrollcue_1.8s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollcue {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}
