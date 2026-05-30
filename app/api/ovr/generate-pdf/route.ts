import { NextRequest, NextResponse } from "next/server";
import { generateBlocksPDF } from "@/lib/ovr/pdfTemplate";
import { sanitizeInquireHrefForPdf } from "@/lib/ovr/pdfInquireHref";
import { checkExportQuota, consumeExport } from "@/lib/ovr/exportQuota";
import { launchPdfBrowser } from "@/lib/ovr/launchPdfBrowser";
import type { Block, ImageItem, VrSetup } from "@/lib/ovr/buildTypes";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const quota = await checkExportQuota();
  if (!quota.ok) return NextResponse.json({ error: quota.error }, { status: quota.status });

  const contentType = req.headers.get("content-type") ?? "";
  const body =
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
      ? JSON.parse(String((await req.formData()).get("payload") ?? "{}"))
      : await req.json();

  const {
    blocks,
    images,
    setup,
    inquireHref: rawInquire,
  } = body as {
    blocks: Block[];
    images: ImageItem[];
    setup: VrSetup | null;
    inquireHref?: string;
  };

  const inquireHref = sanitizeInquireHrefForPdf(rawInquire);
  const html = generateBlocksPDF({ blocks, images, setup, inquireHref });

  try {
    const browser = await launchPdfBrowser();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60_000);
    page.setDefaultTimeout(60_000);
    // `networkidle0` peut échouer en serverless; `load` est plus fiable ici.
    await page.setContent(html, { waitUntil: "load" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    await browser.close();

    if (!quota.isPro) await consumeExport(quota.userId, quota.used);

    return new NextResponse(pdf as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="viewing-room.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF error:", err);
    const message = err instanceof Error ? err.message : "PDF generation failed";
    return NextResponse.json({ error: message || "PDF generation failed" }, { status: 500 });
  }
}
