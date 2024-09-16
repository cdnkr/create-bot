import { generateQR } from '@/utils/qr';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
    content: string;
}

function QR(props: Props) {
    const {
        content
    } = props;

    const [qrImage, setQrImage] = useState('');

    async function handleGenerateQR() {
        const qrImageData = await generateQR(content);

        if(qrImageData) setQrImage(qrImageData);
    };

    useEffect(() => {
        handleGenerateQR();
    }, []);
    
    if (qrImage) return (
        <Image
            className='rounded-lg'
            src={qrImage}
            width={300}
            height={300}
            alt='qr code'
        />
    )

    return null;
}

export default QR
