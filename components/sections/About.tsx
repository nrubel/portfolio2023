import { SectionReveal } from "@/components/effects/SectionReveal";
import profile from "@/data/profile.json";
import Image from "next/image";

export function About() {
  const { about, avatar, name, preferredRoles } = profile;

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="section-heading">About</p>
          <h2 className="section-title">
            The engineer behind{" "}
            <span className="gradient-text">the stack.</span>
          </h2>
        </SectionReveal>

        <div className="mt-14 grid lg:grid-cols-5 gap-12 items-start">
          {/* Text */}
          <div className="lg:col-span-3 space-y-5">
            {about.split("\n\n").map((paragraph, i) => (
              <SectionReveal key={i} delay={0.1 + i * 0.08}>
                <p className="text-muted-foreground leading-relaxed text-[0.9375rem]">
                  {paragraph}
                </p>
              </SectionReveal>
            ))}

            <SectionReveal delay={0.35}>
              <div className="pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
                  Open to roles such as
                </p>
                <div className="flex flex-wrap gap-2">
                  {preferredRoles.map((role) => (
                    <span
                      key={role}
                      className="tech-tag border-primary/20 text-primary/80 bg-primary/5"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Image + decoration */}
          <SectionReveal
            className="lg:col-span-2 flex flex-col items-center lg:items-end"
            delay={0.2}
            direction="right"
          >
            <div className="relative">
              {/* Decorative grid dots */}
              <div
                className="absolute -top-6 -right-6 w-32 h-32 dot-grid opacity-30 rounded-lg"
                aria-hidden
              />
              <div
                className="absolute -bottom-6 -left-6 w-24 h-24 dot-grid opacity-20 rounded-lg"
                aria-hidden
              />
              {/* Image frame */}
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-card w-72 h-80">
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 288px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
              {/* Floating code label */}
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs font-mono">
                <span className="text-cyan-400">const</span>{" "}
                <span className="text-blue-300">nasir</span>{" "}
                <span className="text-muted-foreground">= </span>
                <span className="text-emerald-400">&apos;engineer&apos;</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
