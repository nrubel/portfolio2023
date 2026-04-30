import socials from "@/data/socials.json";
import {
  BriefcaseBusiness,
  ExternalLink,
  GitBranch,
  X as XIcon,
} from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GitBranch,
  linkedin: BriefcaseBusiness,
  twitter: XIcon,
};

export function Footer() {
  const year = new Date().getFullYear();
  const primarySocials = socials.filter((s) => s.primary);

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Link
              href="/"
              className="text-sm font-semibold text-card-foreground/70 hover:text-primary transition-colors"
            >
              Nasir Uddin
            </Link>
            <p className="text-xs text-muted-foreground">
              Full Stack Engineer · Dhaka, Bangladesh
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {primarySocials.map((social) => {
              const Icon = ICON_MAP[social.icon];
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                >
                  {Icon ? (
                    <Icon className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Nasir Uddin. Built with Next.js & TailwindCSS.
          </p>
          <a
            href="mailto:contact@nasiruddin.dev"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            contact@nasiruddin.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
