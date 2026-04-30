"use client";

import {
  SectionReveal,
  StaggerContainer,
  staggerItemVariants,
} from "@/components/effects/SectionReveal";
import skillsData from "@/data/skills.json";
import type { SkillCategory } from "@/types/portfolio";
import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  Monitor,
  Server,
  Smartphone,
  Wrench,
} from "lucide-react";
import { useState } from "react";

const skills = skillsData as SkillCategory[];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  server: Server,
  database: Database,
  smartphone: Smartphone,
  cloud: Cloud,
  wrench: Wrench,
  code: Code2,
};

const COLOR_MAP: Record<SkillCategory["color"], string> = {
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

const BAR_COLOR_MAP: Record<SkillCategory["color"], string> = {
  cyan: "from-cyan-500 to-cyan-400",
  blue: "from-blue-500 to-blue-400",
  violet: "from-violet-500 to-violet-400",
  emerald: "from-emerald-500 to-emerald-400",
  orange: "from-orange-500 to-orange-400",
  pink: "from-pink-500 to-pink-400",
};

function SkillCard({
  category,
  isActive,
  onClick,
}: {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[category.icon] ?? Code2;
  const colorClasses = COLOR_MAP[category.color];

  return (
    <motion.button
      variants={staggerItemVariants}
      onClick={onClick}
      className={`glass rounded-xl p-4 text-left transition-all duration-300 w-full border ${
        isActive
          ? `border-${category.color}-500/30 bg-${category.color}-500/5 shadow-glow`
          : "border-border hover:border-border-bright/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg border ${colorClasses}`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-card-foreground/90">
            {category.category}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {category.skills.length} skills
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function SkillDetail({ category }: { category: SkillCategory }) {
  const barColor = BAR_COLOR_MAP[category.color];

  return (
    <motion.div
      key={category.category}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      {category.skills.map((skill, i) => (
        <div key={skill.name}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-card-foreground/80">
              {skill.name}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              {skill.proficiency}%
            </span>
          </div>
          <div className="skill-bar">
            <motion.div
              className={`skill-bar-fill bg-gradient-to-r ${barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ delay: i * 0.04, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export function Skills() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = skills[activeIndex]!;

  return (
    <section id="skills" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="section-heading">Skills</p>
          <h2 className="section-title">
            Engineered across{" "}
            <span className="gradient-text">the full stack.</span>
          </h2>
          <p className="section-subtitle">
            From pixel-perfect frontends to database schema design — a versatile
            toolkit built over years of production engineering.
          </p>
        </SectionReveal>

        <div className="mt-12 grid lg:grid-cols-5 gap-8">
          {/* Category list */}
          <StaggerContainer className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {skills.map((cat, i) => (
              <SkillCard
                key={cat.category}
                category={cat}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </StaggerContainer>

          {/* Skill detail panel */}
          <SectionReveal
            className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8"
            delay={0.1}
            direction="right"
          >
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const Icon = ICON_MAP[active.icon] ?? Code2;
                const colorClasses = COLOR_MAP[active.color];
                return (
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${colorClasses}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                );
              })()}
              <div>
                <h3 className="text-base font-semibold text-card-foreground">
                  {active.category}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {active.skills.length} proficiencies
                </p>
              </div>
            </div>
            <SkillDetail category={active} />
          </SectionReveal>
        </div>

        {/* All skills tag cloud */}
        <SectionReveal delay={0.2} className="mt-10">
          <div className="glass rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-4">
              All Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.flatMap((cat) =>
                cat.skills.map((skill) => (
                  <span
                    key={`${cat.category}-${skill.name}`}
                    className="tech-tag"
                  >
                    {skill.name}
                  </span>
                )),
              )}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
