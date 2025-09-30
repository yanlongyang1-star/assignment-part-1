import Link from "next/link";

interface Room {
  id: number;
  name: string;
  difficulty: string;
  description: string;
  status: "available" | "locked" | "completed";
}

const rooms: Room[] = [
  {
    id: 1,
    name: "Mystery Chamber",
    difficulty: "Easy",
    description: "A beginner-friendly room to test your puzzle-solving skills",
    status: "available",
  },
  {
    id: 2,
    name: "Ancient Temple",
    difficulty: "Medium",
    description: "Discover the secrets hidden in the ancient temple",
    status: "available",
  },
  {
    id: 3,
    name: "Cyber Lab",
    difficulty: "Hard",
    description: "Hack your way through advanced security systems",
    status: "locked",
  },
  {
    id: 4,
    name: "Haunted Mansion",
    difficulty: "Expert",
    description: "Survive the horrors and escape the mansion",
    status: "locked",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 bg-background text-foreground">
      <main className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Escape Room Game
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Choose a room and test your puzzle-solving skills
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            Available Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <article
                key={room.id}
                className={`
                  border rounded-lg p-6 transition-all
                  ${
                    room.status === "available"
                      ? "border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg"
                      : "border-gray-200 dark:border-gray-800 opacity-60"
                  }
                `}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium
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
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {room.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`
                      text-sm font-medium
                      ${
                        room.status === "available"
                          ? "text-green-600 dark:text-green-400"
                          : room.status === "locked"
                          ? "text-gray-500 dark:text-gray-500"
                          : "text-blue-600 dark:text-blue-400"
                      }
                    `}
                  >
                    {room.status === "available"
                      ? "Available"
                      : room.status === "locked"
                      ? "Locked"
                      : "Completed"}
                  </span>
                  {room.status === "available" && (
                    <Link
                      href={`/escape-room/${room.id}`}
                      className="
                        px-4 py-2 rounded-md 
                        bg-blue-600 hover:bg-blue-700 
                        dark:bg-blue-500 dark:hover:bg-blue-600
                        text-white font-medium
                        transition-colors
                        focus:outline-2 focus:outline-solid focus:outline-black
                        dark:focus:outline-white focus:outline-offset-2
                      "
                      aria-label={`Enter ${room.name} room`}
                    >
                      Enter Room
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="text-center space-y-4">
          <Link
            href="/escape-room"
            className="
              inline-block px-8 py-4 rounded-lg
              bg-gradient-to-r from-purple-600 to-blue-600
              hover:from-purple-700 hover:to-blue-700
              dark:from-purple-500 dark:to-blue-500
              dark:hover:from-purple-600 dark:hover:to-blue-600
              text-white text-lg font-bold
              transition-all transform hover:scale-105
              shadow-lg hover:shadow-xl
              focus:outline-2 focus:outline-solid focus:outline-black
              dark:focus:outline-white focus:outline-offset-2
            "
            aria-label="Go to main escape room page"
          >
            Enter Escape Room
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link
              href="/escape"
              className="
                inline-block px-6 py-3 rounded-lg
                bg-orange-600 hover:bg-orange-700
                dark:bg-orange-500 dark:hover:bg-orange-600
                text-white font-semibold
                transition-colors shadow-md
                focus:outline-2 focus:outline-solid focus:outline-black
                dark:focus:outline-white focus:outline-offset-2
              "
              aria-label="Start the escape challenge game"
            >
              Play Escape Challenge
            </Link>
            <Link
              href="/rooms-demo"
              className="
                inline-block px-6 py-3 rounded-lg
                bg-green-600 hover:bg-green-700
                dark:bg-green-500 dark:hover:bg-green-600
                text-white font-semibold
                transition-colors shadow-md
                focus:outline-2 focus:outline-solid focus:outline-black
                dark:focus:outline-white focus:outline-offset-2
              "
              aria-label="View rooms API demo"
            >
              Rooms API Demo
            </Link>
            <Link
              href="/generator-demo"
              className="
                inline-block px-6 py-3 rounded-lg
                bg-purple-600 hover:bg-purple-700
                dark:bg-purple-500 dark:hover:bg-purple-600
                text-white font-semibold
                transition-colors shadow-md
                focus:outline-2 focus:outline-solid focus:outline-black
                dark:focus:outline-white focus:outline-offset-2
              "
              aria-label="View HTML generator demo"
            >
              HTML Generator
            </Link>
            <Link
              href="/timer-demo"
              className="
                inline-block px-6 py-3 rounded-lg
                bg-gray-200 hover:bg-gray-300
                dark:bg-gray-700 dark:hover:bg-gray-600
                text-gray-800 dark:text-gray-200
                font-semibold
                transition-colors
                focus:outline-2 focus:outline-solid focus:outline-black
                dark:focus:outline-white focus:outline-offset-2
              "
              aria-label="View timer component demo"
            >
              Timer Demo
            </Link>
          </div>
        </section>

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>Complete easier rooms to unlock harder challenges!</p>
        </footer>
      </main>
    </div>
  );
}