import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { randomInt } from "crypto"
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/sendMail";


const ValidEmail = z.object({
    email: z.email({ error: "Invalid email address" }).trim()
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { success, error, data } = ValidEmail.safeParse(body);

        if (!success) {
            return NextResponse.json({ error: z.prettifyError(error) }, { status: 400 })
        }

        const email = data.email.trim().toLowerCase();

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: "This email is already in use, try different email." }, { status: 403 })
        }

        const otp = randomInt(100000, 999999).toString();
        const otpHash = await bcrypt.hash(otp, 10)

        await prisma.emailOTP.create({
            data: {
                email,
                otpHash,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            }
        })

        const mail = await sendMail({
            title: "Verification Code",
            to: email,
            subject: "Please verify your Email",
            html: otpTemplate(otp)
        });

        if (!mail) {
            return NextResponse.json({ error: mail }, { status: 500 })
        }

        return NextResponse.json({ message: "OTP sent to you email" }, { status: 200 })

    } catch (error) {
        console.log("Error while sending otp!!", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}


function otpTemplate(otp: string) {
    return `
    <div style="font-family: Arial; max-width: 600px; margin: auto;">
      <h2>Your Verification Code</h2>
      <p>Use the following OTP to verify your email:</p>

      <div style="
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 6px;
        margin: 20px 0;
      ">
        ${otp}
      </div>

      <p>This code expires in 10 minutes.</p>

      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `
}