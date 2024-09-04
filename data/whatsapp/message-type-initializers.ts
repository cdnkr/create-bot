// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages

import { WhatsAppMessageSafeType, WhatsAppMessageType } from "@/types/whatsapp";

const messageTypeInitializers: { [key: string]: WhatsAppMessageType } = {
    // Text
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/text-messages
    text: {
        "isBot": true,
        "messageKey": "text",
        "safeType": WhatsAppMessageSafeType.WhatsAppTextMessage,
        "type": "text",
        "text": {
            "preview_url": true,
            "body": ""
        }
    },
    // Image
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/image-messages
    image: {
        "isBot": true,
        "messageKey": "image",
        "safeType": WhatsAppMessageSafeType.WhatsAppImageMessage,
        "type": "image",
        "image": {
            // "id": "", /* Only if using uploaded media */
            "link": "", /* Only if linking to your media */
            "caption": ""
        }
    },
    // Document
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/document-messages
    document: {
        "isBot": true,
        "messageKey": "document",
        "safeType": WhatsAppMessageSafeType.WhatsAppDocumentMessage,
        "type": "document",
        "document": {
            // "id": "", /* Only if using uploaded media */
            "link": "", /* Only if linking to your media */
            "caption": "",
            "filename": ""
        }
    },
    // Location
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/location-messages
    location: {
        "isBot": true,
        "messageKey": "location",
        "safeType": WhatsAppMessageSafeType.WhatsAppLocationMessage,
        "type": "location",
        "location": {
            "latitude": "",
            "longitude": "",
            "name": "",
            "address": ""
        }
    },
    // Video
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/video-messages
    video: {
        "isBot": true,
        "messageKey": "video",
        "safeType": WhatsAppMessageSafeType.WhatsAppVideoMessage,
        "type": "video",
        "video": {
            "id": "", /* Only if using uploaded media */
            "link": "", /* Only if linking to your media */
            "caption": ""
        }
    },
    // Interactive Reply Buttons Messages
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages
    interactiveReplyButton: {
        "isBot": true,
        "messageKey": "interactiveReplyButton",
        "safeType": WhatsAppMessageSafeType.WhatsAppInteractiveButtonMessage,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "text",
                "text": ""
            },
            "body": {
                "text": ""
            },
            // "footer": {
            //     "text": ""
            // },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "",
                            "title": ""
                        }
                    }
                ]
            }
        }
    },
    // CTA With URL Buttons
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-cta-url-messages
    interactiveCTAWithUrlButtons: {
        "isBot": true,
        "messageKey": "interactiveCTAWithUrlButtons",
        "safeType": WhatsAppMessageSafeType.WhatsAppInteractiveCtaUrlMessage,
        "type": "interactive",
        "interactive": {
            "type": "cta_url",

            /* Header optional */
            "header": {
                "type": "text",
                "text": ""
            },

            /* Body optional */
            "body": {
                "text": ""
            },

            /* Footer optional */
            "footer": {
                "text": ""
            },
            "action": {
                "name": "cta_url",
                "parameters": {
                    "display_text": "",
                    "url": ""
                }
            }
        }
    },
    // Interactive List
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages
    // With Image Header
    interactiveListWithImageHeader: {
        "isBot": true,
        "messageKey": "interactiveListWithImageHeader",
        "safeType": WhatsAppMessageSafeType.WhatsAppInteractiveListMessage,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "link": ""
                }
            },
            "body": {
                "text": ""
            },
            "footer": {
                "text": ""
            },
            "action": {
                "button": "",
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "",
                            "title": ""
                        }
                    }
                ]
            }
        }
    },
    // With Text Header
    interactiveListWithTextHeader: {
        "isBot": true,
        "messageKey": "interactiveListWithTextHeader",
        "safeType": WhatsAppMessageSafeType.WhatsAppInteractiveListMessage,
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "text",
                "text": ""
            },
            "body": {
                "text": ""
            },
            "footer": {
                "text": ""
            },
            "action": {
                "button": "",
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "",
                            "title": ""
                        }
                    }
                ]
            }
        }
    },
};

export default messageTypeInitializers;