"use client";

import {
  SectionReveal,
  StaggerContainer,
  staggerItemVariants,
} from "@/components/effects/SectionReveal";
import projectsData from "@/data/projects.json";
import type { Project, ProjectCategory } from "@/types/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const projects = projectsData as Project[];

const CATEGORIES: { label: string; value: ProjectCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Web App", value: "Enterprise Web App" },
  { label: "Platform", value: "Web Platform" },
  { label: "Mobile", value: "Mobile Application" },
  { label: "Marketing", value: "Marketing Website" },
];

const STATUS_COLORS = {
  production: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  archived: "text-muted-foreground bg-surface border-border",
  in_progress: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  concept: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

const STATUS_LABELS = {
  production: "Live",
  archived: "Archived",
  in_progress: "In Progress",
  concept: "Concept",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={staggerItemVariants}
      className="glass-hover rounded-2xl overflow-hidden group flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-surface-2">
        <Image
          src={project.thumbnail}
          alt={`${project.title} — screenshot`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
            STATUS_COLORS[project.status]
          }`}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {project.shortDesc}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="tech-tag text-[10px]">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tech-tag text-[10px]">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-border/50">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-card-foreground transition-colors"
            >
              <GitBranch className="h-3.5 w-3.5" />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All",
  );

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="section-heading">Projects</p>
          <h2 className="section-title">
            Work that speaks <span className="gradient-text">for itself.</span>
          </h2>
          <p className="section-subtitle">
            Production systems, real users, real impact. Every project
            represents an engineering challenge solved.
          </p>
        </SectionReveal>

        {/* Category filter */}
        <SectionReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveCategory(value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 border ${
                  activeCategory === value
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "border-border text-muted-foreground hover:border-border-bright/30 hover:text-card-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <StaggerContainer
            key={activeCategory}
            className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </StaggerContainer>
        </AnimatePresence>
      </div>
    </section>
  );
}
