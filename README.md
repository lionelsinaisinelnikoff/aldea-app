# Aldea — The Digital Village (Core Product App)

**Private. Joyful. Premium. Built for the people who love a child most.**

This is the **core product experience** for Aldea — the actual app used by parents, extended family circles, educators, and center administrators.

It is built with **100% visual fidelity** to the official AI Studio / Stitch "Joyful Modernism" design system (exact color tokens, typography, organic shapes, premium tactile feel).

## Design System Source of Truth
- Terracotta primary (#9d3e20 / #D66847)
- Sage secondary (#516447 / #7C9070)
- Warm cream surfaces, Literata serif + Be Vietnam Pro sans
- Generous rounded forms, soft shadows, organic blobs
- The exact aesthetic from the provided AI Studio export ZIP

## What’s Included (Current Build)

- **Mobile-first PWA shell** with beautiful role switcher (Parent / Teacher / Center Admin)
- **Rich Timeline** — child-centric moments feed with real interactions (likes, privacy indicators)
- **AI Child Journey Insights** (Premium highlight) — warm, private, emotionally resonant
- **Village / Circles** management
- **Center Admin dashboard** (lightweight but credible B2B view)
- **Profile + Upgrade flows** directly tied to the hybrid B2B2C pricing model
- Working Free vs Premium differentiation
- Role-aware navigation and experiences
- Full design system ported and refined

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind + exact Joyful Modernism design tokens
- Framer Motion for joyful micro-interactions
- Sonner for beautiful toasts
- Fully installable PWA

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

Switch roles in the top bar to experience the hybrid B2B2C model live.

## Future / React Native Path

This codebase serves as the **design system and interaction source of truth**.

To create the production React Native version:
1. Use this as the visual and UX reference
2. Scaffold with Expo + React Native
3. Port the same design tokens (via NativeWind or StyleSheet)
4. Reuse the same data models and component logic

## Business Model Alignment

- Parents: Rich free experience + clear, delightful upgrade path to Plus/Premium
- Centers/Educators: Credible operational tools + parent delight layer
- Pricing & features match the official `MilkyChat_Business_Model_Recommendation_v1.docx`

## Deployment

Deploy to Vercel (recommended):

```bash
vercel
```

Or push to GitHub and connect the repository.

---

**Repository:** https://github.com/lionelsinaisinelnikoff/aldea-app  
**Live Preview:** (see deployment below)

Built with love for every village.
