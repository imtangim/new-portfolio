"use client";

import { useState } from "react";
import PostCard from "@/components/blog/PostCard";
import type { BlogPost } from "@/types/blog";

interface BlogIndexProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogIndex({ posts, tags }: BlogIndexProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  return (
    <>
      <div className="flex flex-wrap gap-1.5 mb-8">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          data-cursor-hover
          className={`font-mono text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border transition-all duration-300 ${
            activeTag === null
              ? "border-signal bg-signal/10 text-signal"
              : "border-ink/15 hover:border-ink/30"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            data-cursor-hover
            className={`font-mono text-[10px] tracking-[0.08em] uppercase px-3 py-1.5 rounded-full border transition-all duration-300 ${
              activeTag === tag
                ? "border-signal bg-signal/10 text-signal"
                : "border-ink/15 hover:border-ink/30"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink/40 text-sm text-center py-12">
          No posts found for this tag.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
