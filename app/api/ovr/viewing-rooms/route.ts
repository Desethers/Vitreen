import { NextRequest, NextResponse } from "next/server";
import { getSanityConfigError, writeClient } from "@/lib/ovr/sanityClient";
import { checkExportQuota, consumeExport } from "@/lib/ovr/exportQuota";
import type { Block, BlockSlot, ImageItem, VrSetup } from "@/lib/ovr/buildTypes";
import { getSignedInDashboardUser } from "@/lib/ovr/authAccess";

function generateToken() {
  return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
}

async function uploadDataUrl(dataUrl: string): Promise<string | null> {
  try {
    const [header, base64] = dataUrl.split(",");
    const mime = header.match(/:(.*?);/)?.[1] ?? "image/jpeg";
    const buffer = Buffer.from(base64, "base64");
    const asset = await writeClient.assets.upload("image", buffer, { contentType: mime });
    return asset._id;
  } catch (e) {
    console.error("Image upload failed:", e);
    return null;
  }
}

function validEmail(value: string | undefined) {
  if (!value) return false;
  return /^[^\s<>"']+@[^\s<>"']+\.[^\s<>"']+$/.test(value.trim());
}

export async function POST(req: NextRequest) {
  try {
    const sanityConfigError = getSanityConfigError({ requireWriteToken: true });
    if (sanityConfigError) {
      return NextResponse.json({ error: sanityConfigError }, { status: 500 });
    }

    const quota = await checkExportQuota();
    if (!quota.ok) return NextResponse.json({ error: quota.error }, { status: quota.status });

    const { blocks, images, setup } = (await req.json()) as {
      blocks: Block[];
      images: ImageItem[];
      setup: VrSetup | null;
    };
    const signedInUser = await getSignedInDashboardUser().catch(() => null);
    const ownerId = signedInUser?.userId ?? quota.userId;
    const ownerEmail = signedInUser?.email ?? "";
    const setupContact = setup?.galleryContact?.trim() ?? "";
    const inquiryEmail = validEmail(setupContact) ? setupContact : ownerEmail;
    const imageById = new Map(images.map((img) => [img.id, img]));

    // Upload all images to Sanity and build an id → assetId map
    const assetMap: Record<string, string> = {};
    await Promise.all(
      images.map(async (img) => {
        if (img.dataUrl) {
          const assetId = await uploadDataUrl(img.dataUrl);
          if (assetId) assetMap[img.id] = assetId;
        }
      })
    );

    const processedBlocks = blocks.map((block, i) => ({
      _key: `block${i}${Date.now()}`,
      blockType: block.type,
      quoteText: block.quoteText,
      quoteAuthor: block.quoteAuthor,
      textStyle: block.textStyle ?? undefined,
      showInquire: !block.inquireHidden,
      sideTextType: block.sideTextType ?? undefined,
      slots: block.slots.map((slot: BlockSlot, j: number) => {
        const img = slot.imageId ? imageById.get(slot.imageId) : null;
        const assetId = slot.imageId ? assetMap[slot.imageId] : null;
        return {
          _key: `slot${j}`,
          title: img?.title ?? "",
          artist: img?.artist ?? "",
          year: img?.year ?? "",
          medium: img?.medium ?? "",
          dimensions: img?.dimensions ?? "",
          price: img?.price ?? "",
          showPrice: img?.showPrice ?? false,
          ...(assetId
            ? { image: { _type: "image", asset: { _type: "reference", _ref: assetId } } }
            : {}),
        };
      }),
    }));

    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const doc = {
      _type: "viewingRoom",
      title: setup?.title ?? "Viewing Room",
      headline: setup?.headline ?? "Viewing Room",
      galleryName: setup?.galleryName ?? "",
      galleryAddress: setup?.galleryAddress ?? "",
      galleryContact: setup?.galleryContact ?? "",
      recipientName: setup?.recipientName ?? "",
      recipientEmail: setup?.recipientEmail ?? "",
      introText: setup?.introText ?? "",
      ownerId,
      ownerEmail,
      inquiryEmail,
      createdAt: new Date().toISOString(),
      token,
      status: "active",
      expiresAt: expiresAt.toISOString().split("T")[0],
      viewCount: 0,
      blocks: processedBlocks,
    };

    const created = await writeClient.create(doc);

    if (!quota.isPro) await consumeExport(quota.userId, quota.used);

    return NextResponse.json({ _id: created._id, token }, { status: 201 });
  } catch (err) {
    console.error("Create viewing room error:", err);
    const message = err instanceof Error ? err.message : "Error saving the viewing room.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
