"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Sparkles, 
  User, 
  Users, 
  BarChart3,
  Plus 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  currentRole: 'parent' | 'educator' | 'admin';
  onRoleChange: (role: 'parent' | 'educator' | 'admin') => void;
  isPremium: boolean;
  onUpgradeClick: () => void;
  onCreateMoment: () => void;
}

const tabs = [
  { href: '/(app)', label: 'Home', icon: Home, roles: ['parent', 'educator', 'admin'] },
  { href: '/(app)/insights', label: 'Insights', icon: Sparkles, roles: ['parent', 'educator'] },
  { href: '/(app)/circles', label: 'Village', icon: Users, roles: ['parent', 'educator'] },
  { href: '/(app)/admin', label: 'Center', icon: BarChart3, roles: ['educator', 'admin'] },
  { href: '/(app)/profile', label: 'Me', icon: User, roles: ['parent', 'educator', 'admin'] },
];

export default function AppShell({
  children,
  currentRole,
  onRoleChange,
  isPremium,
  onUpgradeClick,
  onCreateMoment,
}: AppShellProps) {
  const pathname = usePathname();

  const visibleTabs = tabs.filter(tab => tab.roles.includes(currentRole));

  return (
    <div className="min-h-screen flex flex-col bg-surface max-w-[480px] mx-auto relative border-x border-outline-variant/30 shadow-xl">
      {/* Top Bar — Warm, Premium, Role-aware */}
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/30 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-outline-variant/40">
            <img src="/brand/aldea-logo.png" alt="Aldea" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-serif text-xl tracking-tight font-semibold">aldea</span>
          </div>
        </div>

        {/* Role Switcher — Critical for B2B2C demo */}
        <div className="flex items-center gap-1.5 bg-surface-container rounded-full p-0.5 text-xs">
          {(['parent', 'educator', 'admin'] as const).map(role => (
            <button
              key={role}
              onClick={() => onRoleChange(role)}
              className={cn(
                "px-3 py-1 rounded-full font-medium transition-all",
                currentRole === role 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {role === 'parent' ? 'Parent' : role === 'educator' ? 'Teacher' : 'Admin'}
            </button>
          ))}
        </div>

        {/* Premium status or Upgrade */}
        <button 
          onClick={onUpgradeClick}
          className="text-xs font-medium flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container"
        >
          {isPremium ? 'Premium' : 'Free'}
          {!isPremium && <span className="text-[10px] text-primary">↑</span>}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 bg-surface">
        {children}
      </main>

      {/* Floating Create Button (contextual & joyful) */}
      <button
        onClick={onCreateMoment}
        className="fixed bottom-[72px] right-5 z-50 w-14 h-14 rounded-2xl bg-primary text-white shadow-xl flex items-center justify-center active:scale-95 transition-transform"
        style={{ boxShadow: '0 10px 30px -10px rgb(157 62 32 / 0.4)' }}
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Tab Bar — Mobile Native Feel */}
      <nav className="tab-bar fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-50 h-[62px] flex items-center justify-around px-2 border-t border-outline-variant/30 bg-surface-container-lowest">
        {visibleTabs.map((tab) => {
          const isActive = pathname === tab.href || (tab.href === '/(app)' && pathname === '/(app)');
          const Icon = tab.icon;
          
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium w-16 py-1 rounded-xl transition-all active:scale-95",
                isActive 
                  ? "text-primary" 
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
