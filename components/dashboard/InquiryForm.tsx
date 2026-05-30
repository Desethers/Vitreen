"use client";

import { useState } from "react";

export function InquiryForm({
  token,
  blockKey,
  slotKey,
  artworkLabel,
}: {
  token: string;
  blockKey: string;
  slotKey: string;
  artworkLabel: string;
}) {
  const [collectorName, setCollectorName] = useState("");
  const [collectorEmail, setCollectorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/ovr/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, blockKey, slotKey, collectorName, collectorEmail, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Error sending inquiry.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error sending inquiry.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-[8px] border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h2 className="text-xl font-normal text-emerald-950">Inquiry sent</h2>
        <p className="mt-2 text-sm leading-6 text-emerald-800">
          The gallery has received your request and can follow up by email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="rounded-[8px] border border-gray-200 bg-white p-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400">Selected work</p>
        <p className="mt-2 text-lg font-normal text-gray-950">{artworkLabel}</p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm text-gray-600">Name</span>
        <input
          value={collectorName}
          onChange={(event) => setCollectorName(event.target.value)}
          className="h-11 w-full rounded-[5px] border border-gray-200 bg-white px-3 text-sm text-gray-950 outline-none transition-colors focus:border-gray-500"
          required
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm text-gray-600">Email</span>
        <input
          type="email"
          value={collectorEmail}
          onChange={(event) => setCollectorEmail(event.target.value)}
          className="h-11 w-full rounded-[5px] border border-gray-200 bg-white px-3 text-sm text-gray-950 outline-none transition-colors focus:border-gray-500"
          required
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm text-gray-600">Message</span>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="min-h-28 w-full resize-y rounded-[5px] border border-gray-200 bg-white px-3 py-3 text-sm leading-6 text-gray-950 outline-none transition-colors focus:border-gray-500"
          placeholder="I would like more information about this work."
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 w-full items-center justify-center rounded-[5px] bg-gray-950 px-4 text-sm text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
