import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";

interface PostCardProps {
  post: BlogPost;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden border border-ink/[0.08] rounded-xl bg-paper transition-all duration-500 hover:border-ink/20 h-full">
      <Link
        href={`/blog/${post.slug}`}
        data-cursor-hover
        className="relative aspect-[16/10] overflow-hidden"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-signature group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      <div className="flex flex-col flex-1 p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <time className="font-mono text-[11px] text-ink/40">{formatDate(post.date)}</time>
          <span className="w-1 h-1 rounded-full bg-ink/20" />
          <span className="font-mono text-[11px] text-ink/40">{post.readTime}</span>
        </div>

        <Link href={`/blog/${post.slug}`} data-cursor-hover>
          <h2 className="font-display text-base md:text-lg tracking-tight mb-2 group-hover:text-signal transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-ink/60 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.08em] uppercase px-2 py-0.5 border border-ink/10 rounded-full text-ink/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
