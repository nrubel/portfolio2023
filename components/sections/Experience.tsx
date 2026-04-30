import {
  SectionReveal,
  StaggerContainer,
  staggerItemVariants,
} from "@/components/effects/SectionReveal";
import experienceData from "@/data/experience.json";
import { calculateDuration, formatDateRange } from "@/lib/utils";
import type { Experience } from "@/types/portfolio";
import { motion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";

const experiences = experienceData as Experience[];

function ExperienceCard({ exp }: { exp: Experience }) {
  const allPositions = exp.positions;
  const latestPosition = allPositions[0]!;
  const isCurrent = latestPosition.isCurrent;

  return (
    <motion.div
      variants={staggerItemVariants}
      className="glass-hover rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
    >
      {/* Current indicator glow */}
      {isCurrent && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}

      {/* Company header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 border border-border text-lg font-bold text-primary font-mono flex-shrink-0">
            {exp.company[0]}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-card-foreground">
                {exp.company}
              </h3>
              {isCurrent && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <MapPin className="h-3 w-3 text-muted-foreground/60" />
              <span className="text-xs text-muted-foreground">
                {exp.industry} · {latestPosition.location}
              </span>
            </div>
          </div>
        </div>
        {exp.companyUrl && (
          <a
            href={exp.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/40 hover:text-primary transition-colors"
            aria-label={`Visit ${exp.company}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Positions */}
      <div className="space-y-6">
        {allPositions.map((position, i) => (
          <div
            key={i}
            className={`relative pl-6 ${i < allPositions.length - 1 ? "pb-6 border-b border-border/50" : ""}`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-surface-2 border-2 border-primary/40 group-hover:border-primary transition-colors duration-300" />

            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h4 className="text-sm font-semibold text-card-foreground/90">
                {position.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono flex-shrink-0">
                <span>
                  {formatDateRange(position.startDate, position.endDate)}
                </span>
                <span className="text-border">·</span>
                <span className="text-primary/70">
                  {calculateDuration(position.startDate, position.endDate)}
                </span>
              </div>
            </div>

            {/* Description paragraphs */}
            {position.description.split("\n\n").map((para, pi) => (
              <p
                key={pi}
                className="text-sm text-muted-foreground leading-relaxed mb-2"
              >
                {para}
              </p>
            ))}

            {/* Highlights */}
            {position.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {position.highlights.map((h, hi) => (
                  <li
                    key={hi}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Tech tags */}
            {position.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {position.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="mx-auto max-w-4xl">
        <SectionReveal>
          <p className="section-heading">Experience</p>
          <h2 className="section-title">
            Where I&apos;ve built{" "}
            <span className="gradient-text">real systems.</span>
          </h2>
          <p className="section-subtitle">
            Professional engineering experience across enterprise web platforms,
            mobile applications, and full-stack systems.
          </p>
        </SectionReveal>

        <StaggerContainer className="mt-12 space-y-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
