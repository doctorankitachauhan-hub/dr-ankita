import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {

    } catch (error) {
        console.log("Error while booking an appointement", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

