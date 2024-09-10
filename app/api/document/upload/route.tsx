import { uploadFileToCloudinary } from '@/services/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  'text/plain',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/pdf',
  'image/jpeg',
  'image/png'
];

export async function POST(request: NextRequest) {
  try {
    // Parse the request body as FormData
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const fileType = file.type;
    if (!ALLOWED_MIME_TYPES.includes(fileType)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Extract file name
    const fileName = file.name;

    // Convert file to buffer for Cloudinary upload
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadedUrl = await uploadFileToCloudinary(fileBuffer, fileType, fileName);
    if (!uploadedUrl) {
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

    return NextResponse.json({ documentUrl: uploadedUrl }, { status: 200 });
  } catch (err: any) {
    console.error('Error in file upload API: ', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}