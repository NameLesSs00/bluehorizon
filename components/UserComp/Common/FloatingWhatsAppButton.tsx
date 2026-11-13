"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useSiteSetting } from "@/features/keyValues/useKeyValuesQueries";

export default function FloatingWhatsAppButton() {
  const whatsappUrl = useSiteSetting("whatsapp", "");

  if (!whatsappUrl) return null;

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BA5A] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <FaWhatsapp className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6" />
      </a>
    </aside>
  );
}

