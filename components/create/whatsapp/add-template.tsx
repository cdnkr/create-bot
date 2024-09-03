import Message from '@/components/demo/whatsapp/message';
import Button from '@/components/general/button';
import Input from '@/components/general/input';
import Modal from '@/components/general/modal';
import { WhatsAppMessageType } from '@/types/whatsapp';
import { getTime } from '@/utils/time';
import React, { ChangeEvent, useState } from 'react'

interface Props {
    modalTitle: string;
    showModal: boolean;
    setShowModal: (val: boolean) => void;
    messages: WhatsAppMessageType[];
    setMessages: (val: WhatsAppMessageType[]) => void;
}

function AddTemplate(props: Props) {
    const {
        modalTitle,
        showModal,
        setShowModal,
        messages,
        setMessages
    } = props;

    const [templateName, setTemplateName] = useState('');
    const [header, setHeader] = useState('');
    const [body, setBody] = useState('');
    const [description, setDescription] = useState('');
    const [buttons, setButtons] = useState([]);

    function onAddClick() {
        const newMessage: WhatsAppMessageType = {
            time: getTime(),
            isBot: true,
            type: 'interactive',
            interactive: {
                type: 'button',
                header: {
                    type: 'text',
                    text: header
                },
                body: {
                    text: body
                },
                action: {
                    buttons
                },
            }
        };

        setMessages([...messages, newMessage]);
        setShowModal(false);
    }

    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <div className='w-full p-8 flex flex-col gap-5'>
                <h1 className='font-bold text-2xl'>{modalTitle}</h1>
                <Input
                    placeholder='Template name'
                    value={templateName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)}
                />
                <hr />
                <div className='flex w-full gap-5'>
                    <div className='flex w-2/3 flex-col gap-5'>
                        <Input
                            placeholder='Header'
                            value={header}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setHeader(e.target.value)}
                        />
                        <Input
                            placeholder='Description'
                            value={body}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
                        />
                    </div>
                    <div className='w-1/3'>
                        <Message
                            message={{
                                type: 'interactive',
                                interactive: {
                                    type: 'button',
                                    header: {
                                        type: 'text',
                                        text: header
                                    },
                                    body: {
                                        text: body
                                    },
                                    action: {
                                        buttons
                                    },
                                }
                            }}
                        />
                    </div>
                </div>
                <Button text='Add' onClick={onAddClick} />
            </div>
        </Modal>
    )
}

export default AddTemplate;