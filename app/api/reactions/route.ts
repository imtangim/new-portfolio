import { type NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

type Vote = "like" | "dislike" | null;

async function ensureReactionRow(supabase: ReturnType<typeof getSupabaseAdmin>, slug: string) {
  const { data } = await supabase
    .from("post_reactions")
    .select("post_slug, likes, dislikes")
    .eq("post_slug", slug)
    .maybeSingle();

  if (data) return data;

  const { data: created, error } = await supabase
    .from("post_reactions")
    .insert({ post_slug: slug, likes: 0, dislikes: 0 })
    .select("post_slug, likes, dislikes")
    .single();

  if (error) throw error;
  return created;
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const voterId = request.nextUrl.searchParams.get("voterId");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ likes: 0, dislikes: 0, userVote: null satisfies Vote });
  }

  try {
    const supabase = getSupabaseAdmin();
    const row = await ensureReactionRow(supabase, slug);

    let userVote: Vote = null;
    if (voterId) {
      const { data: voteRow } = await supabase
        .from("reaction_votes")
        .select("vote")
        .eq("post_slug", slug)
        .eq("voter_id", voterId)
        .maybeSingle();
      userVote = (voteRow?.vote as Vote) || null;
    }

    return NextResponse.json({
      likes: row.likes,
      dislikes: row.dislikes,
      userVote,
    });
  } catch (err) {
    console.error("GET /api/reactions", err);
    return NextResponse.json({ error: "Failed to load reactions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Reactions are not configured. Add Supabase env vars." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const slug = String(body.slug || "").trim();
    const voterId = String(body.voterId || "").trim();
    const vote = body.vote as Vote;

    if (!slug || !voterId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (vote !== "like" && vote !== "dislike" && vote !== null) {
      return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const row = await ensureReactionRow(supabase, slug);

    const { data: existingVote } = await supabase
      .from("reaction_votes")
      .select("vote")
      .eq("post_slug", slug)
      .eq("voter_id", voterId)
      .maybeSingle();

    const previous = (existingVote?.vote as Vote) || null;
    let likes = row.likes;
    let dislikes = row.dislikes;
    let newUserVote: Vote = vote;

    const removeVote = (v: Vote) => {
      if (v === "like") likes -= 1;
      if (v === "dislike") dislikes -= 1;
    };
    const addVote = (v: Vote) => {
      if (v === "like") likes += 1;
      if (v === "dislike") dislikes += 1;
    };

    if (vote === null) {
      if (previous) removeVote(previous);
      await supabase
        .from("reaction_votes")
        .delete()
        .eq("post_slug", slug)
        .eq("voter_id", voterId);
      newUserVote = null;
    } else if (previous === vote) {
      removeVote(previous);
      await supabase
        .from("reaction_votes")
        .delete()
        .eq("post_slug", slug)
        .eq("voter_id", voterId);
      newUserVote = null;
    } else {
      if (previous) removeVote(previous);
      addVote(vote);
      await supabase.from("reaction_votes").upsert(
        { post_slug: slug, voter_id: voterId, vote },
        { onConflict: "post_slug,voter_id" }
      );
      newUserVote = vote;
    }

    likes = Math.max(0, likes);
    dislikes = Math.max(0, dislikes);

    await supabase
      .from("post_reactions")
      .update({ likes, dislikes })
      .eq("post_slug", slug);

    return NextResponse.json({ likes, dislikes, userVote: newUserVote });
  } catch (err) {
    console.error("POST /api/reactions", err);
    return NextResponse.json({ error: "Failed to update reaction" }, { status: 500 });
  }
}
