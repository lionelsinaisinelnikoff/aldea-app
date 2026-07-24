/**
 * Aldea AI Agents — privacy-first, high-value intelligence layer.
 * Demo mode returns nuanced, evidence-grounded insights without external calls.
 * When XAI_API_KEY / SPACEXAI_API_KEY is set, routes can swap to live models.
 */

import type {
  DevelopmentalStats,
  EducatorBrief,
  FamilyDigest,
  JourneyAnalysis,
  TimelinePost,
} from "../types";
import { DEVELOPMENTAL_STATS } from "../data/mock";

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Child Journey Agent — multimodal pattern analysis over moments */
export async function runChildJourneyAgent(input: {
  childName: string;
  age: string;
  interests?: string[];
  posts: TimelinePost[];
  stats?: DevelopmentalStats;
}): Promise<JourneyAnalysis> {
  await delay(1200 + Math.random() * 800);

  const { childName, age, interests = [], posts, stats = DEVELOPMENTAL_STATS } = input;
  const momentCount = posts.filter((p) => p.type === "story").length;
  const natureMoments = posts.filter(
    (p) =>
      /nature|garden|butterfly|outdoor|walk|leaves|oak/i.test(p.title + p.description)
  ).length;
  const artMoments = posts.filter(
    (p) => /paint|art|color|finger|creative/i.test(p.title + p.description)
  ).length;
  const motorMoments = posts.filter(
    (p) => /step|walk|block|ball|motor/i.test(p.title + p.description)
  ).length;

  const weeklyPulse =
    childName === "Leo"
      ? `"${childName} is in a beautiful phase of motor courage. Across ${momentCount || 3} recent moments, first independent steps and block play show not just physical growth, but the joy of agency — the 'I did it' smile that signals healthy risk-taking within a secure village."`
      : `"${childName} is showing great curiosity in nature lately. During the village walk, she spent extended time observing a monarch butterfly—a meaningful increase in sustained attention compared to last month. Finger-painting earth tones and circle-time story engagement reinforce a pattern: ${childName} thrives when sensory exploration meets calm storytelling."`;

  return {
    childName,
    weeklyPulse,
    keyMilestone:
      childName === "Leo"
        ? "Independent ambulation & spatial problem-solving"
        : "Advanced pattern recognition & sustained attention",
    emotionalState: "Consistently joyful, engaged, and securely attached",
    stats:
      childName === "Leo"
        ? {
            cognitive: 68,
            cognitiveText: "Spatial reasoning shining through stacking and path-finding play.",
            social: 74,
            socialText: "More peer approaches this week; still prefers parallel play with warm check-ins.",
            language: 58,
            languageText: "Gesture + early word combinations expanding; loves naming animals.",
          }
        : stats,
    patterns: [
      {
        title: "Outdoor time → evening calm",
        detail:
          "Days with outdoor or garden activity before mid-afternoon correlate with calmer evenings and smoother transitions to rest.",
        strength: "strong",
      },
      {
        title:
          artMoments > 0
            ? "Sensory art as deep focus"
            : natureMoments > 0
              ? "Nature as attention anchor"
              : motorMoments > 0
                ? "Motor mastery as confidence fuel"
                : "Village consistency builds security",
        detail:
          artMoments > 0
            ? "Finger painting and color mixing held attention well above average for age — a window for vocabulary about texture and process."
            : `Interests noted: ${interests.slice(0, 3).join(", ") || "play, connection, routine"}. Moments that match these interests show the highest engagement signals.`,
        strength: "consistent",
      },
      {
        title: "Village co-regulation",
        detail: `When educators and family circle post within the same day, ${childName} (${age}) appears in more collaborative and joyful contexts — the proverb in action.`,
        strength: "emerging",
      },
    ],
    recommendations: [
      {
        title: "Protect one 'wonder window' outdoors",
        why: "Sustained attention and emotional regulation both rise after unhurried outdoor observation.",
        how: "10–15 minutes after lunch: no agenda, just noticing. Narrate lightly what they point to.",
      },
      {
        title: "Extend language through texture words",
        why: "Recent moments show rich sensory engagement — a perfect scaffold for descriptive vocabulary.",
        how: `During next art or garden moment, offer 2–3 words: squishy, crumbly, terracotta, moss. Let ${childName} choose favorites.`,
      },
      {
        title: "Share one insight with the circle",
        why: "Grandparents and educators amplify growth when they know what to notice.",
        how: "Use Family Assistant to draft a short weekly note — keep it private to Immediate Family + Willow Team.",
      },
    ],
    privacyNote:
      "This analysis used only moments you and authorized educators shared in your private vault. It is not used to train public models. You can export or delete journey data anytime.",
    generatedAt: new Date().toISOString(),
  };
}

