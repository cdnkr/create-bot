interface Props {
    onClick?: () => void;
    Icon?: React.ReactElement;
    label: string;
    type?: 'blueDashed' | 'blueSolid' | 'greenDashed' | 'greenSolid';
}

function WhatsAppUtilityButton({ onClick, Icon, label, type = 'blueDashed' }: Props) {

    const TYPES = {
        blueDashed: 'text-blue-600 border-dashed border-2 border-blue-500',
        blueSolid: 'text-blue-600 border-solid border-2 border-blue-500',
        greenDashed: 'text-green-600 border-dashed border-2 border-green-500',
        greenSolid: 'text-green-600 border-solid border-2 border-green-500',
    };

    return (
        <div
            onClick={onClick}
            className={`flex justify-center min-w-64 items-center rounded-md w-fit mt-2 cursor-pointer bg-transparent mr-auto ${TYPES[type]}`}
        >
            <div className="flex justify-between break-words items-center gap-2 max-w-[410px] p-2">
                {Icon}
                {label}
            </div>
        </div>
    );
}

export default WhatsAppUtilityButton;
