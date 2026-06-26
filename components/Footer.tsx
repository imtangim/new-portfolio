import type { SiteSettings } from "@/types/portfolio";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-ink/[0.06]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink/40 font-mono">
        <span>© {new Date().getFullYear()} {settings.footerLine1}</span>
        <span>{settings.footerLine2}</span>
      </div>
    </footer>
  );
}
