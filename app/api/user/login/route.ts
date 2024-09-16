import { isValidEmail } from '@/utils/email';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();

    const supabase = createClient();

    try {
        let { data, error } = await supabase.auth.signInWithPassword({
            email: body.email,
            password: body.password
        });

        if (error) {
            console.error('Error logging in:', error);
            return NextResponse.json({ error: 'Error logging in', details: JSON.stringify(error) }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error logging in:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}