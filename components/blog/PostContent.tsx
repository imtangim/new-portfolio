import Image from "next/image";
import type { ContentBlock } from "@/types/blog";

interface PostContentProps {
  content: ContentBlock[];
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-ink/70 text-sm md:text-base leading-relaxed"
              >
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2
                key={i}
                className="font-display text-lg md:text-xl tracking-tight mt-8 mb-2"
              >
                {block.text}
              </h2>
            );
          case "image":
            return (
              <figure key={i} className="my-6">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-ink/[0.06]">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 font-mono text-[10px] text-ink/40 text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "gallery":
            return (
              <div
                key={i}
                className={`my-6 grid gap-3 ${
                  block.images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-3"
                }`}
              >
                {block.images.map((img, j) => (
                  <div
                    key={j}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden border border-ink/[0.06]"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 220px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
