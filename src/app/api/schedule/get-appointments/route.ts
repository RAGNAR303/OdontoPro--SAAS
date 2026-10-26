import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(response: NextResponse, request: NextRequest) {

    return NextResponse.json({
        ok: true
    })
}