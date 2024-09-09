import supabase from '@/services/supabase';
import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const userId = '5ab6b5e3-5cbe-48dd-8714-b97d5f090cc2';

        const newFlowId = v4();
        
        const { error } = await supabase
        .from('flows')
        .insert({
            id: newFlowId,
            user_id: userId, 
            templates: body.templates, 
            wa_number: body.waNumber,
            wa_access_token: body.waAccessToken
        });

        if (error) return NextResponse.json({ error }, { status: 500 });

        return NextResponse.json({ msg: `Flow saved`, id: newFlowId });
    } catch (error) {
        console.error('Error saving data:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        
        const { error } = await supabase
        .from('flows')
        .update({
            templates: body.templates, 
            wa_number: body.waNumber,
            wa_access_token: body.waAccessToken
        })
        .eq('id', body.id);

        if (error) return NextResponse.json({ error }, { status: 500 });

        return NextResponse.json({ msg: `Flow saved`, id: body.id });
    } catch (error) {
        console.error('Error saving data:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
