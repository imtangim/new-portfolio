import type {
  AchievementItem,
  ExperienceItem,
  PortfolioData,
  ProjectItem,
  SiteSettings,
} from "@/types/portfolio";

export const defaultSiteSettings: SiteSettings = {
  siteTitle: "MD Tangim Haque — Software Engineer & Mobile Software Engineer",
  siteDescription:
    "Software Engineer with 3+ years building secure, production-grade mobile applications — VPN platforms, real-time systems, and offline-first apps. Based in Bangladesh, open to remote work.",
  keywords: [
    "Software Engineer",
    "Mobile Software Engineer",
    "MD Tangim Haque",
    "Dart Developer",
    "Cross-platform Development",
    "Firebase",
    "WireGuard",
  ],
  ogImageUrl: "",
  heroEyebrow: "Open to remote · Bangladesh",
  heroTitleLine1: "Building elegant",
  heroTitleLine2: "mobile",
  heroTitleHighlight: "experiences",
  heroSubtitle:
    "Software Engineer crafting secure, high-performance applications — from encrypted VPN tunnels to real-time, offline-first systems.",
  heroPortrait: "/assets/images/hero-side-profile.png",
  resumeUrl: "/assets/MD-Tangim-Haque-Resume.pdf",
  heroCtaPrimary: "View Projects",
  heroCtaSecondary: "Download Resume",
  heroCtaTertiary: "Contact Me",
  introNarration:
    "I design and engineer mobile experiences that combine performance, security, and beautiful user experiences.",
  introSidePortrait: "/assets/images/hero-side-profile.png",
  introFrontPortrait: "/assets/images/about-portrait.png",
  aboutLabel: "01 — About",
  aboutHeadline: "Engineering apps that feel as good as they perform.",
  aboutYears: "3",
  aboutYearsText:
    "Years building production mobile applications — from secure VPN tunnels to real-time, offline-first systems across Android, iOS, and beyond.",
  aboutPortrait: "/assets/images/about-portrait.png",
  aboutFunFacts: [
    "Built a VPN app that runs on Android TV",
    "Ships offline-first by default",
    "NASA Space Apps Champion, 2025",
  ],
  aboutCoreStack: ["Flutter", "Dart", "Firebase", "GetX"],
  aboutSpecialty: "Secure networking & real-time systems",
  aboutBentoAchievements: [
    { icon: "🏆", text: "NASA Space Apps Challenge — Champion, Dhaka 2025" },
    { icon: "06", text: "DIU Take Off Contest — 2021" },
    { icon: "27", text: "Unlock The Algorithm — 2022" },
  ],
  skillsLabel: "02 — Skills",
  skillsHeadline: "A toolkit built for production, not demos.",
  orbitSkills: [
    "Flutter",
    "Dart",
    "Firebase",
    "GetX",
    "REST APIs",
    "Swift",
    "Python",
    "Java",
    "WireGuard",
    "OpenVPN",
  ],
  skillsCenterNumber: "10+",
  skillsCenterLabel: "Technologies",
  proficiencies: [
    { name: "Flutter & Dart", level: 95 },
    { name: "Firebase & Backend Integration", level: 88 },
    { name: "Clean Architecture", level: 85 },
    { name: "Networking (WireGuard / OpenVPN)", level: 80 },
    { name: "Real-time & Offline-first Systems", level: 90 },
  ],
  experienceLabel: "03 — Experience",
  experienceHeadline: "Three years, three roles, one craft.",
  projectsLabel: "04 — Selected Work",
  projectsHeadline: "Multiple products, shipped and running.",
  achievementsLabel: "05 — Recognition",
  achievementsHeadline: "Emerging from the build, into the spotlight.",
  blogLabel: "07 — Writing",
  blogHeadline: "From the blog",
  blogPageTitle: "Blog — MD Tangim Haque",
  blogPageDescription:
    "Thoughts on Flutter development, mobile architecture, and building production-grade apps.",
  contactLabel: "06 — Contact",
  contactHeadline: "Have a product to build? Let's talk.",
  contactNote:
    "Based in Bangladesh, open to remote opportunities across any timezone. Usually replies within a day.",
  contactLinks: [
    { label: "tanjim437@gmail.com", href: "mailto:tanjim437@gmail.com", external: false },
    { label: "+880 1610 006484", href: "tel:+8801610006484", external: false },
    { label: "GitHub", href: "https://github.com/imtangim", external: true },
  ],
  footerLine1: "MD Tangim Haque",
  footerLine2: "Software Engineer · Bangladesh",
  navCtaText: "Let's talk",
};

export const defaultExperiences: ExperienceItem[] = [
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

export const defaultProjects: ProjectItem[] = [
  {
    name: "Enova VPN",
    tag: "Cross-platform VPN",
    description:
      "Encrypted tunneling across Android, iOS, macOS, and Android TV — built on WireGuard and OpenVPN protocols for secure, fast connections.",
    stack: ["Flutter", "WireGuard", "OpenVPN"],
    screenshot: "/assets/images/projects/enova-vpn.jpg",
    stores: {
      appStore: "https://apps.apple.com/us/app/vpn-proxy-master-enova-vpn/id6670394041",
      playStore: "https://play.google.com/store/apps/details?id=com.enovavpn.mobile",
    },
  },
  {
    name: "Deen",
    tag: "Islamic Companion App",
    description:
      "Quran, Hadith, prayer times, and Ramadan scheduling — with live widgets and notification support woven into daily life.",
    stack: ["Flutter", "Firebase", "Widgets"],
    screenshot: "/assets/images/projects/deen.jpg",
    stores: {
      appStore: "https://apps.apple.com/us/app/deen-islamic-app/id1617532276",
      playStore: "https://play.google.com/store/apps/details?id=com.letsflutter.deen",
    },
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

export const defaultAchievements: AchievementItem[] = [
  {
    rank: "Champion",
    title: "NASA Space Apps Challenge",
    meta: "Dhaka Division · 2025",
    featured: true,
  },
  {
    rank: "6th Place",
    title: "DIU Take Off Contest",
    meta: "2021",
    featured: false,
  },
  {
    rank: "27th Place",
    title: "Unlock The Algorithm",
    meta: "Programming Contest · 2022",
    featured: false,
  },
];

export const defaultPortfolioData: PortfolioData = {
  settings: defaultSiteSettings,
  experiences: defaultExperiences,
  projects: defaultProjects,
  achievements: defaultAchievements,
};
