import type {
  CalendarEvent,
  CareCircle,
  CenterMetrics,
  Child,
  DevelopmentalStats,
  HighlightStory,
  Insight,
  TimelinePost,
  UserProfile,
  VillageMember,
} from "../types";

export const PARENT_PROFILE: UserProfile = {
  id: "user-emma",
  name: "Emma Mateo",
  role: "parent",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBl20N6HZ6rAIjp6LqDLTIWObJrv9AbKp62AmC5m0P9TSt8yW9FZx6LsccjIu50puDorRgl0hCAE4VSaA6VmwiKTXYZxiFwHu-ky5Y54jkDfQgRMMWDewbddquxV69LO1gR4EvNuPzILi4v8RI7QGCGfphPukjfIGaBY8vySMth73Nh8oPWNmvyL15HqTIBAGO23HVjBODgrDX6ag_f-7DttXptyZgIANFJjUjGiq6aW-nSFMN4rjrrwwvtUTGAoF-0ilIsycY6acAW",
  email: "emma@example.com",
};

export const EDUCATOR_PROFILE: UserProfile = {
  id: "user-maria",
  name: "Maria Solano",
  role: "educator",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB7iRRnxzNSjnh5ZH0_HUpW4EH8Y6DtJi74FWe-jO2kO6jLlnf4tGY5mk0b7snan_ulFpn0aCJkm_jC09-_djOUEMB42Pgf0KTjMZ7VBdWNTsNS2tJbB3qqqwAyGzf4vNuV4hJitC0lRcfiL2SwLG_x2lToQ02-D3o9Lpd735JqEcx_71Hjgw_oKBejgRZxzSbJWJQ8qjhuDG4eyCbjoyLoOefp-i1OFCas2hgaBBRWTnl8O4_cgMeGu0aueoTKPvJGH8QqagEAyKcH",
  centerName: "The Willow Center",
};

export const ADMIN_PROFILE: UserProfile = {
  id: "user-admin",
  name: "Aisha Rahman",
  role: "admin",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDtJxXzfqOKessJi9jc-Z5-WvqBqbFvdqFy23rpWBPm2pkJHyEQWm5KWCYOJVJTxMSxU3s98yTW0bWvuEFUdCK-BnKzpdvHNLkiErgks9igj_zg6NPq0fhXemeBdSRQBJyeN7aBI8_13Pde4Lr5EZooXIwNeZUiq_QFqC89gOESH2-NSaq8hP2WMEFKISQaChuC5d2VV_Gyg0OucRvKM0Nz8JHGSNXPvwc8haslESyKX3nsEmdRKWiWHjPwWNVv0EFUwEqPN6h2fvhB",
  centerName: "The Willow Center",
};

export const CHILDREN: Child[] = [
  {
    id: "child-maya",
    name: "Maya",
    age: "4 Years Old",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwbrk70Eh1h9Wcu4n3bVqp0v2fsFP5M1fwKYADXDiiMf3R0oiSxonbOJkKSROngXcMe34eFMedWtRbMBsIpoumFJLW54C6FACxO62wAE3e5xNFLfXSMduz1ZFQ8ygPIHGHnnxu4eW5t4XvP4LEow3PuUIQ8tzQXjMBb-GBjnKxm5CeIKfI0JolRj_QJQACEdMfM3-pzsqVfimZnVR6ILct_ktY0vH1-fX3uivU55q1qaCt9Kk6ISfAULCCIgn5fQRFk2hJ5YQgt7z6",
    interests: ["Nature", "Painting", "Butterflies", "Stories"],
  },
  {
    id: "child-leo",
    name: "Leo",
    age: "2 Years Old",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9X20pXvkDv1m6Ul7e9o4xx2OVApmZ6f5bv9CVSHryDv7qHXAmSjoljPKBlojejecGa-0KX9PSBdjZwjTG46_RtqWs5AyFTwTq51Y9_QWB1PwsG89BcXmT0WBjF8jCcrVYiIQ7V_7ToOKl-EMl6A_3q2SsLys4pQfTz2b2Ar3h5ELNP_pxg1uRhtNE1dNum-j0BNq2BkgPQe-dyJcEFT4bZAuN3bIE8oRYah_xb7YL3e_-cKnjgvn0KpX9Y9sLtQs-8EzT9aU-tjWz",
    interests: ["Blocks", "Music", "Walking", "Balls"],
  },
];

