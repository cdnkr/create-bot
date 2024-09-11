import supabase from '@/services/supabase';
import { NextResponse } from 'next/server';

// GET route to retrieve a bot by userId
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        const { data: bots, error } = await supabase
            .from('bots')
            .select('*')
            .eq('user_id', userId);
        
        if (error) {
            console.error('Error retrieving bot:', error);
            return NextResponse.json({ error: 'Failed to retrieve the bot' }, { status: 500 });
        }

        return NextResponse.json(bots, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving bot:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}