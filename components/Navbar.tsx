"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ ctaText = "Let's talk" }: { ctaText?: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const lenis = (window as any).__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  const resolveHref = (href: string) => (isHome ? href : `/${href}`);

  const scrollToSection = (href: string) => {
    const hash = href.startsWith("#") ? href : `#${href}`;
    if (!isHome) {
      window.location.href = `/${hash}`;
      return;
    }
    const target = document.querySelector(hash);
    if (!target) return;
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const closingMenu = open;
    setOpen(false);

    if (closingMenu) {
      const lenis = (window as any).__lenis;
      lenis?.start();
      document.body.style.overflow = "";
      requestAnimationFrame(() => scrollToSection(href));
    } else {
      scrollToSection(href);
    }
  };

  const navLinkClass =
    "font-body text-[13px] tracking-wide text-ink/70 hover:text-ink transition-colors duration-300 relative group";

  const mobileMenu = (
    <div
      className={`md:hidden fixed inset-0 z-[200] transition-opacity duration-500 ${
        open ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 bg-paper/95 backdrop-blur-sm"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
      />

      <nav className="relative z-10 h-full overflow-y-auto px-6 pt-[calc(5.5rem+env(safe-area-inset-top))] pb-10">
        <ul className="flex flex-col gap-2">
          {links.map((link, i) => (
            <li
              key={link.href}
              className="border-b border-ink/[0.06] py-5"
              style={{
                transitionDelay: open ? `${i * 60}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(16px)",
                opacity: open ? 1 : 0,
                transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <a
                href={resolveHref(link.href)}
                onClick={(e) => handleHashClick(e, link.href)}
                data-cursor-hover
                className="font-display text-3xl tracking-tight block"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          open ? "z-[210]" : "z-[100]"
        } ${scrolled || open ? "py-4 bg-paper/80 backdrop-blur-md border-b border-ink/[0.06]" : "py-6"}`}
      >
        <nav className="relative z-[110] max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {isHome ? (
            <a
              href="#hero"
              onClick={(e) => handleHashClick(e, "#hero")}
              data-cursor-hover
              className="font-display text-sm tracking-[0.15em] uppercase"
            >
              TH<span className="text-signal">.</span>
            </a>
          ) : (
            <Link
              href="/"
              data-cursor-hover
              className="font-display text-sm tracking-[0.15em] uppercase"
            >
              TH<span className="text-signal">.</span>
            </Link>
          )}

          <ul className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={resolveHref(link.href)}
                  onClick={(e) => handleHashClick(e, link.href)}
                  data-cursor-hover
                  className={navLinkClass}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-signal transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {isHome ? (
            <a
              href="#contact"
              onClick={(e) => handleHashClick(e, "#contact")}
              data-cursor-hover
              className="hidden md:inline-flex items-center gap-2 text-[13px] font-medium border border-ink/15 px-5 py-2.5 rounded-full hover:border-signal hover:text-signal transition-all duration-300"
            >
              {ctaText}
            </a>
          ) : (
            <Link
              href="/#contact"
              data-cursor-hover
              className="hidden md:inline-flex items-center gap-2 text-[13px] font-medium border border-ink/15 px-5 py-2.5 rounded-full hover:border-signal hover:text-signal transition-all duration-300"
            >
              {ctaText}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-[120] flex flex-col gap-1.5 w-7 h-7 items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`block w-full h-[1px] bg-ink transition-all duration-300 origin-center ${
                open ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-full h-[1px] bg-ink transition-all duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
