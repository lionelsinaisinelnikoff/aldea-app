"use client";

import { useState } from "react";
import { useAldea } from "@/context/AldeaContext";
import { CARE_CIRCLES } from "@/lib/data/mock";
import { Heart, Users, ShieldCheck, ChevronRight } from "lucide-react";
import { cn, initials } from "@/lib/utils";
import Link from "next/link";

export default function KidsProfilePage() {
  const { children, posts } = useAldea();
  const [activeId, setActiveId] = useState(children[0]?.id);
  const child = children.find((c) => c.id === activeId) || children[0];
  const kidPosts = posts.filter(
    (p) => p.childIds?.includes(child.id) || p.type === "story"
  ).slice(0, 4);

  return (
    <div className="p-4 space-y-6 pb-10">
      <div>
        <div className="uppercase tracking-[1.5px] text-xs text-sage-green font-semibold">
          Kid profiles
        </div>
        <h1 className="font-serif text-3xl tracking-tight text-deep-moss">
          Their little world
        </h1>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {children.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveId(c.id)}
            className={cn(
              "flex-shrink-0 w-28 text-center p-3 rounded-2xl border transition",
              activeId === c.id
                ? "border-primary bg-primary-fixed/30"
                : "border-outline-variant bg-surface-container-lowest"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.avatarUrl}
              alt={c.name}
              className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-sage-green/40"
            />
            <div className="font-semibold text-sm mt-2">{c.name}</div>
            <div className="text-[10px] text-on-surface-variant">{c.age}</div>
          </button>
        ))}
      </div>

      <section className="card-elevated p-5">
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={child.avatarUrl}
            alt={child.name}
            className="w-20 h-20 rounded-[1.25rem] object-cover"
          />
          <div className="flex-1">
            <h2 className="font-serif text-2xl text-deep-moss">{child.name}</h2>
            <p className="text-sm text-on-surface-variant">{child.age}</p>
            {child.interests && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {child.interests.map((i) => (
                  <span key={i} className="badge badge-free">
                    {i}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-surface-container rounded-xl p-2">
            <div className="font-semibold text-primary">{kidPosts.length}+</div>
            <div className="text-[10px] text-on-surface-variant">moments</div>
          </div>
          <div className="bg-surface-container rounded-xl p-2">
            <div className="font-semibold text-sage-green">{CARE_CIRCLES.length}</div>
            <div className="text-[10px] text-on-surface-variant">circles</div>
          </div>
          <div className="bg-surface-container rounded-xl p-2">
            <div className="font-semibold text-terracotta-warm">99%</div>
            <div className="text-[10px] text-on-surface-variant">private</div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-lg text-deep-moss flex items-center gap-2">
            <Users className="w-5 h-5 text-sage-green" />
            Care circles
          </h3>
          <Link href="/circles" className="text-xs font-semibold text-primary flex items-center gap-0.5">
            Manage <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2">
          {CARE_CIRCLES.map((circle) => (
            <div key={circle.id} className="card p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-terracotta-warm" />
                    {circle.name}
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                    {circle.description}
                  </p>
                </div>
                <span className="badge badge-free shrink-0">{circle.accessLevel}</span>
              </div>
              <div className="flex -space-x-2 mt-3">
                {circle.members.map((m, i) =>
                  m.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-secondary-container text-[10px] font-bold flex items-center justify-center text-on-secondary-container"
                    >
                      {m.initials || initials(m.name)}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="shield w-full justify-center">
        <ShieldCheck className="w-3.5 h-3.5" />
        You control every circle&apos;s access — privacy is the foundation
      </div>
    </div>
  );
}
