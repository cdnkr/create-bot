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
    templateName?: string;
    id?: string;
    time?: string;
    isBot?: boolean;
    messageKey?: string;
    // WA specific
    messaging_product?: "whatsapp";
    recipient_type?: "individual";
    to?: string;
    type: string;
}

export interface WhatsAppTextMessage extends WhatsAppBaseMessage {
    type: "text";
    safeType: WhatsAppMessageSafeType.WhatsAppTextMessage;
    text: {
        preview_url: boolean;
        body: string;
    };
}

export interface WhatsAppImageMessage extends WhatsAppBaseMessage {
    type: "image";
    safeType: WhatsAppMessageSafeType.WhatsAppImageMessage;
    image: {
        id?: string;
        link?: string;
        caption?: string;
    };
}

export interface WhatsAppDocumentMessage extends WhatsAppBaseMessage {
    type: "document";
    safeType: WhatsAppMessageSafeType.WhatsAppDocumentMessage;
    document: {
        id?: string;
        link?: string;
        caption?: string;
        filename?: string;
    };
}

export interface WhatsAppLocationMessage extends WhatsAppBaseMessage {
    type: "location";
    safeType: WhatsAppMessageSafeType.WhatsAppLocationMessage;
    location: {
        latitude: string;
        longitude: string;
        name?: string;
        address?: string;
    };
}

export interface WhatsAppVideoMessage extends WhatsAppBaseMessage {
    type: "video";
    safeType: WhatsAppMessageSafeType.WhatsAppVideoMessage;
    video: {
        id?: string;
        link?: string;
        caption?: string;
    };
}

export interface WhatsAppInteractiveButtonMessage extends WhatsAppBaseMessage {
    type: "interactive";
    safeType: WhatsAppMessageSafeType.WhatsAppInteractiveButtonMessage,
    interactive: {
        type: "button";
        header?: {
            type: "text" | "image";
            text?: string;
            image?: {
                id: string;
                // for use in chat demo
                link?: string;
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
    safeType: WhatsAppMessageSafeType.WhatsAppInteractiveCtaUrlMessage,
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
    safeType: WhatsAppMessageSafeType.WhatsAppInteractiveListMessage,
    interactive: {
        type: "list";
        header?: {
            type: "text" | "image";
            text?: string;
            image?: {
                id?: string;
                // for use in chat demo
                link?: string;
            };
        };
        body: {
            text: string;
        };
        footer?: {
            text: string;
        };
        action: {
            sections: WhatsAppInteractiveListMessageSection[],
            button: string;
        }
    };
}

export type WhatsAppInteractiveListMessageSection =                 {
    title: string;
    rows: WhatsAppInteractiveListMessageSectionRow[]
};

export type WhatsAppInteractiveListMessageSectionRow = {
    id: string;
    title: string;
    description: string;
}

export type WhatsAppAction = {
    sections?: WhatsAppListMessageSection[];
    button?: string;
    buttons?: WhatsAppMessageReplyButton[];
    name?: "cta_url";
    parameters?: {
        display_text: string;
        url: string;
    };
};

export interface WhatsAppListMessageSection {
    title: string;
    rows: WhatsAppListMessageSectionRow[];
}

export interface WhatsAppListMessageSectionRow {
    id: string;
    title: string;
    description: string;
}

export interface WhatsAppMessageReplyButton {
    type: "reply";
    reply: WhatsAppMessageReply;
}

export interface WhatsAppMessageReply {
    id: string;
    title: string;
}

// added as standard WA Cloud API type field is not sufficient for TypeScript checking
export enum WhatsAppMessageSafeType {
    WhatsAppTextMessage = "WhatsAppTextMessage",
    WhatsAppImageMessage = "WhatsAppImageMessage",
    WhatsAppDocumentMessage = "WhatsAppDocumentMessage",
    WhatsAppLocationMessage = "WhatsAppLocationMessage",
    WhatsAppVideoMessage = "WhatsAppVideoMessage",
    WhatsAppInteractiveButtonMessage = "WhatsAppInteractiveButtonMessage",
    WhatsAppInteractiveCtaUrlMessage = "WhatsAppInteractiveCtaUrlMessage",
    WhatsAppInteractiveListMessage = "WhatsAppInteractiveListMessage"
}