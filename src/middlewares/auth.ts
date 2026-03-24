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
    "/doctor/dashboard": ["DOCTOR"],
    "/user/dashboard": ["PATIENT"],
};
const ROLE_DASHBOARD: Record<Role, string> = {
    DOCTOR: "/doctor/dashboard",
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

export async function authMiddleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const token = req.cookies.get("auth_token")?.value || null;
    const decoded = safeVerifyToken(token);
    const isPublic = PUBLIC_ROUTES.includes(pathname);

    if (!decoded) {
        if (!isPublic) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.sub);
    requestHeaders.set("x-user-name", decoded.name);
    requestHeaders.set("x-user-email", decoded.email);
    requestHeaders.set("x-user-role", decoded.role);


    if (pathname === "/login") {
        if (decoded.role === "DOCTOR") {
            return NextResponse.redirect(
                new URL("/doctor/dashboard", req.url)
            );
        }
        return NextResponse.redirect(
            new URL("/user/dashboard", req.url)
        );
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