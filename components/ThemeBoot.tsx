"use client";
import { useEffect } from "react";

export default function ThemeBoot(){
  useEffect(() => {
    (async () => {
      await import("bootstrap/dist/js/bootstrap.bundle.min.js");
    })();
  }, []);
  return null;
}
