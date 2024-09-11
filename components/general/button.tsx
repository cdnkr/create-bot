import React from 'react'

interface Props {
    onClick?: (event: React.MouseEvent) => void;
    text: string;
    className?: string;
    disabled?: boolean;
    Icon?: React.ReactElement;
    iconEnd?: boolean;
    color?: 'white' | 'black' | 'blue';
    hoverScale?: boolean;
}

function Button({
    onClick,
    text,
    className = '',
    disabled = false,
    Icon,
    iconEnd = false,
    color = 'black',
    hoverScale = true
}: Props) {
    const COLOR_STYLES = {
        black: 'text-white bg-black',
        white: 'text-black bg-white',
        blue: 'text-white bg-blue-600'
    };

    return (
        <button
            onClick={onClick}
            className={`${COLOR_STYLES[color]} ${hoverScale ? 'hover:scale-105' : ''} shrink-0 flex justify-center items-center gap-2 flex-nowrap text-nowrap focus:ring-blue-300 ${className} hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center ${disabled ? 'opacity-50' : ''}`}
            disabled={disabled}
        >
            {!iconEnd && (
                <div className='text-lg'>
                    {Icon}
                </div>
            )}
            {text}
            {iconEnd && (
                <div className='text-lg'>
                    {Icon}
                </div>
            )}
        </button>
    )
}

export default Button
