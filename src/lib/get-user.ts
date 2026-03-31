import { NextRequest } from "next/server";
import { Role } from "@/generated/prisma/enums";

export function getUser(req: NextRequest) {
    return {
        id: req.headers.get("x-user-id"),
        name: req.headers.get("x-user-name"),
        role: req.headers.get("x-user-role") as Role | null,
        email: req.headers.get("x-user-email"),
    };
}