const KEY = "sak-theme";
const COLOR_KEY = "sak-theme-color";

function setMetaThemeColor(color) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", color);
  try {
    localStorage.setItem(COLOR_KEY, color);
  } catch (e) {}
}

function getThemeColor() {
  try {
    const stored = localStorage.getItem(COLOR_KEY);
    if (stored) return stored;
  } catch (e) {}
  // Use the new design system colors
  return document.documentElement.classList.contains("dark")
    ? "#0f172a"
    : "#ffffff";
}

export function getInitialTheme() {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  const newColor = theme === "dark" ? "#0f172a" : "#ffffff";
  setMetaThemeColor(newColor);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* ignore */
  }
}

export function toggleTheme() {
  const next = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  applyTheme(next);
  return next;
}

export { getThemeColor };
