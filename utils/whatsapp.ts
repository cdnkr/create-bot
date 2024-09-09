interface Message {
    text?: { body: string };
    interactive?: {
        button_reply?: { id: string };
        list_reply?: { id: string };
    };
}

interface Change {
    value: { messages: Message[] };
}

interface Entry {
    changes: Change[];
}

interface Body {
    entry: Entry[];
}

export function extractUserResponse(body: Body): string | undefined {
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) return undefined;

    if (message.text?.body) {
        return message.text.body;
    }

    if (message.interactive?.button_reply?.id) {
        return message.interactive.button_reply.id;
    }

    if (message.interactive?.list_reply?.id) {
        return message.interactive.list_reply.id;
    }

    return undefined;
}

export function getNextMessage(userResponse: string, assignedFlow: any) {
    if (typeof assignedFlow[userResponse] === 'undefined') return assignedFlow['start'];

    const nextMessage = assignedFlow[userResponse];

    return nextMessage;
}