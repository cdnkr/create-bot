import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const supabase = createClient();

        let { error } = await supabase.auth.signOut()

        if (error) {
            console.error('Error logging out:', error);
            return NextResponse.json({ error: 'Error logging out', details: JSON.stringify(error) }, { status: 500 });
        }

        return NextResponse.redirect(process.env.APP_URL as string);
    } catch (error: any) {
        console.error('Error logging out:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}