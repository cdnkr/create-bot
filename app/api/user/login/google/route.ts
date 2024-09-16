import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const supabase = createClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    // access_type: 'offline',
                    // prompt: 'consent',
                    redirectTo: `https://localhost:3000/api/user/callback`,
                },
            },
        })

        console.log({ data });

        if (data.url) {
            return NextResponse.redirect(data.url) // use the redirect API for your server framework
        }

        if (error) {
            console.error('Error signing in with google:', error);
            return NextResponse.json({ error: 'Error signing in with google', details: JSON.stringify(error) }, { status: 500 });
        }

        return NextResponse.redirect(process.env.APP_URL as string);
    } catch (error: any) {
        console.error('Error signing in with google:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}