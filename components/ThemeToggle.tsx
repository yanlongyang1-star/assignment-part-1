"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const preferDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const saved = localStorage.getItem("theme") ?? (preferDark ? "dark" : "light");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.dataset.bsTheme = isDark ? "dark" : "light";
  }, []);

  useEffect(() => {
    document.documentElement.dataset.bsTheme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="d-flex align-items-center gap-2">
      <label className="form-check-label" htmlFor="themeSwitch">Dark Mode</label>
      <input
        id="themeSwitch"
        type="checkbox"
        className="form-check-input"
        checked={dark}
        onChange={(e) => setDark(e.currentTarget.checked)}
      />
    </div>
  );
}
