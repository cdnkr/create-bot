// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages

import { WhatsAppMessageType } from "@/types/whatsapp";

const templates: any[] = [
    // Text
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/text-messages
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "text",
        "text": {
            "preview_url": false,
            "body": "<BODY_TEXT>"
        }
    },
    // With link preview URL
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "text",
        "text": {
            "preview_url": true,
            "body": "<BODY_TEXT>"
        }
    },
    // Image
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/image-messages
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "image",
        "image": {
            "id": "<MEDIA_ID>", /* Only if using uploaded media */
            "link": "<MEDIA_URL>", /* Only if linking to your media */
            "caption": "<IMAGE_CAPTION_TEXT>"
        }
    },
    // Document
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/document-messages
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "document",
        "document": {
            "id": "<MEDIA_ID>", /* Only if using uploaded media */
            "link": "<MEDIA_URL>", /* Only if linking to your media */
            "caption": "<DOCUMENT_CAPTION>",
            "filename": "<DOCUMENT_FILENAME>"
        }
    },
    // Location
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/location-messages
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "location",
        "location": {
            "latitude": "<LOCATION_LATITUDE>",
            "longitude": "<LOCATION_LONGITUDE>",
            "name": "<LOCATION_NAME>",
            "address": "<LOCATION_ADDRESS>"
        }
    },
    // Video
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/video-messages
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "{{wa-user-phone-number}}",
        "type": "video",
        "video": {
            "id": "<MEDIA_ID>", /* Only if using uploaded media */
            "link": "<MEDIA_URL>", /* Only if linking to your media */
            "caption": "<VIDEO_CAPTION_TEXT>"
        }
    },
    // Interactive Reply Buttons Messages
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "text",
                "text": "<HEADER_TEXT>"
            },
            "body": {
                "text": "<BODY_TEXT>"
            },
            "footer": {
                "text": "<FOOTER_TEXT>"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "<BUTTON_ID>",
                            "title": "<BUTTON_LABEL_TEXT>"
                        }
                    }
                ]
            }
        }
    },
    // CTA With URL Buttons
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-cta-url-messages
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<CUSTOMER_PHONE_NUMBER>",
        "type": "interactive",
        "interactive": {
            "type": "cta_url",

            /* Header optional */
            "header": {
                "type": "text",
                "text": "<HEADER_TEXT>"
            },

            /* Body optional */
            "body": {
                "text": "<BODY_TEXT>"
            },

            /* Footer optional */
            "footer": {
                "text": "<FOOTER_TEXT>"
            },
            "action": {
                "name": "cta_url",
                "parameters": {
                    "display_text": "<BUTTON_TEXT>",
                    "url": "<BUTTON_URL>"
                }
            }
        }
    },
    // Interactive List Messages
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "interactive",
        "interactive": {
            "type": "list",
            "header": {
                "type": "text",
                "text": "<MESSAGE_HEADER_TEXT"
            },
            "body": {
                "text": "<MESSAGE_BODY_TEXT>"
            },
            "footer": {
                "text": "<MESSAGE_FOOTER_TEXT>"
            },
            "action": {
                "sections": [
                    {
                        "title": "<SECTION_TITLE_TEXT>",
                        "rows": [
                            {
                                "id": "<ROW_ID>",
                                "title": "<ROW_TITLE_TEXT>",
                                "description": "<ROW_DESCRIPTION_TEXT>"
                            }
                            /* Additional rows would go here*/
                        ]
                    }
                    /* Additional sections would go here */
                ],
                "button": "<BUTTON_TEXT>",
            }
        }
    },
    // Interactive Reply Button Message with Image Header
    // https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages
    // With Image Header
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                // WA Media ID
                // Upload: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#upload-media
                // curl -X POST 'https://graph.facebook.com/v20.0/<PHONE_NUMBER_ID>/media' \
                // -H 'Authorization: Bearer <ACCESS_TOKEN>' \
                // -F 'file=@"2jC60Vdjn/cross-trainers-summer-sale.jpg"' \
                // -F 'type="image/jpeg"' \
                // -F 'messaging_product="whatsapp"'
                //
                // Response: {
                //     "id":"<MEDIA_ID>"
                // }
                // Retrieve: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/media#retrieve-media-url
                "type": "image",
                "image": {
                    "id": "2762702990552401"
                }
            },
            "body": {
                "text": "<BODY_TEXT>"
            },
            "footer": {
                "text": "<FOOTER_TEXT>"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "<BUTTON_ID>",
                            "title": "<BUTTON_LABEL_TEXT>"
                        }
                    }
                ]
            }
        }
    },
    // Interactive Reply Button Message with Text Header
    {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "<WHATSAPP_USER_PHONE_NUMBER>",
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "text",
                "text": "<HEADER_TEXT>"
            },
            "body": {
                "text": "<BODY_TEXT>"
            },
            "footer": {
                "text": "<FOOTER_TEXT>"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "<BUTTON_ID>",
                            "title": "<BUTTON_LABEL_TEXT>"
                        }
                    }
                ]
            }
        }
    },
];

export default templates;