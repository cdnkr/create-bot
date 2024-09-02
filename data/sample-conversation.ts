import { WhatsAppMessage } from "../types/whatsapp";

export const sampleConversation: WhatsAppMessage[] = [
  {
    msg: "Ayo",
    time: "10:58 am",
    sent: true,
  },
  {
    msg: "What's your Github G?",
    time: "11:28 am",
    sent: true,
  },
  {
    msg: "CDNKR",
    time: "11:36 am",
    sent: false,
  },
  {
    msg: "https://github.com/cdnkr",
    isLink: true,
    time: "11:36 am",
    sent: false,
  },
];
