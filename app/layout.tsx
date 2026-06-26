import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CursorFollower from "@/components/CursorFollower";
import GrainOverlay from "@/components/GrainOverlay";
import { getSiteSettings } from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings.siteTitle,
    description: settings.siteDescription,
    keywords: settings.keywords,
    authors: [{ name: "MD Tangim Haque" }],
    openGraph: {
      title: settings.siteTitle,
      description: settings.siteDescription,
      type: "website",
      images: settings.ogImageUrl ? [{ url: settings.ogImageUrl }] : undefined,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffefc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-paper text-ink font-body antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <GrainOverlay />
        <CursorFollower />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
