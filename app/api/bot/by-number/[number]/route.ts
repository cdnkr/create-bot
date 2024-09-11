import supabase from '@/services/supabase';
import { NextResponse } from 'next/server';

// GET route to retrieve a bot by number
export async function GET(req: Request, { params }: { params: { number: string } }) {
    const { number } = params;

    try {
        const { data, error } = await supabase
            .from('bots')
            .select('*')
            .eq('wa_number', number);
        
        const botDetails = Array.isArray(data) ? data[data.length - 1] : null;

        if (error) {
            console.error('Error retrieving bot:', error);
            return NextResponse.json({ error: 'Failed to retrieve the bot' }, { status: 500 });
        }

        return NextResponse.json(botDetails, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving bot:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}