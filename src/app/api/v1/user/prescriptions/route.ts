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

        const presctiptions = await prisma.prescription.findMany({
            where: {
                patientId: user.id,
            },
            orderBy: {
                issuedAt: "desc"
            }
        })

        return NextResponse.json(presctiptions);

    } catch (error) {
        console.log("Error while fetching prescriptions", error);
        return NextResponse.json({ error: "Internal server error!!" }, { status: 500 })
    }
}