export const HIGHLIGHTS: HighlightStory[] = [
  {
    id: "story-1",
    title: "Leo's First Steps",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiByWrrThfAKnKy7JUEW8jXhog_mbwbzonVpM5TCBrfRYxdAArHeacUgRdQ434ju2gYHwLjn14QfVXl-ZeIHYD9nrHDTGh0YE_0ORHUP-HUzfaU5B-Xh3doivo-SjcoPbvxHDLPim2pqnPRlIO-dsIB_TY63F46qlqsLmuxQGz-UqoThomop5lRnwyp6TnVRyDb0uoGfgW0H82ab9g2aG6E08o5RhCi-aXMinUyJW9Ygv-e_SQLukYM23HTZobt1XZ1WauPn45_kxy",
    hasVideo: true,
  },
  {
    id: "story-2",
    title: "Nature Walk",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_9qEkzGgXhjl7qaK-1nODwWZu-DWi3857nOuP172uoDlmmb23eWruilGtX7aetyhjZwdH6dYwm2jAOOfWQ3vxUZWTLES6QgycHCKVZGvITTzrAMkby4xDGcWPRucNeIqZ4puPcawfd7Ck863wOI993JyQosKQgIo6taRDAfGevoxFGB8EPS9-e732CpqNVhj-o5B7tFgRclVwrRjEceQT6Xmvfx_WEtbpU6-rvGllo208EmTgI--7IoXcOJ6b9RotVRxU_podl-dY",
  },
  {
    id: "story-3",
    title: "Finger Paint",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjL3uI8VoTFBksO_97X6Kj08gnaljgymNS3AneMdyS74p5aitz3jthU7L6IUWlipLHM2AnxTaStRQthyFlcx0IxE7HRqc8jrguyDXOPU8l3YuNWy9wcLYMx1OdPJxeL0R67Pg_VnqSImii9YtXBZus_0AawfWmC7-b4vggwDUrJdgVSMJMZQyJP6am59vS1bO_zlue4A2TpOCf38AjZweO9HyLnLt5QLcXJA5anY0Jd91zAaaMr0otTTQ8HimO9y1J3zdX9a4jTJQd",
  },
];

