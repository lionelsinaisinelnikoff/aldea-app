"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PlanTier, TimelinePost, UserRole } from "@/lib/types";
import {
  ADMIN_PROFILE,
  CHILDREN,
  EDUCATOR_PROFILE,
  INITIAL_POSTS,
  PARENT_PROFILE,
} from "@/lib/data/mock";
import { PLAN_FEATURE_GATES } from "@/lib/pricing";

interface AldeaContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
  plan: PlanTier;
  setPlan: (plan: PlanTier) => void;
  isPremium: boolean;
  hasAiJourney: boolean;
  hasFamilyAssistant: boolean;
  posts: TimelinePost[];
  setPosts: React.Dispatch<React.SetStateAction<TimelinePost[]>>;
  likePost: (id: string) => void;
  addPost: (post: TimelinePost) => void;
  showUpgrade: boolean;
  setShowUpgrade: (v: boolean) => void;
  onboarded: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  profile: typeof PARENT_PROFILE;
  children: typeof CHILDREN;
}

const AldeaContext = createContext<AldeaContextValue | null>(null);

const STORAGE_KEYS = {
  role: "aldea_role",
  plan: "aldea_plan",
  onboarded: "aldea_onboarded",
};

export function AldeaProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("parent");
  const [plan, setPlanState] = useState<PlanTier>("free");
  const [posts, setPosts] = useState<TimelinePost[]>(INITIAL_POSTS);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [onboarded, setOnboarded] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const r = localStorage.getItem(STORAGE_KEYS.role) as UserRole | null;
      const p = localStorage.getItem(STORAGE_KEYS.plan) as PlanTier | null;
      const o = localStorage.getItem(STORAGE_KEYS.onboarded);
      if (r && ["parent", "educator", "admin", "circle"].includes(r)) setRoleState(r);
      if (p && ["free", "plus", "premium"].includes(p)) setPlanState(p);
      if (o === "false") setOnboarded(false);
      if (o === null) setOnboarded(false);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.role, role);
      localStorage.setItem(STORAGE_KEYS.plan, plan);
      localStorage.setItem(STORAGE_KEYS.onboarded, String(onboarded));
    } catch {
      /* ignore */
    }
  }, [role, plan, onboarded, hydrated]);

  const setRole = useCallback((r: UserRole) => setRoleState(r), []);
  const setPlan = useCallback((p: PlanTier) => setPlanState(p), []);
  const completeOnboarding = useCallback(() => setOnboarded(true), []);
  const resetOnboarding = useCallback(() => setOnboarded(false), []);

  const likePost = useCallback((id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1,
            }
          : p
      )
    );
  }, []);

  const addPost = useCallback((post: TimelinePost) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const profile = useMemo(() => {
    if (role === "educator") return EDUCATOR_PROFILE;
    if (role === "admin") return ADMIN_PROFILE;
    return PARENT_PROFILE;
  }, [role]);

  const gates = PLAN_FEATURE_GATES[plan];

  const value: AldeaContextValue = {
    role,
    setRole,
    plan,
    setPlan,
    isPremium: plan === "premium",
    hasAiJourney: gates.aiJourney,
    hasFamilyAssistant: gates.familyAssistant,
    posts,
    setPosts,
    likePost,
    addPost,
    showUpgrade,
    setShowUpgrade,
    onboarded: hydrated ? onboarded : true,
    completeOnboarding,
    resetOnboarding,
    profile,
    children: CHILDREN,
  };

  return <AldeaContext.Provider value={value}>{children}</AldeaContext.Provider>;
}

export function useAldea() {
  const ctx = useContext(AldeaContext);
  if (!ctx) throw new Error("useAldea must be used within AldeaProvider");
  return ctx;
}
