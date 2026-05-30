"use client";

type Room = {
  _id: string;
  title?: string;
  headline?: string;
  recipientName?: string;
  recipientEmail?: string;
  token: string;
  status?: string;
  expiresAt?: string;
  viewCount?: number;
  createdAt?: string;
  inquiryCount?: number;
};

type Inquiry = {
  _id: string;
  viewingRoomToken?: string;
  viewingRoomTitle?: string;
  artworkArtist?: string;
  artworkTitle?: string;
  artworkYear?: string;
  collectorName?: string;
  collectorEmail?: string;
  message?: string;
  status?: string;
  createdAt?: string;
};

function formatDate(value?: string) {
  if (!value) return "No date";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "No date";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    d
  );
}

function roomTitle(room: Room) {
  return room.headline?.trim() || room.title?.trim() || "Untitled viewing room";
}

function inquiryArtwork(inquiry: Inquiry) {
  return (
    [inquiry.artworkArtist, inquiry.artworkTitle, inquiry.artworkYear]
      .map((v) => v?.trim())
      .filter(Boolean)
      .join(", ") || "Artwork inquiry"
  );
}

function roomUrl(baseUrl: string, token?: string) {
  if (!token) return "";
  return `${baseUrl}/vr/${token}`;
}

function statusLabel(value?: string) {
  return value?.trim() || "active";
}

function isThisWeek(value?: string) {
  if (!value) return false;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return d.getTime() >= sevenDaysAgo;
}

function isExpiringSoon(value?: string) {
  if (!value) return false;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return false;
  const now = Date.now();
  const inSevenDays = now + 7 * 24 * 60 * 60 * 1000;
  return d.getTime() >= now && d.getTime() <= inSevenDays;
}

