"use client";

import React, { useEffect } from "react";

export default function ThemeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial =
      stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  return <>{children}</>;
}
