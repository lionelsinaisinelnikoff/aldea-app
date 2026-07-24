"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Sparkles,
  User,
  Users,
  BarChart3,
  Plus,
  Bot,
  Baby,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAldea } from "@/context/AldeaContext";
import UpgradeModal from "./UpgradeModal";
import type { UserRole } from "@/lib/types";

const tabs: Array<{
  href: string;
  label: string;
  icon: typeof Home;
  roles: UserRole[];
}> = [
  { href: "/", label: "Home", icon: Home, roles: ["parent", "educator", "admin", "circle"] },
  { href: "/insights", label: "Insights", icon: Sparkles, roles: ["parent", "educator", "circle"] },
  { href: "/assistant", label: "Assistant", icon: Bot, roles: ["parent", "circle"] },
  { href: "/kids", label: "Kids", icon: Baby, roles: ["parent", "circle"] },
  { href: "/circles", label: "Village", icon: Users, roles: ["parent", "educator", "circle"] },
  { href: "/educator", label: "Class", icon: Users, roles: ["educator"] },
  { href: "/admin", label: "Center", icon: BarChart3, roles: ["educator", "admin"] },
  { href: "/profile", label: "Me", icon: User, roles: ["parent", "educator", "admin", "circle"] },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    setRole,
    plan,
    setShowUpgrade,
    profile,
  } = useAldea();

  const visibleTabs = tabs.filter((tab) => tab.roles.includes(role)).slice(0, 5);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-[480px] mx-auto relative border-x border-outline-variant/30 shadow-xl md:my-0">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 px-3 h-14 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-outline-variant/40 shrink-0 bg-soft-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/aldea-logo.png"
              alt="Aldea"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <span className="font-serif text-lg tracking-tight font-semibold text-deep-moss">
              aldea
            </span>
            <p className="text-[9px] text-on-surface-variant truncate uppercase tracking-wider">
              {profile.name.split(" ")[0]} · {role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-surface-container rounded-full p-0.5 text-[10px] shrink-0">
          {(["parent", "educator", "admin"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "px-2 py-1 rounded-full font-semibold transition-all capitalize",
                role === r
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {r === "educator" ? "Teacher" : r === "admin" ? "Admin" : "Parent"}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowUpgrade(true)}
          className={cn(
            "text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0",
            plan === "premium"
              ? "badge-premium"
              : plan === "plus"
                ? "badge-plus"
                : "badge-free"
          )}
        >
          {plan === "free" ? "Free ↑" : plan === "plus" ? "Plus" : "Premium"}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 bg-surface">{children}</main>

      {/* FAB */}
      <button
        type="button"
        onClick={() => router.push("/create")}
        className="fixed bottom-[76px] right-[max(1.25rem,calc(50%-220px))] z-50 w-14 h-14 rounded-2xl bg-terracotta-warm hover:bg-primary text-white flex items-center justify-center active:scale-95 transition-all"
        style={{ boxShadow: "0 10px 30px -10px rgb(157 62 32 / 0.45)" }}
        aria-label="Create moment"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Bottom tabs */}
      <nav className="tab-bar fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-50 h-[68px] flex items-center justify-around px-1 pb-safe">
        {visibleTabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href + tab.label}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold w-[18%] py-1.5 rounded-xl transition-all active:scale-95",
                active
                  ? "text-primary bg-secondary-container/50"
                  : "text-on-surface-variant"
              )}
            >
              <Icon className={cn("w-5 h-5", active && "text-primary")} strokeWidth={active ? 2.4 : 2} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Trust strip on first paint */}
      <div className="sr-only" aria-live="polite">
        <ShieldCheck /> Aldea is private by design.
      </div>

      <UpgradeModal />
    </div>
  );
}
