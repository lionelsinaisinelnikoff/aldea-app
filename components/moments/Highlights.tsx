"use client";

import { HIGHLIGHTS } from "@/lib/data/mock";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Highlights() {
  const router = useRouter();

  return (
    <section className="mb-2" aria-label="Daily highlights">
      <div className="flex justify-between items-end mb-3 px-1">
        <h2 className="font-serif font-bold text-base text-deep-moss">Daily Highlights</h2>
        <button
          type="button"
          onClick={() => toast("All highlights", { description: "Full story archive opens here." })}
          className="text-primary font-bold text-xs hover:underline"
        >
          View all
        </button>
      </div>

      <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2">
        {HIGHLIGHTS.map((story) => (
          <button
            key={story.id}
            type="button"
            onClick={() =>
              toast(story.title, { description: "Playing private highlight story…" })
            }
            className="flex-shrink-0 w-[76px] group text-left"
          >
            <div className="relative p-0.5 rounded-full border-2 border-terracotta-warm mb-1.5 group-active:scale-95 transition-transform bg-white shadow-sm">
              <div className="aspect-square rounded-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {story.hasVideo && (
                <div className="absolute bottom-0 right-0 bg-terracotta-warm rounded-full w-5 h-5 flex items-center justify-center border-2 border-surface">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <p className="text-center text-[10px] font-semibold text-on-surface-variant truncate">
              {story.title}
            </p>
          </button>
        ))}

        <button
          type="button"
          onClick={() => router.push("/create")}
          className="flex-shrink-0 w-[76px] flex flex-col items-center"
        >
          <div className="aspect-square w-[72px] rounded-full bg-surface-container border-2 border-dashed border-outline-variant flex items-center justify-center mb-1.5 hover:bg-soft-cream transition-colors">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <p className="text-center text-[10px] font-semibold text-on-surface-variant">Add Story</p>
        </button>
      </div>
    </section>
  );
}
