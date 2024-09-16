import { WhatsAppMessageType } from './whatsapp';

export interface IBot {
    id: string;
    templates: { [key: string]: WhatsAppMessageType };
    waAccessToken: string;
    waNumber: string;
    name: string
}

export interface IBotPartial {
    id?: string;
    templates?: { [key: string]: WhatsAppMessageType };
    waAccessToken?: string;
    waNumber?: string;
    name?: string;
    userId?: string;
}

export interface IBotResponse {
    id: string;
    created_at: string;
    user_id: string;
    wa_number: string;
    wa_access_token: string;
    templates: any;
    name: string;
}   