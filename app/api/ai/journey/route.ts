import { NextResponse } from "next/server";
import { runChildJourneyAgent } from "@/lib/ai/agents";
import type { TimelinePost } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const childName = body.childName || "Maya";
    const age = body.age || "4 Years Old";
    const interests = body.interests || [];
    const posts = (body.posts || []) as TimelinePost[];

    const analysis = await runChildJourneyAgent({
      childName,
      age,
      interests,
      posts,
    });

    return NextResponse.json({ ok: true, analysis });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Journey agent could not complete analysis." },
      { status: 500 }
    );
  }
}
