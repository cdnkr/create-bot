import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// GET route to retrieve a flow by flowId
export async function GET(req: Request, { params }: { params: { flowId: string } }) {
    const { flowId } = params;

    try {
        // Define the path for the flow file
        const filePath = path.join(process.cwd(), 'tmp', 'flows', `${flowId}.json`);

        // Read the JSON file
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Parse and return the content
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error reading file:', error);

        // Handle the case where the file does not exist
        if (error.code === 'ENOENT') {
            return NextResponse.json({ error: 'Flow not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Failed to retrieve the flow' }, { status: 500 });
    }
}
