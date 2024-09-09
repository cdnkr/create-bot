import supabase from '@/services/supabase';
import { NextResponse } from 'next/server';

// GET route to retrieve a flow by number
export async function GET(req: Request, { params }: { params: { number: string } }) {
    const { number } = params;

    try {
        const { data, error } = await supabase
            .from('flows')
            .select('*')
            .eq('wa_number', number);
        
        const flowDetails = Array.isArray(data) ? data[data.length - 1] : null;

        if (error) {
            console.error('Error retrieving flow:', error);
            return NextResponse.json({ error: 'Failed to retrieve the flow' }, { status: 500 });
        }

        return NextResponse.json({ data: flowDetails }, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving flow:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}