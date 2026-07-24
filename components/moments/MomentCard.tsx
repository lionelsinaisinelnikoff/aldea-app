"use client";

import type { TimelinePost } from "@/lib/types";
import { Heart, MessageCircle, MoreHorizontal, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MomentCardProps {
  post: TimelinePost;
  onLike?: (id: string) => void;
}

export default function MomentCard({ post, onLike }: MomentCardProps) {
  return (
    <article className="moment-card animate-fade-up">
      <div className="px-4 pt-4 pb-3 flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.author.avatarUrl}
          alt=""
          className="w-10 h-10 rounded-full ring-2 ring-sage-green/30 object-cover bg-soft-cream"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-semibold text-sm text-on-surface">{post.author.name}</span>
            <span className="text-[11px] text-on-surface-variant">{post.author.role}</span>
            <span className="text-[11px] text-on-surface-variant ml-auto">{post.time}</span>
          </div>
          {post.author.center && (
            <p className="text-[10px] text-sage-green font-medium mt-0.5">{post.author.center}</p>
          )}
          <h3 className="font-serif text-[17px] tracking-tight mt-1.5 leading-snug text-deep-moss">
            {post.title}
          </h3>
        </div>
      </div>

      {post.imageUrl && (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full aspect-[16/10] object-cover bg-surface-container"
          />
          {post.isPrivate && (
            <div className="absolute top-3 right-3 badge bg-midnight-slate/70 text-soft-cream text-[10px] gap-1">
              <Lock className="w-3 h-3" /> Private
            </div>
          )}
        </div>
      )}

      <div className="px-4 py-4">
        <p className="text-[15px] leading-relaxed text-on-surface-variant">{post.description}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((t) => (
              <span
                key={t}
                className="badge bg-secondary-container/60 text-on-secondary-container"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-5 mt-4 text-sm text-on-surface-variant">
          <button
            type="button"
            onClick={() => onLike?.(post.id)}
            className={cn(
              "flex items-center gap-1.5 transition active:scale-95",
              post.liked && "text-primary"
            )}
            aria-label={post.liked ? "Unlike" : "Like"}
          >
            <Heart className={cn("w-4 h-4", post.liked && "fill-primary")} />
            {post.likes}
          </button>
          <button type="button" className="flex items-center gap-1.5" aria-label="Comments">
            <MessageCircle className="w-4 h-4" /> {post.comments}
          </button>
          <button type="button" className="ml-auto p-1" aria-label="More">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
