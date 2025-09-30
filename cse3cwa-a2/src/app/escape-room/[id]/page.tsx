import Link from "next/link";

interface RoomPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 房间数据（应该从数据库获取）
const roomsData: Record<string, { name: string; difficulty: string; description: string }> = {
  "1": {
    name: "Mystery Chamber",
    difficulty: "Easy",
    description: "A beginner-friendly room to test your puzzle-solving skills",
  },
  "2": {
    name: "Ancient Temple",
    difficulty: "Medium",
    description: "Discover the secrets hidden in the ancient temple",
  },
  "3": {
    name: "Cyber Lab",
    difficulty: "Hard",
    description: "Hack your way through advanced security systems",
  },
  "4": {
    name: "Haunted Mansion",
    difficulty: "Expert",
    description: "Survive the horrors and escape the mansion",
  },
};

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;
  const room = roomsData[id];

  if (!room) {
    return (
      <div className="min-h-screen p-8 pb-20 sm:p-20 bg-background text-foreground">
        <main className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Room Not Found</h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
            The room you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="
              inline-block px-6 py-3 rounded-lg
              bg-blue-600 hover:bg-blue-700
              dark:bg-blue-500 dark:hover:bg-blue-600
              text-white font-semibold
              transition-colors
              focus:outline-2 focus:outline-solid focus:outline-black
              dark:focus:outline-white focus:outline-offset-2
            "
            aria-label="Go back to home page"
          >
            Back to Home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 bg-background text-foreground">
      <main className="max-w-4xl mx-auto">
        <header className="mb-12">
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
            Back to Rooms
          </Link>
          
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {room.name}
            </h1>
            <span
              className={`
                px-4 py-2 rounded-full text-sm font-semibold
                ${
                  room.difficulty === "Easy"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : room.difficulty === "Medium"
                    ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                    : room.difficulty === "Hard"
                    ? "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }
              `}
            >
              {room.difficulty}
            </span>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {room.description}
          </p>
        </header>

        <section className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Room #{id}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This is where the escape room game will be implemented.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-center text-gray-500 dark:text-gray-400">
              Game content will appear here
            </p>
          </div>
        </section>

        <section className="text-center">
          <Link
            href="/escape"
            className="
              inline-block px-8 py-4 rounded-lg
              bg-green-600 hover:bg-green-700
              dark:bg-green-500 dark:hover:bg-green-600
              text-white text-lg font-bold
              transition-colors
              focus:outline-2 focus:outline-solid focus:outline-black
              dark:focus:outline-white focus:outline-offset-2
            "
            aria-label="Start the escape challenge game"
          >
            Start Game
          </Link>
        </section>
      </main>
    </div>
  );
}
