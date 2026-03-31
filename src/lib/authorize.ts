import { NextRequest } from "next/server";
import { Role } from "@/generated/prisma/enums";
import { getUser } from "@/lib/get-user";

export function authorize(req: NextRequest, allowedRoles: Role[]) {
    const user = getUser(req);
    
    if (!user?.id) {
        return {
            success: false,
            status: 401,
            message: "Unauthorized"
        };
    }

    if (!user.role || !allowedRoles.includes(user.role)) {
        return {
            success: false,
            status: 403,
            message: "Forbidden: insufficient permissions"
        };
    }

    return {
        success: true,
    };
}