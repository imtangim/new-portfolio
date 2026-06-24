import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-28">{children}</main>
      <Footer />
    </>
  );
}
