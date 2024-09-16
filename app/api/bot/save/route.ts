import supabase from '@/services/supabase';
import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();

        const newBotId = v4();
        
        const { error } = await supabase
        .from('bots')
        .insert({
            id: newBotId,
            name: body.name,
            user_id: body.userId,
            templates: body.templates, 
            wa_number: body.waNumber,
            wa_access_token: body.waAccessToken
        });

        if (error) return NextResponse.json({ error }, { status: 500 });

        return NextResponse.json({ msg: `Bot created`, id: newBotId });
    } catch (error) {
        console.error('Error creating bot:', error);
        return NextResponse.json({ error: 'Failed to create bot' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        
        const { error } = await supabase
        .from('bots')
        .update({
            name: body.name,
            templates: body.templates, 
            wa_number: body.waNumber,
            wa_access_token: body.waAccessToken
        })
        .eq('id', body.id);

        if (error) return NextResponse.json({ error }, { status: 500 });

        return NextResponse.json({ msg: `Bot updated`, id: body.id });
    } catch (error) {
        console.error('Error saving data:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
