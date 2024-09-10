import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadFileToCloudinary(
    fileData: Buffer,
    fileType: string,
    fileName: string // Accept the original file name
): Promise<string | false> {
    try {
        const base64File = `data:${fileType};base64,${fileData.toString('base64')}`;

        // Use fileName as the public_id to preserve the original name
        const uploadResult = await cloudinary.uploader.upload(base64File, {
            resource_type: 'auto',
            public_id: fileName.split('.')[0], // Remove the file extension from the name
        });

        return uploadResult.secure_url;
    } catch (err: any) {
        console.error('Error in uploadFileToCloudinary: ', err.message);
        return false;
    }
}