"use client";

import experienceData from "@/data/experience.json";
import profile from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import skillsData from "@/data/skills.json";
import type { Experience, Project, SkillCategory } from "@/types/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { SquareTerminal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const skills = skillsData as SkillCategory[];
const experience = experienceData as Experience[];
const projects = projectsData as Project[];

type OutputLine = {
  type: "command" | "output" | "error" | "success" | "info";
  text: string;
};

function buildOutput(cmd: string): OutputLine[] {
  const normalized = cmd.trim().toLowerCase();

  switch (normalized) {
    case "help":
      return [
        { type: "info", text: "Available commands:" },
        { type: "output", text: "" },
        { type: "output", text: "  about        → Who I am" },
        { type: "output", text: "  skills        → Technical expertise" },
        { type: "output", text: "  experience    → Work history" },
        { type: "output", text: "  projects      → Featured projects" },
        { type: "output", text: "  contact       → Get in touch" },
        { type: "output", text: "  resume        → Download CV" },
        { type: "output", text: "  clear         → Clear terminal" },
        { type: "output", text: "" },
        { type: "output", text: "  whoami        → Quick summary" },
        { type: "output", text: "  ls            → List sections" },
      ];

    case "whoami":
      return [
        { type: "success", text: `${profile.name}` },
        { type: "output", text: profile.headline },
        { type: "output", text: profile.location },
      ];

    case "about":
      return [
        {
          type: "success",
          text: "── About ──────────────────────────────────",
        },
        ...profile.about
          .split("\n\n")
          .map((p): OutputLine => ({ type: "output", text: p })),
      ];

    case "skills": {
      const lines: OutputLine[] = [
        {
          type: "success",
          text: "── Skills ─────────────────────────────────",
        },
        { type: "output", text: "" },
      ];
      skills.forEach((cat) => {
        lines.push({ type: "info", text: `${cat.category}:` });
        lines.push({
          type: "output",
          text: `  ${cat.skills.map((s) => s.name).join("  ·  ")}`,
        });
        lines.push({ type: "output", text: "" });
      });
      return lines;
    }

    case "experience": {
      const lines: OutputLine[] = [
        {
          type: "success",
          text: "── Experience ─────────────────────────────",
        },
        { type: "output", text: "" },
      ];
      experience.forEach((exp) => {
        lines.push({ type: "info", text: `${exp.company}  (${exp.industry})` });
        exp.positions.forEach((pos) => {
          lines.push({
            type: "output",
            text: `  ${pos.title}  |  ${pos.startDate} → ${pos.isCurrent ? "present" : (pos.endDate ?? "")}`,
          });
        });
        lines.push({ type: "output", text: "" });
      });
      return lines;
    }

    case "projects": {
      const lines: OutputLine[] = [
        {
          type: "success",
          text: "── Projects ───────────────────────────────",
        },
        { type: "output", text: "" },
      ];
      projects.forEach((p) => {
        lines.push({ type: "info", text: p.title });
        lines.push({ type: "output", text: `  ${p.shortDesc}` });
        if (p.liveUrl) lines.push({ type: "output", text: `  → ${p.liveUrl}` });
        lines.push({ type: "output", text: "" });
      });
      return lines;
    }

    case "contact":
      return [
        {
          type: "success",
          text: "── Contact ────────────────────────────────",
        },
        { type: "output", text: "" },
        { type: "output", text: `  Email     → ${profile.email}` },
        {
          type: "output",
          text: `  LinkedIn  → https://linkedin.com/in/nasir-uddin`,
        },
        { type: "output", text: `  GitHub    → https://github.com/nrubel` },
        { type: "output", text: `  Twitter   → https://twitter.com/nrubel` },
        { type: "output", text: "" },
        { type: "info", text: "  Use the chatbot for instant responses ↗" },
      ];

    case "resume":
      return [
        { type: "success", text: "Initiating download..." },
        { type: "output", text: "→ /Nasir_Resume.pdf" },
        {
          type: "info",
          text: "If download doesn't start, visit /Nasir_Resume.pdf directly.",
        },
      ];

    case "ls":
      return [
        {
          type: "output",
          text: "hero/   about/   experience/   projects/   skills/   contact/",
        },
      ];

    case "":
      return [];

    default:
      return [
        {
          type: "error",
          text: `Command not found: ${cmd}. Type 'help' for available commands.`,
        },
      ];
  }
}

const WELCOME: OutputLine[] = [
  { type: "info", text: "┌─────────────────────────────────────────┐" },
  { type: "info", text: "│  Nasir Uddin — Interactive Portfolio CLI │" },
  { type: "info", text: "└─────────────────────────────────────────┘" },
  { type: "output", text: "" },
  { type: "output", text: "Type 'help' to see available commands." },
  { type: "output", text: "" },
];

const LINE_COLORS: Record<OutputLine["type"], string> = {
  command: "text-cyan-400",
  output: "text-slate-400",
  error: "text-red-400",
  success: "text-emerald-400",
  info: "text-blue-400",
};

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<OutputLine[]>(WELCOME);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();

    if (trimmed.toLowerCase() === "clear") {
      setHistory(WELCOME);
      setCmdHistory((h) => [trimmed, ...h]);
      setInput("");
      setHistoryIndex(-1);
      return;
    }

    const output = buildOutput(trimmed);

    if (trimmed.toLowerCase() === "resume") {
      const a = document.createElement("a");
      a.href = "/Nasir_Resume.pdf";
      a.download = "Nasir_Uddin_Resume.pdf";
      a.click();
    }

    setHistory((prev) => [
      ...prev,
      { type: "command", text: `$ ${trimmed}` },
      ...output,
      { type: "output", text: "" },
    ]);

    if (trimmed) {
      setCmdHistory((h) => [trimmed, ...h.slice(0, 49)]);
    }
    setInput("");
    setHistoryIndex(-1);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = [
        "help",
        "about",
        "skills",
        "experience",
        "projects",
        "contact",
        "resume",
        "clear",
        "whoami",
        "ls",
      ];
      const match = commands.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-x-4 top-[8%] bottom-[8%] z-50 mx-auto max-w-3xl terminal-window flex flex-col"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
              <button
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Close"
              />
              <button
                className="h-3 w-3 rounded-full bg-yellow-500 opacity-50"
                aria-label="Minimize"
              />
              <button
                className="h-3 w-3 rounded-full bg-emerald-500 opacity-50"
                aria-label="Maximize"
              />
              <span className="ml-auto text-xs text-slate-500 font-mono">
                nasir@portfolio ~ %
              </span>
            </div>

            {/* Output */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-0.5 scrollbar-none"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`font-terminal leading-relaxed ${LINE_COLORS[line.type]} ${
                    line.type === "command" ? "mt-2" : ""
                  }`}
                >
                  {line.text || "\u00A0"}
                </div>
              ))}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
              <span className="terminal-prompt font-terminal flex-shrink-0">
                $
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none font-terminal text-slate-200 caret-cyan-400 placeholder:text-slate-600"
                placeholder="type a command…"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function TerminalButton({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      onClick={onOpen}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-xl border border-border bg-surface/90 backdrop-blur-sm px-3.5 py-2.5 text-xs font-medium text-muted-foreground shadow-card hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200 group"
      aria-label="Open terminal"
      title="Open terminal (⌘K / Ctrl+K)"
    >
      <SquareTerminal className="h-4 w-4 group-hover:text-primary transition-colors" />
      <span className="hidden sm:block">Terminal</span>
      <kbd className="hidden sm:block rounded bg-surface-2 border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground/60">
        ⌘K
      </kbd>
    </motion.button>
  );
}
