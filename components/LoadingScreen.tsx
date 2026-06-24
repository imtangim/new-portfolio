"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      onComplete();
      return;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            setShow(false);
            onComplete();
          },
        });
      },
    });

    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1.4,
      ease: "power2.inOut",
    });

    tl.to(
      counter,
      {
        val: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.floor(counter.val).toString().padStart(3, "0");
          }
        },
      },
      "<"
    );

    tl.to({}, { duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-paper flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="font-display text-sm tracking-[0.3em] uppercase text-ink/50">
          Tangim Haque
        </div>
        <div className="flex items-baseline gap-1 font-display tabular-nums">
          <span ref={counterRef} className="text-6xl md:text-8xl font-light tracking-tightest">
            000
          </span>
          <span className="text-2xl md:text-3xl text-signal">%</span>
        </div>
        <div className="w-[200px] md:w-[280px] h-[1px] bg-ink/10 overflow-hidden">
          <div
            ref={lineRef}
            className="h-full bg-signal origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
