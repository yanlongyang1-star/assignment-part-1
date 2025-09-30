import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/rooms/[id]
 * Get a specific room by ID with its stages
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        stages: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/rooms/[id]
 * Delete a room and its associated stages (cascade delete)
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const room = await prisma.room.findUnique({
      where: { id },
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    await prisma.room.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Room deleted successfully", id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room", details: String(error) },
      { status: 500 }
    );
  }
}
