import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CursorFollower from "@/components/CursorFollower";
import GrainOverlay from "@/components/GrainOverlay";

export const metadata: Metadata = {
  title: "MD Tangim Haque — Flutter Developer & Mobile Software Engineer",
  description:
    "Flutter developer with 3+ years building secure, production-grade mobile applications — VPN platforms, real-time systems, and offline-first apps. Based in Bangladesh, open to remote work.",
  keywords: [
    "Flutter Developer",
    "Mobile Software Engineer",
    "MD Tangim Haque",
    "Dart Developer",
    "Cross-platform Development",
    "Firebase",
    "WireGuard",
  ],
  authors: [{ name: "MD Tangim Haque" }],
  openGraph: {
    title: "MD Tangim Haque — Flutter Developer & Mobile Software Engineer",
    description:
      "Building elegant mobile experiences that scale. Flutter developer crafting secure, high-performance applications.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

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
