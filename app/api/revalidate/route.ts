import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  let secret = request.headers.get("x-sanity-secret");

  if (!secret) {
    try {
      const body = await request.json();
      secret = body.secret;
    } catch {
      /* no body */
    }
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("post");
  revalidateTag("project");
  revalidateTag("experience");
  revalidateTag("achievement");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
