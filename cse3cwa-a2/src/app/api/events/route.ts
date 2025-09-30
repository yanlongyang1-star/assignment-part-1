import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Game Event Schema
 */
const gameEventSchema = z.object({
  event_type: z.string().min(1, "Event type is required"),
  timestamp: z.string().optional(),
  user_id: z.string().optional(),
  room_id: z.string().optional(),
  stage_id: z.string().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});

/**
 * POST /api/events
 * Receive and log game events
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedEvent = gameEventSchema.parse(body);

    const event = {
      ...validatedEvent,
      timestamp: validatedEvent.timestamp || new Date().toISOString(),
      server_received_at: new Date().toISOString(),
    };

    console.log("[GAME_EVENT]", JSON.stringify(event, null, 2));


    return NextResponse.json(
      {
        success: true,
        message: "Event logged successfully",
        event_id: `evt_${Date.now()}`,
        received_at: event.server_received_at,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("[GAME_EVENT_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to log event",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
