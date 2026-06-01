"use client";

import React from 'react';
import { LogOut, CreditCard, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-outline-variant/30">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl20N6HZ6rAIjp6LqDLTIWObJrv9AbKp62AmC5m0P9TSt8yW9FZx6LsccjIu50puDorRgl0hCAE4VSaA6VmwiKTXYZxiFwHu-ky5Y54jkDfQgRMMWDewbddquxV69LO1gR4EvNuPzILi4v8RI7QGCGfphPukjfIGaBY8vySMth73Nh8oPWNmvyL15HqTIBAGO23HVjBODgrDX6ag_f-7DttXptyZgIANFJjUjGiq6aW-nSFMN4rjrrwwvtUTGAoF-0ilIsycY6acAW" alt="Emma" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-semibold text-xl">Emma Mateo</div>
          <div className="text-on-surface-variant text-sm">Parent of Maya &amp; Leo • Abu Dhabi</div>
        </div>
      </div>

      <div className="space-y-1 text-sm">
        <div className="flex justify-between py-3 border-b border-outline-variant/40"><span>Current Plan</span> <span className="font-medium text-primary">Free</span></div>
        <div className="flex justify-between py-3 border-b border-outline-variant/40"><span>Children in village</span> <span className="font-medium">2</span></div>
        <div className="flex justify-between py-3 border-b border-outline-variant/40"><span>Circles you manage</span> <span className="font-medium">4</span></div>
        <div className="flex justify-between py-3"><span>Memories stored</span> <span className="font-medium">1,284</span></div>
      </div>

      <div className="space-y-3 pt-4">
        <button onClick={() => toast("Upgrade", { description: "Full pricing flow available from the main app shell." })} className="btn btn-primary w-full justify-center flex gap-2">
          <CreditCard className="w-4 h-4" /> Upgrade to Premium
        </button>
        <button onClick={() => toast("Privacy", { description: "You own every memory. Full export & deletion available in settings." })} className="btn btn-secondary w-full justify-center flex gap-2">
          <ShieldCheck className="w-4 h-4" /> Privacy &amp; Data Controls
        </button>
        <button onClick={() => toast.success("Signed out (demo)")} className="btn btn-ghost w-full justify-center flex gap-2 text-on-surface-variant">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      <div className="text-center text-[10px] text-on-surface-variant pt-6">Aldea v0.9 • Built with care in the digital village</div>
    </div>
  );
}
