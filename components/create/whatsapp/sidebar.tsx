'use-client'

import { WhatsAppMessageType } from '@/types/whatsapp';
import { useState } from 'react';
import Button from '../../general/button';
import AddTemplate from './add-template';
import FlowCard from './flow/card';

interface Props {
    messages: WhatsAppMessageType[];
    setMessages: (val: WhatsAppMessageType[]) => void;
}

function Sidebar(props: Props) {
    const {
        messages,
        setMessages
    } = props;

    const [showAddTemplate, setShowAddTemplate] = useState(false);

    const hasInitialMessage = Boolean(messages.length === 0);
    const addNewTitle = hasInitialMessage ? 'Add welcome message' : 'Add a bot message';

    return (
        <>
            <div className='w-full'>
                <Button
                    text={addNewTitle}
                    className='w-full'
                    onClick={() => setShowAddTemplate(true)}
                />
            </div>
            {messages && (messages.length > 0) && messages.filter(message => message.isBot).map((message) => (
                <FlowCard message={message} />
            ))}
            <AddTemplate
                modalTitle={addNewTitle}
                messages={messages}
                setMessages={setMessages}
                showModal={showAddTemplate}
                setShowModal={setShowAddTemplate}
            />
        </>
    )
}

export default Sidebar
