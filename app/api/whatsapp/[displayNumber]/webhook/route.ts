import { sendWhatsAppMessage } from '@/api/whatsapp';
import { extractUserResponse, getAssignedFlow, getNextMessage } from '@/utils/whatsapp';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    return handleWebhookPost(request);
}

export async function GET(request: NextRequest, { params }: { params: { displayNumber: string } }) {
    const { displayNumber } = params;

    // TODO: add handling of number validation

    return handleWebhookVerification(request, displayNumber);
}

async function handleWebhookPost(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();

        console.log("REQ BODY", body);

        if (!body.object) {
            return NextResponse.json({ error: "Invalid body object" }, { status: 404 });
        }

        const userResponse = extractUserResponse(body);
        const phoneNumberId = body.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;
        const displayNumber = body.entry?.[0]?.changes?.[0]?.value?.metadata?.display_phone_number;

        if (!phoneNumberId || !displayNumber) {
            return NextResponse.json({ error: "Phone number metadata missing" }, { status: 400 });
        }

        const assignedFlow = await getAssignedFlow(displayNumber);

        const to = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

        if (userResponse && to) {
            const replyMessage = getNextMessage(userResponse, assignedFlow);
            await sendWhatsAppMessage(to, replyMessage, phoneNumberId);

            return NextResponse.json({ success: true }, { status: 200 });
        }

        return NextResponse.json({ message: "No user response found" }, { status: 200 });
    } catch (err) {
        console.error("WEBHOOK ERR", err);
        return NextResponse.json({ error: "Webhook handling error" }, { status: 400 });
    }
}

async function handleWebhookVerification(request: NextRequest, displayNumber: string): Promise<NextResponse> {
    try {
        const verifyToken = await getAssignedFlow(displayNumber);

        const mode = request.nextUrl.searchParams.get("hub.mode");
        const token = request.nextUrl.searchParams.get("hub.verify_token");
        const challenge = request.nextUrl.searchParams.get("hub.challenge");

        if (mode === "subscribe" && token === verifyToken) {
            console.log("WEBHOOK_VERIFIED");
            return NextResponse.json({ challenge }, { status: 200 });
        }

        return NextResponse.json({ error: "Invalid token or mode" }, { status: 403 });
    } catch (err) {
        console.error("WEBHOOK_VERIFY ERR", err);
        return NextResponse.json({ error: "Webhook verification error" }, { status: 400 });
    }
}
