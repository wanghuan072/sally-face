import { NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX_POSTS_PER_WINDOW = 3;
const postBuckets = new Map<string, { count: number; resetAt: number }>();

type FeedbackInput = {
  body?: unknown;
  displayName?: unknown;
  rating?: unknown;
  website?: unknown;
};

function config() {
  const origin = process.env.COMMENT_API_ORIGIN?.replace(/\/+$/, "");
  const apiKey = process.env.COMMENT_API_KEY;
  const projectSlug = process.env.COMMENT_PROJECT_SLUG ?? "sally-face";
  const sectionSlug = process.env.COMMENT_SECTION_SLUG ?? "sally-face";

  if (!origin || !apiKey) return null;
  return {
    apiKey,
    reviewsUrl: `${origin}/api/v1/p/${projectSlug}/sections/${sectionSlug}/reviews`,
  };
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function withinPostLimit(ip: string) {
  const now = Date.now();
  const bucket = postBuckets.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    postBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_POSTS_PER_WINDOW) return false;
  bucket.count += 1;
  return true;
}

async function upstreamError(response: Response) {
  const payload = await response.json().catch(() => null) as { error?: { message?: string } } | null;
  return payload?.error?.message ?? "The feedback service is unavailable right now.";
}

export async function GET(request: Request) {
  const service = config();
  if (!service) return NextResponse.json({ error: { message: "Feedback is not configured yet." } }, { status: 503 });

  const page = Math.max(1, Number(new URL(request.url).searchParams.get("page")) || 1);
  const upstream = await fetch(`${service.reviewsUrl}?page=${page}&pageSize=8&sort=createdAt_desc`, {
    headers: { "X-API-Key": service.apiKey },
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: { message: await upstreamError(upstream) } }, { status: upstream.status });
  }
  return NextResponse.json(await upstream.json(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const service = config();
  if (!service) return NextResponse.json({ error: { message: "Feedback is not configured yet." } }, { status: 503 });
  if (!withinPostLimit(clientIp(request))) {
    return NextResponse.json({ error: { message: "Please wait a minute before leaving another note." } }, { status: 429 });
  }

  const input = await request.json().catch(() => null) as FeedbackInput | null;
  const body = typeof input?.body === "string" ? input.body.trim() : "";
  const displayName = typeof input?.displayName === "string" ? input.displayName.trim() : "";
  const rating = input?.rating;

  if (input?.website) return NextResponse.json({ ok: true }, { status: 201 });
  if (!body || body.length > 2_000) {
    return NextResponse.json({ error: { message: "Your note must be between 1 and 2,000 characters." } }, { status: 400 });
  }
  if (!Number.isInteger(rating) || Number(rating) < 1 || Number(rating) > 5) {
    return NextResponse.json({ error: { message: "Please choose a rating from 1 to 5." } }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const upstream = await fetch(service.reviewsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": service.apiKey,
      ...(forwardedFor ? { "X-Forwarded-For": forwardedFor } : {}),
    },
    body: JSON.stringify({
      body,
      rating,
      ...(displayName ? { authorDisplayName: displayName.slice(0, 120) } : {}),
    }),
    cache: "no-store",
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: { message: await upstreamError(upstream) } }, { status: upstream.status });
  }
  return NextResponse.json(await upstream.json(), { status: 201, headers: { "Cache-Control": "no-store" } });
}
