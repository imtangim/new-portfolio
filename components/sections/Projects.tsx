"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    name: "Enova VPN",
    tag: "Cross-platform VPN",
    description:
      "Encrypted tunneling across Android, iOS, macOS, and Android TV — built on WireGuard and OpenVPN protocols for secure, fast connections.",
    stack: ["Flutter", "WireGuard", "OpenVPN"],
    screenshot: "/assets/images/projects/enova-vpn.jpg",
  },
  {
    name: "Deen",
    tag: "Islamic Companion App",
    description:
      "Quran, Hadith, prayer times, and Ramadan scheduling — with live widgets and notification support woven into daily life.",
    stack: ["Flutter", "Firebase", "Widgets"],
    screenshot: "/assets/images/projects/deen.jpg",
  },
  {
    name: "OptiluxBD",
    tag: "E-commerce Platform",
    description:
      "Product browsing and order management backed by secure REST API integration for a smooth retail experience.",
    stack: ["Flutter", "REST APIs"],
    screenshot: "/assets/images/projects/optiluxbd.jpg",
  },
  {
    name: "gExpense",
    tag: "Expense Manager",
    description:
      "Offline-first budgeting and spend analytics that work reliably with or without a connection.",
    stack: ["Flutter", "Offline-first"],
    screenshot: "/assets/images/projects/gexpense.jpg",
  },
  {
    name: "PulseFit",
    tag: "Health & Fitness",
    description:
      "Workout tracking, heart-rate zones, and progress dashboards — designed for daily motivation and long-term habits.",
    stack: ["Flutter", "HealthKit", "Charts"],
    screenshot: "/assets/images/projects/pulsefit.jpg",
  },
  {
    name: "Zenith Finance",
    tag: "Personal Finance",
    description:
      "Portfolio overview, bill reminders, and spending insights in a calm, data-rich interface built for clarity.",
    stack: ["Flutter", "Firebase", "Plaid"],
    screenshot: "/assets/images/projects/zenith.jpg",
  },
];

