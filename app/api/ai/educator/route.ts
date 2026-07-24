import { NextResponse } from "next/server";
import { runEducatorCopilotAgent } from "@/lib/ai/agents";
import type { TimelinePost } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const brief = await runEducatorCopilotAgent({
      className: body.className || "Little Sprouts",
      educatorName: body.educatorName || "Maria Solano",
      posts: (body.posts || []) as TimelinePost[],
      presentCount: body.presentCount,
      enrolledCount: body.enrolledCount,
    });
    return NextResponse.json({ ok: true, brief });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "Educator copilot could not complete request." },
      { status: 500 }
    );
  }
}
