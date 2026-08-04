import puppeteer from "puppeteer-core";

const edge = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const base = "https://syedamirkafi.github.io/the-monolith";
const routes = ["/", "/projects", "/wins", "/about"];

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

for (const route of routes) {
  const page = await browser.newPage();
  const logs = [];
  page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
  page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));
  await page.goto(base + route, { waitUntil: "networkidle0", timeout: 60000 }).catch((e) => logs.push(`[goto] ${e.message}`));
  await new Promise((r) => setTimeout(r, 1500));
  const text = await page.evaluate(() => document.body.innerText.slice(0, 160).replace(/\n+/g, " | "));
  const h1 = await page.evaluate(() => document.querySelector("h1")?.innerText || "");
  console.log(`=== ${route} ===`);
  console.log("h1:", JSON.stringify(h1));
  console.log("body:", JSON.stringify(text));
  const errs = logs.filter((l) => l.startsWith("[error]") || l.startsWith("[pageerror]"));
  console.log("errors:", errs.length ? errs.join(" ;; ") : "none");
  await page.close();
}
await browser.close();
