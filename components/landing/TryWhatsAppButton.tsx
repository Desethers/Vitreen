"use client";

import { Button } from "@/components/ui/Button";
import { whatsappDemoLink } from "@/lib/whatsappDemo";

/** "Try it on WhatsApp": opens a chat with the demo number, message prefilled. */
export default function TryWhatsAppButton({
  lang,
  label,
  size = "lg",
  variant = "primary",
  className = "",
  message,
}: {
  lang: "en" | "fr";
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "inverse";
  className?: string;
  /** What the visitor wrote; it becomes the first message sent to the demo number. */
  message?: string;
}) {
  return (
    <Button
      size={size}
      variant={variant}
      href={whatsappDemoLink(lang, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <img src="/logos/whatsapp.svg" alt="" className="mr-2 h-[18px] w-[18px] object-contain" />
      {label}
    </Button>
  );
}
