import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "subscriptions_disabled" }, { status: 503 });
}
