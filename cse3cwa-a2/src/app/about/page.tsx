import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-8 pb-20 sm:p-20 bg-background text-foreground">
        <main className="max-w-4xl mx-auto">
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

          <header className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              About This Project
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              CSE3CWA Assignment 2 - Escape Room Game
            </p>
          </header>

          <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Student Information</h2>
            <div className="space-y-4 text-lg">
              <div className="flex">
                <span className="font-semibold w-32">Name:</span>
                <span>Yanlong Yang</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Student No:</span>
                <span>22519263</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Course:</span>
                <span>CSE3CWA - Web Application Development</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Assignment:</span>
                <span>Assignment 2 - Escape Room Game</span>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Project Relationship</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="font-semibold text-lg">Version History</h3>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Assignment 1 (ltu-a1)</h4>
                  <p className="text-sm">
                    Basic web application with navigation, tabs, pre-lab questions, and simple escape room page.
                    Technologies: Next.js, TypeScript, basic routing.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-md border-2 border-blue-500">
                  <h4 className="font-semibold mb-2">Assignment 2 (cse3cwa-a2) - Current Version</h4>
                  <p className="text-sm">
                    Enhanced escape room game platform with full-stack features.
                    Built upon concepts from Assignment 1 with significantly expanded functionality.
                  </p>
                  <div className="mt-3 text-sm">
                    <p className="font-semibold">New Features:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Interactive escape room game with timer and 3 coding challenges</li>
                      <li>Prisma ORM + SQLite database with CRUD APIs</li>
                      <li>Docker containerization (multi-stage build)</li>
                      <li>Playwright E2E testing framework</li>
                      <li>AWS Lambda serverless function</li>
                      <li>Middleware logging and instrumentation</li>
                      <li>Theme toggle with cookie persistence</li>
                      <li>HTML generator with inline CSS/JS</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Project Demo Video</h2>
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Project Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Note: Replace the video URL above with your actual demo video (YouTube Unlisted link)
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Project Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Core Technologies</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Next.js 15 (App Router)</li>
                  <li>TypeScript</li>
                  <li>Prisma ORM + SQLite</li>
                  <li>Tailwind CSS</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Escape Room Game</li>
                  <li>Timer Component</li>
                  <li>REST APIs (CRUD)</li>
                  <li>Docker Support</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Testing & DevOps</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Playwright E2E Tests</li>
                  <li>Lighthouse Performance</li>
                  <li>JMeter Load Testing</li>
                  <li>AWS Lambda Function</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Database Models</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Room (id, title, stages)</li>
                  <li>Stage (id, label, order)</li>
                  <li>Feedback (id, actor, notes)</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
