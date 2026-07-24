"use client";

import { useState } from "react";
import { useAldea } from "@/context/AldeaContext";
import type { FamilyDigest } from "@/lib/types";
import {
  Bot,
  Calendar,
  MessageSquare,
  Sparkles,
  Loader2,
  ShieldCheck,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PROMPTS = [
  { label: "Weekly digest", mode: "digest" as const, q: "" },
  { label: "Plan weekend", mode: "plan" as const, q: "Plan a gentle weekend for the kids" },
  { label: "Draft messages", mode: "message" as const, q: "Draft updates for grandparents and educators" },
];

export default function AssistantPage() {
  const {
    hasFamilyAssistant,
    setShowUpgrade,
    children,
    posts,
  } = useAldea();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [digest, setDigest] = useState<FamilyDigest | null>(null);

  const run = async (mode?: "digest" | "plan" | "message", q?: string) => {
    if (!hasFamilyAssistant) {
      setShowUpgrade(true);
      toast("Premium feature", {
        description: "Family Coordination Agent is included with Premium.",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childNames: children.map((c) => c.name),
          posts,
          question: q ?? question,
          mode: mode ?? "digest",
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setDigest(data.digest);
    } catch {
      toast.error("Assistant could not complete that request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-10">
      <header>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/50 text-on-primary-fixed-variant">
          <Bot className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Family Coordination Agent
          </span>
        </div>
        <h1 className="font-serif text-3xl tracking-tight text-deep-moss mt-3 leading-none">
          Your village assistant
        </h1>
        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          Weekly digests, activity planning, and warm message drafts — always under
          your privacy controls.
        </p>
      </header>

      {!hasFamilyAssistant && (
        <button
          type="button"
          onClick={() => setShowUpgrade(true)}
          className="w-full card p-4 border-2 border-primary/30 bg-primary-fixed/20 text-left"
        >
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles className="w-4 h-4" /> Premium
          </div>
          <p className="text-sm text-on-surface-variant mt-1">
            Unlock the Family Assistant to coordinate circles and generate digests.
          </p>
        </button>
      )}

      <div className="flex gap-2 flex-wrap">
        {PROMPTS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => run(p.mode, p.q)}
            disabled={loading}
            className="btn btn-sm btn-secondary"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="Ask: plan Saturday, message Nana, summarize the week…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run(undefined, question)}
        />
        <button
          type="button"
          onClick={() => run(undefined, question)}
          disabled={loading}
          className="btn btn-primary px-4"
          aria-label="Send"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </div>

      {digest && (
        <div className="space-y-4 animate-fade-up">
          <section className="card-elevated p-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-secondary">
              {digest.weekLabel}
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-on-surface">{digest.summary}</p>
          </section>

          {digest.highlights.length > 0 && (
            <section>
              <h3 className="font-serif text-lg text-deep-moss mb-2">Highlights</h3>
              <ul className="space-y-1.5">
                {digest.highlights.map((h) => (
                  <li key={h} className="text-sm flex gap-2 text-on-surface-variant">
                    <span className="text-terracotta-warm">●</span> {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="space-y-2">
            <h3 className="font-serif text-lg text-deep-moss flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sage-green" />
              Coordination
            </h3>
            {digest.coordination.map((c) => (
              <div key={c.title} className="card p-4">
                <div className="font-semibold text-sm">{c.title}</div>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{c.detail}</p>
                {c.action && (
                  <span className="inline-block mt-2 badge badge-free">{c.action}</span>
                )}
              </div>
            ))}
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg text-deep-moss flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Suggested messages
            </h3>
            {digest.suggestedMessages.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(m);
                  toast.success("Copied to clipboard");
                }}
                className={cn(
                  "w-full text-left card p-4 hover:border-sage-green transition"
                )}
              >
                <p className="text-sm leading-relaxed text-on-surface-variant">{m}</p>
                <span className="text-[10px] text-primary font-semibold mt-2 inline-block">
                  Tap to copy
                </span>
              </button>
            ))}
          </section>

          <p className="text-[11px] text-center text-on-surface-variant flex justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-green" />
            Generated privately · You decide who sees what
          </p>
        </div>
      )}
    </div>
  );
}
