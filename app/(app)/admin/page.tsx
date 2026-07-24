"use client";

import { CENTER_METRICS } from "@/lib/data/mock";
import { B2B_PLANS } from "@/lib/pricing";
import {
  Users,
  TrendingUp,
  Clock,
  ShieldCheck,
  Image as ImageIcon,
  MessageCircle,
  CreditCard,
  FileBarChart,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminDashboard() {
  const m = CENTER_METRICS;

  const metrics = [
    {
      label: "Children present",
      value: String(m.childrenPresent),
      sub: `of ${m.childrenEnrolled} enrolled`,
      icon: Users,
    },
    {
      label: "Parent engagement",
      value: `${m.parentEngagement}%`,
      sub: `+${m.engagementDelta}% vs last week`,
      icon: TrendingUp,
    },
    {
      label: "Avg. response time",
      value: `${m.avgResponseMins}m`,
      sub: "to new moments",
      icon: Clock,
    },
    {
      label: "Compliance score",
      value: String(m.complianceScore),
      sub: "This month",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="p-4 space-y-6 pb-10">
      <div>
        <div className="uppercase tracking-[1.5px] text-xs text-sage-green font-semibold">
          Willow Center · Admin
        </div>
        <h1 className="font-serif text-3xl tracking-tight text-deep-moss">
          Today at a glance
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          B2B operations, engagement ROI, and billing overview.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {metrics.map((item) => (
          <div key={item.label} className="card p-4">
            <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
              <item.icon className="w-3.5 h-3.5" /> {item.label}
            </div>
            <div className="font-serif text-3xl tracking-tight mt-1">{item.value}</div>
            <div className="text-xs text-sage-green mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="card p-4">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <ImageIcon className="w-3.5 h-3.5" /> Moments today
          </div>
          <div className="font-serif text-3xl mt-1">{m.momentsToday}</div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <MessageCircle className="w-3.5 h-3.5" /> Open messages
          </div>
          <div className="font-serif text-3xl mt-1">{m.openMessages}</div>
        </div>
      </div>

      <div className="card p-5">
        <div className="font-medium mb-3">Quick actions</div>
        <div className="grid grid-cols-1 gap-2 text-sm">
          {[
            "Post bulk update to all families",
            "Generate daily reports",
            "Send private note to a parent",
            "Review flagged moments",
            "Export compliance pack",
          ].map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toast.success(a, { description: "Queued for demo." })}
              className="bg-surface-container px-4 py-3 rounded-xl text-left hover:bg-surface-container-high transition"
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <section className="card p-5">
        <div className="flex items-center gap-2 font-medium mb-1">
          <CreditCard className="w-4 h-4 text-primary" />
          Billing overview
        </div>
        <p className="text-xs text-on-surface-variant mb-4">
          Current plan: <span className="badge badge-b2b ml-1">Growth</span> ·{" "}
          {m.childrenEnrolled} enrolled · Est. $2.50 / child / mo
        </p>
        <div className="space-y-2">
          {B2B_PLANS.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className={`p-3 rounded-xl border ${
                p.highlighted
                  ? "border-primary bg-primary-fixed/20"
                  : "border-outline-variant"
              }`}
            >
              <div className="flex justify-between text-sm font-medium">
                <span>{p.name}</span>
                <span className="text-primary text-xs">{p.priceLabel}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">{p.description}</p>
            </div>
          ))}
        </div>
        <Link href="/pricing" className="btn btn-secondary btn-sm w-full mt-4">
          View full B2B & parent pricing
        </Link>
      </section>

      <section className="card p-5 bg-midnight-slate text-soft-cream">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileBarChart className="w-4 h-4 text-blush-clay" />
          Engagement ROI snapshot
        </div>
        <p className="text-sm mt-2 text-soft-cream/80 leading-relaxed">
          Parent opens on moments are up {m.engagementDelta}% week-over-week.
          Families with Premium AI Journey show 2.4× more circle interactions —
          a strong retention signal for pilot reporting.
        </p>
      </section>

      <p className="text-xs text-center text-on-surface-variant">
        Verified Center Admins only · Audit logs · GDPR / UAE data-protection ready
      </p>
    </div>
  );
}
