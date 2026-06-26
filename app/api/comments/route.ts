import { type NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import type { Comment } from "@/types/blog";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ comments: [] satisfies Comment[] });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("comments")
      .select("id, author, text, created_at")
      .eq("post_slug", slug)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const comments: Comment[] = (data || []).map((row) => ({
      id: row.id,
      author: row.author,
      text: row.text,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ comments });
  } catch (err) {
    console.error("GET /api/comments", err);
    return NextResponse.json({ error: "Failed to load comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Comments are not configured. Add Supabase env vars." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const slug = String(body.slug || "").trim();
    const author = String(body.author || "").trim();
    const text = String(body.text || "").trim();

    if (!slug || !author || !text) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (author.length > 50 || text.length > 3000) {
      return NextResponse.json({ error: "Invalid field length" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("comments")
      .insert({ post_slug: slug, author, text })
      .select("id, author, text, created_at")
      .single();

    if (error) throw error;

    const comment: Comment = {
      id: data.id,
      author: data.author,
      text: data.text,
      createdAt: data.created_at,
    };

    return NextResponse.json({ comment }, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments", err);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
