import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getUser } from "@/lib/get-user";
import { authorize } from "@/lib/authorize";
import { Role } from "@/generated/prisma/enums";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

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

        const timestamp = Math.round(Date.now() / 1000);

        const folder = `appointment-docs/${user.id}`;

        const signature = cloudinary.utils.api_sign_request(
            { timestamp, folder },
            process.env.CLOUDINARY_API_SECRET!
        );

        return NextResponse.json({
            signature,
            timestamp,
            folder,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
            apiKey: process.env.CLOUDINARY_API_KEY!,
        });
    } catch (error) {
        console.log("Error while signing the cloudinary signature", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}