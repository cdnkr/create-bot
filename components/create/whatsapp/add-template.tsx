import Button from '@/components/general/button';
import Input from '@/components/general/input';
import Modal from '@/components/general/modal';
import { WhatsAppMessage } from '@/types/whatsapp';
import { getTime } from '@/utils/time';
import React, { ChangeEvent, useState } from 'react'

interface Props {
    showModal: boolean;
    setShowModal: (val: boolean) => void;
    messages: WhatsAppMessage[];
    setMessages: (val: WhatsAppMessage[]) => void;
}

function AddTemplate(props: Props) {
    const {
        showModal,
        setShowModal,
        messages,
        setMessages
    } = props;

    const [templateName, setTemplateName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState([]);

    function onAddClick() {
        const newMessage: WhatsAppMessage = {
            time: getTime(),
            sent: false,
            msg:
                `*${title}*

${description}`
        };

        setMessages([...messages, newMessage]);
    }

    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <div className='w-full p-8 flex flex-col gap-5'>
                <Input
                    placeholder='Template name'
                    value={templateName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)}
                />
                <hr />
                <Input
                    placeholder='Title'
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
                <Input
                    placeholder='Description'
                    value={description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                />
                <Button text='Add' onClick={onAddClick} />
            </div>
        </Modal>
    )
}

export default AddTemplate;