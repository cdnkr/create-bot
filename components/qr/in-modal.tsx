import Button from '@/components/general/button';
import { BiInfoCircle } from 'react-icons/bi';
import QR from '.';
import Modal from '../general/modal';
import Link from 'next/link';

interface Props {
    content: string;
    showModal: boolean;
    setShowModal: (val: boolean) => void;
}

function QRModal(props: Props) {
    const {
        content,
        showModal,
        setShowModal
    } = props;

    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            bgColor='bg-white'
        >
            <div className='w-full'>
                <div className='w-full flex justify-center mt-5'>
                    <h1 className="font-bold text-2xl leading-none">Test your bot</h1>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <QR content={content} />
                </div>
                {/* <div className='w-full flex items-center gap-2 text-gray-500 justify-center'>
                    <div className='text-xl'>
                        <BiInfoCircle />
                    </div>
                    <p>Once added you&apos;ll be able to edit the messages content.</p>
                </div> */}
                <div className='w-full flex justify-center gap-5 pb-5'>
                    <Button
                        text='Close'
                        onClick={() => setShowModal(false)}
                        color='black'
                        className='min-w-52'
                    />
                </div>
            </div>
        </Modal>
    )
}

export default QRModal