export const INITIAL_POSTS: TimelinePost[] = [
  {
    id: "post-1",
    type: "story",
    author: {
      name: "Sarah Jenkins",
      role: "Primary Educator",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtJxXzfqOKessJi9jc-Z5-WvqBqbFvdqFy23rpWBPm2pkJHyEQWm5KWCYOJVJTxMSxU3s98yTW0bWvuEFUdCK-BnKzpdvHNLkiErgks9igj_zg6NPq0fhXemeBdSRQBJyeN7aBI8_13Pde4Lr5EZooXIwNeZUiq_QFqC89gOESH2-NSaq8hP2WMEFKISQaChuC5d2VV_Gyg0OucRvKM0Nz8JHGSNXPvwc8haslESyKX3nsEmdRKWiWHjPwWNVv0EFUwEqPN6h2fvhB",
      center: "The Willow Center",
    },
    time: "2h ago",
    title: "Finger Painting Earth Tones",
    description:
      "Maya had such an incredible morning exploring finger-painting! She was particularly fascinated by how the terracotta and sage colors mixed to create new 'earth tones'. Her focus was absolutely inspiring today. 🎨✨",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCjL3uI8VoTFBksO_97X6Kj08gnaljgymNS3AneMdyS74p5aitz3jthU7L6IUWlipLHM2AnxTaStRQthyFlcx0IxE7HRqc8jrguyDXOPU8l3YuNWy9wcLYMx1OdPJxeL0R67Pg_VnqSImii9YtXBZus_0AawfWmC7-b4vggwDUrJdgVSMJMZQyJP6am59vS1bO_zlue4A2TpOCf38AjZweO9HyLnLt5QLcXJA5anY0Jd91zAaaMr0otTTQ8HimO9y1J3zdX9a4jTJQd",
    likes: 24,
    comments: 8,
    isPrivate: true,
    tags: ["Art", "Sensory"],
    childIds: ["child-maya"],
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "post-2",
    type: "story",
    author: {
      name: "Maria Solano",
      role: "Educator",
      avatarUrl: EDUCATOR_PROFILE.avatarUrl,
      center: "The Willow Center",
    },
    time: "10:24 AM",
    title: "Circle Time Story",
    description:
      "Today we explored the story of 'The Brave Little Oak'. The children were fascinated by the changing leaves we found in the garden!",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKMWF9l5pnv1MjctlXxdqhG4pBWovo8Z7iCaYOJinv_BRdP1MpKxNu4jbylK3ld2BnUUwWUNdL2xOOtkTAdawN81k_FYvPRsloBuSQcLY3Pi4753WemD6EHqr73lZSRrDfKwaMF-69YoJ1EsnfaceZLuUNTw1E5YOVLuDGSq-Bxm8C9fJr1IfqDgmqzVXtgGuzQH2N5m-UnTZ9DPQSkq6QJOXw4tsIfBWv47fr2ne54hrfVe1XcA-TUmP_RHFoz6NYFr3niXcPBoi9",
    tags: ["Nature Study", "Reading"],
    likes: 18,
    comments: 2,
    childIds: ["child-maya", "child-leo"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "post-3",
    type: "story",
    author: {
      name: "Emma Mateo",
      role: "Parent",
      avatarUrl: PARENT_PROFILE.avatarUrl,
    },
    time: "Yesterday",
    title: "Leo's First Real Steps",
    description:
      "He walked from the couch to the kitchen table completely on his own. The look of pure joy on his face… I will never forget it.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiByWrrThfAKnKy7JUEW8jXhog_mbwbzonVpM5TCBrfRYxdAArHeacUgRdQ434ju2gYHwLjn14QfVXl-ZeIHYD9nrHDTGh0YE_0ORHUP-HUzfaU5B-Xh3doivo-SjcoPbvxHDLPim2pqnPRlIO-dsIB_TY63F46qlqsLmuxQGz-UqoThomop5lRnwyp6TnVRyDb0uoGfgW0H82ab9g2aG6E08o5RhCi-aXMinUyJW9Ygv-e_SQLukYM23HTZobt1XZ1WauPn45_kxy",
    likes: 48,
    comments: 17,
    isPrivate: false,
    childIds: ["child-leo"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: "post-4",
    type: "action",
    author: {
      name: "Maria Solano",
      role: "Educator",
      avatarUrl: EDUCATOR_PROFILE.avatarUrl,
      center: "The Willow Center",
    },
    time: "1:15 PM",
    title: "Nap Time Started",
    description: "All 12 present children are resting peacefully.",
    likes: 6,
    comments: 0,
    isPrivate: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

export const CARE_CIRCLES: CareCircle[] = [
  {
    id: "circle-family",
    name: "Immediate Family",
    description: "Parents and legal guardians with full administrative controls.",
    accessLevel: "Full Access",
    bgColor: "bg-secondary-container",
    iconName: "Users",
    members: [
      { name: "Mother", avatarUrl: PARENT_PROFILE.avatarUrl },
      {
        name: "Father",
        avatarUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDZdB30SrxFZwoQRG1pFz3MzJOSB4HmirZ60Nch89KfZaZ0dgtlfmNZJaacfn4hqF_ddLLpCi6tGdHJpyj19GPp7Tml3AmVZZkExruLGp-tlRduSjWjt-w4wMhzOAp7tc257WI2m5TNQ4M8Cmcbj0gb7-Y98IWzfbfdHl6Vt-4hb1BaxkW7nn8lUQV4JemQeAUJoWVypI4zmsQYEh4iw4scJ-GFdwXiV_wFOnwqFCT2tkIo57zPQPN6b49EWFi4J9xh3g5Hd_9vQxtz",
      },
    ],
  },
  {
    id: "circle-grandparents",
    name: "Grandparents",
    description: "Can see all updates and share moments with the family.",
    accessLevel: "View & Post",
    bgColor: "bg-soft-cream",
    iconName: "Heart",
    members: [
      { name: "Grandmother", initials: "GM" },
      { name: "Grandfather", initials: "GP" },
    ],
  },
  {
    id: "circle-willow",
    name: "The Willow Team",
    description: "Maria, Aisha, James — Maya & Leo's educators at the center.",
    accessLevel: "View & Post",
    bgColor: "bg-secondary-container",
    iconName: "BookOpen",
    members: [
      { name: "Maria", avatarUrl: EDUCATOR_PROFILE.avatarUrl },
      { name: "Aisha", initials: "AR" },
      { name: "James", initials: "JK" },
    ],
  },
  {
    id: "circle-friends",
    name: "Close Friends",
    description: "Selective sharing for chosen milestones and updates.",
    accessLevel: "Limited View",
    bgColor: "bg-surface-container",
    iconName: "Network",
    members: [
      { name: "Friend 1", initials: "F1" },
      { name: "Friend 2", initials: "F2" },
    ],
  },
];

export const VILLAGE_MEMBERS: VillageMember[] = [
  {
    id: "mem-sarah",
    name: "Sarah Jenkins",
    role: "Primary Educator",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXu47q-Y3Nci8EiqnfuhQmnhM9_NJK0VKqxGkbH30vubt8eKLSfG4UqkJkGJahZ7x2XPE48b8t0An7dq19l0qd2YjRYMkpgU6UkfhVxeFzu_PeqghXRgsZErpQ6uRP-bM6Tz7M6RPmBj4LdXF8TqSK8ucBKjVbHerkVNUJuETa0rrPZhZRbX3JdZO7qZo1W2eF2UqwQId8DBiR4gdaGjvthy0szAGISuKq_--HKjAb8mgIBgkLUekneGqgp_F4uLKrmSjZJAB5ROrv",
    verified: true,
  },
  {
    id: "mem-grandpa",
    name: "Grandpa Joseph",
    role: "Grandparent",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZ0tPX0t8hxPG6VNIL9LNXIGtOPBhnn2c8gWoC_VkEwjm1wWV3vvgKXeRjLD9VeEToeiq-7gRnWAtHftwPb_mezpUAg0lj_qcMHu776WdPLiE5rTU5_SDR_Ea7mAH2ry5VLPuPbrhAiBSvhwWv4JnOeAiFMsa4p7ESxH28UKJpe0apkRdVrDldxdZbLoprCRsKiiz8Pb_ahq6dEDdwVoBgGtAd-bd9aWQ2xxkMGF1vNSd52Pp928QNCt2WLxcYESAW4x6M1LJhRNXN",
    verified: true,
  },
  {
    id: "mem-aunt",
    name: "Aunt Sophia",
    role: "Family Friend / Aunt",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxseZE-H2NVERh2lIxdrSrIWXTa4_UU0klt5_nqrxuDfw4slMG6AFDtf41CKiKROAfO9eL1OgDJMu_c91UKZQFgJ9N19L9tvq8kste5DayxMOegvMWtyvbxl-_NpX3d5LdcvEBY-dZIRRWHsOTnmuw_bjAe5GktvTyceBM5QN3L0mCyrAfF958pwdIkhD5QMK8Be578vdDVqxrqQMMoIHzE9AseGILxb4CIc41U9zn1Mp24DCb4g019APDYeO4PN_hTQojfmxfIbSn",
    verified: true,
  },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Summer Solstice Picnic",
    dateDay: 12,
    dateMonth: "JUN",
    time: "4:00 PM",
    location: "Willow Center Park",
  },
  {
    id: "event-2",
    title: "Parent-Teacher Sync",
    dateDay: 15,
    dateMonth: "JUN",
    time: "8:30 AM",
    location: "Virtual Meeting",
  },
];

export const DEVELOPMENTAL_STATS: DevelopmentalStats = {
  cognitive: 72,
  cognitiveText: "Exceptional spatial awareness developed through block play this month.",
  social: 88,
  socialText: "Initiated 3 collaborative projects with peers in the 'Village Circle'.",
  language: 65,
  languageText: "Vocabulary expanded by 22 new descriptive adjectives this week.",
};

export const SAMPLE_INSIGHTS: Insight[] = [
  {
    id: "i1",
    title: "Maya's Language Explosion",
    summary:
      "Maya used 47 new words this week — a 38% increase. She is especially drawn to words describing texture and color (terracotta, moss, squishy).",
    category: "language",
    trend: "+38%",
    confidence: 0.91,
    date: new Date().toISOString(),
    premiumOnly: false,
    recommendations: [
      "Label textures during outdoor play",
      "Read picture books that name colors in nature",
    ],
  },
  {
    id: "i2",
    title: "Leo's Social Confidence Rising",
    summary:
      "Leo initiated play with two different peers three times this week. He is becoming noticeably more comfortable in group settings.",
    category: "social",
    trend: "+21%",
    confidence: 0.86,
    date: new Date().toISOString(),
    premiumOnly: true,
    recommendations: [
      "Arrange a short one-on-one playdate",
      "Celebrate initiations without pressure",
    ],
  },
  {
    id: "i3",
    title: "Evening Calm Pattern",
    summary:
      "Both children show significantly calmer energy and better sleep on days with outdoor time before 3pm. This is a strong, repeatable pattern.",
    category: "wellbeing",
    trend: "Strong",
    confidence: 0.94,
    date: new Date().toISOString(),
    premiumOnly: true,
    recommendations: [
      "Protect a short outdoor window after lunch",
      "Share the pattern with grandparents for weekend visits",
    ],
  },
];

export const CENTER_METRICS: CenterMetrics = {
  childrenPresent: 47,
  childrenEnrolled: 62,
  parentEngagement: 89,
  engagementDelta: 12,
  avgResponseMins: 14,
  complianceScore: 99.4,
  momentsToday: 38,
  openMessages: 5,
};
