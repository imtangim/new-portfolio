import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/blog";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar ctaText={settings.navCtaText} />
      <main className="min-h-screen pt-24 md:pt-28">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
