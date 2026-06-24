"use client";

import { useEffect, useState } from "react";
import type { ReactionVote } from "@/types/blog";

interface ReactionBarProps {
  postSlug: string;
  initialLikes: number;
  initialDislikes: number;
}

interface StoredReactions {
  likes: number;
  dislikes: number;
  userVote: ReactionVote;
}

function getStorageKey(slug: string) {
  return `blog-reactions-${slug}`;
}

function loadReactions(
  slug: string,
  initialLikes: number,
  initialDislikes: number
): StoredReactions {
  if (typeof window === "undefined") {
    return { likes: initialLikes, dislikes: initialDislikes, userVote: null };
  }
  try {
    const stored = localStorage.getItem(getStorageKey(slug));
    if (stored) return JSON.parse(stored) as StoredReactions;
  } catch {
    /* ignore */
  }
  return { likes: initialLikes, dislikes: initialDislikes, userVote: null };
}

function saveReactions(slug: string, data: StoredReactions) {
  try {
    localStorage.setItem(getStorageKey(slug), JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export default function ReactionBar({
  postSlug,
  initialLikes,
  initialDislikes,
}: ReactionBarProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userVote, setUserVote] = useState<ReactionVote>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadReactions(postSlug, initialLikes, initialDislikes);
    setLikes(stored.likes);
    setDislikes(stored.dislikes);
    setUserVote(stored.userVote);
    setHydrated(true);
  }, [postSlug, initialLikes, initialDislikes]);

  const handleVote = (vote: "like" | "dislike") => {
    let newLikes = likes;
    let newDislikes = dislikes;
    let newVote: ReactionVote = vote;

    if (userVote === vote) {
      if (vote === "like") newLikes -= 1;
      else newDislikes -= 1;
      newVote = null;
    } else if (userVote === null) {
      if (vote === "like") newLikes += 1;
      else newDislikes += 1;
    } else {
      if (vote === "like") {
        newLikes += 1;
        newDislikes -= 1;
      } else {
        newDislikes += 1;
        newLikes -= 1;
      }
    }

    setLikes(newLikes);
    setDislikes(newDislikes);
    setUserVote(newVote);
    saveReactions(postSlug, {
      likes: newLikes,
      dislikes: newDislikes,
      userVote: newVote,
    });
  };

  return (
    <div
      className={`flex items-center gap-3 transition-opacity duration-300 ${
        hydrated ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/40 mr-1">
        React
      </span>

      <button
        type="button"
        onClick={() => handleVote("like")}
        data-cursor-hover
        aria-pressed={userVote === "like"}
        aria-label={`Like (${likes})`}
        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-300 ${
          userVote === "like"
            ? "border-signal bg-signal/10 text-signal"
            : "border-ink/15 hover:border-signal hover:text-signal"
        }`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={userVote === "like" ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
        <span className="font-mono text-xs tabular-nums">{likes}</span>
      </button>

      <button
        type="button"
        onClick={() => handleVote("dislike")}
        data-cursor-hover
        aria-pressed={userVote === "dislike"}
        aria-label={`Dislike (${dislikes})`}
        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-300 ${
          userVote === "dislike"
            ? "border-ink bg-ink/10 text-ink"
            : "border-ink/15 hover:border-ink/40"
        }`}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={userVote === "dislike" ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className="transition-transform duration-300 group-hover:scale-110 rotate-180"
        >
          <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
        <span className="font-mono text-xs tabular-nums">{dislikes}</span>
      </button>
    </div>
  );
}
