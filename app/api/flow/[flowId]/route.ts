import supabase from '@/services/supabase';
import { NextResponse } from 'next/server';

// GET route to retrieve a flow by flowId
export async function GET(req: Request, { params }: { params: { flowId: string } }) {
    const { flowId } = params;

    try {
        const { data, error } = await supabase
            .from('flows')
            .select('*')
            .eq('id', flowId);

        const assignedFlow = Array.isArray(data) ? data[data.length - 1] : null;

        if (error) {
            console.error('Error retrieving flow:', error);
            return NextResponse.json({ error: 'Failed to retrieve the flow', details: JSON.stringify(error) }, { status: 500 });
        }

        return NextResponse.json(assignedFlow, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving flow:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}