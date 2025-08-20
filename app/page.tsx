"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="mt-4">Welcome to LTU Assignment</h1>
      <p className="lead">Next.js + Bootstrap</p>
      <p className="mt-4"><Link className="btn btn-outline-dark" href="/generators/tabs">Open Tabs Generator</Link></p>
    </div>
  );
}
