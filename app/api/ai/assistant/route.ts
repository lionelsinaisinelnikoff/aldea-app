import { NextResponse } from "next/server";
import { runFamilyAssistantAgent } from "@/lib/ai/agents";
import type { TimelinePost } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const digest = await runFamilyAssistantAgent({
      childNames: body.childNames || ["Maya", "Leo"],
      posts: (body.posts || []) as TimelinePost[],
      question: body.question,
      mode: body.mode,
    });
    return NextResponse.json({ ok: true, digest });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Family assistant could not complete request." },
      { status: 500 }
    );
  }
}
