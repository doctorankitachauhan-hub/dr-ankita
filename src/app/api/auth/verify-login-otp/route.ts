import { signToken } from "@/lib/jtw";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";


const otpSchema = z.object({
    email: z.email({ error: "Invalid email address" }).trim(),
    loginOtp: z.string({ error: "OTP is required." }).min(6, { error: "Invalid OTP" }).max(6, { error: "Invalid OTP" })
})
const MAX_ATTEMPTS = 3;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { success, error, data } = otpSchema.safeParse(body);

        if (!success) {
            return NextResponse.json({ error: z.prettifyError(error) }, { status: 400 })
        }

        const email = data.email.trim().toLowerCase();

        const [user, record] = await Promise.all([
            prisma.user.findUnique({ where: { email } }),

            prisma.emailOTP.findFirst({
                where: { email },
                orderBy: { createdAt: "desc" }
            }),
        ])


        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            );
        }
        if (!record) {
            return NextResponse.json(
                { error: "OTP not found" },
                { status: 400 }
            );
        }

        if (record.expiresAt < new Date()) {
            return NextResponse.json(
                { error: "OTP expired" },
                { status: 400 }
            );
        }

        if (record.attempts >= MAX_ATTEMPTS) {
            return NextResponse.json(
                { error: "Too many attempts. Request new OTP." },
                { status: 429 }
            );
        }

        const isValid = await bcrypt.compare(data.loginOtp, record.otpHash);

        if (!isValid) {
            await prisma.emailOTP.update({
                where: { id: record.id },
                data: {
                    attempts: { increment: 1 }
                }
            });

            return NextResponse.json(
                { error: "Invalid OTP" },
                { status: 400 }
            );
        }

        const token = signToken({
            sub: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        })

        const validUser = {
            sub: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        const response = NextResponse.json(
            { message: "Login successful", user: validUser },
            { status: 201 }

        )
        await prisma.emailOTP.deleteMany({
            where: { email }
        })

        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })

        return response

    } catch (error) {
        console.log("Error while verifying otp", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}