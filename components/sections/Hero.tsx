"use client";

import { TextReveal, Typewriter } from "@/components/effects/TextReveal";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";
import { motion } from "framer-motion";
import {
  ArrowDown,
  BriefcaseBusiness,
  Download,
  GitBranch,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const STAT_LABELS: Record<string, string> = {
  yearsOfExperience: "Years Experience",
  projectsDelivered: "Projects Delivered",
  technologiesMastered: "Technologies",
};

const socialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  github: GitBranch,
  linkedin: BriefcaseBusiness,
};

export function Hero() {
  const { name, taglines, location, avatar, resume, stats } = profile;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-20"
    >
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.06] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text */}
          <div className="order-2 lg:order-1">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-xs mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-muted-foreground">
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <div className="mb-3">
              <TextReveal
                text={name}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-card-foreground block"
                delay={0.2}
              />
            </div>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-6 h-10"
            >
              <span className="text-muted-foreground text-lg">→</span>
              <Typewriter
                words={taglines}
                className="text-lg sm:text-xl font-mono gradient-text"
              />
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-1.5 text-muted-foreground text-sm mb-8"
            >
              <MapPin className="h-3.5 w-3.5 text-primary/60" />
              {location}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link href="#projects" className="btn-primary group">
                <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                View My Work
              </Link>
              <a href={resume} download className="btn-outline">
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex items-center gap-3"
            >
              {socials
                .filter((s) => s.primary && socialIcons[s.icon])
                .map((social) => {
                  const Icon = socialIcons[social.icon]!;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              <div className="h-px w-8 bg-border" />
              <a
                href="mailto:contact@nasiruddin.dev"
                className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
              >
                contact@nasiruddin.dev
              </a>
            </motion.div>
          </div>

          {/* Right column — avatar + stats */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-8">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-500/30 blur-2xl scale-110" />
              {/* Border gradient */}
              <div className="relative rounded-full p-[2px] bg-gradient-to-tr from-cyan-400/60 via-blue-500/40 to-indigo-500/60 shadow-glow-md">
                <div className="rounded-full overflow-hidden w-52 h-52 sm:w-64 sm:h-64 bg-surface">
                  <Image
                    src={avatar}
                    alt={name}
                    width={256}
                    height={256}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-3 -right-3 flex items-center gap-1.5 rounded-full border border-border bg-surface/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium shadow-card"
              >
                <span className="text-primary font-mono font-bold">
                  {stats.yearsOfExperience}+
                </span>
                <span className="text-muted-foreground">yrs exp</span>
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-3 w-full max-w-sm"
            >
              {Object.entries(stats)
                .filter(([key]) => STAT_LABELS[key])
                .slice(0, 3)
                .map(([key, value], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="glass rounded-xl p-3 text-center"
                  >
                    <div className="text-2xl font-bold font-mono gradient-text">
                      {value}+
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                      {STAT_LABELS[key]}
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground/60 font-mono tracking-widest uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
