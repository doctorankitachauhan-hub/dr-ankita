"use server";
import { Role } from "@/generated/prisma/enums";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET!;

export async function getServerUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            sub: string;
            name: string;
            email: string;
            role: Role;
        };
        return decoded
    } catch (error: any) {
        throw new Error(error.message)
    }
}
