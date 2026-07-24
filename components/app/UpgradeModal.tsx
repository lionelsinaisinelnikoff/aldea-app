"use client";

import { useAldea } from "@/context/AldeaContext";
import { PARENT_PLANS } from "@/lib/pricing";
import type { PlanTier } from "@/lib/types";
import { ShieldCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function UpgradeModal() {
  const { showUpgrade, setShowUpgrade, plan, setPlan } = useAldea();

  if (!showUpgrade) return null;

  const select = (tier: PlanTier) => {
    setPlan(tier);
    setShowUpgrade(false);
    if (tier === "free") {
      toast.message("You're on Free", {
        description: "The core village stays rich and free — always.",
      });
    } else {
      toast.success(
        tier === "premium" ? "Welcome to Premium" : "Welcome to Plus",
        {
          description:
            tier === "premium"
              ? "AI Child Journey, Family Assistant, and keepsakes are unlocked."
              : "Unlimited HD storage and smart albums are ready.",
        }
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end md:items-center justify-center bg-black/40 p-0 md:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-title"
      onClick={() => setShowUpgrade(false)}
    >
      <div
        className="modal w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl p-6 md:p-8 animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="shield mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Private · Cancel anytime · 30-day guarantee
            </div>
            <h2 id="upgrade-title" className="font-serif text-2xl tracking-tight text-deep-moss">
              Choose your village depth
            </h2>
            <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
              The core is always free. Premium turns scattered moments into a story
              you can feel — powered by privacy-first AI.
            </p>
          </div>
          <button
            onClick={() => setShowUpgrade(false)}
            className="p-2 rounded-full hover:bg-surface-container"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {PARENT_PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => select(p.id as PlanTier)}
              className={cn(
                "w-full text-left card p-4 transition-all",
                p.highlighted && "border-2 border-primary shadow-sm",
                plan === p.id && "ring-2 ring-sage-green"
              )}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-on-surface">{p.name}</span>
                  {p.highlighted && (
                    <span className="badge badge-premium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Best value
                    </span>
                  )}
                  {plan === p.id && (
                    <span className="badge badge-free">Current</span>
                  )}
                </div>
                <span className="text-sm font-medium text-primary whitespace-nowrap">
                  {p.priceLabel}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5">{p.description}</p>
              <ul className="mt-2 space-y-1">
                {p.features.slice(0, 4).map((f) => (
                  <li key={f} className="text-xs text-on-surface-variant flex gap-1.5">
                    <span className="text-sage-green">✓</span> {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <p className="text-center text-[10px] text-on-surface-variant mt-5">
          B2B center plans available under Center Admin · Never sold · Never trained on public models
        </p>
      </div>
    </div>
  );
}
