import supabase from '@/services/supabase';
import { isValidEmail } from '@/utils/email';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        if (isValidEmail(id)) {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', id)
                .single();

            if (error) {
                console.error('Error retrieving bot:', error);
                return NextResponse.json({ error: 'Failed to retrieve the bot', details: JSON.stringify(error) }, { status: 500 });
            }

            return NextResponse.json(data, { status: 200 });
        }

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error retrieving bot:', error);
            return NextResponse.json({ error: 'Failed to retrieve the bot', details: JSON.stringify(error) }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving bot:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}