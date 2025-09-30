"use client";

import { useState } from "react";
import Link from "next/link";

export default function GeneratorDemoPage() {
  const [htmlOutput, setHtmlOutput] = useState("");
  const [payload, setPayload] = useState({
    title: "My Escape Room",
    timerMinutes: 30,
    theme: "light" as "light" | "dark",
    stages: [
      {
        id: "stage-1",
        name: "First Challenge",
        description: "Complete the first task",
        completed: false,
      },
      {
        id: "stage-2",
        name: "Second Challenge",
        description: "Complete the second task",
        completed: true,
      },
      {
        id: "stage-3",
        name: "Final Challenge",
        description: "Complete the final task",
        completed: false,
      },
    ],
  });

  const generateHTML = async () => {
    try {
      const response = await fetch("/api/generate-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const html = await response.text();
      setHtmlOutput(html);
    } catch (error) {
      console.error("Error generating HTML:", error);
      alert("Failed to generate HTML");
    }
  };

  const openInNewTab = () => {
    const blob = new Blob([htmlOutput], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

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
            HTML Generator Demo
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Generate standalone HTML pages with inline CSS and JavaScript
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Configuration</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Room Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={payload.title}
                  onChange={(e) =>
                    setPayload({ ...payload, title: e.target.value })
                  }
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
                <label
                  htmlFor="timer"
                  className="block text-sm font-medium mb-2"
                >
                  Timer (minutes)
                </label>
                <input
                  id="timer"
                  type="number"
                  min="1"
                  max="120"
                  value={payload.timerMinutes}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      timerMinutes: Number(e.target.value),
                    })
                  }
                  className="
                    w-full px-4 py-2 rounded-md border
                    border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-foreground
                    focus:outline-2 focus:outline-solid focus:outline-black
                    dark:focus:outline-white focus:outline-offset-2
                  "
                  aria-label="Timer duration in minutes"
                />
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium mb-2">
                  Theme
                </label>
                <select
                  id="theme"
                  value={payload.theme}
                  onChange={(e) =>
                    setPayload({
                      ...payload,
                      theme: e.target.value as "light" | "dark",
                    })
                  }
                  className="
                    w-full px-4 py-2 rounded-md border
                    border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-foreground
                    focus:outline-2 focus:outline-solid focus:outline-black
                    dark:focus:outline-white focus:outline-offset-2
                  "
                  aria-label="Theme selection"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={generateHTML}
                  className="
                    flex-1 px-6 py-3 rounded-lg
                    bg-blue-600 hover:bg-blue-700
                    text-white font-semibold
                    transition-colors
                    focus:outline-2 focus:outline-solid focus:outline-black
                    dark:focus:outline-white focus:outline-offset-2
                  "
                  aria-label="Generate HTML"
                >
                  Generate HTML
                </button>
                {htmlOutput && (
                  <button
                    onClick={openInNewTab}
                    className="
                      flex-1 px-6 py-3 rounded-lg
                      bg-green-600 hover:bg-green-700
                      text-white font-semibold
                      transition-colors
                      focus:outline-2 focus:outline-solid focus:outline-black
                      dark:focus:outline-white focus:outline-offset-2
                    "
                    aria-label="Open generated HTML in new tab"
                  >
                    Open in New Tab
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Stages Preview</h3>
              <div className="space-y-2">
                {payload.stages.map((stage) => (
                  <div
                    key={stage.id}
                    className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded"
                  >
                    <span>{stage.completed ? "Done" : "Pending"}</span>
                    <span className="font-medium">{stage.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Generated HTML</h2>

            {htmlOutput ? (
              <div className="space-y-4">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto max-h-96 overflow-y-auto">
                  <pre className="text-xs">{htmlOutput}</pre>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(htmlOutput)}
                    className="
                      px-4 py-2 rounded-lg
                      bg-gray-600 hover:bg-gray-700
                      text-white font-medium text-sm
                      transition-colors
                      focus:outline-2 focus:outline-solid focus:outline-black
                      dark:focus:outline-white focus:outline-offset-2
                    "
                    aria-label="Copy HTML to clipboard"
                  >
                    Copy to Clipboard
                  </button>
                  <a
                    href={`data:text/html;charset=utf-8,${encodeURIComponent(
                      htmlOutput
                    )}`}
                    download="escape-room.html"
                    className="
                      px-4 py-2 rounded-lg
                      bg-purple-600 hover:bg-purple-700
                      text-white font-medium text-sm
                      transition-colors
                      focus:outline-2 focus:outline-solid focus:outline-black
                      dark:focus:outline-white focus:outline-offset-2
                    "
                    aria-label="Download HTML file"
                  >
                    Download HTML
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <p>Click Generate HTML to see the output</p>
              </div>
            )}
          </section>
        </div>

        <section className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Usage Example</h2>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-sm">
{`import { generateRoomHTML, RoomPayload } from "@/lib/generator";

const payload: RoomPayload = {
  title: "My Escape Room",
  timerMinutes: 30,
  theme: "light",
  stages: [
    {
      id: "stage-1",
      name: "First Challenge",
      description: "Complete the first task",
      completed: false,
    },
  ],
};

const html = generateRoomHTML(payload);`}
            </pre>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Complete standalone HTML page</li>
              <li>Inline CSS styling</li>
              <li>Inline JavaScript for timer</li>
              <li>Countdown timer with warnings</li>
              <li>Stage list with completion status</li>
              <li>Progress bar</li>
              <li>Responsive design</li>
              <li>Accessibility features</li>
              <li>Light and dark theme support</li>
            </ul>
          </div>
        </section>

        <section className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">API Endpoints</h3>
          <div className="space-y-3">
            <div>
              <code className="bg-gray-800 text-green-400 px-3 py-1 rounded">
                GET /api/generate-room
              </code>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Returns example HTML with default payload
              </p>
            </div>
            <div>
              <code className="bg-gray-800 text-green-400 px-3 py-1 rounded">
                POST /api/generate-room
              </code>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Accepts custom RoomPayload JSON and returns generated HTML
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}