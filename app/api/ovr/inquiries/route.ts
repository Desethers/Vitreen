import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { client, getSanityConfigError, writeClient } from "@/lib/ovr/sanityClient";

type InquiryPayload = {
  token?: string;
  blockKey?: string;
  slotKey?: string;
  collectorName?: string;
  collectorEmail?: string;
  message?: string;
};

type InquirySlot = {
  _key?: string;
  title?: string;
  artist?: string;
  year?: string;
  medium?: string;
  dimensions?: string;
  price?: string;
};

type InquiryVR = {
  _id: string;
  title?: string;
  headline?: string;
  galleryName?: string;
  ownerId?: string;
  ownerEmail?: string;
  inquiryEmail?: string;
  blocks?: Array<{
    _key?: string;
    slots?: InquirySlot[];
  }>;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validEmail(value: string | undefined) {
  if (!value) return false;
  return /^[^\s<>"']+@[^\s<>"']+\.[^\s<>"']+$/.test(value.trim());
}

function slotLabel(slot: InquirySlot) {
  return (
    [slot.artist, slot.title, slot.year]
      .map((v) => v?.trim())
      .filter(Boolean)
      .join(", ") || "Artwork inquiry"
  );
}

export async function POST(req: NextRequest) {
  try {
    const sanityConfigError = getSanityConfigError({ requireWriteToken: true });
    if (sanityConfigError) {
      return NextResponse.json({ error: sanityConfigError }, { status: 500 });
    }

    const body = (await req.json()) as InquiryPayload;
    const token = body.token?.trim();
    const blockKey = body.blockKey?.trim();
    const slotKey = body.slotKey?.trim();
    const collectorName = body.collectorName?.trim() ?? "";
    const collectorEmail = body.collectorEmail?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!token || !blockKey || !slotKey) {
      return NextResponse.json({ error: "Missing inquiry context." }, { status: 400 });
    }
    if (!collectorName) {
      return NextResponse.json({ error: "Your name is required." }, { status: 400 });
    }
    if (!validEmail(collectorEmail)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const vr = (await (client as any).fetch(
      `*[_type == "viewingRoom" && token == $token && status == "active"][0]{
        _id,
        title,
        headline,
        galleryName,
        ownerId,
        ownerEmail,
        inquiryEmail,
        blocks[]{
          _key,
          slots[]{ _key, title, artist, year, medium, dimensions, price }
        }
      }`,
      { token }
    )) as InquiryVR | null;

    if (!vr) return NextResponse.json({ error: "Viewing room not found." }, { status: 404 });

    const block = (vr.blocks ?? []).find((b) => b._key === blockKey);
    const slot = block?.slots?.find((s) => s._key === slotKey);
    if (!slot) return NextResponse.json({ error: "Artwork not found." }, { status: 404 });

    const createdAt = new Date().toISOString();
    const inquiry = await writeClient.create({
      _type: "viewingRoomInquiry",
      viewingRoomId: vr._id,
      viewingRoomToken: token,
      viewingRoomTitle: vr.title ?? "",
      ownerId: vr.ownerId ?? "",
      inquiryEmail: vr.inquiryEmail ?? "",
      artworkArtist: slot.artist ?? "",
      artworkTitle: slot.title ?? "",
      artworkYear: slot.year ?? "",
      artworkMedium: slot.medium ?? "",
      artworkDimensions: slot.dimensions ?? "",
      collectorName,
      collectorEmail,
      message,
      status: "new",
      createdAt,
    });

    const notifyTo = validEmail(vr.inquiryEmail)
      ? vr.inquiryEmail!.trim()
      : validEmail(vr.ownerEmail)
        ? vr.ownerEmail!.trim()
        : "";
    const key = process.env.RESEND_API_KEY;
    let notificationSent = false;

    if (key && notifyTo) {
      const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || req.nextUrl.origin;
      const roomUrl = `${base}/viewingroom-studio/vr/${encodeURIComponent(token)}`;
      const dashboardUrl = `${base}/viewingroom-studio/dashboard`;
      const work = slotLabel(slot);
      const from = process.env.OVR_EMAIL_FROM?.trim() || "Viewing Room <onboarding@resend.dev>";
      const resend = new Resend(key);
      const { error } = await resend.emails.send({
        from,
        to: notifyTo,
        subject: `New inquiry — ${work}`,
        text: `New inquiry\n\nArtwork: ${work}\nCollector: ${collectorName} <${collectorEmail}>\n${message ? `Message: ${message}\n` : ""}\nViewing room: ${roomUrl}\nDashboard: ${dashboardUrl}`,
        html: `
<!DOCTYPE html>
<html><body style="margin:0;padding:32px;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#111111;">
  <p style="margin:0 0 20px;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#888888;">New inquiry</p>
  <h1 style="margin:0 0 20px;font-size:24px;line-height:1.25;font-weight:400;">${escapeHtml(work)}</h1>
  <p style="margin:0 0 8px;font-size:14px;"><strong>Collector</strong><br>${escapeHtml(collectorName)} &lt;${escapeHtml(collectorEmail)}&gt;</p>
  ${message ? `<p style="margin:20px 0 0;font-size:14px;line-height:1.55;"><strong>Message</strong><br>${escapeHtml(message).replaceAll("\n", "<br>")}</p>` : ""}
  <p style="margin:28px 0 0;font-size:14px;"><a href="${escapeHtml(roomUrl)}" style="color:#111111;text-decoration:underline;">Open viewing room</a></p>
  <p style="margin:10px 0 0;font-size:14px;"><a href="${escapeHtml(dashboardUrl)}" style="color:#111111;text-decoration:underline;">Open dashboard</a></p>
</body></html>`,
      });
      notificationSent = !error;
      if (error) console.error("Inquiry notification error:", error);
    }

    return NextResponse.json(
      { ok: true, inquiryId: inquiry._id, notificationSent },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create inquiry error:", err);
    const message = err instanceof Error ? err.message : "Error sending inquiry.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
