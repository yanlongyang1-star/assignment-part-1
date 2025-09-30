import { NextResponse } from "next/server";
import { generateRoomHTML, RoomPayload } from "@/lib/generator";

/**
 * API route to generate room HTML
 * GET /api/generate-room
 */
export async function GET() {
  const payload: RoomPayload = {
    title: "Escape Room Challenge",
    timerMinutes: 30,
    theme: "light",
    stages: [
      {
        id: "stage-1",
        name: "Format Code",
        description: "Click the button to format the messy code below",
        completed: false,
      },
      {
        id: "stage-2",
        name: "Debug Code",
        description: "Find and fix the bug in the code (== vs ===)",
        completed: false,
      },
      {
        id: "stage-3",
        name: "Loop Challenge",
        description: "Write a for loop from 0 to 1000",
        completed: false,
      },
    ],
  };

  const html = generateRoomHTML(payload);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}

/**
 * POST endpoint to generate HTML with custom payload
 */
export async function POST(request: Request) {
  try {
    const payload: RoomPayload = await request.json();

    if (!payload.title || !payload.stages || !Array.isArray(payload.stages)) {
      return NextResponse.json(
        { error: "Invalid payload: title and stages are required" },
        { status: 400 }
      );
    }

    const html = generateRoomHTML(payload);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate HTML", details: String(error) },
      { status: 500 }
    );
  }
}
