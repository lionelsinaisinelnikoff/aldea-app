"use client";

import React, { useState, useEffect } from 'react';
import AppShell from '@/components/app/AppShell';
import { TimelinePost, Child } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { toast } from 'sonner';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';

// Mock data (ported & adapted from the AI Studio prototype for visual fidelity)
const INITIAL_POSTS: TimelinePost[] = [
  {
    id: "p1",
    type: "story",
    author: { name: "Maria Solano", role: "Lead Educator", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7iRRnxzNSjnh5ZH0_HUpW4EH8Y6DtJi74FWe-jO2kO6jLlnf4tGY5mk0b7snan_ulFpn0aCJkm_jC09-_djOUEMB42Pgf0KTjMZ2VBdWNTsNS2tJbB3qqqwAyGzf4vNuV4hJitC0lRcfiL2SwLG_x2lToQ02-D3o9Lpd735JqEcx_71Hjgw_oKBejgRZxzSbJWJQ8qjhuDG4eyCbjoyLoOefp-i1OFCas2hgaBBRWTnl8O4_cgMeGu0aueoTKPvGH8QqagEAyKcH", center: "Willow Center" },
    time: "2h ago",
    title: "Finger Painting Earth Tones",
    description: "Maya was completely absorbed exploring how terracotta and sage mixed into beautiful new earth tones. Her focus today was extraordinary.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjL3uI8VoTFBksO_97X6Kj08gnaljgymNS3AneMdyS74p5aitz3jthU7L6IUWlipLHM2AnxTaStRQthyFlcx0IxE7HRqc8jrguyDXOPU8l3YuNWy9wcLYMx1OdPJxeL0R67Pg_VnqSImii9YtXBZus_0AawfWmC7-b4vggwDUrJdgVSMJMZQyJP6am59vS1bO_zlue4A2TpOCf38AjZweO9HyLnLt5QLcXJA5anY0Jd91zAaaMr0otTTQ8HimO9y1J3zdX9a4jTJQd",
    likes: 31,
    comments: 9,
    isPrivate: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "p2",
    type: "story",
    author: { name: "Emma Mateo", role: "Parent", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl20N6HZ6rAIjp6LqDLTIWObJrv9AbKp62AmC5m0P9TSt8yW9FZx6LsccjIu50puDorRgl0hCAE4VSaA6VmwiKTXYZxiFwHu-ky5Y54jkDfQgRMMWDewbddquxV69LO1gR4EvNuPzILi4v8RI7QGCGfphPukjfIGaBY8vySMth73Nh8oPWNmvyL15HqTIBAGO23HVjBODgrDX6ag_f-7DttXptyZgIANFJjUjGiq6aW-nSFMN4rjrrwwvtUTGAoF-0ilIsycY6acAW" },
    time: "Yesterday",
    title: "Leo’s First Real Steps",
    description: "He walked from the couch to the kitchen table completely on his own. The look of pure joy on his face… I will never forget it.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiByWrrThfAKnKy7JUEW8jXhog_mbwbzonVpM5TCBrfRYxdAArHeacUgRdQ434ju2gYHwLjn14QfVXl-ZeIHYD9nrHDTGh0YE_0ORHUP-HUzfaU5B-Xh3doivo-SjcoPbvxHDLPim2pqnPRlIO-dsIB_TY63F46qlqsLmuxQGz-UqoThomop5lRnwyp6TnVRyDb0uoGfgW0H82ab9g2aG6E08o5RhCi-aXMinUyJW9Ygv-e_SQLukYM23HTZobt1XZ1WauPn45_kxy",
    likes: 48,
    comments: 17,
    isPrivate: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  }
];

const MOCK_CHILDREN: Child[] = [
  { id: "c1", name: "Maya", age: "4 years", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwbrk70Eh1h9Wcu4n3bVqp0v2fsFP5M1fwKYADXDiiMf3R0oiSxonbOJkKSROngXcMe34eFMedWtRbMBsIpoumFJLW54C6FACxO62wAE3e5xNFLfXSMduz1ZFQ8ygPIHGHnnxu4eW5t4XvP4LEow3PuUIQ8tzQXjMBb-GBjnKxm5CeIKfI0JolRj_QJQACEdMfM3-pzsqVfimZnVR6ILct_ktY0vH1-fX3uivU55q1qaCt9Kk6ISfAULCCIgn5fQRFk2hJ5YQgt7z6" },
  { id: "c2", name: "Leo", age: "2 years", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9X20pXvkDv1m6Ul7e9o4xx2OVApmZ6f5bv9CVSHryDv7qHXAmSjoljPKBlojejecGa-0KX9PSBdjZwjTG46_RtqWs5AyFTwTq51Y9_QWB1PwsG89BcXmT0WBjF8jCcrVYiIQ7V_7ToOKl-EMl6A_3q2SsLys4pQfTz2b2Ar3h5ELNP_pxg1uRhtNE1dNum-j0BNq2BkgPQe-dyJcEFT4bZAuN3bIE8oRYah_xb7YL3e_-cKnjgvn0KpX9Y9sLtQs-8EzT9aU-tjWz" },
];

export default function AldeaApp() {
  const [currentRole, setCurrentRole] = useState<'parent' | 'educator' | 'admin'>('parent');
  const [isPremium, setIsPremium] = useState(false);
  const [posts, setPosts] = useState<TimelinePost[]>(INITIAL_POSTS);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Simple persistence for demo
  useEffect(() => {
    const savedRole = localStorage.getItem('aldea_role') as any;
    const savedPremium = localStorage.getItem('aldea_premium') === 'true';
    if (savedRole) setCurrentRole(savedRole);
    if (savedPremium) setIsPremium(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('aldea_role', currentRole);
    localStorage.setItem('aldea_premium', String(isPremium));
  }, [currentRole, isPremium]);

  const handleRoleChange = (role: 'parent' | 'educator' | 'admin') => {
    setCurrentRole(role);
    toast.success(`Switched to ${role} view`, { description: "This is a live demo of the hybrid B2B2C experience." });
  };

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleCreateMoment = () => {
    toast("Create Moment", { 
      description: "The rich composer from the AI Studio prototype will open here. (Full implementation in next iteration of this build)",
      action: { label: "Upgrade to unlock rich media", onClick: () => setShowUpgrade(true) }
    });
  };

  const handleUpgrade = () => {
    setIsPremium(true);
    setShowUpgrade(false);
    toast.success("Welcome to Premium", { 
      description: "You now have access to AI Child Journey Insights, unlimited storage, and beautiful keepsakes." 
    });
  };

  return (
    <AppShell
      currentRole={currentRole}
      onRoleChange={handleRoleChange}
      isPremium={isPremium}
      onUpgradeClick={() => setShowUpgrade(true)}
      onCreateMoment={handleCreateMoment}
    >
      {/* === HOME TIMELINE (Flagship screen - high visual fidelity) === */}
      <div className="px-4 pt-4 pb-8 space-y-4">
        {/* Welcome header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="text-xs uppercase tracking-[1.5px] text-sage-green font-semibold">GOOD MORNING, EMMA</div>
            <div className="font-serif text-3xl tracking-[-0.6px]">Maya &amp; Leo’s Village</div>
          </div>
          <div className="text-right text-xs text-on-surface-variant">
            {MOCK_CHILDREN.length} children • {currentRole}
          </div>
        </div>

        {/* Quick Stats Bar (warm & human) */}
        <div className="flex gap-2 text-sm">
          <div className="flex-1 card p-3 text-center">
            <div className="text-2xl font-semibold text-primary tabular-nums">14</div>
            <div className="text-[10px] text-on-surface-variant">moments today</div>
          </div>
          <div className="flex-1 card p-3 text-center">
            <div className="text-2xl font-semibold text-sage-green tabular-nums">7</div>
            <div className="text-[10px] text-on-surface-variant">circle members active</div>
          </div>
          <div className="flex-1 card p-3 text-center">
            <div className="text-2xl font-semibold text-blush-clay tabular-nums">3</div>
            <div className="text-[10px] text-on-surface-variant">milestones this week</div>
          </div>
        </div>

        {/* Timeline Feed — Beautiful, child-centric, from prototype aesthetic */}
        <div className="space-y-4 pt-2">
          {posts.map((post) => (
            <div key={post.id} className="moment-card">
              <div className="px-4 pt-4 pb-3 flex items-start gap-3">
                <img src={post.author.avatarUrl} className="w-9 h-9 rounded-full ring-1 ring-outline-variant/30 object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm">{post.author.name}</span>
                    <span className="text-xs text-on-surface-variant">{post.author.role}</span>
                    <span className="text-xs text-on-surface-variant ml-auto">{post.time}</span>
                  </div>
                  <div className="font-serif text-[17px] tracking-[-0.2px] mt-1 leading-tight">{post.title}</div>
                </div>
              </div>

              {post.imageUrl && (
                <div className="relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full aspect-[16/10] object-cover" 
                  />
                  {post.isPrivate && (
                    <div className="absolute top-3 right-3 badge bg-black/60 text-white text-[10px] px-2.5">Private</div>
                  )}
                </div>
              )}

              <div className="px-4 py-4">
                <p className="text-[15px] leading-snug text-on-surface-variant">{post.description}</p>

                <div className="flex items-center gap-5 mt-4 text-sm text-on-surface-variant">
                  <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 active:text-primary transition">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="ml-auto"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Free vs Premium Tease */}
        {!isPremium && (
          <div 
            onClick={() => setShowUpgrade(true)}
            className="card p-5 mt-6 bg-gradient-to-br from-secondary-container/60 to-surface-container cursor-pointer active:scale-[0.985] transition"
          >
            <div className="flex items-center gap-2 text-sage-green text-xs font-semibold tracking-widest">PREMIUM FEATURE PREVIEW</div>
            <div className="font-serif text-xl tracking-tight mt-1">See the full story of their week</div>
            <div className="text-sm mt-1 text-on-surface-variant">Unlock AI Child Journey Insights, smart albums, and unlimited beautiful keepsakes.</div>
            <div className="mt-4 text-sm font-medium text-primary">Tap to upgrade →</div>
          </div>
        )}
      </div>

      {/* Upgrade Modal (ties directly to business model pricing) */}
      {showUpgrade && (
        <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-surface-container-lowest w-full max-w-[480px] rounded-t-3xl md:rounded-3xl p-6 md:p-8 modal">
            <div className="font-serif text-2xl tracking-tight">Choose your village depth</div>
            <p className="text-on-surface-variant mt-1 text-sm">The core is always free. Premium turns scattered moments into a story you can feel.</p>

            <div className="mt-6 space-y-3">
              <div onClick={handleUpgrade} className="card p-4 border-2 border-primary cursor-pointer">
                <div className="flex justify-between"><div className="font-medium">Premium</div><div className="font-mono text-sm">$12.99/mo or $129/yr</div></div>
                <div className="text-xs text-on-surface-variant mt-1">AI Insights • Unlimited storage • Premium albums • Priority support</div>
              </div>
              <div onClick={handleUpgrade} className="card p-4 cursor-pointer">
                <div className="flex justify-between"><div className="font-medium">Plus</div><div className="font-mono text-sm">$6.99/mo or $69/yr</div></div>
                <div className="text-xs text-on-surface-variant mt-1">Smart albums • Unlimited HD backup • Print discounts</div>
              </div>
            </div>

            <button onClick={() => setShowUpgrade(false)} className="btn btn-ghost w-full mt-5">Maybe later</button>
            <div className="text-center text-[10px] text-on-surface-variant mt-4">30-day money back • Cancel anytime • 100% private</div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
