import { WhatsAppMessageType } from "../types/whatsapp";

export const sampleConversation: WhatsAppMessageType[] = [
  {
    type: "text",
    text: {
        preview_url: true,
        body: "Ayo"
    },
    isBot: false,
    time: "10:58 am"
  },
  {
    type: "text",
    text: {
        preview_url: true,
        body: "What's your Github G?"
    },
    isBot: false,
    time: "10:59 am"
  },
  {
    type: "text",
    text: {
        preview_url: true,
        body: "CDNKR https://github.com/cdnkr"
    },
    isBot: true,
    time: "11:11 am"
  },
];
