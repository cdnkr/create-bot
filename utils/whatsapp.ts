import path from "path";
import { promises as fs } from 'fs';

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

export async function getAssignedFlow(displayPhoneNumber: string) {
    const filePath = path.join(process.cwd(), 'tmp', 'number-to-flow', `${displayPhoneNumber}.json`);

    // Read the JSON file
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Parse and return the content
    const data = JSON.parse(fileContent);

    // TODO: add error handling

    const flowId = data.flow;

    const flowData = await retrieveFlowJson(flowId);

    return flowData;
}

export function getNextMessage(userResponse: string, assignedFlow: any) {
    const nextMessage = assignedFlow[userResponse];

    return nextMessage;
}

export async function retrieveFlowJson(flowId: string) {
    const filePath = path.join(process.cwd(), 'tmp', 'flows', `${flowId}.json`);

    // Read the JSON file
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Parse and return the content
    const data = JSON.parse(fileContent);

    return data;
}