import Button from '@/components/general/button';
import Label from '@/components/general/label';
import messageTypeInitializers from '@/data/whatsapp/message-type-initializers';
import { WhatsAppMessageType } from '@/types/whatsapp';
import { camelCaseToText } from '@/utils/text';
import { useEffect } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { FaExternalLinkSquareAlt, FaImage, FaReply, FaVideo } from 'react-icons/fa';
import { FaLocationDot, FaRectangleList } from 'react-icons/fa6';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoDocument, IoText } from 'react-icons/io5';
import Message from './chat/message';

const ICONS: { [key: string]: React.ReactElement } = {
    text: <IoText />,
    image: <FaImage />,
    document: <IoDocument />,
    video: <FaVideo />,
    location: <FaLocationDot />,
    interactiveReplyButton: <FaReply />,
    interactiveCTAWithUrlButtons: <FaExternalLinkSquareAlt />,
    interactiveListWithImageHeader: <FaRectangleList />,
    interactiveListWithTextHeader: <FaRectangleList />
}

interface Props {
    onSelectMessageTypeClick: (key: string) => void;
    setShowSelectMessageType: (val: boolean) => void;
    newMessage: WhatsAppMessageType;
}

function SelectMessageType({ onSelectMessageTypeClick, setShowSelectMessageType, newMessage }: Props) {
    console.log(newMessage)

    useEffect(() => {
        onSelectMessageTypeClick('text');
    }, []);

    return (
        <div className='w-full'>
            <div className='w-full flex gap-5 pt-5 border-solid border-t-2 border-gray-200'>
                {/* <Label label="Select message type" /> */}
                <div className="flex flex-wrap w-full gap-y-2 gap-x-5">
                    {Object.keys(messageTypeInitializers).map((key) => (
                        <div key={key} className={`w-full ${messageTypeInitializers[key].messageKey === newMessage?.messageKey ? 'text-orange-500' : ''} cursor-pointer gap-2 p-2 flex items-center rounded-lg text-xl transition-all hover:text-orange-500`} onClick={() => onSelectMessageTypeClick(key)}>
                            {ICONS[key]}
                            <span className={`text-sm`}>
                                {camelCaseToText(key)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className='w-full hidden md:block'>
                    <Label label='Preview' />
                    <div className='relative'>
                        {newMessage && <Message message={newMessage} />}
                    </div>
                </div>
            </div>
            <div className='w-full flex items-center gap-2 text-gray-500 justify-center mt-5 pt-5 border-solid border-t-2 border-gray-200'>
                <div className='text-xl'>
                    <BiInfoCircle />
                </div>
                <p>Once added you'll be able to edit the messages content.</p>
            </div>
            <div className='w-full flex justify-center mt-5 pt-5 border-solid border-t-2 border-gray-200'>
                <Button
                    Icon={<IoMdAddCircleOutline />}
                    text='Add message'
                    onClick={() => setShowSelectMessageType(false)}
                    className='w-full md:w-2/3 bg-orange-500'
                />
            </div>
        </div>
    );
}

export default SelectMessageType;