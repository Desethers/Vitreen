import { NextResponse } from "next/server";
import { requireDashboardUser } from "@/lib/ovr/authAccess";
import { client, getSanityConfigError } from "@/lib/ovr/sanityClient";

export async function GET() {
  const gate = await requireDashboardUser();
  if (!gate.ok) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const sanityConfigError = getSanityConfigError();
  if (sanityConfigError) {
    return NextResponse.json({ error: sanityConfigError }, { status: 500 });
  }

  const inquiries = await client.fetch(
    `*[_type == "viewingRoomInquiry" && ownerId == $userId] | order(createdAt desc)[0...100]{
      _id,
      viewingRoomToken,
      viewingRoomTitle,
      artworkArtist,
      artworkTitle,
      artworkYear,
      collectorName,
      collectorEmail,
      message,
      status,
      createdAt
    }`,
    { userId: gate.user.userId }
  );

  return NextResponse.json({ inquiries });
}
