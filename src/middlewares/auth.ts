import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Role } from "@/generated/prisma/enums";

const JWT_SECRET = process.env.JWT_SECRET!;

const PUBLIC_ROUTES = [
    "/login",
    "/forget-password",
    "/reset-password",
];
const ROUTE_PERMISSIONS: Record<string, Role[]> = {
    "/doctor/appointments": ["DOCTOR"],
    "/user/dashboard": ["PATIENT"],
};
const ROLE_DASHBOARD: Record<Role, string> = {
    DOCTOR: "/doctor/appointments",
    PATIENT: "/user/dashboard"
};

function safeVerifyToken(token: string | null) {
    if (!token) return null;
    try {
        return jwt.verify(token, JWT_SECRET) as {
            sub: string;
            name: string;
            email: string;
            role: Role;
        };
    } catch {
        return null;
    }
}

// Guards against open-redirect attacks — only allow relative internal paths
function safeCallbackUrl(raw: string | null): string | null {
    if (!raw) return null;
    if (!raw.startsWith("/") || raw.startsWith("//")) return null;
    return raw;
}

export async function authMiddleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const token = req.cookies.get("app_uid")?.value || null;
    const decoded = safeVerifyToken(token);
    const isPublic = PUBLIC_ROUTES.includes(pathname);

    if (!decoded) {
        if (!isPublic) {
            const loginUrl = new URL("/login", req.url);
            // preserve where they were headed, including query params like ?appointmentId=...
            loginUrl.searchParams.set("callbackUrl", pathname + req.nextUrl.search);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.sub);
    requestHeaders.set("x-user-name", decoded.name);
    requestHeaders.set("x-user-email", decoded.email);
    requestHeaders.set("x-user-role", decoded.role);

    if (pathname === "/login") {
        const callbackUrl = safeCallbackUrl(req.nextUrl.searchParams.get("callbackUrl"));

        // Honor callbackUrl only if it matches a route this role is allowed on
        if (callbackUrl) {
            const matchedRoute = Object.keys(ROUTE_PERMISSIONS).find((route) =>
                callbackUrl.startsWith(route)
            );
            const roleAllowed = !matchedRoute || ROUTE_PERMISSIONS[matchedRoute].includes(decoded.role);

            if (roleAllowed) {
                return NextResponse.redirect(new URL(callbackUrl, req.url));
            }
        }

        return NextResponse.redirect(new URL(ROLE_DASHBOARD[decoded.role], req.url));
    }

    for (const route in ROUTE_PERMISSIONS) {
        if (pathname.startsWith(route)) {
            const allowedRoles = ROUTE_PERMISSIONS[route];

            if (!allowedRoles.includes(decoded.role)) {
                return NextResponse.redirect(
                    new URL(ROLE_DASHBOARD[decoded.role], req.url)
                );
            }
        }
    }
    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
}