/** Family Coordination Agent — digests, plans, circle help */
export async function runFamilyAssistantAgent(input: {
  childNames: string[];
  posts: TimelinePost[];
  question?: string;
  mode?: "digest" | "plan" | "message";
}): Promise<FamilyDigest> {
  await delay(900 + Math.random() * 600);

  const { childNames, posts, question, mode = "digest" } = input;
  const names = childNames.join(" & ");
  const storyTitles = posts
    .filter((p) => p.type === "story")
    .slice(0, 4)
    .map((p) => p.title);

  if (mode === "plan" || /plan|weekend|activity|coordinate/i.test(question || "")) {
    return {
      weekLabel: "This weekend",
      summary: `A gentle plan for ${names}: balance outdoor wonder, rest, and one shared village moment with grandparents.`,
      highlights: storyTitles.length
        ? storyTitles
        : ["Nature walk energy", "Creative focus", "Motor milestones"],
      coordination: [
        {
          title: "Saturday morning — Garden wander (45 min)",
          detail: "Build on Maya's butterfly observation and Leo's walking confidence.",
          action: "Invite Grandpa Joseph (View & Post circle)",
        },
        {
          title: "Saturday afternoon — Quiet rest window",
          detail: "Protect nap/quiet time after outdoor play for evening calm.",
        },
        {
          title: "Sunday — Finger-paint earth tones at home",
          detail: "Echo Willow's art moment; send one photo only to Immediate Family.",
          action: "Prep terracotta + sage safe paints",
        },
      ],
      suggestedMessages: [
        `Hi family — ${names} had a beautiful week of nature and art. Anyone free Saturday morning for a short park walk? No rush, just presence. 🌿`,
        `Quick note for Willow: outdoor time before 3pm has been gold for evenings. Happy to reinforce at home.`,
      ],
      generatedAt: new Date().toISOString(),
    };
  }

  if (mode === "message" || /message|draft|text|whatsapp/i.test(question || "")) {
    return {
      weekLabel: "Message drafts",
      summary: "Warm, privacy-respecting drafts you can send as-is or edit.",
      highlights: storyTitles,
      coordination: [
        {
          title: "To grandparents",
          detail: `This week ${names} shone in nature study and creative play. Sharing two moments privately — love from the village.`,
        },
        {
          title: "To educators",
          detail:
            "Thank you for the detailed art and circle-time notes. We're protecting outdoor time at home too — it really helps evenings.",
        },
      ],
      suggestedMessages: [
        `Dear family, a little window into ${names}'s week — private to our circle only. Thank you for being their village. 💛`,
        question
          ? `Re: "${question.slice(0, 80)}" — Here's a kind draft: We're grateful for every update. Please keep sharing moments that feel true to their day.`
          : "Thank you for being part of our children's village.",
      ],
      generatedAt: new Date().toISOString(),
    };
  }

  return {
    weekLabel: "This week in your village",
    summary: `${names} collected a week of sensory joy, story time, and growing independence. Educators and family posts form a coherent picture: curiosity outdoors, deep focus in art, and a secure base at home and at Willow.`,
    highlights: storyTitles.length
      ? storyTitles
      : ["Finger Painting Earth Tones", "Circle Time Story", "First Real Steps"],
    coordination: [
      {
        title: "Who hasn't seen the steps video?",
        detail: "Grandparents circle has View & Post — consider sharing Leo's milestone if not already.",
        action: "Share to Grandparents",
      },
      {
        title: "Parent-Teacher Sync on calendar",
        detail: "15 JUN · 8:30 AM virtual — bring one question about attention outdoors.",
      },
      {
        title: "Summer Solstice Picnic",
        detail: "12 JUN · Willow Center Park — perfect multi-circle gathering.",
        action: "RSVP for Immediate Family",
      },
    ],
    suggestedMessages: [
      `Weekly village digest for ${names}: art focus ↑, outdoor attention ↑, motor courage ↑. Full AI journey available in Premium Insights.`,
    ],
    generatedAt: new Date().toISOString(),
  };
}

/** Educator Copilot — class summaries & parent communication drafts */
export async function runEducatorCopilotAgent(input: {
  className: string;
  educatorName: string;
  posts: TimelinePost[];
  presentCount?: number;
  enrolledCount?: number;
}): Promise<EducatorBrief> {
  await delay(1000 + Math.random() * 500);

  const {
    className,
    educatorName,
    posts,
    presentCount = 12,
    enrolledCount = 14,
  } = input;

  const storyPosts = posts.filter((p) => p.type === "story").slice(0, 5);

  return {
    className,
    dailySummary: `${className} had a grounded, joyful day. Attendance ${presentCount}/${enrolledCount}. Highlights included sensory art (earth-tone finger painting), nature-linked literacy with 'The Brave Little Oak', and a calm nap transition for the full group. Parent engagement on recent moments is strong — several private likes and thoughtful comments from the Mateo family circle.`,
    parentDrafts: [
      {
        parentName: "Emma Mateo",
        childName: "Maya",
        draft: `Hi Emma — Maya was fully absorbed in finger-painting this morning, mixing terracotta and sage into new 'earth tones' with remarkable focus. During circle time she connected the oak story to leaves we found in the garden. A beautiful day for curiosity. — ${educatorName}`,
      },
      {
        parentName: "Emma Mateo",
        childName: "Leo",
        draft: `Hi Emma — Leo joined garden exploration with growing confidence and rested well at nap. We'll keep offering safe motor challenges that match his emerging steps. Warmly, ${educatorName}`,
      },
      {
        parentName: "All families",
        childName: className,
        draft: `Hello families — today's village note: art, nature story, and restful nap for ${presentCount} children. Photos are private to your circles. Thank you for being part of ${className}. — ${educatorName}, Willow Center`,
      },
    ],
    attendanceNote: `${presentCount} present of ${enrolledCount} enrolled. No incidents logged. Meal and rest routines on schedule.`,
    nextActivities: [
      "Tomorrow: Sensory garden sound walk (bring curiosity, not toys)",
      "Block architecture challenge — extend Leo's spatial play class-wide",
      "Parent-Teacher Sync slots open for next week",
    ],
    generatedAt: new Date().toISOString(),
  };
}
