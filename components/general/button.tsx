import React from 'react'

interface Props {
    onClick?: (event: React.MouseEvent) => void;
    text: string;
    className?: string;
    disabled?: boolean;
}

function Button({ 
    onClick,
    text,
    className = '',
    disabled = false,
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`text-white mt-2 shrink-0 flex-nowrap text-nowrap bg-gradient-to-br from-orange-600 to-red-500 focus:ring-orange-300 ${className} hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${disabled ? 'opacity-50' : ''}`}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button
