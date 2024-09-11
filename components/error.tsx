import Link from 'next/link';
import React from 'react';

type ErrorAction = {
    type: 'link' | 'action';
    text: string;
    path?: string;
    action?: (...args: any) => void;
}

interface Props {
    errorCode?: number;
    errorTitle: string;
    errorText: string;
    errorAction: ErrorAction
}

function Error({
    errorCode,
    errorTitle,
    errorText,
    errorAction
}: Props) {
    return (
        <section>
            <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
                <div className='mx-auto max-w-screen-sm text-center'>
                    {errorCode && <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 text-primary-500'>{errorCode}</h1>}
                    <p className='mb-4 text-3xl tracking-tight font-bold md:text-4xl text-black'>{errorTitle}</p>
                    <p className='mb-4 text-lg font-light text-gray-600'>{errorText}</p>
                    {errorAction.type === 'link' ? (
                        <Link
                            href={errorAction.path as string}
                            className='inline-flex text-blue-500 bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4'>
                            {errorAction.text}
                        </Link>
                    ) : (
                        <button
                            onClick={errorAction.action}
                            className='inline-flex text-blue-500 bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4'>
                            {errorAction.text}
                        </button>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Error;
