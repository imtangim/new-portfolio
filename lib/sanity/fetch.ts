import { sanityClient } from "./client";
import { resolveImageUrl } from "./image";
import {
  achievementsQuery,
  experiencesQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  projectsQuery,
  siteSettingsQuery,
} from "./queries";
import {
  defaultAchievements,
  defaultExperiences,
  defaultPortfolioData,
  defaultProjects,
  defaultSiteSettings,
} from "./fallbacks";
import type {
  AchievementItem,
  ExperienceItem,
  PortfolioData,
  ProjectItem,
  SanityBodyBlock,
  SiteSettings,
} from "@/types/portfolio";
import { mapBodyBlocks } from "@/types/portfolio";
import type { BlogPost, ContentBlock } from "@/types/blog";
import { blogPosts } from "@/data/posts";

export const REVALIDATE_SECONDS = 60;

type RawSiteSettings = Partial<SiteSettings> & {
  heroPortrait?: { asset?: { _ref?: string } };
  heroPortraitUrl?: string;
  introSidePortrait?: { asset?: { _ref?: string } };
  introSidePortraitUrl?: string;
  introFrontPortrait?: { asset?: { _ref?: string } };
  introFrontPortraitUrl?: string;
  aboutPortrait?: { asset?: { _ref?: string } };
  aboutPortraitUrl?: string;
  resumeFile?: { asset?: { url?: string } };
  resumeFileUrl?: string;
  resumeUrl?: string;
};

type RawProject = {
  name: string;
  tag: string;
  description: string;
  stack: string[];
  screenshot?: { asset?: { _ref?: string } };
  screenshotUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
};

type RawPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: { asset?: { _ref?: string } };
  coverImageUrl?: string;
  gallery?: { image?: { asset?: { _ref?: string } }; imageUrl?: string }[];
  body?: SanityBodyBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset?: { _ref?: string } };
  };
};

function resolveContentBlocks(blocks: ContentBlock[]): ContentBlock[] {
  return blocks.map((block) => {
    if (block.type === "image") {
      return {
        ...block,
        src: block.src.startsWith("sanity-image:")
          ? resolveImageUrl({ asset: { _ref: block.src.replace("sanity-image:", "") } })
          : block.src,
      };
    }
    if (block.type === "gallery") {
      return {
        ...block,
        images: block.images.map((img) => ({
          ...img,
          src: img.src.startsWith("sanity-image:")
            ? resolveImageUrl({ asset: { _ref: img.src.replace("sanity-image:", "") } })
            : img.src,
        })),
      };
    }
    return block;
  });
}

function mapSettings(raw: RawSiteSettings | null): SiteSettings {
  if (!raw) return defaultSiteSettings;

  return {
    ...defaultSiteSettings,
    ...raw,
    keywords: raw.keywords?.length ? raw.keywords : defaultSiteSettings.keywords,
    heroPortrait: resolveImageUrl(
      raw.heroPortrait,
      raw.heroPortraitUrl || defaultSiteSettings.heroPortrait
    ),
    resumeUrl:
      raw.resumeFileUrl ||
      raw.resumeFile?.asset?.url ||
      raw.resumeUrl ||
      defaultSiteSettings.resumeUrl,
    introSidePortrait: resolveImageUrl(
      raw.introSidePortrait,
      raw.introSidePortraitUrl || defaultSiteSettings.introSidePortrait
    ),
    introFrontPortrait: resolveImageUrl(
      raw.introFrontPortrait,
      raw.introFrontPortraitUrl || defaultSiteSettings.introFrontPortrait
    ),
    aboutPortrait: resolveImageUrl(
      raw.aboutPortrait,
      raw.aboutPortraitUrl || defaultSiteSettings.aboutPortrait
    ),
    aboutFunFacts: raw.aboutFunFacts?.length
      ? raw.aboutFunFacts
      : defaultSiteSettings.aboutFunFacts,
    aboutCoreStack: raw.aboutCoreStack?.length
      ? raw.aboutCoreStack
      : defaultSiteSettings.aboutCoreStack,
    aboutBentoAchievements: raw.aboutBentoAchievements?.length
      ? raw.aboutBentoAchievements
      : defaultSiteSettings.aboutBentoAchievements,
    orbitSkills: raw.orbitSkills?.length
      ? raw.orbitSkills
      : defaultSiteSettings.orbitSkills,
    proficiencies: raw.proficiencies?.length
      ? raw.proficiencies
      : defaultSiteSettings.proficiencies,
    contactLinks: raw.contactLinks?.length
      ? raw.contactLinks.map((l) => ({ ...l, external: l.external ?? true }))
      : defaultSiteSettings.contactLinks,
  };
}

