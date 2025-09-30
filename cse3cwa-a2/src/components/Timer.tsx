"use client";

import { useState, useEffect } from "react";

interface TimerProps {
  minutes?: number;
  onExpire?: () => void;
}

export default function Timer({ minutes = 30, onExpire }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    setTimeLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (timeLeft === 0) {
      onExpire?.();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onExpire]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`
          text-4xl font-bold font-mono
          ${timeLeft <= 60 ? "text-red-600 dark:text-red-400" : "text-foreground"}
          ${timeLeft <= 10 ? "animate-pulse" : ""}
        `}
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        {formatTime(timeLeft)}
      </div>
    </div>
  );
}
