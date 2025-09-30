"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex flex-col">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              Escape Room Game
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Yanlong Yang, Student No. 22519263
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link 
                href="/" 
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="Home"
              >
                Home
              </Link>
              <Link 
                href="/escape" 
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="Escape Challenge"
              >
                Escape Challenge
              </Link>
              <Link 
                href="/rooms-demo" 
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="Rooms"
              >
                Rooms
              </Link>
              <Link 
                href="/about" 
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="About"
              >
                About
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
