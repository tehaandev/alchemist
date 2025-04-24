"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial =
      stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
    document.documentElement.classList.toggle("dark", initial === "dark");
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded hover:bg-muted/20 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