function PhoneMockup({
  screensRef,
  nameRef,
  counterRef,
}: {
  screensRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  nameRef: React.RefObject<HTMLDivElement | null>;
  counterRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className="absolute w-[220px] h-[220px] md:w-[340px] md:h-[340px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          backgroundImage: "url(/assets/images/red-glow-overlay.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />

      <div
        className="relative w-[168px] h-[344px] md:w-[240px] md:h-[490px] rounded-[30px] md:rounded-[36px] border-[2.5px] md:border-[3px] border-ink/10 bg-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] md:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] overflow-hidden"
        style={{ perspective: "1000px" }}
        data-cursor-hover
      >
        <div className="absolute top-2.5 md:top-3 left-1/2 -translate-x-1/2 w-16 md:w-20 h-[18px] md:h-[22px] rounded-full bg-ink z-20" />

        <div className="absolute inset-[3px] rounded-[27px] md:rounded-[33px] overflow-hidden bg-paper">
          {projects.map((project, i) => (
            <div
              key={project.name}
              ref={(el) => {
                screensRef.current[i] = el;
              }}
              className="project-screen absolute inset-0"
              style={{
                opacity: i === 0 ? 1 : 0,
                visibility: i === 0 ? "visible" : "hidden",
              }}
            >
              <Image
                src={project.screenshot}
                alt={`${project.name} app screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 168px, 240px"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div ref={nameRef} className="pt-4 md:pt-6 text-center w-full">
        <span
          ref={counterRef}
          className="font-mono text-xs tracking-[0.2em] uppercase text-ink/35"
        >
          01 / {String(projects.length).padStart(2, "0")}
        </span>
        <h3 className="project-active-name font-display text-xl md:text-3xl tracking-tight mt-1.5 md:mt-2">
          {projects[0].name}
        </h3>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref: headerRef, inView: headerInView } = useInView(0.3);
  const sectionRef = useRef<HTMLElement>(null);
  const screensRef = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressDesktopRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      infoRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === 0 ? "1" : isMobile ? "0" : "0.4";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const screens = screensRef.current.filter(Boolean) as HTMLDivElement[];
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
      const nameEl = nameRef.current?.querySelector(".project-active-name");

      const showProject = (index: number) => {
        if (index === activeIndexRef.current) return;
        activeIndexRef.current = index;

        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        screens.forEach((screen, i) => {
          const isActive = i === index;
          if (isMobile) {
            gsap.to(screen, {
              opacity: isActive ? 1 : 0,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
              onComplete: () => {
                screen.style.visibility = isActive ? "visible" : "hidden";
              },
            });
          } else {
            gsap.to(screen, {
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : i < index ? -40 : 40,
              scale: isActive ? 1 : 0.92,
              duration: 0.7,
              ease: "power3.out",
              overwrite: "auto",
              onComplete: () => {
                if (!isActive) {
                  gsap.set(screen, { y: 0, scale: 1 });
                }
              },
            });
          }
          if (isActive) screen.style.visibility = "visible";
        });

        infoRefs.current.forEach((info, i) => {
          if (!info) return;
          const isActive = i === index;
          const isMobile = window.matchMedia("(max-width: 767px)").matches;
          gsap.to(info, {
            opacity: isActive ? 1 : isMobile ? 0 : 0.28,
            y: isActive ? 0 : i < index ? -16 : 16,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        });

        panelRefs.current.forEach((panel, i) => {
          const isActive = i === index;
          const isMobile = window.matchMedia("(max-width: 767px)").matches;
          panel?.classList.toggle("border-signal", isActive);
          panel?.classList.toggle("border-transparent", !isActive);
          if (isMobile && panel) {
            gsap.to(panel, {
              opacity: isActive ? 1 : 0,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
            panel.style.pointerEvents = isActive ? "auto" : "none";
            panel.style.visibility = isActive ? "visible" : "hidden";
          }
        });

        if (nameEl) {
          gsap.fromTo(
            nameEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
          );
          nameEl.textContent = projects[index].name;
        }

        if (counterRef.current) {
          counterRef.current.textContent = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
        }

        if (progressRef.current) {
          gsap.to(progressRef.current, {
            scaleX: index / (projects.length - 1),
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        if (progressDesktopRef.current) {
          gsap.to(progressDesktopRef.current, {
            scaleX: index / (projects.length - 1),
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      const mobileQuery = window.matchMedia("(max-width: 767px)");

      panels.forEach((panel, i) => {
        const isMobile = mobileQuery.matches;
        ScrollTrigger.create({
          trigger: panel,
          start: isMobile ? "top 68%" : "top 62%",
          end: isMobile ? "bottom 32%" : "bottom 38%",
          onEnter: () => showProject(i),
          ...(isMobile
            ? {
                onLeaveBack: () => {
                  if (i > 0) showProject(i - 1);
                },
              }
            : { onEnterBack: () => showProject(i) }),
        });
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-10 pb-28 md:pb-36">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="mb-8 md:mb-12 transition-all duration-700"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal">
            04 — Selected Work
          </span>
          <h2 className="font-display text-[9vw] md:text-[3.4vw] lg:text-[52px] leading-[1.05] tracking-tight mt-4 max-w-2xl text-balance">
            Four products, shipped and running.
          </h2>
        </div>

        <div className="mb-5 md:mb-0 h-[2px] bg-ink/[0.07] relative md:hidden">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 bg-signal origin-left"
            style={{ transform: "scaleX(0)", width: "100%" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-4 md:gap-16 items-start">
          <div className="sticky top-[10vh] md:top-[18vh] z-20 md:z-0 flex justify-center md:justify-end md:pr-8 self-start -mx-6 px-6 md:mx-0 md:px-0">
            <div className="relative w-full flex justify-center bg-paper pt-1 pb-5 md:pb-0 md:pt-0 border-b border-ink/[0.06] md:border-b-0 shadow-[0_16px_32px_12px_var(--paper)] md:shadow-none">
              <PhoneMockup
                screensRef={screensRef}
                nameRef={nameRef}
                counterRef={counterRef}
              />
            </div>
          </div>

          <div className="relative z-0 md:z-auto max-md:overflow-hidden">
            <div className="hidden md:block mb-10 h-[2px] bg-ink/[0.07] relative">
              <div
                ref={progressDesktopRef}
                className="absolute inset-y-0 left-0 bg-signal origin-left"
                style={{ transform: "scaleX(0)", width: "100%" }}
              />
            </div>

            {projects.map((project, i) => (
                <div
                  key={project.name}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className={`project-panel min-h-[48vh] md:min-h-[85vh] flex items-start md:items-center py-6 md:py-14 max-md:border-l-0 border-l-2 pl-0 md:pl-8 transition-colors duration-500 max-md:overflow-hidden ${
                    i === 0
                      ? "border-signal max-md:opacity-100 max-md:visible"
                      : "border-transparent max-md:opacity-0 max-md:invisible md:opacity-100"
                  }`}
                >
                  <div
                    ref={(el) => {
                      infoRefs.current[i] = el;
                    }}
                    className={`w-full ${i === 0 ? "" : "max-md:opacity-0 md:opacity-[0.28]"}`}
                    style={i === 0 ? { opacity: 1 } : undefined}
                  >
                    <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-signal">
                      {project.tag}
                    </span>
                    <h3 className="font-display text-2xl md:text-[40px] mt-2 md:mt-3 tracking-tight leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-sm md:text-base text-ink/60 mt-3 md:mt-4 leading-relaxed max-w-lg">
                      {project.description}
                    </p>
                    <div className="mt-5 md:mt-6 flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1 rounded-full border border-ink/10 text-ink/55"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
