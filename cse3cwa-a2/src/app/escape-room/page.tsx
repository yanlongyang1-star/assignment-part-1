import Link from "next/link";

export default function EscapeRoomPage() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 bg-background text-foreground">
      <main className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Escape Room
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Welcome to the main escape room hub
          </p>
        </header>

        <section className="text-center mb-8">
          <p className="text-xl mb-8">
            Select a room from the home page to start your adventure!
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
        </section>
      </main>
    </div>
  );
}
