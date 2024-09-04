import Message from '@/components/demo/whatsapp/message';
import Button from '@/components/general/button';
import Input from '@/components/general/input';
import Label from '@/components/general/label';
import Modal from '@/components/general/modal';
import messageTypeInitializers from '@/data/whatsapp/add-message-initializers';
import useAddWhatsAppMessage from '@/hooks/useAddWhatsAppMessage';
import { WhatsAppMessageType } from '@/types/whatsapp';
import { camelCaseToText } from '@/utils/text';
import { ChangeEvent } from 'react';

interface Props {
    modalTitle: string;
    showModal: boolean;
    setShowModal: (val: boolean) => void;
    messages: WhatsAppMessageType[];
    setMessages: (val: WhatsAppMessageType[]) => void;
}

function AddTemplate({ modalTitle, showModal, setShowModal, messages, setMessages }: Props) {
    const {
        state,
        templateName,
        setTemplateName,
        reInitialize,
        renderInputs
    } = useAddWhatsAppMessage('text');

    function onAddClick() {
        setMessages([...messages, state]);
        setShowModal(false);
    }

    return (
        <Modal showModal={showModal} setShowModal={setShowModal}>
            <div className="w-full p-8 flex flex-col gap-5">
                <h1 className="font-bold text-2xl">{modalTitle}</h1>
                <Input
                    label="Template name"
                    placeholder="E.g. Find out more"
                    value={templateName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)}
                />
                <hr className="border-gray-400" />
                <div>
                    <Label label="Select message type" />
                    <div className="flex flex-wrap gap-y-1 gap-x-5">
                        {Object.keys(messageTypeInitializers).map((key) => (
                            <div key={key} className="cursor-pointer" onClick={() => reInitialize(key)}>
                                <span className={`text-sm ${state?.messageKey === key ? 'text-black underline' : 'text-gray-600'} hover:underline transition-all`}>
                                    {camelCaseToText(key)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex w-full gap-5">
                    <div className="flex w-2/3 flex-col gap-2">
                        {renderInputs({ ...state })}
                    </div>
                    <div className="w-1/2">
                        <Label label="Preview" />
                        <Message message={state} />
                    </div>
                </div>
                <Button text="Add" onClick={onAddClick} />
            </div>
        </Modal>
    );
}

export default AddTemplate;