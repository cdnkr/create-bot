export function getFileNameFromUrl(url: string): string {
    // Use split to divide the URL at slashes, then get the last part of the split array
    const pathParts = url.split('/');
    const fileWithQuery = pathParts[pathParts.length - 1];

    // Remove any query parameters, like `?` if present
    const fileName = fileWithQuery.split('?')[0];

    return fileName;
}

export function handleDownload(fileUrl: string) {
    if (typeof window === 'undefined' || !fileUrl) return;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', getFileNameFromUrl(fileUrl));
    link.setAttribute('target', '_blank');
    link.setAttribute('download', 'true');

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
};