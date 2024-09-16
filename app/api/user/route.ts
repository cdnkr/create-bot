import supabase from '@/services/supabase';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        console.error('Error retrieving bot:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}