"use client";

import React from 'react';
import { Users, Plus } from 'lucide-react';
import { toast } from 'sonner';

const CIRCLES = [
  { id: 'c1', name: "Grandparents & Family", members: 7, description: "Mum, Dad, Nana, Grandpa, Uncle Sam + 2 cousins" },
  { id: 'c2', name: "The Willow Team", members: 4, description: "Maria, Aisha, James — Maya & Leo’s educators" },
  { id: 'c3', name: "Co-Parent Circle", members: 2, description: "Alex & Jordan (secure access)" },
];

export default function CirclesPage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="uppercase tracking-widest text-xs text-sage-green font-semibold">YOUR VILLAGE</div>
          <div className="font-serif text-2xl tracking-tight">Who shares in the joy</div>
        </div>
        <button 
          onClick={() => toast("Invite to circle", { description: "Full invite flow coming in the production build." })}
          className="btn btn-primary btn-sm flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Invite
        </button>
      </div>

      <div className="space-y-3">
        {CIRCLES.map(circle => (
          <div key={circle.id} className="card p-5 flex gap-4 items-start">
            <div className="w-11 h-11 rounded-2xl bg-secondary-container flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-on-secondary-container" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium flex items-baseline gap-2">
                {circle.name} 
                <span className="text-xs font-normal text-on-surface-variant">{circle.members} people</span>
              </div>
              <div className="text-sm text-on-surface-variant mt-1 leading-snug">{circle.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-xs text-center text-on-surface-variant">
        You control exactly what each circle can see. Privacy is not a setting — it is the foundation.
      </div>
    </div>
  );
}
