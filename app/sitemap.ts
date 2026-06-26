import type { MetadataRoute } from "next";
import { getAllPostSlugs, getSiteSettings } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, settings] = await Promise.all([
    getAllPostSlugs(),
    getSiteSettings(),
  ]);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...slugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
