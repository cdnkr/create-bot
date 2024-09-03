import React from 'react'
import Label from './label';

interface Props {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactElement;
    label?: string;
    className?: string;
    placeholder?: string;
}

function Input({
    value,
    onChange,
    icon,
    label = '',
    className = '',
    placeholder = ''
}: Props) {

    return (
        <div className='w-full'>
            {label && <Label label={label} />}
            <div className='relative'>
                {icon && (
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                        {icon}
                    </div>
                )}
                <input
                    value={value}
                    onChange={onChange}
                    type='text'
                    className={`${className} ${icon ? 'ps-12' : ''} 'rounded-full p-2.5 rounded-lg w-full text-base md:text-sm block bg-gray-100 placeholder-gray-400  border-transparent border-solid border-4 focus:border-orange-300 focus:outline-none`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}

export default Input
