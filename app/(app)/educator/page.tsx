"use client";

import { useState } from "react";
import { useAldea } from "@/context/AldeaContext";
import type { EducatorBrief } from "@/lib/types";
import {
  BookOpen,
  Loader2,
  Sparkles,
  Users,
  ClipboardList,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import MomentCard from "@/components/moments/MomentCard";

export default function EducatorPage() {
  const { posts, likePost, profile, setRole } = useAldea();
  const [present, setPresent] = useState(12);
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState<EducatorBrief | null>(null);

  const runCopilot = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/educator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          className: "Little Sprouts",
          educatorName: profile.name,
          posts,
          presentCount: present,
          enrolledCount: 14,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setBrief(data.brief);
      toast.success("Educator Copilot ready");
    } catch {
      toast.error("Could not generate brief.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-10">
      <div>
        <div className="uppercase tracking-[1.5px] text-xs text-sage-green font-semibold">
          Educator view · {profile.centerName || "Willow Center"}
        </div>
        <h1 className="font-serif text-3xl tracking-tight text-deep-moss">
          Little Sprouts
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Class timeline, attendance, and AI-assisted parent communication.
        </p>
      </div>

      <div className="card p-5 bg-secondary-container/30 border-secondary/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-secondary">
              Attendance
            </div>
            <div className="font-serif text-4xl font-bold mt-1">
              {present} <span className="text-xl text-on-surface-variant">/ 14</span>
            </div>
          </div>
          <div className="flex gap-1 bg-white/60 p-1 rounded-full border border-outline-variant/30">
            <button
              type="button"
              onClick={() => setPresent((p) => Math.max(0, p - 1))}
              className="w-8 h-8 rounded-full hover:bg-soft-cream font-bold"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => setPresent((p) => Math.min(14, p + 1))}
              className="w-8 h-8 rounded-full hover:bg-soft-cream font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={runCopilot}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Generating brief…
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Educator Copilot · Daily brief
          </>
        )}
      </button>

      {brief && (
        <div className="space-y-4 animate-fade-up">
          <section className="card-elevated p-5">
            <h2 className="font-serif text-lg text-deep-moss flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sage-green" />
              Daily summary
            </h2>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              {brief.dailySummary}
            </p>
            <p className="text-xs text-sage-green mt-3 font-medium">{brief.attendanceNote}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg text-deep-moss flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Parent communication drafts
            </h3>
            {brief.parentDrafts.map((d, i) => (
              <div key={i} className="card p-4">
                <div className="text-xs font-semibold text-secondary">
                  To {d.parentName} · re: {d.childName}
                </div>
                <p className="text-sm mt-2 leading-relaxed text-on-surface-variant">{d.draft}</p>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost mt-2 px-0 text-primary"
                  onClick={() => {
                    navigator.clipboard?.writeText(d.draft);
                    toast.success("Draft copied");
                  }}
                >
                  <Copy className="w-3.5 h-3.5" /> Copy draft
                </button>
              </div>
            ))}
          </section>

          <section className="card p-4">
            <h3 className="font-medium text-sm mb-2">Suggested next activities</h3>
            <ul className="space-y-1.5">
              {brief.nextActivities.map((a) => (
                <li key={a} className="text-sm text-on-surface-variant flex gap-2">
                  <span className="text-terracotta-warm">→</span> {a}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      <section>
        <h3 className="font-serif text-lg text-deep-moss mb-3 flex items-center gap-2">
          <Users className="w-5 h-5" /> Class timeline
        </h3>
        <div className="space-y-4">
          {posts.slice(0, 3).map((p) => (
            <MomentCard key={p.id} post={p} onLike={likePost} />
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() => setRole("admin")}
        className="btn btn-secondary w-full"
      >
        Open Center Admin dashboard
      </button>
    </div>
  );
}
