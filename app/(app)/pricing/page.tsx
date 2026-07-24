"use client";

import { useState } from "react";
import { PARENT_PLANS, B2B_PLANS } from "@/lib/pricing";
import { useAldea } from "@/context/AldeaContext";
import type { PlanTier } from "@/lib/types";
import { ShieldCheck, Building2, Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const { plan, setPlan, setShowUpgrade } = useAldea();
  const [audience, setAudience] = useState<"parent" | "b2b">("parent");
  const [yearly, setYearly] = useState(true);

  const plans = audience === "parent" ? PARENT_PLANS : B2B_PLANS;

  const selectParent = (id: PlanTier) => {
    setPlan(id);
    toast.success(
      id === "free" ? "On Free plan" : `Upgraded to ${id === "plus" ? "Plus" : "Premium"}`,
      {
        description:
          id === "premium"
            ? "AI Journey & Family Assistant unlocked."
            : id === "plus"
              ? "Unlimited storage unlocked."
              : "Core village remains fully free.",
      }
    );
  };

  return (
    <div className="p-4 space-y-6 pb-10">
      <div>
        <div className="uppercase tracking-[1.5px] text-xs text-sage-green font-semibold">
          Hybrid B2B2C
        </div>
        <h1 className="font-serif text-3xl tracking-tight text-deep-moss">
          Pricing that protects the village
        </h1>
        <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
          Free core for network effects. Premium AI for parents who want deeper
          insight. B2B subscriptions fund the centers that make the village real.
        </p>
      </div>

      <div className="flex bg-surface-container rounded-full p-1">
        <button
          type="button"
          onClick={() => setAudience("parent")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-sm font-semibold transition",
            audience === "parent"
              ? "bg-surface-container-lowest shadow-sm text-primary"
              : "text-on-surface-variant"
          )}
        >
          <Heart className="w-4 h-4" /> Families
        </button>
        <button
          type="button"
          onClick={() => setAudience("b2b")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-sm font-semibold transition",
            audience === "b2b"
              ? "bg-surface-container-lowest shadow-sm text-primary"
              : "text-on-surface-variant"
          )}
        >
          <Building2 className="w-4 h-4" /> Centers
        </button>
      </div>

      {audience === "parent" && (
        <div className="flex justify-center">
          <div className="inline-flex bg-surface-container rounded-full p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "px-4 py-1.5 rounded-full",
                !yearly && "bg-white shadow-sm text-primary"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={cn(
                "px-4 py-1.5 rounded-full",
                yearly && "bg-white shadow-sm text-primary"
              )}
            >
              Yearly · save ~15%
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={cn(
              "card p-5",
              p.highlighted && "border-2 border-primary shadow-md"
            )}
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="font-semibold text-lg flex items-center gap-2">
                  {p.name}
                  {p.highlighted && (
                    <span className="badge badge-premium">Recommended</span>
                  )}
                  {audience === "parent" && plan === p.id && (
                    <span className="badge badge-free">Current</span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant mt-1">{p.description}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-semibold text-primary">
                  {audience === "parent" && p.monthlyPrice != null
                    ? yearly && p.yearlyPrice
                      ? `$${p.yearlyPrice}/yr`
                      : p.monthlyPrice === 0
                        ? "Free"
                        : `$${p.monthlyPrice}/mo`
                    : p.priceLabel}
                </div>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5">
              {p.features.map((f) => (
                <li key={f} className="text-xs text-on-surface-variant flex gap-1.5">
                  <span className="text-sage-green shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={cn(
                "btn w-full mt-4",
                p.highlighted ? "btn-primary" : "btn-secondary"
              )}
              onClick={() => {
                if (audience === "parent") {
                  selectParent(p.id as PlanTier);
                } else {
                  toast("B2B inquiry", {
                    description: `${p.name}: our team will follow up for a pilot.`,
                  });
                }
              }}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="shield w-full justify-center text-center">
        <ShieldCheck className="w-4 h-4" />
        30-day money back · Cancel anytime · Never sell child data
      </div>

      <button
        type="button"
        onClick={() => setShowUpgrade(true)}
        className="btn btn-ghost w-full text-sm"
      >
        Open quick upgrade sheet
      </button>
    </div>
  );
}
