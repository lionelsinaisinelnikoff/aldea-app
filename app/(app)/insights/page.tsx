"use client";

import { useState } from "react";
import { useAldea } from "@/context/AldeaContext";
import { SAMPLE_INSIGHTS } from "@/lib/data/mock";
import type { JourneyAnalysis } from "@/lib/types";
import {
  Sparkles,
  TrendingUp,
  Brain,
  Lock,
  ShieldCheck,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function InsightsPage() {
  const {
    hasAiJourney,
    setShowUpgrade,
    children,
    posts,
    plan,
  } = useAldea();
  const [childId, setChildId] = useState(children[0]?.id);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [analysis, setAnalysis] = useState<JourneyAnalysis | null>(null);

  const child = children.find((c) => c.id === childId) || children[0];

  const stages = [
    "Gathering private moments from your vault…",
    "Tracing developmental patterns over time…",
    "Cross-checking with age-appropriate milestones…",
    "Crafting nuanced recommendations for your village…",
  ];

  const runJourney = async () => {
    if (!hasAiJourney) {
      setShowUpgrade(true);
      toast("Premium feature", {
        description: "AI Child Journey Insights unlock with Premium.",
      });
      return;
    }
    setLoading(true);
    setAnalysis(null);
    setStage(0);
    const interval = setInterval(() => {
      setStage((s) => Math.min(s + 1, stages.length - 1));
    }, 700);

    try {
      const res = await fetch("/api/ai/journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName: child.name,
          age: child.age,
          interests: child.interests,
          posts: posts.filter(
            (p) => !p.childIds || p.childIds.includes(child.id)
          ),
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setAnalysis(data.analysis);
      toast.success("Journey insights ready", {
        description: "Private to you — never used for public training.",
      });
    } catch {
      toast.error("Could not generate insights. Try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-10">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/50 border border-secondary/15">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
            AI Child Journey
          </span>
        </div>
        <h1 className="font-serif text-3xl tracking-tight text-deep-moss leading-none">
          What their week is{" "}
          <span className="text-secondary">really telling us</span>
        </h1>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Multimodal analysis of moments over time — developmental patterns,
          emotional climate, and personalized recommendations. Parent-controlled.
          Privacy-first.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {children.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setChildId(c.id);
              setAnalysis(null);
            }}
            className={cn(
              "flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition",
              childId === c.id
                ? "border-primary bg-primary-fixed/40"
                : "border-outline-variant bg-surface-container-lowest"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-sm font-semibold">{c.name}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={runJourney}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Analyzing journey…
          </>
        ) : (
          <>
            <Brain className="w-4 h-4" />
            {hasAiJourney ? `Generate ${child.name}'s Journey` : "Unlock with Premium"}
          </>
        )}
      </button>

      {loading && (
        <div className="insight-card p-5 animate-pulse-soft">
          <p className="text-sm font-medium text-deep-moss">{stages[stage]}</p>
          <div className="progress-bar mt-3">
            <span style={{ width: `${((stage + 1) / stages.length) * 100}%` }} />
          </div>
        </div>
      )}

      {analysis && (
        <div className="space-y-4 animate-fade-up">
          <section className="card-elevated p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Brain className="w-32 h-32" />
            </div>
            <h2 className="font-serif text-xl text-deep-moss flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Weekly Pulse
            </h2>
            <blockquote className="mt-3 font-serif text-base italic leading-relaxed text-on-surface glass-panel p-4 rounded-2xl border-l-4 border-terracotta-warm">
              {analysis.weeklyPulse}
            </blockquote>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-3 rounded-xl bg-secondary-container/25">
                <div className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                  Key milestone
                </div>
                <p className="text-sm font-semibold mt-1">{analysis.keyMilestone}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary-fixed/30">
                <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Emotional state
                </div>
                <p className="text-sm font-semibold mt-1">{analysis.emotionalState}</p>
              </div>
            </div>
          </section>

          <section className="card p-5">
            <h3 className="font-serif text-lg text-deep-moss mb-3">Growth dimensions</h3>
            {(
              [
                ["Cognitive", analysis.stats.cognitive, analysis.stats.cognitiveText],
                ["Social", analysis.stats.social, analysis.stats.socialText],
                ["Language", analysis.stats.language, analysis.stats.languageText],
              ] as const
            ).map(([label, value, text]) => (
              <div key={label} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{label}</span>
                  <span className="text-sage-green font-semibold tabular-nums">{value}%</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${value}%` }} />
                </div>
                <p className="text-xs text-on-surface-variant mt-1.5">{text}</p>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg text-deep-moss">Patterns detected</h3>
            {analysis.patterns.map((p) => (
              <div key={p.title} className="insight-card p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm">{p.title}</span>
                  <span className="badge badge-free capitalize">{p.strength}</span>
                </div>
                <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-lg text-deep-moss flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-terracotta-warm" />
              Personalized recommendations
            </h3>
            {analysis.recommendations.map((r) => (
              <div key={r.title} className="card p-4">
                <div className="font-semibold text-sm text-deep-moss">{r.title}</div>
                <p className="text-xs text-on-surface-variant mt-1">
                  <strong className="text-secondary">Why:</strong> {r.why}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  <strong className="text-primary">How:</strong> {r.how}
                </p>
              </div>
            ))}
          </section>

          <p className="text-[11px] text-center text-on-surface-variant flex items-start gap-2 justify-center px-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-sage-green" />
            {analysis.privacyNote}
          </p>
        </div>
      )}

      {!analysis && !loading && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg text-deep-moss">Recent insight previews</h3>
          {SAMPLE_INSIGHTS.map((insight) => {
            const locked = insight.premiumOnly && !hasAiJourney;
            return (
              <button
                key={insight.id}
                type="button"
                onClick={() => locked && setShowUpgrade(true)}
                className={cn(
                  "w-full text-left insight-card p-5",
                  locked && "opacity-75"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="badge badge-free capitalize">{insight.category}</span>
                    {insight.trend && (
                      <span className="flex items-center gap-1 text-sage-green text-sm font-medium">
                        <TrendingUp className="w-3.5 h-3.5" /> {insight.trend}
                      </span>
                    )}
                  </div>
                  {locked && (
                    <span className="badge badge-premium flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Premium
                    </span>
                  )}
                </div>
                <div className="font-serif text-xl tracking-tight mt-3 leading-tight">
                  {insight.title}
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-on-surface-variant">
                  {locked
                    ? insight.summary.slice(0, 80) + "…"
                    : insight.summary}
                </p>
              </button>
            );
          })}
          <p className="text-center text-xs text-on-surface-variant">
            Plan: <strong className="capitalize">{plan}</strong> · Insights never leave your control
          </p>
        </div>
      )}
    </div>
  );
}
