"use client";

import { useEffect, useState } from "react";
import type { ReactionVote } from "@/types/blog";
import { getVoterId } from "@/lib/voter";

interface ReactionBarProps {
  postSlug: string;
}

export default function ReactionBar({ postSlug }: ReactionBarProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<ReactionVote>(null);
  const [hydrated, setHydrated] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const voterId = getVoterId();

    async function load() {
      try {
        const res = await fetch(
          `/api/reactions?slug=${encodeURIComponent(postSlug)}&voterId=${encodeURIComponent(voterId)}`
        );
        const data = await res.json();
        if (!cancelled) {
          setLikes(data.likes ?? 0);
          setDislikes(data.dislikes ?? 0);
          setUserVote(data.userVote ?? null);
        }
      } catch {
        /* keep defaults */
      } finally {
        if (!cancelled) setHydrated(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [postSlug]);

  const submitVote = async (nextVote: "like" | "dislike") => {
    if (pending) return;
    setPending(true);

    const voterId = getVoterId();
    const voteToSend: ReactionVote = userVote === nextVote ? null : nextVote;

    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: postSlug, voterId, vote: voteToSend }),
      });
      const data = await res.json();
      if (res.ok) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setUserVote(data.userVote);
      }
    } catch {
      /* ignore */
    } finally {
      setPending(false);
    }
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
        onClick={() => submitVote("like")}
        disabled={pending}
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
        onClick={() => submitVote("dislike")}
        disabled={pending}
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
