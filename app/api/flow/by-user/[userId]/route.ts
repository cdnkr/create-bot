import supabase from '@/services/supabase';
import { NextResponse } from 'next/server';

// GET route to retrieve a flow by userId
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        const { data, error } = await supabase
            .from('flows')
            .select('*')
            .eq('user_id', userId);
        
        if (error) {
            console.error('Error retrieving flow:', error);
            return NextResponse.json({ error: 'Failed to retrieve the flow' }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving flow:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}