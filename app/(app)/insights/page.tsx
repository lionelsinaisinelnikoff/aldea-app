"use client";

import React, { useState } from 'react';
import { Sparkles, TrendingUp, Heart, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const INSIGHTS = [
  {
    id: 'i1',
    title: "Maya’s Language Explosion",
    summary: "Maya used 47 new words this week — a 38% increase. She is especially drawn to words describing texture and color (terracotta, moss, squishy).",
    category: "Language",
    trend: "+38%",
    premiumOnly: false,
  },
  {
    id: 'i2',
    title: "Leo’s Social Confidence Rising",
    summary: "Leo initiated play with two different peers three times this week. He is becoming noticeably more comfortable in group settings.",
    category: "Social",
    trend: "+21%",
    premiumOnly: true,
  },
  {
    id: 'i3',
    title: "Evening Calm Pattern",
    summary: "Both children show significantly calmer energy and better sleep on days with outdoor time before 3pm. This is a strong, repeatable pattern.",
    category: "Wellbeing",
    trend: "Strong",
    premiumOnly: true,
  },
];

export default function InsightsPage() {
  const [isPremium] = useState(false); // In real app this would come from global state

  const handleUnlock = () => {
    toast("Premium Feature", { description: "Upgrade in the main app to unlock full AI Child Journey Insights." });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-sage-green">
          <Sparkles className="w-4 h-4" />
          <span className="uppercase tracking-[2px] text-xs font-semibold">AI Child Journey</span>
        </div>
        <h1 className="font-serif text-3xl tracking-[-0.6px] mt-1">What their week is really telling us</h1>
        <p className="text-on-surface-variant mt-2 text-sm">Gentle, private insights generated only for you and the people you trust.</p>
      </div>

      <div className="space-y-4">
        {INSIGHTS.map((insight, index) => {
          const locked = insight.premiumOnly && !isPremium;
          return (
            <div 
              key={index} 
              className={`insight-card p-5 rounded-2xl ${locked ? 'opacity-60' : ''}`}
              onClick={locked ? handleUnlock : undefined}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-xs px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">{insight.category}</div>
                  <div className="flex items-center gap-1 text-sage-green text-sm font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> {insight.trend}
                  </div>
                </div>
                {locked && <div className="badge badge-premium text-[10px]">PREMIUM</div>}
              </div>

              <div className="font-serif text-xl tracking-tight mt-4 leading-tight">{insight.title}</div>
              <p className="mt-3 text-[15px] leading-relaxed text-on-surface-variant">{insight.summary}</p>

              {locked && (
                <div className="mt-5 text-sm text-primary font-medium flex items-center gap-2">
                  Unlock full insight + recommendations <Sparkles className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center text-xs text-on-surface-variant pt-4 border-t">
        Insights are generated privately on-device or in your secure vault.<br />Never used for training. Never shared.
      </div>
    </div>
  );
}
