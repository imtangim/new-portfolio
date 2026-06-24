"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useInView } from "@/hooks/useInView";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog";

const recentPosts = getAllPosts().slice(0, 3);

function AnimatedBlogCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.12);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out" }
    );
  }, [inView, delay, ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * 0.03,
        y: y * 0.03,
        rotateX: -y * 0.015,
        rotateY: x * 0.015,
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
  }, [ref]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ opacity: 0, transform: "translateY(60px)", transformStyle: "preserve-3d" }}
      className="blog-card"
    >
      {children}
    </div>
  );
}

export default function Blog() {
  const { ref: headerRef, inView: headerInView } = useInView(0.3);

  return (
    <section id="blog" className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <header
          ref={headerRef as React.RefObject<HTMLElement>}
          className="mb-12 md:mb-14 transition-all duration-700"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal">
            07 — Writing
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4">
            <h2 className="font-display text-[9vw] md:text-[3.4vw] lg:text-[52px] leading-[1.05] tracking-tight max-w-2xl text-balance">
              From the blog
            </h2>
            <Link
              href="/blog"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm font-medium border border-ink/15 px-5 py-2.5 rounded-full hover:border-signal hover:text-signal transition-all duration-300 shrink-0"
            >
              View all posts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {recentPosts.map((post, i) => (
            <AnimatedBlogCard key={post.slug} delay={i * 0.1}>
              <PostCard post={post} />
            </AnimatedBlogCard>
          ))}
        </div>
      </div>
    </section>
  );
}
