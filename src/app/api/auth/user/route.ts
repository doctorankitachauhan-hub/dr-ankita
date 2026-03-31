import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { userSchema } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { data, error, success } = userSchema.safeParse(body);

        if (!success) {
            return NextResponse.json({ error: z.prettifyError(error) }, { status: 500 })
        }

        const email = data.email.toLowerCase().trim();

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already in use!!" },
                { status: 409 }
            );
        }



    } catch (error) {
        console.log("Error while creating new user...!!");
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}