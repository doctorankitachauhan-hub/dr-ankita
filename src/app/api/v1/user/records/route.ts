import { Role } from "@/generated/prisma/enums";
import { authorize } from "@/lib/authorize";
import { getUser } from "@/lib/get-user";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        const user = getUser(req);

        if (!user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { success, message, status } = authorize(req, [Role.PATIENT])
        if (!success) {
            return NextResponse.json({ error: message }, { status })
        }

        const records = await prisma.appointmentContext.findMany({
            where: {
                userId: user.id
            },
            include: {
                appointment: true,
                contextDocuments: true
            }
        })

        return NextResponse.json(records, { status: 200 })

    } catch (error) {
        console.log("Error while fetching patient medial record");
        return NextResponse.json({ error: "Internal server error!!" }, { status: 500 })
    }
}