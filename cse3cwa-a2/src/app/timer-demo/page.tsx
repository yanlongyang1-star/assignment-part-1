"use client";

import { useState } from "react";
import Timer from "@/components/Timer";
import Link from "next/link";

export default function TimerDemoPage() {
  const [isExpired, setIsExpired] = useState(false);
  const [minutes, setMinutes] = useState(30);
  const [key, setKey] = useState(0);

  const handleExpire = () => {
    setIsExpired(true);
    alert("Time's up!");
  };

  const resetTimer = () => {
    setIsExpired(false);
    setKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 bg-background text-foreground">
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
            Timer Component Demo
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Countdown timer for escape room games
          </p>
        </header>

        <section className="bg-gray-100 dark:bg-gray-900 rounded-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Current Timer</h2>
            <Timer key={key} minutes={minutes} onExpire={handleExpire} />
            {isExpired && (
              <p className="mt-4 text-red-600 dark:text-red-400 font-semibold text-xl">
                Timer Expired!
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="minutes" className="font-medium">
                Set Minutes:
              </label>
              <input
                id="minutes"
                type="number"
                min="1"
                max="60"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="
                  px-4 py-2 rounded-md border
                  border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-800
                  text-foreground
                  focus:outline-2 focus:outline-solid focus:outline-black
                  dark:focus:outline-white focus:outline-offset-2
                "
                aria-label="Set timer duration in minutes"
              />
            </div>

            <button
              onClick={resetTimer}
              className="
                px-6 py-3 rounded-lg
                bg-blue-600 hover:bg-blue-700
                dark:bg-blue-500 dark:hover:bg-blue-600
                text-white font-semibold
                transition-colors
                focus:outline-2 focus:outline-solid focus:outline-black
                dark:focus:outline-white focus:outline-offset-2
              "
              aria-label="Reset timer"
            >
              Reset Timer
            </button>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Component Features</h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">+</span>
              <span><strong>Customizable Duration:</strong> Default 30 minutes, adjustable via <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">minutes</code> prop</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">+</span>
              <span><strong>Countdown Timer:</strong> Decrements every second</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">+</span>
              <span><strong>Expiration Callback:</strong> Calls <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">onExpire()</code> when time reaches 0</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">+</span>
              <span><strong>Format Display:</strong> Shows time as mm:ss</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">+</span>
              <span><strong>Visual Alerts:</strong> Red color when &lt; 1 minute, pulse animation when &lt; 10 seconds</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400">+</span>
              <span><strong>Accessibility:</strong> Includes ARIA attributes for screen readers</span>
            </li>
          </ul>
        </section>

        <section className="mt-8 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Usage Example:</h3>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
{`import Timer from "@/components/Timer";

export default function GamePage() {
  const handleTimeUp = () => {
    console.log("Time's up!");
  };

  return (
    <Timer 
      minutes={30} 
      onExpire={handleTimeUp} 
    />
  );
}`}
          </pre>
        </section>
      </main>
    </div>
  );
}
