'use client'

import WhatsAppChatDemo from "@/components/demo/whatsapp";
import { WhatsAppMessageType } from "@/types/whatsapp";
import { useState } from "react";

export default function BuildWhatsAppBot() {
  const [initialMessages, setInitialMessages] = useState<WhatsAppMessageType[]>([]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-5">
      <div className="w-full">
        <WhatsAppChatDemo initialMessages={initialMessages} />
      </div>
    </div>
  );
}
