import { WhatsAppMessageType } from '@/types/whatsapp';
import axios from 'axios';

const token = process.env.WHATSAPP_TOKEN as string;
const whatsappApiUrl = process.env.WA_API_URL as string;

// added for use later with webhook
export async function sendWhatsAppMessage(message: WhatsAppMessageType, phoneNumberId: string): Promise<boolean | WhatsAppMessageType> {
    console.log('SENDING MESSAGE', message);

    if (!message.to) {
        throw new Error('Err: "to" property missing on `sendWhatsAppMessageType`');
    }

    try {
        await axios({
            method: 'POST',
            url: `${whatsappApiUrl}${phoneNumberId}/messages?access_token=${token}`,
            data: message,
            headers: { 'Content-Type': 'application/json' },
        });

        return true;
    } catch (err) {
        console.log('WA ERR', JSON.stringify(err));
        return false;
    }
}
