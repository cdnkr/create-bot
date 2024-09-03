export type WhatsAppMessageType = 
    | WhatsAppTextMessage
    | WhatsAppImageMessage
    | WhatsAppDocumentMessage
    | WhatsAppLocationMessage
    | WhatsAppVideoMessage
    | WhatsAppInteractiveButtonMessage
    | WhatsAppInteractiveCtaUrlMessage
    | WhatsAppInteractiveListMessage;

export interface WhatsAppBaseMessage {
    // For use in demo/editor
    time?: string;
    isBot?: boolean;
    // WA specific
    messaging_product?: "whatsapp";
    recipient_type?: "individual";
    to?: string;
    type: string;
}

export interface WhatsAppTextMessage extends WhatsAppBaseMessage {
    type: "text";
    text: {
        preview_url: boolean;
        body: string;
    };
}

export interface WhatsAppImageMessage extends WhatsAppBaseMessage {
    type: "image";
    image: {
        id?: string;
        link?: string;
        caption?: string;
    };
}

export interface WhatsAppDocumentMessage extends WhatsAppBaseMessage {
    type: "document";
    document: {
        id?: string;
        link?: string;
        caption?: string;
        filename?: string;
    };
}

export interface WhatsAppLocationMessage extends WhatsAppBaseMessage {
    type: "location";
    location: {
        latitude: string;
        longitude: string;
        name?: string;
        address?: string;
    };
}

export interface WhatsAppVideoMessage extends WhatsAppBaseMessage {
    type: "video";
    video: {
        id?: string;
        link?: string;
        caption?: string;
    };
}

export interface WhatsAppInteractiveButtonMessage extends WhatsAppBaseMessage {
    type: "interactive";
    interactive: {
        type: "button";
        header?: {
            type: "text" | "image";
            text?: string;
            image?: {
                id: string;
            };
        };
        body: {
            text: string;
        };
        footer?: {
            text: string;
        };
        action: {
            buttons: WhatsAppMessageReplyButton[];
        };
    };
}

export interface WhatsAppInteractiveCtaUrlMessage extends WhatsAppBaseMessage {
    type: "interactive";
    interactive: {
        type: "cta_url";
        header?: {
            type: "text";
            text: string;
        };
        body?: {
            text: string;
        };
        footer?: {
            text: string;
        };
        action: {
            name: "cta_url";
            parameters: {
                display_text: string;
                url: string;
            };
        };
    };
}

export interface WhatsAppInteractiveListMessage extends WhatsAppBaseMessage {
    type: "interactive";
    interactive: {
        type: "button";
        header?: {
            type: "text" | "image";
            text?: string;
            image?: {
                id: string;
            };
        };
        body: {
            text: string;
        };
        footer?: {
            text: string;
        };
        action: {
            buttons: WhatsAppMessageReplyButton[];
        };
    };
}


export interface WhatsAppMessageReplyButton {
    type: "reply";
    reply: WhatsAppMessageReply;
}

export interface WhatsAppMessageReply {
    id: string;
    title: string;
}