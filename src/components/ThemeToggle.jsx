import { useSyncExternalStore } from "react";
import { getInitialTheme, applyTheme, toggleTheme } from "../lib/theme.js";

const listeners = new Set();
let current = getInitialTheme();
applyTheme(current);

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return current;
}

function refresh() {
  const next = document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
  if (next !== current) {
    current = next;
    listeners.forEach((cb) => cb());
  }
}

window.addEventListener("storage", (e) => {
  if (e.key === "monolith-theme") refresh();
});

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" />
      <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
        refresh();
      }}
      aria-label="Toggle day/night mode"
      className="theme-toggle-btn label-mono text-[0.65rem] px-2.5 py-1.5 border border-ink/30 hover:border-ink hover:bg-ink hover:text-base transition-colors flex items-center gap-1.5"
    >
      {current === "dark" ? <SunIcon /> : <MoonIcon />}
      <span>{current === "dark" ? "LIGHT" : "NIGHT"}</span>
    </button>
  );
}
