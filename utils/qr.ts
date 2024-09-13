import QRCode from 'qrcode'

export const generateQR = async (text: string) => {
    try {
        const qrImage = await QRCode.toDataURL(text);
        return qrImage;
    } catch (err) {
        console.error(err);
        return null;
    }
}