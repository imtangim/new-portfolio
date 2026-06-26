import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

type WebhookBody = {
  secret?: string;
  _type?: string;
  slug?: { current?: string };
};

export async function POST(request: NextRequest) {
  let secret: string | null = request.headers.get("x-sanity-secret");
  let body: WebhookBody = {};

  try {
    body = await request.json();
    if (!secret && body.secret) secret = body.secret;
  } catch {
    /* empty body ok if secret in header */
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const slug = body.slug?.current;

  revalidatePath("/", "layout");
  revalidatePath("/blog", "layout");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? null,
    now: Date.now(),
  });
}
