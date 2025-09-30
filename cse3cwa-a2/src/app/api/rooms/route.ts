import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createRoomSchema = z.object({
  title: z.string().min(1, "Title is required"),
  stages: z
    .array(
      z.object({
        label: z.string().min(1, "Stage label is required"),
        order: z.number().int().min(0, "Order must be a non-negative integer"),
      })
    )
    .optional()
    .default([]),
});

/**
 * GET /api/rooms
 * Get all rooms with their stages
 */
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        stages: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * POST /api/rooms
 * Create a new room with optional stages
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = createRoomSchema.parse(body);

    const room = await prisma.room.create({
      data: {
        title: validatedData.title,
        stages: {
          create: validatedData.stages.map((stage) => ({
            label: stage.label,
            order: stage.order,
          })),
        },
      },
      include: {
        stages: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room", details: String(error) },
      { status: 500 }
    );
  }
}
