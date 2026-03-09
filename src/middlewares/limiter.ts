import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

const WINDOW = 60_000; // 1 minute
const MAX_ATTEMPTS = 30;

export function rateLimitMiddleware(req: NextRequest) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
        rateLimitMap.set(ip, { count: 1, lastAttempt: now });
        return null;
    }

    const diff = now - record.lastAttempt;

    if (diff > WINDOW) {
        rateLimitMap.set(ip, { count: 1, lastAttempt: now });
        return null;
    }

    if (record.count >= MAX_ATTEMPTS) {
        return new NextResponse(
            JSON.stringify({ message: "Too many requests" }),
            {
                status: 429,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    record.count++;
    record.lastAttempt = now;
    rateLimitMap.set(ip, record);

    return null;
}