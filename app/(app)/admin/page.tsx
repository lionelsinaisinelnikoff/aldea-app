"use client";

import React from 'react';
import { Users, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-4 space-y-6">
      <div>
        <div className="uppercase tracking-[1.5px] text-xs text-sage-green font-semibold">WILLOW CENTER • ADMIN</div>
        <div className="font-serif text-2xl tracking-tight mt-1">Today at a glance</div>
      </div>

      {/* B2B Metrics — Real operational value */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Children present", value: "47", sub: "of 62 enrolled", icon: Users },
          { label: "Parent engagement", value: "89%", sub: "+12% vs last week", icon: TrendingUp },
          { label: "Avg. response time", value: "14m", sub: "to new moments", icon: Clock },
          { label: "Compliance score", value: "99.4", sub: "This month", icon: ShieldCheck },
        ].map((m, i) => (
          <div key={i} className="card p-4">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <m.icon className="w-3.5 h-3.5" /> {m.label}
            </div>
            <div className="font-serif text-4xl tracking-[-1.5px] mt-1">{m.value}</div>
            <div className="text-xs text-sage-green mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <div className="font-medium mb-3">Quick Educator Actions</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {["Post bulk update to all families", "Generate daily reports", "Send private note to a parent", "Review flagged moments"].map((a, i) => (
            <div key={i} className="bg-surface-container px-4 py-3 rounded-xl active:bg-surface-container-high cursor-pointer">{a}</div>
          ))}
        </div>
      </div>

      <div className="text-xs text-center text-on-surface-variant pt-4">
        This view is only available to verified Center Admins. Full analytics, billing, and compliance tools available in paid tiers.
      </div>
    </div>
  );
}
