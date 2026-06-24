"use client";

import { useEffect, useState } from "react";
import type { Comment } from "@/types/blog";

interface CommentSectionProps {
  postSlug: string;
  initialComments: Comment[];
}

function getStorageKey(slug: string) {
  return `blog-comments-${slug}`;
}

function loadComments(slug: string, initial: Comment[]): Comment[] {
  if (typeof window === "undefined") return initial;
  try {
    const stored = localStorage.getItem(getStorageKey(slug));
    if (stored) return JSON.parse(stored) as Comment[];
  } catch {
    /* ignore */
  }
  return initial;
}

function saveComments(slug: string, comments: Comment[]) {
  try {
    localStorage.setItem(getStorageKey(slug), JSON.stringify(comments));
  } catch {
    /* ignore */
  }
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

export default function CommentSection({
  postSlug,
  initialComments,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setComments(loadComments(postSlug, initialComments));
    setHydrated(true);
  }, [postSlug, initialComments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedText = text.trim();
    if (!trimmedAuthor || !trimmedText) return;

    setSubmitting(true);

    const newComment: Comment = {
      id: `local-${Date.now()}`,
      author: trimmedAuthor,
      text: trimmedText,
      createdAt: new Date().toISOString(),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    saveComments(postSlug, updated);
    setText("");
    setSubmitting(false);
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
        <div className="grid gap-3 md:grid-cols-[140px_1fr]">
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
              rows={2}
              maxLength={1000}
              className="w-full px-3 py-2 bg-transparent border border-ink/15 rounded-lg text-sm resize-none focus:outline-none focus:border-signal transition-colors duration-300"
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={!author.trim() || !text.trim() || submitting}
            data-cursor-hover
            className="inline-flex items-center gap-2 text-xs font-medium border border-ink/15 px-4 py-2 rounded-full hover:border-signal hover:text-signal disabled:opacity-40 disabled:pointer-events-none transition-all duration-300"
          >
            Post comment
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
