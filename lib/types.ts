// Aldea Core App Types — aligned with AI Studio prototype + Business Model

export type UserRole = 'parent' | 'educator' | 'admin';

export type PlanTier = 'free' | 'plus' | 'premium';

export interface Child {
  id: string;
  name: string;
  age: string;
  avatarUrl: string;
  birthdate?: string;
}

export interface TimelinePost {
  id: string;
  type: 'story' | 'alert' | 'note' | 'action';
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
  createdAt: string;
}

export interface CareCircle {
  id: string;
  name: string;
  description: string;
  accessLevel: string;
  members: Array<{
    name: string;
    avatarUrl?: string;
    initials?: string;
  }>;
  bgColor: string;
}

export interface Insight {
  id: string;
  title: string;
  summary: string;
  category: 'milestone' | 'emotion' | 'learning' | 'social' | 'health';
  confidence: number;
  date: string;
  premiumOnly: boolean;
}

export interface MomentDraft {
  type: 'photo' | 'video' | 'voice' | 'note' | 'art';
  title: string;
  description: string;
  tags: string[];
  isPrivate: boolean;
  childId: string;
}
