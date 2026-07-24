"use client";

import { useAldea } from "@/context/AldeaContext";
import {
  LogOut,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Bell,
  ChevronRight,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
  const {
    profile,
    plan,
    role,
    setShowUpgrade,
    children,
    resetOnboarding,
  } = useAldea();

  return (
    <div className="p-4 space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-outline-variant/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-xl text-deep-moss">{profile.name}</div>
          <div className="text-on-surface-variant text-sm capitalize">
            {role}
            {profile.centerName ? ` · ${profile.centerName}` : " · Parent of Maya & Leo"}
          </div>
          <div className="mt-1">
            <span
              className={
                plan === "premium"
                  ? "badge badge-premium"
                  : plan === "plus"
                    ? "badge badge-plus"
                    : "badge badge-free"
              }
            >
              {plan} plan
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-0 text-sm card overflow-hidden divide-y divide-outline-variant/40">
        <div className="flex justify-between py-3.5 px-4">
          <span>Children in village</span>
          <span className="font-medium">{children.length}</span>
        </div>
        <div className="flex justify-between py-3.5 px-4">
          <span>Circles you manage</span>
          <span className="font-medium">4</span>
        </div>
        <div className="flex justify-between py-3.5 px-4">
          <span>Memories stored</span>
          <span className="font-medium">1,284</span>
        </div>
        <div className="flex justify-between py-3.5 px-4">
          <span>AI features</span>
          <span className="font-medium text-primary">
            {plan === "premium" ? "Unlocked" : "Locked"}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setShowUpgrade(true)}
          className="btn btn-primary w-full"
        >
          <CreditCard className="w-4 h-4" />
          {plan === "premium" ? "Manage subscription" : "Upgrade to Premium"}
        </button>
        <Link href="/pricing" className="btn btn-secondary w-full">
          <Sparkles className="w-4 h-4" /> View Free / Plus / Premium & B2B
        </Link>
        <button
          type="button"
          onClick={() =>
            toast("Privacy controls", {
              description:
                "Export, delete, and consent management available. You own every memory.",
            })
          }
          className="btn btn-tertiary w-full"
        >
          <ShieldCheck className="w-4 h-4" /> Privacy & data controls
        </button>
        <button
          type="button"
          onClick={() => toast("Export started", { description: "ZIP of your vault is being prepared." })}
          className="btn btn-ghost w-full"
        >
          <Download className="w-4 h-4" /> Export my data
        </button>
        <button
          type="button"
          onClick={() => toast("Notifications", { description: "Smart defaults already on." })}
          className="w-full flex items-center justify-between px-4 py-3 text-sm text-on-surface-variant"
        >
          <span className="flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notification preferences
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => {
            resetOnboarding();
            toast.success("Signed out (demo)", {
              description: "Returning to onboarding…",
            });
            window.location.href = "/onboarding";
          }}
          className="btn btn-ghost w-full text-on-surface-variant"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      <div className="text-center text-[10px] text-on-surface-variant pt-4 space-y-1">
        <p>Aldea v1.0 · Joyful Modernism design system</p>
        <p>Built with care for every village · Privacy by design</p>
      </div>
    </div>
  );
}
