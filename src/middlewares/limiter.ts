import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; windowStart: number }>();

const WINDOW = 60_000;     
const MAX_ATTEMPTS = 150;
const CLEANUP_INTERVAL = 5 * 60_000; 

let lastCleanup = Date.now();

function cleanup(now: number) {
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    lastCleanup = now;
    for (const [ip, record] of rateLimitMap.entries()) {
        if (now - record.windowStart > WINDOW) {
            rateLimitMap.delete(ip);
        }
    }
}

export function rateLimitMiddleware(req: NextRequest) {
    // Don't rate-limit static assets — only pages and API routes
    const { pathname } = req.nextUrl;
    if (
        pathname.startsWith("/_next/") ||
        pathname.startsWith("/favicon") ||
        pathname.match(/\.(png|jpg|jpeg|svg|ico|css|js|woff2?)$/)
    ) {
        return null;
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const now = Date.now();

    cleanup(now);

    const record = rateLimitMap.get(ip);

    if (!record || now - record.windowStart > WINDOW) {
        // Start a fresh window
        rateLimitMap.set(ip, { count: 1, windowStart: now });
        return null;
    }

    if (record.count >= MAX_ATTEMPTS) {
        const retryAfter = Math.ceil((WINDOW - (now - record.windowStart)) / 1000);
        return new NextResponse(
            JSON.stringify({
                message: "Too many requests",
                retryAfter,           // seconds until window resets
            }),
            {
                status: 429,
                headers: {
                    "Content-Type": "application/json",
                    "Retry-After": String(retryAfter),
                    "X-RateLimit-Limit": String(MAX_ATTEMPTS),
                    "X-RateLimit-Remaining": "0",
                },
            }
        );
    }

    record.count++;
    rateLimitMap.set(ip, record);
    return null;
}