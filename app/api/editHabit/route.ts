import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const { habitId, title, frequency, timezone, imageUrl } = await request.json();

    try {
        console.log("Updating habit with ID:", habitId);
        const updatedHabit = await prisma.habit.update({
            where: { id: habitId },
            data: {
                title,
                frequency,
                timezone,
                imageUrl
            }
        });
        console.log("Habit updated:", updatedHabit);
        return NextResponse.json("habit successfully updated", { status: 200 });
    } catch (error) {
        console.log("failed to update habit:", error)
        return NextResponse.json({ error: "Failed to update habit" }, { status: 500 });
    }
}