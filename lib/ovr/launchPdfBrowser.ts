import fs from "node:fs";
import type { Browser } from "puppeteer-core";

function defaultSystemChrome(): string | undefined {
  const candidates =
    process.platform === "darwin"
      ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
      : process.platform === "win32"
        ? [
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          ]
        : [
            "/usr/bin/google-chrome-stable",
            "/usr/bin/google-chrome",
            "/usr/bin/chromium-browser",
            "/usr/bin/chromium",
          ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch {
      /* ignore */
    }
  }
  return undefined;
}

/** Lance Chromium pour la génération PDF : binaire Sparticuz sur Vercel, Chrome système en local. */
export async function launchPdfBrowser(): Promise<Browser> {
  const puppeteer = (await import("puppeteer-core")).default;

  if (process.env.VERCEL === "1") {
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH?.trim() ||
    process.env.CHROME_PATH?.trim() ||
    defaultSystemChrome();

  if (!executablePath) {
    throw new Error(
      "PDF: Chrome introuvable. Installe Google Chrome ou définis PUPPETEER_EXECUTABLE_PATH (voir README / déploiement Vercel)."
    );
  }

  return puppeteer.launch({
    headless: true,
    executablePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });
}
