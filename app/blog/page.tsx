import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllPosts, getAllTags, getSiteSettings } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.blogPageTitle,
    description: settings.blogPageDescription,
  };
}

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);
  const settings = await getSiteSettings();

  return (
    <div className="px-6 md:px-10 pb-20">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 md:mb-12">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-signal mb-3">
            Writing
          </p>
          <h1 className="font-display text-3xl md:text-4xl tracking-tight leading-tight mb-3">
            Blog
          </h1>
          <p className="text-ink/60 text-sm md:text-base max-w-xl leading-relaxed">
            {settings.blogPageDescription}
          </p>
        </header>

        <BlogIndex posts={posts} tags={tags} />
      </div>
    </div>
  );
}
