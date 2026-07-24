// Aldea Core Types — aligned with AI Studio prototype + B2B2C business model

export type UserRole = "parent" | "educator" | "admin" | "circle";

export type PlanTier = "free" | "plus" | "premium";

export type B2BTier = "starter" | "growth" | "premium" | "enterprise";

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
  email?: string;
  centerName?: string;
}

export interface Child {
  id: string;
  name: string;
  age: string;
  avatarUrl: string;
  birthdate?: string;
  interests?: string[];
}

export interface HighlightStory {
  id: string;
  title: string;
  imageUrl: string;
  hasVideo?: boolean;
}

export interface TimelinePost {
  id: string;
  type: "story" | "alert" | "note" | "action";
  author: {
    name: string;
    role: string;
    avatarUrl: string;
    center?: string;
  };
  time: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  likes: number;
  comments: number;
  isPrivate?: boolean;
  childIds?: string[];
  createdAt: string;
  liked?: boolean;
}

export interface CareCircle {
  id: string;
  name: string;
  description: string;
  accessLevel: "Full Access" | "View & Post" | "Limited View" | "View Only";
  members: Array<{
    name: string;
    avatarUrl?: string;
    initials?: string;
  }>;
  bgColor: string;
  iconName?: string;
}

export interface VillageMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  verified: boolean;
  relation?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  dateDay: number;
  dateMonth: string;
  time: string;
  location: string;
}

export interface DevelopmentalStats {
  cognitive: number;
  cognitiveText: string;
  social: number;
  socialText: string;
  language: number;
  languageText: string;
}

export interface Insight {
  id: string;
  title: string;
  summary: string;
  category: "milestone" | "emotion" | "learning" | "social" | "health" | "language" | "wellbeing";
  trend?: string;
  confidence: number;
  date: string;
  premiumOnly: boolean;
  recommendations?: string[];
  evidenceMoments?: string[];
}

export interface MomentDraft {
  type: "photo" | "video" | "voice" | "note" | "art";
  title: string;
  description: string;
  tags: string[];
  isPrivate: boolean;
  childIds: string[];
  circleIds: string[];
}

export interface JourneyAnalysis {
  childName: string;
  weeklyPulse: string;
  keyMilestone: string;
  emotionalState: string;
  stats: DevelopmentalStats;
  patterns: Array<{ title: string; detail: string; strength: "emerging" | "strong" | "consistent" }>;
  recommendations: Array<{ title: string; why: string; how: string }>;
  privacyNote: string;
  generatedAt: string;
}

export interface FamilyDigest {
  weekLabel: string;
  summary: string;
  highlights: string[];
  coordination: Array<{ title: string; detail: string; action?: string }>;
  suggestedMessages: string[];
  generatedAt: string;
}

export interface EducatorBrief {
  className: string;
  dailySummary: string;
  parentDrafts: Array<{ parentName: string; childName: string; draft: string }>;
  attendanceNote: string;
  nextActivities: string[];
  generatedAt: string;
}

export interface PricingPlan {
  id: PlanTier | B2BTier;
  name: string;
  audience: "parent" | "b2b";
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  priceLabel: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export interface CenterMetrics {
  childrenPresent: number;
  childrenEnrolled: number;
  parentEngagement: number;
  engagementDelta: number;
  avgResponseMins: number;
  complianceScore: number;
  momentsToday: number;
  openMessages: number;
}
