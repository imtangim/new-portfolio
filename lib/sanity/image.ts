import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function resolveImageUrl(
  image: { asset?: { _ref?: string } } | null | undefined,
  fallbackUrl?: string | null,
  width?: number
): string {
  if (image?.asset?._ref) {
    let img = urlFor(image);
    if (width) img = img.width(width);
    return img.url();
  }
  return fallbackUrl || "";
}
