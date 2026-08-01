import { writeFileSync } from "node:fs";
import { launch } from "puppeteer-core";

const EDGE =
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const inFile = "scripts/cv.html";
const outFile = "public/cv/SyedAmirKafi_CV.pdf";

const browser = await launch({
  executablePath: EDGE,
  headless: true,
  args: ["--no-first-run", "--no-proxy-server", "--disable-gpu"],
});

try {
  const page = await browser.newPage();
  await page.goto(`file:///${process.cwd().replaceAll("\\", "/")}/${inFile}`, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "14mm", bottom: "14mm", left: "12mm", right: "12mm" },
  });
  writeFileSync(outFile, pdf);
  console.log(`Wrote ${outFile} (${pdf.length} bytes)`);
} finally {
  await browser.close();
}
