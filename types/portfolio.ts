import type { ContentBlock } from "@/types/blog";

export interface ContactLink {
  label: string;
  href: string;
  external: boolean;
}

export interface Proficiency {
  name: string;
  level: number;
}

export interface BentoAchievement {
  icon: string;
  text: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface ProjectItem {
  name: string;
  tag: string;
  description: string;
  stack: string[];
  screenshot: string;
  stores?: {
    appStore?: string;
    playStore?: string;
  };
}

export interface AchievementItem {
  rank: string;
  title: string;
  meta: string;
  featured: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  ogImageUrl: string;
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroPortrait: string;
  resumeUrl: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroCtaTertiary: string;
  introNarration: string;
  introSidePortrait: string;
  introFrontPortrait: string;
  aboutLabel: string;
  aboutHeadline: string;
  aboutYears: string;
  aboutYearsText: string;
  aboutPortrait: string;
  aboutFunFacts: string[];
  aboutCoreStack: string[];
  aboutSpecialty: string;
  aboutBentoAchievements: BentoAchievement[];
  skillsLabel: string;
  skillsHeadline: string;
  orbitSkills: string[];
  skillsCenterNumber: string;
  skillsCenterLabel: string;
  proficiencies: Proficiency[];
  experienceLabel: string;
  experienceHeadline: string;
  projectsLabel: string;
  projectsHeadline: string;
  achievementsLabel: string;
  achievementsHeadline: string;
  blogLabel: string;
  blogHeadline: string;
  blogPageTitle: string;
  blogPageDescription: string;
  contactLabel: string;
  contactHeadline: string;
  contactNote: string;
  contactLinks: ContactLink[];
  footerLine1: string;
  footerLine2: string;
  navCtaText: string;
}

export interface PortfolioData {
  settings: SiteSettings;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
}

export interface SanityBodyBlock {
  blockType: "paragraph" | "heading" | "image" | "gallery";
  text?: string;
  image?: { asset?: { _ref?: string } };
  imageUrl?: string;
  alt?: string;
  caption?: string;
  galleryImages?: {
    image?: { asset?: { _ref?: string } };
    imageUrl?: string;
    alt?: string;
  }[];
}

export function mapBodyBlocks(blocks: SanityBodyBlock[] | null | undefined): ContentBlock[] {
  if (!blocks?.length) return [];

  return blocks
    .map((block): ContentBlock | null => {
      switch (block.blockType) {
        case "paragraph":
        case "heading":
          return block.text
            ? { type: block.blockType, text: block.text }
            : null;
        case "image": {
          const src =
            block.image?.asset?._ref
              ? `sanity-image:${block.image.asset._ref}`
              : block.imageUrl || "";
          if (!src) return null;
          return {
            type: "image",
            src,
            alt: block.alt || "",
            caption: block.caption,
          };
        }
        case "gallery":
          return {
            type: "gallery",
            images: (block.galleryImages || [])
              .map((img) => ({
                src: img.image?.asset?._ref
                  ? `sanity-image:${img.image.asset._ref}`
                  : img.imageUrl || "",
                alt: img.alt || "",
              }))
              .filter((img) => img.src),
          };
        default:
          return null;
      }
    })
    .filter((b): b is ContentBlock => b !== null);
}
