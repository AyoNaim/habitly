import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        console.log("API HIT");

        // console.log("DATABASE_URL =>", process.env.DATABASE_URL)

        const { title, timezone, frequency } = await req.json();

        const habit = await prisma.habit.create({
            data: {
                title,
                timezone,
                frequency,
                userId: '00000000-0000-0000-0000-000000000000'
            }
        });
        return NextResponse.json(habit)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "server error"}, { status: 500 })
    }
}