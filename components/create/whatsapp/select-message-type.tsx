import Label from '@/components/general/label';
import messageTypeInitializers from '@/data/whatsapp/add-message-initializers';
import { camelCaseToText } from '@/utils/text';

interface Props {
    onSelectMessageTypeClick: (key: string) => void;
}

function SelectMessageType({ onSelectMessageTypeClick }: Props) {
    return (

        <div>
            <Label label="Select message type" />
            <div className="flex flex-wrap gap-y-1 gap-x-5">
                {Object.keys(messageTypeInitializers).map((key) => (
                    <div key={key} className="cursor-pointer" onClick={() => onSelectMessageTypeClick(key)}>
                        <span className={`text-sm text-gray-600 hover:underline transition-all`}>
                            {camelCaseToText(key)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectMessageType;