import { WhatsAppMessageType } from "@/types/whatsapp";
import axios from "axios";

const token = process.env.WHATSAPP_TOKEN as string;
const whatsappApiUrl = process.env.WA_API_URL as string;

export async function sendWhatsAppMessage(
    to: string, // wa user phone number
    message: WhatsAppMessageType,
    phoneNumberId: string,
    isTestMode?: boolean
): Promise<WhatsAppMessageType | boolean> {
    const messagePayload: WhatsAppMessageType = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        ...message
    };

    if (isTestMode) {
        return messagePayload;
    }

    try {
        const requestUrl = `${whatsappApiUrl}${phoneNumberId}/messages?access_token=${token}`;

        await axios.post(requestUrl, messagePayload, {
            headers: { "Content-Type": "application/json" },
        });

        return true;
    } catch (err: any) {
        console.error("Error in sendWhatsAppMessage: ", err.message);
        return false;
    }
}