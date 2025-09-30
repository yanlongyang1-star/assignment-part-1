"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stage {
  id: string;
  label: string;
  order: number;
  roomId: string;
}

interface Room {
  id: string;
  title: string;
  createdAt: string;
  stages: Stage[];
}

export default function RoomsDemoPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [newRoomTitle, setNewRoomTitle] = useState("");
  const [newStages, setNewStages] = useState<{ label: string; order: number }[]>([
    { label: "Stage 1", order: 0 },
  ]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/rooms");
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        alert("Failed to fetch rooms");
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      alert("Error fetching rooms");
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (!newRoomTitle.trim()) {
      alert("Please enter a room title");
      return;
    }

    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newRoomTitle,
          stages: newStages,
        }),
      });

      if (response.ok) {
        const room = await response.json();
        setRooms([room, ...rooms]);
        setNewRoomTitle("");
        setNewStages([{ label: "Stage 1", order: 0 }]);
        alert("Room created successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to create room: ${error.error}`);
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Error creating room");
    }
  };

  const deleteRoom = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room?")) {
      return;
    }

    try {
      const response = await fetch(`/api/rooms/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRooms(rooms.filter((room) => room.id !== id));
        alert("Room deleted successfully!");
      } else {
        alert("Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      alert("Error deleting room");
    }
  };

  const addStageInput = () => {
    setNewStages([...newStages, { label: "", order: newStages.length }]);
  };

  const removeStageInput = (index: number) => {
    setNewStages(newStages.filter((_, i) => i !== index));
  };

  const updateStageInput = (index: number, field: "label" | "order", value: string | number) => {
    const updated = [...newStages];
    if (field === "label") {
      updated[index].label = value as string;
    } else {
      updated[index].order = value as number;
    }
    setNewStages(updated);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen p-8 pb-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="
            inline-flex items-center gap-2 mb-6
            text-blue-600 dark:text-blue-400
            hover:underline
            focus:outline-2 focus:outline-solid focus:outline-black
            dark:focus:outline-white focus:outline-offset-2
            rounded px-2 py-1
          "
          aria-label="Go back to home page"
        >
          Back to Home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Rooms API Demo
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Test CRUD operations with Prisma and SQLite
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create New Room</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="room-title" className="block text-sm font-medium mb-2">
                  Room Title
                </label>
                <input
                  id="room-title"
                  type="text"
                  value={newRoomTitle}
                  onChange={(e) => setNewRoomTitle(e.target.value)}
                  placeholder="Enter room title..."
                  className="
                    w-full px-4 py-2 rounded-md border
                    border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-foreground
                    focus:outline-2 focus:outline-solid focus:outline-black
                    dark:focus:outline-white focus:outline-offset-2
                  "
                  aria-label="Room title input"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Stages</label>
                  <button
                    onClick={addStageInput}
                    className="
                      text-sm px-3 py-1 rounded-md
                      bg-green-600 hover:bg-green-700
                      text-white
                      focus:outline-2 focus:outline-solid focus:outline-black
                      dark:focus:outline-white focus:outline-offset-2
                    "
                    aria-label="Add new stage"
                  >
                    + Add Stage
                  </button>
                </div>

                <div className="space-y-2">
                  {newStages.map((stage, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={stage.label}
                        onChange={(e) => updateStageInput(index, "label", e.target.value)}
                        placeholder="Stage label..."
                        className="
                          flex-1 px-3 py-2 rounded-md border text-sm
                          border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-700
                          text-foreground
                          focus:outline-2 focus:outline-solid focus:outline-black
                          dark:focus:outline-white focus:outline-offset-2
                        "
                        aria-label={`Stage ${index + 1} label`}
                      />
                      <input
                        type="number"
                        value={stage.order}
                        onChange={(e) => updateStageInput(index, "order", parseInt(e.target.value))}
                        className="
                          w-20 px-3 py-2 rounded-md border text-sm
                          border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-700
                          text-foreground
                          focus:outline-2 focus:outline-solid focus:outline-black
                          dark:focus:outline-white focus:outline-offset-2
                        "
                        aria-label={`Stage ${index + 1} order`}
                      />
                      {newStages.length > 1 && (
                        <button
                          onClick={() => removeStageInput(index)}
                          className="
                            px-3 py-2 rounded-md text-sm
                            bg-red-600 hover:bg-red-700
                            text-white
                            focus:outline-2 focus:outline-solid focus:outline-black
                            dark:focus:outline-white focus:outline-offset-2
                          "
                          aria-label={`Remove stage ${index + 1}`}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={createRoom}
                className="
                  w-full px-6 py-3 rounded-lg
                  bg-blue-600 hover:bg-blue-700
                  text-white font-semibold
                  transition-colors
                  focus:outline-2 focus:outline-solid focus:outline-black
                  dark:focus:outline-white focus:outline-offset-2
                "
                aria-label="Create room"
              >
                Create Room
              </button>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">All Rooms</h2>
              <button
                onClick={fetchRooms}
                disabled={loading}
                className="
                  px-4 py-2 rounded-lg text-sm
                  bg-gray-600 hover:bg-gray-700
                  text-white font-medium
                  transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:outline-2 focus:outline-solid focus:outline-black
                  dark:focus:outline-white focus:outline-offset-2
                "
                aria-label="Refresh rooms list"
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {rooms.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No rooms yet. Create one to get started!
                </p>
              ) : (
                rooms.map((room) => (
                  <article
                    key={room.id}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{room.title}</h3>
                      <button
                        onClick={() => deleteRoom(room.id)}
                        className="
                          px-3 py-1 rounded-md text-sm
                          bg-red-600 hover:bg-red-700
                          text-white
                          transition-colors
                          focus:outline-2 focus:outline-solid focus:outline-black
                          dark:focus:outline-white focus:outline-offset-2
                        "
                        aria-label={`Delete room ${room.title}`}
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Created: {new Date(room.createdAt).toLocaleString()}
                    </p>
                    {room.stages.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">Stages:</h4>
                        <ul className="space-y-1">
                          {room.stages.map((stage) => (
                            <li
                              key={stage.id}
                              className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                            >
                              <span className="font-medium">{stage.order}.</span> {stage.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
              <code className="text-green-600 dark:text-green-400 font-semibold">
                GET /api/rooms
              </code>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Fetch all rooms with their stages, ordered by creation date (newest first)
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
              <code className="text-green-600 dark:text-green-400 font-semibold">
                POST /api/rooms
              </code>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Create a new room with optional stages
              </p>
              <pre className="text-xs mt-2 bg-gray-800 text-gray-200 p-3 rounded overflow-x-auto">
{`{
  "title": "My Room",
  "stages": [
    { "label": "Stage 1", "order": 0 },
    { "label": "Stage 2", "order": 1 }
  ]
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
              <code className="text-green-600 dark:text-green-400 font-semibold">
                GET /api/rooms/[id]
              </code>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Get a specific room by ID with its stages
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
              <code className="text-red-600 dark:text-red-400 font-semibold">
                DELETE /api/rooms/[id]
              </code>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Delete a room and all its stages (cascade delete)
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">Database Models</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
              <h4 className="font-bold mb-2">Room</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• id (String, UUID)</li>
                <li>• title (String)</li>
                <li>• stages (Stage[])</li>
                <li>• createdAt (DateTime)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
              <h4 className="font-bold mb-2">Stage</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• id (String, UUID)</li>
                <li>• label (String)</li>
                <li>• order (Int)</li>
                <li>• roomId (String, FK)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
              <h4 className="font-bold mb-2">Feedback</h4>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>• id (String, UUID)</li>
                <li>• actor (String)</li>
                <li>• notes (String)</li>
                <li>• createdAt (DateTime)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
