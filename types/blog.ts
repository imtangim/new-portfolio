export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "gallery"; images: { src: string; alt: string }[] };

export interface BlogPostSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  gallery?: string[];
  content: ContentBlock[];
  seo?: BlogPostSeo;
}

export type ReactionVote = "like" | "dislike" | null;
