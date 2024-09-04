'use client'

import { WhatsAppMessageType } from "@/types/whatsapp";
import { useState } from "react";
import WhatsAppChat from "./chat";

export default function BuildWhatsAppBot() {
  const [initialMessages, setInitialMessages] = useState<WhatsAppMessageType[]>([]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-5">
      <div className="w-full">
        <WhatsAppChat initialMessages={initialMessages} />
      </div>
    </div>
  );
}
