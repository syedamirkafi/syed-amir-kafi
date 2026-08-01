const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export function withBase(path) {
  if (/^https?:\/\//.test(path) || path.startsWith("mailto:") || path.startsWith("#")) {
    return path;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
