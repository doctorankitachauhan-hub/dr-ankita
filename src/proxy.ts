import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/auth";
import { rateLimitMiddleware } from "./middlewares/limiter";


export default function proxy(req: NextRequest) {
    const rateLimit = rateLimitMiddleware(req);
    if (rateLimit) return rateLimit;

    const auth = authMiddleware(req)
    if (auth) return auth

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/v1/:path*",
        "/login",
        "/forget-password",
        "/reset-password",
        "/doctor/dashboard",
        "/user/dashboard",
    ],
};