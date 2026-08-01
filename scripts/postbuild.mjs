import { copyFileSync, existsSync } from "node:fs";

const src = "dist/index.html";
const dst = "dist/404.html";

if (!existsSync(src)) {
  console.error("dist/index.html not found — run vite build first");
  process.exit(1);
}

copyFileSync(src, dst);
console.log("Copied dist/index.html -> dist/404.html (SPA fallback for GitHub Pages)");
