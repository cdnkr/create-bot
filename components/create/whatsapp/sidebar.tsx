'use-client'

import React, { useState } from 'react'
import Button from '../../general/button'
import { WhatsAppMessage } from '@/types/whatsapp'
import AddTemplate from './add-template';

interface Props {
    messages: WhatsAppMessage[];
    setMessages: (val: WhatsAppMessage[]) => void;
}

function Sidebar(props: Props) {
    const {
        messages,
        setMessages
    } = props;

    const [showAddTemplate, setShowAddTemplate] = useState(false);

    return (
        <>
            <div className='w-full'>
                <Button
                    text='Add welcome message'
                    className='w-full'
                    onClick={() => setShowAddTemplate(true)}
                />
            </div>
            <AddTemplate 
                messages={messages}
                setMessages={setMessages}
                showModal={showAddTemplate}
                setShowModal={setShowAddTemplate}
            />
        </>
    )
}

export default Sidebar
