import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        
    } catch (error) {
        console.log("Error while creating new user...!!");
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}