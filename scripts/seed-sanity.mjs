/**
 * Seeds Sanity with the portfolio's default content.
 *
 * Prerequisites:
 *   1. Copy .env.example → .env.local
 *   2. Create a Sanity API token with Editor permissions at sanity.io/manage
 *   3. Set SANITY_API_WRITE_TOKEN in .env.local
 *
 * Run: node scripts/seed-sanity.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  const envPath = join(root, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && !(key in process.env)) {
      process.env[key] = rest.join("=").trim();
    }
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mnwkp2bk";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
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
  heroEyebrow: "Open to remote · Bangladesh",
  heroTitleLine1: "Building elegant",
  heroTitleLine2: "mobile",
  heroTitleHighlight: "experiences",
  heroSubtitle:
    "Software Engineer crafting secure, high-performance applications — from encrypted VPN tunnels to real-time, offline-first systems.",
  heroPortraitUrl: "/assets/images/hero-side-profile.png",
  resumeUrl: "/assets/MD-Tangim-Haque-Resume.pdf",
  heroCtaPrimary: "View Projects",
  heroCtaSecondary: "Download Resume",
  heroCtaTertiary: "Contact Me",
  introNarration:
    "I design and engineer mobile experiences that combine performance, security, and beautiful user experiences.",
  introSidePortraitUrl: "/assets/images/hero-side-profile.png",
  introFrontPortraitUrl: "/assets/images/about-portrait.png",
  aboutLabel: "01 — About",
  aboutHeadline: "Engineering apps that feel as good as they perform.",
  aboutYears: "3",
  aboutYearsText:
    "Years building production mobile applications — from secure VPN tunnels to real-time, offline-first systems across Android, iOS, and beyond.",
  aboutPortraitUrl: "/assets/images/about-portrait.png",
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
    "Flutter", "Dart", "Firebase", "GetX", "REST APIs",
    "Swift", "Python", "Java", "WireGuard", "OpenVPN",
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

const experiences = [
  {
    _type: "experience",
    role: "Software Engineer",
    company: "Nagorik Technologies LTD",
    period: "2025 — Present",
    points: [
      "Develop scalable Flutter applications for Android and iOS",
      "Integrate REST APIs and Firebase (Auth, Firestore)",
      "Implement real-time chat and push notifications",
    ],
    order: 0,
  },
  {
    _type: "experience",
    role: "Junior Software Engineer",
    company: "Sumash Tech Limited",
    period: "2023 — 2025",
    points: [
      "Built cross-platform apps using Flutter and Dart",
      "Developed secure Firebase authentication systems",
      "Implemented WireGuard and OpenVPN networking",
    ],
    order: 1,
  },
  {
    _type: "experience",
    role: "Part-Time App Developer",
    company: "Great Technical Solution",
    period: "2024 — Present",
    points: [
      "Developed invoice and expense management apps",
      "Implemented offline-first data sync",
      "Published to Google Play and the App Store",
    ],
    order: 2,
  },
];

const projects = [
  {
    _type: "project",
    name: "Enova VPN",
    tag: "Cross-platform VPN",
    description:
      "Encrypted tunneling across Android, iOS, macOS, and Android TV — built on WireGuard and OpenVPN protocols for secure, fast connections.",
    stack: ["Flutter", "WireGuard", "OpenVPN"],
    screenshotUrl: "/assets/images/projects/enova-vpn.jpg",
    appStoreUrl: "https://apps.apple.com/us/app/vpn-proxy-master-enova-vpn/id6670394041",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.enovavpn.mobile",
    order: 0,
  },
  {
    _type: "project",
    name: "Deen",
    tag: "Islamic Companion App",
    description:
      "Quran, Hadith, prayer times, and Ramadan scheduling — with live widgets and notification support woven into daily life.",
    stack: ["Flutter", "Firebase", "Widgets"],
    screenshotUrl: "/assets/images/projects/deen.jpg",
    appStoreUrl: "https://apps.apple.com/us/app/deen-islamic-app/id1617532276",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.letsflutter.deen",
    order: 1,
  },
  {
    _type: "project",
    name: "OptiluxBD",
    tag: "E-commerce Platform",
    description:
      "Product browsing and order management backed by secure REST API integration for a smooth retail experience.",
    stack: ["Flutter", "REST APIs"],
    screenshotUrl: "/assets/images/projects/optiluxbd.jpg",
    order: 2,
  },
  {
    _type: "project",
    name: "gExpense",
    tag: "Expense Manager",
    description:
      "Offline-first budgeting and spend analytics that work reliably with or without a connection.",
    stack: ["Flutter", "Offline-first"],
    screenshotUrl: "/assets/images/projects/gexpense.jpg",
    order: 3,
  },
  {
    _type: "project",
    name: "PulseFit",
    tag: "Health & Fitness",
    description:
      "Workout tracking, heart-rate zones, and progress dashboards — designed for daily motivation and long-term habits.",
    stack: ["Flutter", "HealthKit", "Charts"],
    screenshotUrl: "/assets/images/projects/pulsefit.jpg",
    order: 4,
  },
  {
    _type: "project",
    name: "Zenith Finance",
    tag: "Personal Finance",
    description:
      "Portfolio overview, bill reminders, and spending insights in a calm, data-rich interface built for clarity.",
    stack: ["Flutter", "Firebase", "Plaid"],
    screenshotUrl: "/assets/images/projects/zenith.jpg",
    order: 5,
  },
];

const achievements = [
  {
    _type: "achievement",
    rank: "Champion",
    title: "NASA Space Apps Challenge",
    meta: "Dhaka Division · 2025",
    featured: true,
    order: 0,
  },
  {
    _type: "achievement",
    rank: "6th Place",
    title: "DIU Take Off Contest",
    meta: "2021",
    featured: false,
    order: 1,
  },
  {
    _type: "achievement",
    rank: "27th Place",
    title: "Unlock The Algorithm",
    meta: "Programming Contest · 2022",
    featured: false,
    order: 2,
  },
];

function toBodyBlocks(content) {
  return content.map((block) => {
    if (block.type === "paragraph" || block.type === "heading") {
      return { _type: "bodyBlock", blockType: block.type, text: block.text };
    }
    if (block.type === "image") {
      return {
        _type: "bodyBlock",
        blockType: "image",
        imageUrl: block.src,
        alt: block.alt,
        caption: block.caption,
      };
    }
    if (block.type === "gallery") {
      return {
        _type: "bodyBlock",
        blockType: "gallery",
        galleryImages: block.images.map((img) => ({
          imageUrl: img.src,
          alt: img.alt,
        })),
      };
    }
    return null;
  }).filter(Boolean);
}

// Import blog posts from compiled data - inline minimal set for seed
const posts = [
  {
    _type: "post",
    title: "Building Offline-First Flutter Apps That Actually Work",
    slug: { _type: "slug", current: "building-offline-first-flutter-apps" },
    excerpt:
      "How to design sync strategies, local persistence, and conflict resolution so your app stays usable when the network doesn't.",
    publishedAt: "2025-11-14T12:00:00Z",
    readTime: "8 min read",
    tags: ["Flutter", "Architecture", "Offline"],
    coverImageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop",
    gallery: [
      { imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop" },
      { imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" },
      { imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop" },
    ],
    body: toBodyBlocks([
      { type: "paragraph", text: "Most mobile users don't live in perfect connectivity. They ride elevators, take flights, and commute through dead zones. An app that freezes when offline isn't just annoying — it breaks trust." },
      { type: "heading", text: "Start with local-first data" },
      { type: "paragraph", text: "Treat the local database as the source of truth during a session. SQLite via drift, Hive, or Isar gives you fast reads and writes without waiting on the network. The UI should always read from local state and react to changes immediately." },
      { type: "image", src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=700&fit=crop", alt: "Developer working on a mobile app architecture diagram", caption: "Local-first architecture keeps the UI responsive regardless of network state." },
      { type: "heading", text: "Queue writes, sync in the background" },
      { type: "paragraph", text: "Every mutation goes into an outbox table first. A background worker retries failed syncs with exponential backoff. Users see their changes instantly; the server catches up when it can." },
      { type: "gallery", images: [
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop", alt: "Analytics dashboard on a laptop" },
        { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=450&fit=crop", alt: "Code editor with Flutter project open" },
      ]},
      { type: "paragraph", text: "Conflict resolution is where most teams stumble. Last-write-wins is simple but loses data. For collaborative features, consider operational transforms or CRDTs. For personal data like expense entries, client-wins with server validation often suffices." },
    ]),
  },
  {
    _type: "post",
    title: "WireGuard in Flutter: Lessons from Shipping a VPN",
    slug: { _type: "slug", current: "wireguard-in-flutter-lessons-learned" },
    excerpt:
      "Platform channels, native module integration, and the edge cases nobody warns you about when embedding WireGuard in a cross-platform app.",
    publishedAt: "2025-09-02T12:00:00Z",
    readTime: "12 min read",
    tags: ["Flutter", "VPN", "Native"],
    coverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop",
    body: toBodyBlocks([
      { type: "paragraph", text: "Shipping Enova VPN across Android, iOS, macOS, and Android TV taught me that WireGuard's simplicity on paper doesn't translate to simplicity in a Flutter wrapper." },
      { type: "heading", text: "Platform channels are not enough" },
      { type: "paragraph", text: "Early prototypes used basic MethodChannels for connect/disconnect. Production required event streams for connection state, throughput metrics, and error codes." },
    ]),
  },
  {
    _type: "post",
    title: "Flutter Widget Design Patterns for Maintainable UIs",
    slug: { _type: "slug", current: "flutter-widget-design-patterns" },
    excerpt:
      "Composition over inheritance, when to extract widgets, and how to keep your widget tree readable as features grow.",
    publishedAt: "2025-07-20T12:00:00Z",
    readTime: "6 min read",
    tags: ["Flutter", "UI", "Best Practices"],
    coverImageUrl: "https://images.unsplash.com/photo-1618477388954-7852f326cc6e?w=1200&h=630&fit=crop",
    body: toBodyBlocks([
      { type: "paragraph", text: "A Flutter codebase doesn't collapse from bad algorithms — it collapses from 400-line build methods and widgets that do everything." },
      { type: "heading", text: "The widget extraction rule" },
      { type: "paragraph", text: "Extract a widget when you can name it after what it represents, not how it's built." },
    ]),
  },
  {
    _type: "post",
    title: "Firebase Realtime at Scale: What We Learned Building Live Features",
    slug: { _type: "slug", current: "firebase-realtime-at-scale" },
    excerpt:
      "Firestore listeners, presence systems, and the cost surprises that come with real-time mobile apps serving thousands of concurrent users.",
    publishedAt: "2025-05-08T12:00:00Z",
    readTime: "10 min read",
    tags: ["Firebase", "Flutter", "Realtime"],
    coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop",
    body: toBodyBlocks([
      { type: "paragraph", text: "Real-time feels magical until your Firestore bill does." },
      { type: "heading", text: "Listener hygiene" },
      { type: "paragraph", text: "Every open listener is a running cost. Scope listeners to the smallest document or collection possible." },
    ]),
  },
];

async function seed() {
  console.log(`Seeding Sanity project ${projectId} / ${dataset}...`);

  await client.createOrReplace(siteSettings);
  console.log("✓ Site Settings");

  for (const doc of experiences) {
    await client.create(doc);
    console.log(`✓ Experience: ${doc.role}`);
  }

  for (const doc of projects) {
    await client.create(doc);
    console.log(`✓ Project: ${doc.name}`);
  }

  for (const doc of achievements) {
    await client.create(doc);
    console.log(`✓ Achievement: ${doc.title}`);
  }

  for (const doc of posts) {
    await client.create(doc);
    console.log(`✓ Post: ${doc.title}`);
  }

  console.log("\nDone! Open /studio to review content.");
  console.log("Set up the Sanity webhook (see docs/CMS_GUIDE.md) for instant updates without redeploying.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
