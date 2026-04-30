import { SectionReveal } from "@/components/effects/SectionReveal";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";
import {
  BriefcaseBusiness,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  MessageSquare,
  X as XIcon,
} from "lucide-react";

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  github: GitBranch,
  linkedin: BriefcaseBusiness,
  twitter: XIcon,
};

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="section-heading">Contact</p>
          <h2 className="section-title">
            Let&apos;s build something{" "}
            <span className="gradient-text">remarkable.</span>
          </h2>
          <p className="section-subtitle">
            Whether you&apos;re looking for a senior engineer, want to discuss a
            project, or just want to say hello — my inbox is always open.
          </p>
        </SectionReveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          {/* Left — info */}
          <SectionReveal direction="left">
            <div className="space-y-6">
              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="glass-hover rounded-xl p-5 flex items-center gap-4 group"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-200">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Email me directly
                  </p>
                  <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
                    {profile.email}
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground/40 ml-auto group-hover:text-primary/60 transition-colors" />
              </a>

              {/* Location */}
              <div className="glass rounded-xl p-5 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Based in
                  </p>
                  <p className="text-sm font-medium text-card-foreground">
                    {profile.location}
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div className="glass rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
                  Find me on
                </p>
                <div className="space-y-3">
                  {socials.map((social) => {
                    const Icon = SOCIAL_ICONS[social.icon];
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-card-foreground transition-colors group"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-2 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-200">
                          {Icon ? (
                            <Icon className="h-3.5 w-3.5" />
                          ) : (
                            <ExternalLink className="h-3.5 w-3.5" />
                          )}
                        </div>
                        <span className="font-medium">{social.platform}</span>
                        <span className="text-xs text-muted-foreground/50">
                          {social.handle}
                        </span>
                        <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right — chat widget promo + chatbot shortcut */}
          <SectionReveal delay={0.1} direction="right">
            <div className="glass rounded-2xl p-8 h-full flex flex-col justify-between min-h-64 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/4 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-5">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Ask the AI assistant
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Not sure what to ask? Use the AI chatbot (bottom right) to get
                  instant answers about my experience, skills, availability, or
                  project portfolio.
                </p>
              </div>

              <div className="relative z-10 mt-6 pt-6 border-t border-border/50">
                <p className="text-xs text-muted-foreground/60">
                  Typical response time:{" "}
                  <span className="text-primary/70 font-medium">
                    &lt; 24 hours
                  </span>
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
