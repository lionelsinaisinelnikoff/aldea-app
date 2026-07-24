"use client";

import Highlights from "@/components/moments/Highlights";
import MomentCard from "@/components/moments/MomentCard";
import { useAldea } from "@/context/AldeaContext";
import { CALENDAR_EVENTS } from "@/lib/data/mock";
import { Calendar, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HomeTimelinePage() {
  const {
    posts,
    likePost,
    role,
    profile,
    children,
    hasAiJourney,
    setShowUpgrade,
  } = useAldea();

  const greeting =
    new Date().getHours() < 12
      ? "Good morning"
      : new Date().getHours() < 18
        ? "Good afternoon"
        : "Good evening";

  return (
    <div className="px-4 pt-4 pb-8 space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[1.5px] text-sage-green font-semibold">
            {greeting}, {profile.name.split(" ")[0]}
          </div>
          <h1 className="font-serif text-[28px] tracking-tight text-deep-moss leading-tight">
            {role === "educator" || role === "admin"
              ? "Little Sprouts"
              : `${children.map((c) => c.name).join(" & ")}'s Village`}
          </h1>
        </div>
        <div className="shield shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
          Private
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { value: "14", label: "moments today", color: "text-primary" },
          { value: "7", label: "circle active", color: "text-sage-green" },
          { value: "3", label: "milestones", color: "text-terracotta-warm" },
        ].map((s) => (
          <div key={s.label} className="card p-3 text-center">
            <div className={`text-2xl font-semibold tabular-nums ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-on-surface-variant mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <Highlights />

      {(role === "educator" || role === "admin") && (
        <div className="card p-4 bg-secondary-container/25 border-secondary/15">
          <div className="text-[10px] uppercase tracking-wider font-bold text-secondary">
            Educator quick log
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["Nap", "Meal", "Learning", "Outdoor"].map((q) => (
              <Link key={q} href="/create" className="btn btn-sm btn-tertiary">
                {q}
              </Link>
            ))}
            <Link href="/educator" className="btn btn-sm btn-secondary">
              Class view
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <MomentCard key={post.id} post={post} onLike={likePost} />
        ))}
      </div>

      <section className="card p-4">
        <div className="flex items-center gap-2 text-deep-moss font-medium text-sm mb-3">
          <Calendar className="w-4 h-4 text-sage-green" />
          Upcoming in the village
        </div>
        <div className="space-y-2">
          {CALENDAR_EVENTS.map((ev) => (
            <div key={ev.id} className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-xl bg-soft-cream flex flex-col items-center justify-center">
                <span className="text-[9px] font-bold text-primary">{ev.dateMonth}</span>
                <span className="font-serif text-lg leading-none">{ev.dateDay}</span>
              </div>
              <div>
                <div className="text-sm font-medium">{ev.title}</div>
                <div className="text-xs text-on-surface-variant">
                  {ev.time} · {ev.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {!hasAiJourney && (
        <button
          type="button"
          onClick={() => setShowUpgrade(true)}
          className="w-full text-left card p-5 bg-gradient-to-br from-secondary-container/50 to-surface-container border-outline-variant"
        >
          <div className="flex items-center gap-2 text-sage-green text-[10px] font-bold tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            PREMIUM FEATURE
          </div>
          <div className="font-serif text-xl tracking-tight mt-1 text-deep-moss">
            See the full story of their week
          </div>
          <p className="text-sm mt-1 text-on-surface-variant leading-relaxed">
            Unlock AI Child Journey Insights, Family Assistant digests, and beautiful keepsakes.
          </p>
          <div className="mt-3 text-sm font-semibold text-primary">Upgrade to Premium →</div>
        </button>
      )}
    </div>
  );
}
