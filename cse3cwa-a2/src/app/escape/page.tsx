"use client";

import { useState } from "react";
import Timer from "@/components/Timer";
import Link from "next/link";

const UNFORMATTED_CODE = `function test(){const x=5;if(x>3){console.log("yes")}return x*2}`;

const FORMATTED_CODE = `function test() {
  const x = 5;
  if (x > 3) {
    console.log("yes");
  }
  return x * 2;
}`;

const BUGGY_CODE = `function validateAge(age) {
  if (age == "18") {
    return "Adult";
  }
  return "Not adult";
}`;

const FIXED_CODE = `function validateAge(age) {
  if (age === 18) {
    return "Adult";
  }
  return "Not adult";
}`;

export default function EscapePage() {
  const [stage1Complete, setStage1Complete] = useState(false);
  const [stage2Complete, setStage2Complete] = useState(false);
  const [stage3Complete, setStage3Complete] = useState(false);

  const [showFormattedCode, setShowFormattedCode] = useState(false);

  const [debugAnswer, setDebugAnswer] = useState("");

  const [loopAnswer, setLoopAnswer] = useState("");

  const [gameOver, setGameOver] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  const allStagesComplete = stage1Complete && stage2Complete && stage3Complete;

  const handleFormatCode = () => {
    setShowFormattedCode(true);
    setStage1Complete(true);
  };

  const handleDebugSubmit = () => {
    const answer = debugAnswer.trim();
    if (answer === "===" || answer.includes("===") && answer.includes("18")) {
      setStage2Complete(true);
    } else {
      alert("Not quite! Hint: Look at the comparison operator and data types.");
    }
  };

  const handleLoopSubmit = () => {
    const answer = loopAnswer.trim();
    if (
      answer.includes("i <= 1000") ||
      answer.includes("i < 1001") ||
      (answer.includes("for") && answer.includes("1000"))
    ) {
      setStage3Complete(true);
    } else {
      alert("Not quite! Hint: The loop should go from 0 to 1000 (inclusive).");
    }
  };

  const handleTimeExpire = () => {
    setTimeExpired(true);
    setGameOver(true);
  };

  if (allStagesComplete && !gameOver) {
    setGameOver(true);
  }

  return (
    <div
      className="min-h-screen p-4 sm:p-8 pb-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3Cpattern id=\"grid\" width=\"20\" height=\"20\" patternUnits=\"userSpaceOnUse\"%3E%3Cpath d=\"M 20 0 L 0 0 0 20\" fill=\"none\" stroke=\"%23333\" stroke-width=\"0.5\"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\"100\" height=\"100\" fill=\"url(%23grid)\" /%3E%3C/svg%3E')",
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-8 text-center text-white">
          <Link
            href="/"
            className="
              inline-flex items-center gap-2 mb-4
              text-blue-400 hover:text-blue-300
              hover:underline
              focus:outline-2 focus:outline-solid focus:outline-white
              focus:outline-offset-2
              rounded px-2 py-1
            "
            aria-label="Go back to home page"
          >
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Escape Room Challenge
          </h1>
          <p className="text-lg sm:text-xl mb-6 text-gray-300">
            Complete all three coding challenges to escape!
          </p>

          <div className="bg-black/50 rounded-lg p-4 inline-block backdrop-blur-sm">
            <p className="text-sm text-gray-300 mb-2">Time Remaining:</p>
            <Timer minutes={30} onExpire={handleTimeExpire} />
          </div>
        </header>

        {allStagesComplete && !timeExpired && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md text-center animate-bounce">
              <h2 className="text-4xl font-bold mb-4">You Escaped!</h2>
              <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
                Congratulations! You&apos;ve completed all challenges!
              </p>
              <Link
                href="/"
                className="
                  inline-block px-6 py-3 rounded-lg
                  bg-green-600 hover:bg-green-700
                  text-white font-semibold
                  transition-colors
                  focus:outline-2 focus:outline-solid focus:outline-black
                  dark:focus:outline-white focus:outline-offset-2
                "
                aria-label="Return to home page"
              >
                Return Home
              </Link>
            </div>
          </div>
        )}

        {timeExpired && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md text-center">
              <h2 className="text-4xl font-bold mb-4 text-red-600 dark:text-red-400">
                Time&apos;s Up!
              </h2>
              <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
                You ran out of time. Better luck next time!
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/escape"
                  className="
                    inline-block px-6 py-3 rounded-lg
                    bg-blue-600 hover:bg-blue-700
                    text-white font-semibold
                    transition-colors
                    focus:outline-2 focus:outline-solid focus:outline-black
                    dark:focus:outline-white focus:outline-offset-2
                  "
                  aria-label="Try again"
                >
                  Try Again
                </Link>
                <Link
                  href="/"
                  className="
                    inline-block px-6 py-3 rounded-lg
                    bg-gray-600 hover:bg-gray-700
                    text-white font-semibold
                    transition-colors
                    focus:outline-2 focus:outline-solid focus:outline-black
                    dark:focus:outline-white focus:outline-offset-2
                  "
                  aria-label="Return to home page"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        )}

        <main className="space-y-6">
          <section
            className={`
              bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2
              ${stage1Complete ? "border-green-500" : "border-gray-300 dark:border-gray-700"}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Stage 1: Format Code
              </h2>
              {stage1Complete && (
                <span className="text-green-600 dark:text-green-400 text-2xl">
                  Done
                </span>
              )}
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Click the button to format the messy code below:
            </p>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <h3 className="text-sm text-gray-400 mb-2">Before:</h3>
              <pre className="text-sm">{UNFORMATTED_CODE}</pre>
            </div>

            {showFormattedCode && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-md mb-4 overflow-x-auto">
                <h3 className="text-sm text-gray-400 mb-2">After:</h3>
                <pre className="text-sm">{FORMATTED_CODE}</pre>
              </div>
            )}

            <button
              onClick={handleFormatCode}
              disabled={stage1Complete}
              className={`
                px-6 py-3 rounded-lg font-semibold transition-colors
                focus:outline-2 focus:outline-solid focus:outline-black
                dark:focus:outline-white focus:outline-offset-2
                ${
                  stage1Complete
                    ? "bg-gray-400 cursor-not-allowed text-gray-700"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }
              `}
              aria-label="Format the code"
            >
              {stage1Complete ? "Completed" : "Format Code"}
            </button>
          </section>

          <section
            className={`
              bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2
              ${stage2Complete ? "border-green-500" : "border-gray-300 dark:border-gray-700"}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Stage 2: Debug Code
              </h2>
              {stage2Complete && (
                <span className="text-green-600 dark:text-green-400 text-2xl">
                  Done
                </span>
              )}
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Find and fix the bug in this code. What should replace the buggy operator?
            </p>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
              <h3 className="text-sm text-gray-400 mb-2">Buggy Code:</h3>
              <pre className="text-sm">{BUGGY_CODE}</pre>
              <p className="text-yellow-400 text-sm mt-2">
                ⚠️ Bug: The function returns &quot;Adult&quot; for age=&quot;18&quot; (string) but not for age=18 (number)
              </p>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-md mb-4 overflow-x-auto">
              <h3 className="text-sm text-gray-400 mb-2">Fixed Code:</h3>
              <pre className="text-sm">{FIXED_CODE}</pre>
            </div>

            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label
                  htmlFor="debug-answer"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Your answer (what should replace ==):
                </label>
                <input
                  id="debug-answer"
                  type="text"
                  value={debugAnswer}
                  onChange={(e) => setDebugAnswer(e.target.value)}
                  disabled={stage2Complete}
                  placeholder="Enter the correct operator and value..."
                  className="
                    w-full px-4 py-2 rounded-md border
                    border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-gray-900 dark:text-white
                    focus:outline-2 focus:outline-solid focus:outline-black
                    dark:focus:outline-white focus:outline-offset-2
                    disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed
                  "
                  aria-label="Enter your answer for the debug challenge"
                />
              </div>
              <button
                onClick={handleDebugSubmit}
                disabled={stage2Complete}
                className={`
                  px-6 py-2 rounded-lg font-semibold transition-colors
                  focus:outline-2 focus:outline-solid focus:outline-black
                  dark:focus:outline-white focus:outline-offset-2
                  ${
                    stage2Complete
                      ? "bg-gray-400 cursor-not-allowed text-gray-700"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                `}
                aria-label="Submit your debug answer"
              >
                {stage2Complete ? "Completed" : "Submit"}
              </button>
            </div>
          </section>

          <section
            className={`
              bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2
              ${stage3Complete ? "border-green-500" : "border-gray-300 dark:border-gray-700"}
            `}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Stage 3: Loop Challenge
              </h2>
              {stage3Complete && (
                <span className="text-green-600 dark:text-green-400 text-2xl">
                  Done
                </span>
              )}
            </div>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Write a for loop that prints numbers from 0 to 1000 (inclusive).
            </p>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-md mb-4">
              <h3 className="text-sm text-gray-400 mb-2">Example:</h3>
              <pre className="text-sm">
{`for (let i = 0; i <= ???; i++) {
  console.log(i);
}`}
              </pre>
            </div>

            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label
                  htmlFor="loop-answer"
                  className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
                >
                  Your loop condition:
                </label>
                <input
                  id="loop-answer"
                  type="text"
                  value={loopAnswer}
                  onChange={(e) => setLoopAnswer(e.target.value)}
                  disabled={stage3Complete}
                  placeholder="e.g., i <= 1000"
                  className="
                    w-full px-4 py-2 rounded-md border
                    border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-700
                    text-gray-900 dark:text-white
                    focus:outline-2 focus:outline-solid focus:outline-black
                    dark:focus:outline-white focus:outline-offset-2
                    disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed
                  "
                  aria-label="Enter your loop condition"
                />
              </div>
              <button
                onClick={handleLoopSubmit}
                disabled={stage3Complete}
                className={`
                  px-6 py-2 rounded-lg font-semibold transition-colors
                  focus:outline-2 focus:outline-solid focus:outline-black
                  dark:focus:outline-white focus:outline-offset-2
                  ${
                    stage3Complete
                      ? "bg-gray-400 cursor-not-allowed text-gray-700"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                `}
                aria-label="Submit your loop answer"
              >
                {stage3Complete ? "Completed" : "Submit"}
              </button>
            </div>
          </section>

          <section className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Progress
            </h3>
            <div className="flex gap-4 items-center">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ((stage1Complete ? 1 : 0) +
                        (stage2Complete ? 1 : 0) +
                        (stage3Complete ? 1 : 0)) *
                      33.33
                    }%`,
                  }}
                  role="progressbar"
                  aria-valuenow={
                    (stage1Complete ? 1 : 0) +
                    (stage2Complete ? 1 : 0) +
                    (stage3Complete ? 1 : 0)
                  }
                  aria-valuemin={0}
                  aria-valuemax={3}
                  aria-label="Challenge progress"
                />
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {(stage1Complete ? 1 : 0) +
                  (stage2Complete ? 1 : 0) +
                  (stage3Complete ? 1 : 0)}
                /3
              </span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
