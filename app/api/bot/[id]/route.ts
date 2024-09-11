import supabase from '@/services/supabase';
import { NextResponse } from 'next/server';

// GET route to retrieve a bot by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const { data, error } = await supabase
            .from('bots')
            .select('*')
            .eq('id', id);

        const botDetails = Array.isArray(data) ? data[data.length - 1] : null;

        if (error) {
            console.error('Error retrieving bot:', error);
            return NextResponse.json({ error: 'Failed to retrieve the bot', details: JSON.stringify(error) }, { status: 500 });
        }

        return NextResponse.json(botDetails, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving bot:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}