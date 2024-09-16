import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();

    const supabase = createClient();

    try {
        let { data, error } = await supabase.auth.signUp({
            email: body.email,
            password: body.password
        });

        if (error) {
            console.error('Error signing up:', error);
            return NextResponse.json({ error: 'Error signing up', details: JSON.stringify(error) }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error signing up:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}