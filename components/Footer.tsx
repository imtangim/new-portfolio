export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-ink/[0.06]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink/40 font-mono">
        <span>© {new Date().getFullYear()} MD Tangim Haque</span>
        <span>Software Engineer · Bangladesh</span>
        {/* <span>Built with Next.js &amp; Framer Motion</span> */}
      </div>
    </footer>
  );
}
