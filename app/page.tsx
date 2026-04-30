"use client";

import { ParticleField } from "@/components/effects/ParticleField";
import { ChatBot, ChatBotButton } from "@/components/interactive/ChatBot";
import { Terminal, TerminalButton } from "@/components/interactive/Terminal";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Ambient particles in hero area only */}
      <div className="pointer-events-none fixed inset-0 z-0 h-screen overflow-hidden opacity-50">
        <ParticleField />
      </div>

      {/* Page sections */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />

      {/* Interactive overlays */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <TerminalButton onOpen={() => setTerminalOpen(true)} />

      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <ChatBotButton isOpen={chatOpen} onOpen={() => setChatOpen((v) => !v)} />
    </>
  );
}
