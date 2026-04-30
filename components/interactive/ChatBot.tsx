"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUGGESTED_QUESTIONS = [
  "What is your tech stack?",
  "Tell me about your experience at Flyhub",
  "Are you available for hire?",
  "What are your strongest skills?",
];

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = input.trim();
    if (!text) return;

    setInput("");
    await sendMessage({ text });
  };

  const sendSuggested = async (q: string) => {
    setInput("");
    await sendMessage({ text: q });
  };

  const getMessageText = (parts: Array<{ type: string; text?: string }>) =>
    parts
      .filter((part) => part.type === "text")
      .map((part) => part.text ?? "")
      .join("");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 flex flex-col rounded-2xl border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
          style={{ maxHeight: "min(520px, calc(100vh - 140px))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-card-foreground leading-none mb-0.5">
                Portfolio AI
              </p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-muted-foreground">
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-card-foreground hover:bg-surface transition-all"
              aria-label="Close chat"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none min-h-0"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "assistant"
                      ? "bg-primary/10 border border-primary/20"
                      : "bg-surface-2 border border-border"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-3 w-3 text-primary" />
                  ) : (
                    <User className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-surface-2 text-card-foreground/90 rounded-bl-sm"
                      : "bg-primary/15 border border-primary/20 text-card-foreground rounded-br-sm"
                  }`}
                >
                  {getMessageText(
                    msg.parts as Array<{ type: string; text?: string }>,
                  )}
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="flex items-end gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <Bot className="h-3 w-3 text-primary" />
                </div>
                <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-card-foreground/90">
                  Hi! I'm an AI assistant trained on Nasir's professional
                  profile. Ask me anything about his skills, experience,
                  projects, or availability.
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-end gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <Bot className="h-3 w-3 text-primary" />
                </div>
                <div className="bg-surface-2 rounded-2xl rounded-bl-sm px-3.5 py-3">
                  <Loader2 className="h-3.5 w-3.5 text-muted-foreground animate-spin" />
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-400 text-center py-1">
                Something went wrong. Check your API key configuration.
              </div>
            )}

            {/* Suggested questions (show only at start) */}
            {messages.length === 0 && (
              <div className="space-y-1.5 mt-2">
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                  Try asking:
                </p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      void sendSuggested(q);
                    }}
                    className="block w-full text-left text-xs text-muted-foreground border border-border rounded-lg px-3 py-2 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            id="chat-form"
            onSubmit={(event) => {
              void handleSubmit(event);
            }}
            className="flex items-center gap-2 p-3 border-t border-border"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything…"
              disabled={isLoading}
              className="flex-1 rounded-xl bg-surface-2 border border-border px-3.5 py-2 text-sm text-card-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ChatBotButton({
  onOpen,
  isOpen,
}: {
  onOpen: () => void;
  isOpen: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
      onClick={onOpen}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border shadow-glow-md transition-all duration-300 ${
        isOpen
          ? "border-primary/50 bg-primary/10 text-primary"
          : "border-border bg-surface/90 backdrop-blur-sm text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5"
      }`}
      aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
      title="AI Portfolio Assistant"
    >
      <MessageCircle className="h-5 w-5" />
    </motion.button>
  );
}
