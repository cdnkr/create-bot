import React from 'react'

interface Props {
    onClick?: (event: React.MouseEvent) => void;
    text: string;
    className?: string;
    disabled?: boolean;
    Icon?: React.ReactElement
}

function Button({
    onClick,
    text,
    className = '',
    disabled = false,
    Icon
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`text-white shrink-0 flex justify-center items-center gap-2 flex-nowrap text-nowrap bg-black focus:ring-orange-300 ${className} hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ${disabled ? 'opacity-50' : ''}`}
            disabled={disabled}
        >
            <div className='text-lg'>
                {Icon}
            </div>
            {text}
        </button>
    )
}

export default Button
