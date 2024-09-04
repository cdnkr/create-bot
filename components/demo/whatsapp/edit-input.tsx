import React from 'react'

interface Props {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
}

function EditWhatsAppMessageInput(props: Props) {
    const {
        value,
        onChange,
        placeholder
    } = props

    return (
        <input
            className="text-white whitespace-pre-line text-sm mr-2 inline bg-transparent w-auto"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}

export default EditWhatsAppMessageInput;
