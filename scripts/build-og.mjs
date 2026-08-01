import { writeFileSync } from "node:fs";
import { launch } from "puppeteer-core";

const EDGE =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outFile = "public/og.png";

const browser = await launch({
  executablePath: EDGE,
  headless: true,
  args: ["--no-first-run", "--no-proxy-server", "--disable-gpu"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(`file:///${process.cwd().replaceAll("\\", "/")}/scripts/og.html`, {
    waitUntil: "networkidle0",
  });
  const img = await page.screenshot({ type: "png" });
  writeFileSync(outFile, img);
  console.log(`Wrote ${outFile} (${img.length} bytes)`);
} finally {
  await browser.close();
}
