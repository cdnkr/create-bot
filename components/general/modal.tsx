'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface Props {
    showModal: boolean;
    setShowModal: (val: boolean) => void;
    children: React.ReactNode;
}

export default function Modal({
    showModal,
    setShowModal,
    children
}: Props) {
    return (
        <Dialog open={showModal} onClose={() => setShowModal(false)} className='relative z-20'>
            <DialogBackdrop
                transition
                className='fixed inset-0 bg-white bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
            />

            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <DialogPanel
                        transition
                        className='relative transform overflow-hidden md:min-w-[600px] rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
                    >
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}