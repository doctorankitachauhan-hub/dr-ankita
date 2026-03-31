import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const res = NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );

        res.cookies.set("auth_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires: new Date(0),
        });

        return res;
    } catch (error) {
        console.log("Logout error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}