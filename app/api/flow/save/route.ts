import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
    try {
        // Parse the request body
        const body = await request.json();
        const flowId = body.id;

        if (!flowId) {
            return NextResponse.json({ error: 'flowId is required in the body' }, { status: 400 });
        }

        // Define the path for the JSON file based on flowId
        const filePath = path.join(process.cwd(), 'tmp', 'flows', `${flowId}.json`);

        // Create the 'flows' directory if it doesn't exist
        await fs.mkdir(path.dirname(filePath), { recursive: true });

        // Write the body to the JSON file
        await fs.writeFile(filePath, JSON.stringify(body, null, 2));

        return NextResponse.json({ msg: `Data saved to ${flowId}.json` });
    } catch (error) {
        console.error('Error saving data:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
