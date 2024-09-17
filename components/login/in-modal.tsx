
"use client"

import { useState } from 'react';
import LoginForm from '.';
import Modal from '../general/modal';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
    TriggerEl: React.ReactNode;
}

function LoginInModal({
    TriggerEl,
}: Props) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    async function onLoginClick() {
        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            router.push('/app');
            return;
        }

        setShowModal(true);
    }

    return (
        <>
            <div
                onClick={onLoginClick}
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
