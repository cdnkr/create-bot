
"use client"

import { useState } from 'react';
import LoginForm from '.';
import Modal from '../general/modal';

interface Props {
    TriggerEl: React.ReactNode;
}

function LoginInModal({
    TriggerEl,
}: Props) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowModal(true)}
            >
                {TriggerEl}
            </div>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <div className='p-5 w-full'>
                    <LoginForm />
                </div>
            </Modal>
        </>
    )
}

export default LoginInModal;
