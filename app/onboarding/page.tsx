"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAldea } from "@/context/AldeaContext";
import type { UserRole } from "@/lib/types";
import {
  Heart,
  School,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Baby,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["welcome", "role", "privacy", "ready"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { setRole, completeOnboarding, setPlan } = useAldea();
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole>("parent");
  const [name, setName] = useState("Emma Mateo");

  const finish = () => {
    setRole(selectedRole);
    setPlan("free");
    completeOnboarding();
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-surface max-w-[480px] mx-auto flex flex-col px-6 py-10">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-outline-variant">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/aldea-logo.png" alt="Aldea" className="w-full h-full object-cover" />
        </div>
        <span className="font-serif text-2xl font-semibold text-deep-moss">aldea</span>
      </div>

      <div className="flex gap-1.5 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= step ? "bg-primary" : "bg-surface-container-high"
            )}
          />
        ))}
      </div>

      {step === 0 && (
        <div className="flex-1 flex flex-col animate-fade-up">
          <div className="organic-blob w-28 h-28 bg-secondary-container/60 mx-auto mb-8 flex items-center justify-center">
            <Baby className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="font-serif text-4xl tracking-tight text-deep-moss leading-tight text-center">
            It takes a village
          </h1>
          <p className="text-center text-on-surface-variant mt-4 leading-relaxed body-md">
            Aldea is a private, joyful digital village that connects parents,
            extended family, and educators around the child you love.
          </p>
          <div className="mt-auto pt-10">
            <button type="button" className="btn btn-primary w-full btn-lg" onClick={() => setStep(1)}>
              Begin <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex-1 flex flex-col animate-fade-up">
          <h1 className="font-serif text-3xl tracking-tight text-deep-moss">
            How will you join?
          </h1>
          <p className="text-sm text-on-surface-variant mt-2">
            You can switch roles anytime in this demo.
          </p>
          <input
            className="input mt-6"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
          />
          <div className="mt-4 space-y-3">
            {(
              [
                {
                  id: "parent" as const,
                  icon: Heart,
                  title: "Parent / Guardian",
                  desc: "Build the village, share moments, unlock AI journey insights.",
                },
                {
                  id: "educator" as const,
                  icon: School,
                  title: "Educator / Caregiver",
                  desc: "Class timeline, bulk moments, and Educator Copilot drafts.",
                },
                {
                  id: "admin" as const,
                  icon: Users,
                  title: "Center Admin",
                  desc: "Analytics, engagement ROI, billing, and compliance.",
                },
              ] as const
            ).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id)}
                className={cn(
                  "w-full text-left card p-4 flex gap-3 transition",
                  selectedRole === r.id && "border-2 border-primary bg-primary-fixed/20"
                )}
              >
                <div className="w-11 h-11 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0">
                  <r.icon className="w-5 h-5 text-on-secondary-container" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.title}</div>
                  <div className="text-xs text-on-surface-variant mt-0.5">{r.desc}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-auto pt-8 flex gap-2">
            <button type="button" className="btn btn-ghost flex-1" onClick={() => setStep(0)}>
              Back
            </button>
            <button type="button" className="btn btn-primary flex-1" onClick={() => setStep(2)}>
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-on-secondary-container" />
          </div>
          <h1 className="font-serif text-3xl tracking-tight text-deep-moss">
            Privacy is the foundation
          </h1>
          <ul className="mt-6 space-y-4">
            {[
              "You choose every circle and every audience for each moment.",
              "AI insights run only on content you authorize — never sold, never public training.",
              "Export or delete your family's vault anytime.",
              "Centers get engagement metrics — not your private family notes.",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-sm text-on-surface-variant leading-relaxed">
                <span className="text-sage-green font-bold shrink-0">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8 flex gap-2">
            <button type="button" className="btn btn-ghost flex-1" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className="btn btn-primary flex-1" onClick={() => setStep(3)}>
              I understand
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col animate-fade-up">
          <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center mb-4">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-serif text-3xl tracking-tight text-deep-moss">
            Welcome, {name.split(" ")[0]}
          </h1>
          <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
            You&apos;re starting on the <strong>Free</strong> plan — rich enough for
            the whole village. Premium unlocks AI Child Journey Insights and the
            Family Coordination Agent when you&apos;re ready.
          </p>
          <div className="card p-4 mt-6 bg-secondary-container/30">
            <div className="text-xs font-bold uppercase tracking-wider text-secondary">
              Demo tip
            </div>
            <p className="text-sm mt-1 text-on-surface-variant">
              Use the top role switcher to experience Parent, Teacher, and Center
              Admin views of the hybrid B2B2C model.
            </p>
          </div>
          <div className="mt-auto pt-8">
            <button type="button" className="btn btn-primary w-full btn-lg" onClick={finish}>
              Enter the village <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
