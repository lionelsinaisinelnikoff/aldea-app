"use client";

import { CARE_CIRCLES, VILLAGE_MEMBERS } from "@/lib/data/mock";
import { Users, Plus, BadgeCheck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { initials } from "@/lib/utils";

export default function CirclesPage() {
  return (
    <div className="p-4 space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="uppercase tracking-widest text-xs text-sage-green font-semibold">
            Your village
          </div>
          <h1 className="font-serif text-3xl tracking-tight text-deep-moss">
            Who shares in the joy
          </h1>
        </div>
        <button
          type="button"
          onClick={() =>
            toast("Invite to circle", {
              description: "Secure invite link generated for your selected circle.",
            })
          }
          className="btn btn-primary btn-sm"
        >
          <Plus className="w-4 h-4" /> Invite
        </button>
      </div>

      <section className="space-y-3">
        {CARE_CIRCLES.map((circle) => (
          <div key={circle.id} className="card p-5 flex gap-4 items-start bento-card">
            <div className="w-11 h-11 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-on-secondary-container" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium flex items-baseline gap-2 flex-wrap">
                {circle.name}
                <span className="text-xs font-normal text-on-surface-variant">
                  {circle.members.length} people
                </span>
              </div>
              <div className="text-sm text-on-surface-variant mt-1 leading-snug">
                {circle.description}
              </div>
              <div className="mt-2 badge badge-free">{circle.accessLevel}</div>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-serif text-xl text-deep-moss mb-3">Village members</h2>
        <div className="space-y-2">
          {VILLAGE_MEMBERS.map((m) => (
            <div key={m.id} className="card p-3 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.avatarUrl}
                alt={m.name}
                className="w-12 h-12 rounded-full object-cover bg-soft-cream"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm flex items-center gap-1">
                  {m.name}
                  {m.verified && (
                    <BadgeCheck className="w-4 h-4 text-sage-green" aria-label="Verified" />
                  )}
                </div>
                <div className="text-xs text-on-surface-variant">
                  {m.role}
                  {m.relation ? ` · ${m.relation}` : ""}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container text-[10px] font-bold flex items-center justify-center text-on-surface-variant">
                {initials(m.name)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-xs text-center text-on-surface-variant flex flex-col items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-sage-green" />
        You control exactly what each circle can see. Privacy is not a setting — it is
        the foundation.
      </div>
    </div>
  );
}
