import { stopPropagation } from '@/utils/event';
import React from 'react'

interface Props {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    mode?: 'light' | 'dark'
}

function EditWhatsAppMessageField(props: Props) {
    const {
        value,
        onChange,
        placeholder,
        mode = 'dark'
    } = props;

    const MODES = {
        light: 'text-black',
        dark: 'text-white'
    };

    return (
        <input
            className={`${MODES[mode]} whitespace-pre-line text-sm mr-2 inline bg-transparent w-auto`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onClick={stopPropagation}
        />
    )
}

export default EditWhatsAppMessageField;
