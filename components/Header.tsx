"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body border-bottom sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-semibold" href="/">LTU A1</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="mainNav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" href="/">Tabs</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/prelab">Pre-lab Questions</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/escape-room">Escape Room</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/coding-races">Coding Races</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/about">About</Link></li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
