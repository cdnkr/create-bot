import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string[] } }) {
  try {
    // Get the dynamic path from the slug
    const slugPath = params.slug.join('/');

    // Define the base directory path
    const baseDir = path.join(process.cwd(), 'public/docs');

    // Construct the full path based on the slug
    const fullPath = path.join(baseDir, slugPath);

    const last = params.slug[params.slug.length - 1];

    // Get a doc at a specific index
    // Docs are prefixed with an index e.g. /public/docs/whatsapp/how-to/1-set-up-meta-developers-account.md
    if (last && (last.length < 3) && !isNaN(parseInt(last))) {
      const dirPath = params.slug.slice(0, -1).join('/');
      console.log(dirPath);
      // If it's a directory, read the directory contents
      const fileNames = await fs.readdir(path.join(baseDir, dirPath));
      console.log(fileNames);

      for (const fileName of fileNames) {
        if (fileName.includes(last)) {
          const filePath = path.join(path.join(baseDir, dirPath), fileName);
          const fileContent = await fs.readFile(filePath, 'utf8');

          return NextResponse.json({ content: fileContent });
        }
      }
    }

    // Check if the path exists and whether it's a file or directory
    const stat = await fs.stat(fullPath);

    console.log('params', params)
    if (stat.isDirectory()) {
      // If it's a directory, read the directory contents
      const fileNames = await fs.readdir(fullPath);

      const filesContent: { [key: string]: string } = {};

      for (const fileName of fileNames) {
        const filePath = path.join(fullPath, fileName);
        const fileContent = await fs.readFile(filePath, 'utf8');

        const key = path.basename(fileName, '.md');
        filesContent[key] = fileContent;
      }

      return NextResponse.json(filesContent);

    } else if (stat.isFile()) {
      // If it's a file, read and return the file content
      const fileContent = await fs.readFile(fullPath, 'utf8');
      return NextResponse.json({ content: fileContent });

    } else {
      return NextResponse.json({ error: 'Not a valid file or directory' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching docs:', error);
    return NextResponse.json({ error: 'Failed to retrieve file or directory' }, { status: 500 });
  }
}