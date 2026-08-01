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
      className="theme-toggle-btn label-mono text-xs px-2 py-1 border border-ink/30 hover:border-ink hover:bg-ink hover:text-base transition-colors"
    >
      {current === "dark" ? "☀ LIGHT" : "☾ NIGHT"}
    </button>
  );
}
