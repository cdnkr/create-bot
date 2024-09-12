import { sendWhatsAppMessage } from '@/services/whatsapp';
import supabase from '@/services/supabase';
import { extractUserResponse, getNextMessage } from '@/utils/whatsapp';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    return handleWebhookPost(request);
}

export async function GET(request: NextRequest) {
    return handleWebhookVerification(request);
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

        const { data, error } = await supabase
            .from('bots')
            .select('*')
            .eq('wa_number', displayNumber);

        const assignedBot = Array.isArray(data) ? data[0] : null;

        if (error) {
            console.error('Error retrieving bot:', error);
            return NextResponse.json({ error: 'Failed to retrieve the bot' }, { status: 500 });
        }

        const to = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

        if (userResponse && to) {
            let replyMessage = getNextMessage(userResponse, assignedBot.templates);

            delete replyMessage.isBot;
            delete replyMessage.messageKey;
            delete replyMessage.safeType;

            await sendWhatsAppMessage(to, replyMessage, phoneNumberId, assignedBot.wa_access_token);

            return NextResponse.json({ success: true }, { status: 200 });
        }

        return NextResponse.json({ message: "No user response found" }, { status: 200 });
    } catch (err) {
        console.error("WEBHOOK ERR", err);
        return NextResponse.json({ error: "Webhook handling error" }, { status: 400 });
    }
}
async function handleWebhookVerification(request: NextRequest): Promise<NextResponse | Response> {
    try {
        const mode = request.nextUrl.searchParams.get("hub.mode");
        const challenge = request.nextUrl.searchParams.get("hub.challenge");

        if (mode === "subscribe") {
            console.log("WEBHOOK_VERIFIED");
            return new Response(challenge, { status: 200 });
        }

        return NextResponse.json({ error: "Invalid token or mode" }, { status: 403 });
    } catch (err) {
        console.error("WEBHOOK_VERIFY ERR", err);
        return NextResponse.json({ error: "Webhook verification error" }, { status: 400 });
    }
}

