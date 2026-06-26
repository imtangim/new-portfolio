"use client";

import { useEffect, useState } from "react";
import type { Comment } from "@/types/blog";

interface CommentSectionProps {
  postSlug: string;
}

function formatDate(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
        const data = await res.json();
        if (!cancelled && data.comments) {
          setComments(data.comments);
        }
      } catch {
        if (!cancelled) setError("Could not load comments.");
      } finally {
        if (!cancelled) setHydrated(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedText = text.trim();
    if (!trimmedAuthor || !trimmedText) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: postSlug,
          author: trimmedAuthor,
          text: trimmedText,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to post comment");
      }

      setComments((prev) => [data.comment, ...prev]);
      setText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className={`transition-opacity duration-300 ${
        hydrated ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-display text-lg md:text-xl tracking-tight">
          Comments
        </h2>
        <span className="font-mono text-[11px] text-ink/40">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 md:p-5 border border-ink/[0.08] rounded-xl bg-paper"
      >
        <div className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="comment-author"
              className="block font-mono text-[10px] tracking-[0.12em] uppercase text-ink/40 mb-1.5"
            >
              Name
            </label>
            <input
              id="comment-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              className="w-full px-3 py-2 bg-transparent border border-ink/15 rounded-lg text-sm focus:outline-none focus:border-signal transition-colors duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="comment-text"
              className="block font-mono text-[10px] tracking-[0.12em] uppercase text-ink/40 mb-1.5"
            >
              Comment
            </label>
            <textarea
              id="comment-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={5}
              maxLength={3000}
              className="w-full px-3 py-2 bg-transparent border border-ink/15 rounded-lg text-sm resize-none focus:outline-none focus:border-signal transition-colors duration-300 min-h-[120px]"
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-signal">{error}</p>
        )}

        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={!author.trim() || !text.trim() || submitting}
            data-cursor-hover
            className="inline-flex items-center gap-2 text-xs font-medium border border-ink/15 px-4 py-2 rounded-full hover:border-signal hover:text-signal disabled:opacity-40 disabled:pointer-events-none transition-all duration-300"
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="text-ink/40 text-sm text-center py-8 border border-dashed border-ink/10 rounded-xl">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <ul className="space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 border border-ink/[0.06] rounded-xl hover:border-ink/15 transition-colors duration-300"
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-signal/10 text-signal flex items-center justify-center font-display text-xs">
                    {comment.author.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium text-sm">{comment.author}</span>
                </div>
                <time
                  dateTime={comment.createdAt}
                  className="font-mono text-[10px] text-ink/30"
                >
                  {formatDate(comment.createdAt)}
                </time>
              </div>
              <p className="text-ink/70 text-sm leading-relaxed pl-9">
                {comment.text}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
