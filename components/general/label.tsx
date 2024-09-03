import React from 'react'

interface Props {
    label: string;
}

function Label(props: Props) {
    const {
        label
    } = props

    return (
        <label className='text-sm font-medium'>{label}</label>
    )
}

export default Label