function Sparkline() {
  return (
    <svg viewBox="0 0 220 64" className="h-16 w-full overflow-visible" aria-hidden="true">
      <path
        d="M0 48 L26 42 L52 46 L78 28 L104 40 L130 18 L156 35 L182 22 L220 30"
        fill="none"
        stroke="#111827"
        strokeWidth="2"
      />
      <path
        d="M0 48 L26 42 L52 46 L78 28 L104 40 L130 18 L156 35 L182 22 L220 30 L220 64 L0 64 Z"
        fill="url(#activityFill)"
        opacity="0.08"
      />
      <defs>
        <linearGradient id="activityFill" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#111827" />
          <stop offset="1" stopColor="#111827" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DashboardClient({
  rooms,
  inquiries,
  baseUrl,
}: {
  rooms: Room[];
  inquiries: Inquiry[];
  baseUrl: string;
}) {
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      console.warn("Clipboard copy failed:", value);
    }
  };

  const totalViews = rooms.reduce((sum, room) => sum + (room.viewCount ?? 0), 0);
  const totalInquiries = inquiries.length;
  const activeRooms = rooms.filter(
    (room) => statusLabel(room.status).toLowerCase() !== "expired"
  ).length;
  const inquiryRate = totalViews ? `${Math.round((totalInquiries / totalViews) * 100)}%` : "0%";
  const latestInquiry = inquiries[0];
  const latestRooms = rooms.slice(0, 8);
  const roomsCreatedThisWeek = rooms.filter((room) => isThisWeek(room.createdAt)).length;
  const roomsExpiringSoon = rooms.filter((room) => isExpiringSoon(room.expiresAt)).length;
  const openInquiries = inquiries.filter((inquiry) => {
    const status = inquiry.status?.toLowerCase().trim();
    return !status || status === "new" || status === "open";
  }).length;
  const hotRoom = [...rooms].sort(
    (a, b) =>
      (b.inquiryCount ?? 0) * 5 +
      (b.viewCount ?? 0) -
      ((a.inquiryCount ?? 0) * 5 + (a.viewCount ?? 0))
  )[0];
  const hotRoomUrl = hotRoom ? roomUrl(baseUrl, hotRoom.token) : "";
  const latestInquiryUrl = latestInquiry ? roomUrl(baseUrl, latestInquiry.viewingRoomToken) : "";

  return (
    <main className="min-h-screen bg-white px-5 py-6 text-gray-950 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-400">
              Viewing Room Studio
            </p>
            <h1 className="mt-2 text-lg font-normal tracking-tight sm:text-xl">
              Selection activity
            </h1>
          </div>
          <a
            href="/editor"
            className="inline-flex h-10 items-center justify-center rounded-[5px] bg-gray-950 px-4 text-sm text-white transition-colors hover:bg-gray-700"
          >
            + New private selection
          </a>
        </header>

        <section className="mb-12 grid gap-4 lg:grid-cols-3">
          <article className="rounded-[8px] border border-gray-200 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-medium text-gray-950">Selection pipeline</h2>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
                {rooms.length} total
              </span>
            </div>
            <div className="space-y-3">
              <a
                href="#viewing-rooms"
                className="block rounded-[6px] border border-gray-950 bg-gray-950 px-3 py-3 text-white transition-opacity hover:opacity-90"
              >
                <div className="flex items-center justify-between text-sm">
                  <span>Active selections</span>
                  <span>{activeRooms} ›</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-300">
                  Selections currently available to open, share or follow up.
                </p>
              </a>
              <a
                href="#viewing-rooms"
                className="flex items-center justify-between rounded-[6px] border border-gray-200 px-3 py-3 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-950"
              >
                <span>Created this week</span>
                <span>{roomsCreatedThisWeek} ›</span>
              </a>
              <a
                href="#viewing-rooms"
                className="flex items-center justify-between rounded-[6px] border border-gray-200 px-3 py-3 text-sm text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-950"
              >
                <span>Expiring soon</span>
                <span>{roomsExpiringSoon} ›</span>
              </a>
            </div>
          </article>

          <article className="rounded-[8px] border border-gray-200 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-medium text-gray-950">Collector engagement</h2>
              <span className="text-sm text-gray-400">Live</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Views</p>
                <p className="mt-2 text-2xl font-normal">{totalViews}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Inquiries</p>
                <p className="mt-2 text-2xl font-normal">{totalInquiries}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Rate</p>
                <p className="mt-2 text-2xl font-normal">{inquiryRate}</p>
              </div>
            </div>
            <div className="mt-6">
              <Sparkline />
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                Most active room
              </p>
              {hotRoomUrl ? (
                <a
                  href={hotRoomUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-2 block rounded-[6px] border border-transparent py-1 transition-colors hover:border-gray-200 hover:px-2"
                >
                  <p className="truncate text-sm font-medium text-gray-950">{roomTitle(hotRoom)}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {hotRoom.viewCount ?? 0} views · {hotRoom.inquiryCount ?? 0} inquiries{" "}
                    <span className="text-gray-300 group-hover:text-gray-950">›</span>
                  </p>
                </a>
              ) : (
                <>
                  <p className="mt-2 truncate text-sm font-medium text-gray-950">
                    No room activity yet
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Views and inquiries will appear after sharing.
                  </p>
                </>
              )}
            </div>
          </article>

          <article className="rounded-[8px] border border-gray-200 p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-medium text-gray-950">Follow-up queue</h2>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
                {openInquiries} open
              </span>
            </div>
            {latestInquiry ? (
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                  Latest request · {formatDate(latestInquiry.createdAt)}
                </p>
                {latestInquiryUrl ? (
                  <a
                    href={latestInquiryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-3 block rounded-[6px] border border-transparent transition-colors hover:border-gray-200 hover:px-2 hover:py-1"
                  >
                    <p className="text-lg font-normal text-gray-950">
                      {inquiryArtwork(latestInquiry)}{" "}
                      <span className="text-gray-300 group-hover:text-gray-950">›</span>
                    </p>
                  </a>
                ) : (
                  <p className="mt-3 text-lg font-normal text-gray-950">
                    {inquiryArtwork(latestInquiry)}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  {latestInquiry.collectorName || "Collector"}
                  {latestInquiry.collectorEmail ? ` · ${latestInquiry.collectorEmail}` : ""}
                </p>
                {latestInquiry.message ? (
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                    {latestInquiry.message}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm leading-6 text-gray-500">
                No collector request yet. Inquiries will appear here when someone presses Inquire.
              </p>
            )}
          </article>
        </section>

        <section id="viewing-rooms">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-normal tracking-tight text-gray-950">Viewing rooms</h2>
              <p className="mt-1 text-sm text-gray-500">
                Shared selections and their current collector signals.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="hidden h-10 min-w-[260px] items-center rounded-[6px] border border-gray-200 px-3 text-sm text-gray-400 sm:flex">
                Search rooms...
              </div>
              <div className="flex h-10 items-center rounded-[6px] border border-gray-200 px-3 text-sm text-gray-600">
                Status {activeRooms}/{rooms.length || 0}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-gray-200">
            {latestRooms.length ? (
              latestRooms.map((room) => {
                const url = roomUrl(baseUrl, room.token);
                return (
                  <article
                    key={room._id}
                    className="grid gap-4 border-b border-gray-200 px-5 py-4 last:border-b-0 lg:grid-cols-[minmax(0,1fr)_180px_160px_160px] lg:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <h3 className="truncate text-base font-medium text-gray-950">
                          {roomTitle(room)}
                        </h3>
                      </div>
                      <p className="mt-1 truncate text-sm text-gray-500">
                        {room.recipientName ? `For ${room.recipientName}` : "No recipient"}
                        {room.recipientEmail ? ` · ${room.recipientEmail}` : ""}
                      </p>
                    </div>
                    <div className="flex gap-5 text-sm text-gray-500 lg:block">
                      <p>{room.viewCount ?? 0} views</p>
                      <p>{room.inquiryCount ?? 0} inquiries</p>
                    </div>
                    <p className="text-sm text-gray-400">{formatDate(room.createdAt)}</p>
                    <div className="flex gap-2 lg:justify-end">
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-8 items-center rounded-[5px] border border-gray-200 px-3 text-sm text-gray-900 transition-colors hover:border-gray-400"
                      >
                        Open
                      </a>
                      <button
                        type="button"
                        onClick={() => copy(url)}
                        className="inline-flex h-8 items-center rounded-[5px] border border-gray-200 px-3 text-sm text-gray-900 transition-colors hover:border-gray-400"
                      >
                        Copy
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="p-8 text-sm text-gray-500">
                No viewing rooms yet. Create one from the editor.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
