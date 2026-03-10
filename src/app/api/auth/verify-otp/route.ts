import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        
    } catch (error) {
        console.log("Error while verifying otp", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}