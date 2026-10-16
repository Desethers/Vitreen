"use client";

import { Button } from "@/components/ui/Button";
import { openContact } from "@/components/landing/LandingNav";
import PhoneNotifications, {
  type PhoneArtwork,
  type PhoneChat,
  type PhoneNotification,
} from "@/components/landing/PhoneNotifications";
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

const NOTIFICATIONS: readonly PhoneNotification[] = [
  {
    initials: "MB",
    color: "#6B7FD7",
    name: "Marie Beaumont",
    subject: "Availability — Self-Portrait",
    time: "10:24 AM",
    body: "Is the Van Gogh Self-Portrait still available?",
  },
  {
    initials: "TB",
    color: "#C97B4A",
    name: "Thomas Baur",
    subject: "Van Gogh",
    time: "Yesterday",
    body: "Could you send the price and dimensions for the Self-Portrait?",
  },
  {
    initials: "LM",
    color: "#4E9C82",
    name: "Léa Morin",
    subject: "Available works",
    time: "2 days ago",
    body: "Do you have any other works by Van Gogh available now?",
  },
];

const CHAT: PhoneChat = {
  incoming: { text: "Hello, do you still have the Van Gogh Sunflowers?", time: "10:42" },
  outgoing: { text: "Hello Marie, yes — I’m sending you the details now.", time: "10:43" },
};

const ARTWORKS: readonly [PhoneArtwork, PhoneArtwork] = [
  {
    image: "/artworks/van-gogh-self-portrait.jpg",
    artist: "Vincent van Gogh",
    title: "Self-Portrait",
    year: "1887",
    medium: "Oil on artist's board, mounted on cradled panel",
    size: "41 × 32.5 cm",
    price: "Price on request",
    cta: "Inquire",
  },
  {
    image: "/artworks/van-gogh-sunflowers.jpg",
    artist: "Vincent van Gogh",
    title: "Sunflowers",
    year: "1889",
    medium: "Oil on canvas",
    size: "95 × 73 cm",
    price: "Price on request",
    cta: "Inquire",
  },
];

export default function LandingRecognition() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div
        className={`${CONTAINER} grid gap-10 md:grid-cols-[0.7fr_1fr] md:items-center md:gap-16`}
      >
        <div className="max-w-xl">
          <h2 className={H2}>Every sale starts with a conversation.</h2>
          <p className={H2_SUB}>
            Vitreen brings the artwork information into the conversation, ready to review and send.
          </p>

          <p className="mt-6 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            A collector asks for more works.
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            Connect your WhatsApp and Gmail
            <span className="mx-2 inline-flex items-center align-middle" aria-hidden="true">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[#E8E8E6] bg-white">
                <img
                  src="/logos/whatsapp.svg"
                  alt=""
                  className="h-[18px] w-[18px] object-contain"
                />
              </span>
              <span className="-ml-2 flex h-6 w-6 items-center justify-center rounded-full border-[0.5px] border-[#E8E8E6] bg-white">
                <img
                  src="/logos/icon-gmail-96.png"
                  alt=""
                  className="h-[18px] w-[18px] object-contain"
                />
              </span>
            </span>
            with Vitreen.
          </p>
          <p className="mt-4 text-[16px] leading-[1.65] tracking-[-0.01em] text-[#6B6A67]">
            Then the search begins: images, prices, dimensions, availability, what has already been
            sent — scattered across spreadsheets, folders and emails.
          </p>

          <div className="mt-7">
            <Button size="lg" onClick={openContact}>
              Book a demo
            </Button>
          </div>
        </div>

        <PhoneNotifications
          notifications={NOTIFICATIONS}
          toMeLabel="to me"
          chat={CHAT}
          artworks={ARTWORKS}
        />
      </div>
    </section>
  );
}
