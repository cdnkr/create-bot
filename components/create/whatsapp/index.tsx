'use client'

import WhatsAppChatDemo from "@/components/demo/whatsapp";
import Sidebar from "./sidebar";
import { sampleConversation } from "@/data/sample-conversation";
import { useState } from "react";

export default function BuildWhatsAppBot() {
  const [initialMessages, setInitialMessages] = useState([...sampleConversation]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/2">
        <Sidebar 
          messages={initialMessages}
          setMessages={setInitialMessages} 
        />
      </div>
      <div className="w-full">
        <WhatsAppChatDemo initialMessages={initialMessages} />
      </div>
    </div>
  );
}
