"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAldea } from "@/context/AldeaContext";
import { CARE_CIRCLES } from "@/lib/data/mock";
import type { TimelinePost } from "@/lib/types";
import { Camera, Mic, Type, Palette, X, ShieldCheck, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const TYPES = [
  { id: "photo", label: "Photo", icon: Camera },
  { id: "video", label: "Video", icon: ImageIcon },
  { id: "note", label: "Note", icon: Type },
  { id: "voice", label: "Voice", icon: Mic },
  { id: "art", label: "Art", icon: Palette },
] as const;

export default function CreateMomentPage() {
  const router = useRouter();
  const { children, addPost, profile, role } = useAldea();
  const [type, setType] = useState<(typeof TYPES)[number]["id"]>("photo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedKids, setSelectedKids] = useState<string[]>([children[0]?.id].filter(Boolean));
  const [isPrivate, setIsPrivate] = useState(true);
  const [circleIds, setCircleIds] = useState<string[]>(["circle-family"]);
  const [submitting, setSubmitting] = useState(false);

  const toggleKid = (id: string) => {
    setSelectedKids((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const toggleCircle = (id: string) => {
    setCircleIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const submit = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Add a title and a short story for this moment.");
      return;
    }
    if (selectedKids.length === 0) {
      toast.error("Tag at least one child.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));

    const post: TimelinePost = {
      id: `post-${Date.now()}`,
      type: type === "note" ? "note" : "story",
      author: {
        name: profile.name,
        role: role === "educator" ? "Educator" : role === "admin" ? "Center Admin" : "Parent",
        avatarUrl: profile.avatarUrl,
        center: profile.centerName,
      },
      time: "Just now",
      title: title.trim(),
      description: description.trim(),
      imageUrl:
        type === "photo" || type === "art" || type === "video"
          ? "https://lh3.googleusercontent.com/aida-public/AB6AXuCjL3uI8VoTFBksO_97X6Kj08gnaljgymNS3AneMdyS74p5aitz3jthU7L6IUWlipLHM2AnxTaStRQthyFlcx0IxE7HRqc8jrguyDXOPU8l3YuNWy9wcLYMx1OdPJxeL0R67Pg_VnqSImii9YtXBZus_0AawfWmC7-b4vggwDUrJdgVSMJMZQyJP6am59vS1bO_zlue4A2TpOCf38AjZweO9HyLnLt5QLcXJA5anY0Jd91zAaaMr0otTTQ8HimO9y1J3zdX9a4jTJQd"
          : undefined,
      tags: [type.charAt(0).toUpperCase() + type.slice(1)],
      likes: 0,
      comments: 0,
      isPrivate,
      childIds: selectedKids,
      createdAt: new Date().toISOString(),
    };

    addPost(post);
    setSubmitting(false);
    toast.success("Moment shared securely", {
      description: "Broadcast only to the circles you selected.",
    });
    router.push("/");
  };

  return (
    <div className="min-h-full bg-surface-container-lowest">
      <div className="sticky top-0 z-10 bg-surface-container-lowest/95 backdrop-blur border-b border-outline-variant/40 px-4 h-14 flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-surface-container" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h1 className="font-serif text-lg font-semibold text-deep-moss">Create Moment</h1>
        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="btn btn-primary btn-sm"
        >
          {submitting ? "Sharing…" : "Share"}
        </button>
      </div>

      <div className="p-4 space-y-6 pb-28">
        <div className="shield w-fit">
          <ShieldCheck className="w-3.5 h-3.5" />
          End-to-end private vault · You choose the audience
        </div>

        <div>
          <label className="label-sm text-on-surface-variant uppercase">Type</label>
          <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar">
            {TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border min-w-[72px] transition",
                    type === t.id
                      ? "bg-secondary-container border-secondary/30 text-on-secondary-container"
                      : "bg-surface-container-lowest border-outline-variant text-on-surface-variant"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[11px] font-semibold">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="label-sm text-on-surface-variant uppercase">Tag children</label>
          <div className="flex gap-3 mt-2">
            {children.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleKid(c.id)}
                className={cn(
                  "flex flex-col items-center gap-1 p-1 rounded-2xl transition",
                  selectedKids.includes(c.id) && "ring-2 ring-primary ring-offset-2"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.avatarUrl} alt={c.name} className="w-14 h-14 rounded-full object-cover" />
                <span className="text-xs font-medium">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="title" className="label-sm text-on-surface-variant uppercase">
            Title
          </label>
          <input
            id="title"
            className="input mt-1.5"
            placeholder="A short, joyful title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="desc" className="label-sm text-on-surface-variant uppercase">
            Story
          </label>
          <textarea
            id="desc"
            className="input mt-1.5 min-h-[120px]"
            placeholder="What made this moment special?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="label-sm text-on-surface-variant uppercase">Share with circles</label>
          <div className="mt-2 space-y-2">
            {CARE_CIRCLES.map((c) => (
              <label
                key={c.id}
                className={cn(
                  "flex items-center gap-3 card p-3 cursor-pointer",
                  circleIds.includes(c.id) && "border-sage-green bg-secondary-container/20"
                )}
              >
                <input
                  type="checkbox"
                  checked={circleIds.includes(c.id)}
                  onChange={() => toggleCircle(c.id)}
                  className="accent-primary w-4 h-4"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-[11px] text-on-surface-variant">{c.accessLevel}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between card p-4 cursor-pointer">
          <div>
            <div className="text-sm font-medium">Private moment</div>
            <div className="text-xs text-on-surface-variant">Only selected circles can see this</div>
          </div>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="accent-primary w-5 h-5"
          />
        </label>

        <div
          className="rounded-2xl border-2 border-dashed border-outline-variant bg-soft-cream/50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-soft-cream transition"
          onClick={() => toast("Media picker", { description: "Camera / library opens in production." })}
        >
          <Camera className="w-8 h-8 text-primary mb-2" />
          <p className="text-sm font-medium text-deep-moss">Add photo or video</p>
          <p className="text-xs text-on-surface-variant mt-1">Demo uses a warm placeholder image</p>
        </div>
      </div>
    </div>
  );
}
