import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — MD Tangim Haque",
  description:
    "Thoughts on Flutter development, mobile architecture, and building production-grade apps.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

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
            Notes on Flutter, mobile engineering, and the lessons learned shipping
            real products.
          </p>
        </header>

        <BlogIndex posts={posts} tags={tags} />
      </div>
    </div>
  );
}
