import { getAssignedFlow, getNextMessage } from '@/utils/whatsapp';
import { NextRequest, NextResponse } from 'next/server';

// to test webhook responses in dev
// e.g. http://localhost:3000/api/whatsapp/15550745746/webhook/dev?userResponse=01715f7f-7f5b-40dd-ad91-fe77a93a0477&displayNumber=15550745746

export async function GET(req: NextRequest, { params }: { params: { displayNumber: string } }) {
    const userResponse = req.nextUrl.searchParams.get("userResponse");
    const { displayNumber } = params;

    console.log(JSON.stringify({ displayNumber }));

    if (typeof userResponse !== 'string' || typeof displayNumber !== 'string') {
        return NextResponse.json(
            { success: false, failedAt: 1 },
            { status: 400 }
        );
    }

    try {
        const assignedFlow = await getAssignedFlow(displayNumber);

        console.log({
            userResponse,
            displayNumber,
            assignedFlow
        });

        if (userResponse) {
            const replyMessage = getNextMessage(userResponse, assignedFlow);
            console.log({
                replyMessage
            });
            return NextResponse.json(replyMessage);
        } else {
            return NextResponse.json(
                { success: false, failedAt: 2 },
                { status: 400 }
            );
        }
    } catch (err) {
        console.error("WEBHOOK ERR", err);
        return NextResponse.json(
            { success: false, failedAt: 3 },
            { status: 400 }
        );
    }
}