import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostContent from "@/components/blog/PostContent";
import ReactionBar from "@/components/blog/ReactionBar";
import CommentSection from "@/components/blog/CommentSection";
import { getPostBySlug } from "@/lib/blog";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const title = post.seo?.metaTitle || `${post.title} — MD Tangim Haque`;
  const description = post.seo?.metaDescription || post.excerpt;
  const ogImage = post.seo?.ogImageUrl || post.coverImage;

  return {
    title,
    description,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="px-6 md:px-10 pb-20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          data-cursor-hover
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-ink/40 hover:text-signal transition-colors duration-300 mb-8"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to blog
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <time className="font-mono text-[11px] text-ink/40">
              {formatDate(post.date)}
            </time>
            <span className="w-1 h-1 rounded-full bg-ink/20" />
            <span className="font-mono text-[11px] text-ink/40">{post.readTime}</span>
          </div>

          <h1 className="font-display text-2xl md:text-3xl tracking-tight leading-snug mb-4">
            {post.title}
          </h1>

          <p className="text-ink/60 text-sm md:text-base leading-relaxed mb-4">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-[0.08em] uppercase px-2 py-0.5 border border-ink/10 rounded-full text-ink/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-ink/[0.06] mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
        </div>

        <PostContent content={post.content} />

        {post.gallery && post.gallery.length > 0 && (
          <div className="mt-8 pt-8 border-t border-ink/[0.06]">
            <h3 className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/40 mb-4">
              Gallery
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {post.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden border border-ink/[0.06]"
                >
                  <Image
                    src={src}
                    alt={`${post.title} gallery image ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-ink/[0.06]">
          <ReactionBar postSlug={post.slug} />
        </div>

        <div className="mt-10 pt-8 border-t border-ink/[0.06]">
          <CommentSection postSlug={post.slug} />
        </div>
      </div>
    </article>
  );
}