function mapProject(raw: RawProject): ProjectItem {
  return {
    name: raw.name,
    tag: raw.tag,
    description: raw.description,
    stack: raw.stack || [],
    screenshot: resolveImageUrl(raw.screenshot, raw.screenshotUrl, 1200),
    stores: {
      appStore: raw.appStoreUrl || undefined,
      playStore: raw.playStoreUrl || undefined,
    },
  };
}

function mapPost(raw: RawPost): BlogPost {
  const content = resolveContentBlocks(mapBodyBlocks(raw.body));
  const gallery = (raw.gallery || [])
    .map((g) => resolveImageUrl(g.image, g.imageUrl, 800))
    .filter(Boolean);

  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    date: raw.date,
    readTime: raw.readTime,
    tags: raw.tags || [],
    coverImage: resolveImageUrl(raw.coverImage, raw.coverImageUrl, 1200),
    gallery: gallery.length ? gallery : undefined,
    content,
    seo: raw.seo
      ? {
          metaTitle: raw.seo.metaTitle,
          metaDescription: raw.seo.metaDescription,
          ogImageUrl: resolveImageUrl(raw.seo.ogImage),
        }
      : undefined,
  };
}

const fetchOptions = { next: { revalidate: REVALIDATE_SECONDS } };

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const [settingsRaw, experiencesRaw, projectsRaw, achievementsRaw] =
      await Promise.all([
        sanityClient.fetch<RawSiteSettings | null>(siteSettingsQuery, {}, fetchOptions),
        sanityClient.fetch<ExperienceItem[]>(experiencesQuery, {}, {
          ...fetchOptions,
          next: { ...fetchOptions.next, tags: ["experience"] },
        }),
        sanityClient.fetch<RawProject[]>(projectsQuery, {}, {
          ...fetchOptions,
          next: { ...fetchOptions.next, tags: ["project"] },
        }),
        sanityClient.fetch<AchievementItem[]>(achievementsQuery, {}, {
          ...fetchOptions,
          next: { ...fetchOptions.next, tags: ["achievement"] },
        }),
      ]);

    const hasSettings = settingsRaw && settingsRaw.siteTitle;
    const hasExperiences = experiencesRaw?.length > 0;
    const hasProjects = projectsRaw?.length > 0;
    const hasAchievements = achievementsRaw?.length > 0;

    if (!hasSettings && !hasExperiences && !hasProjects && !hasAchievements) {
      return defaultPortfolioData;
    }

    return {
      settings: mapSettings(settingsRaw),
      experiences: hasExperiences ? experiencesRaw : defaultExperiences,
      projects: hasProjects ? projectsRaw.map(mapProject) : defaultProjects,
      achievements: hasAchievements ? achievementsRaw : defaultAchievements,
    };
  } catch {
    return defaultPortfolioData;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await getPortfolioData();
  return data.settings;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const raw = await sanityClient.fetch<RawPost[]>(postsQuery, {}, {
      ...fetchOptions,
      next: { ...fetchOptions.next, tags: ["post"] },
    });
    if (!raw?.length) {
      return blogPosts.map(({ slug, title, excerpt, date, readTime, tags, coverImage, gallery, content }) => ({
        slug, title, excerpt, date, readTime, tags, coverImage, gallery, content,
      }));
    }
    return raw.map(mapPost);
  } catch {
    return blogPosts.map(({ initialComments: _c, initialLikes: _l, initialDislikes: _d, ...post }) => post);
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const raw = await sanityClient.fetch<RawPost | null>(
      postBySlugQuery,
      { slug },
      { ...fetchOptions, next: { ...fetchOptions.next, tags: [`post:${slug}`] } }
    );
    if (raw) return mapPost(raw);
  } catch {
    /* fall through */
  }
  const fallback = blogPosts.find((p) => p.slug === slug);
  if (!fallback) return undefined;
  const { slug: s, title, excerpt, date, readTime, tags, coverImage, gallery, content } = fallback;
  return { slug: s, title, excerpt, date, readTime, tags, coverImage, gallery, content };
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<string[]>(postSlugsQuery, {}, fetchOptions);
    if (slugs?.length) return slugs.filter(Boolean);
  } catch {
    /* fall through */
  }
  return blogPosts.map((p) => p.slug);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}
