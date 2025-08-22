"use client";

import React from "react";

type TopBarProps = {
  title?: string;
  studentName: string;
  studentNo: string;
};

export default function TopBar({
  title = "CWA Tabs Builder",
  studentName,
  studentNo,
}: TopBarProps) {
  return (
    <div
      role="banner"
      aria-label="Top bar"
      className="topbar"
    >
      <div className="topbar__inner">
        <div className="topbar__title" aria-label="Site title">
          {title}
        </div>
        <div className="topbar__student" aria-label="Student information">
          <span className="topbar__name">{studentName}</span>
          <span className="topbar__dot" aria-hidden>·</span>
          <span className="topbar__no">{studentNo}</span>
        </div>
      </div>
    </div>
  );
}
