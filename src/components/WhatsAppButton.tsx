import { MessageCircle } from "lucide-react";

const PHONE_E164_NO_PLUS = "919622004752";
const PREFILLED_MESSAGE = "hi im interested and i want a website for my business";

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE_E164_NO_PLUS}?text=${encodeURIComponent(
    PREFILLED_MESSAGE,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}

