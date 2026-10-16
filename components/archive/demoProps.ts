import type {
  PhoneArtwork,
  PhoneChat,
  PhoneNotification,
} from "@/components/landing/PhoneNotifications";

/* Données de démo de la scène téléphone (copie de LandingRecognition, EN). */
import { CONTAINER, H2, H2_SUB, SECTION } from "@/components/landing/styles";

export const NOTIFICATIONS: readonly PhoneNotification[] = [
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

export const CHAT: PhoneChat = {
  incoming: { text: "Hello, do you still have the Van Gogh Sunflowers?", time: "10:42" },
  outgoing: { text: "Hello Marie, yes — I’m sending you the details now.", time: "10:43" },
};

export const ARTWORKS: readonly [PhoneArtwork, PhoneArtwork] = [
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
export const PHONE_PROPS = {
  notifications: NOTIFICATIONS,
  toMeLabel: "to me",
  chat: CHAT,
  artworks: ARTWORKS,
};
