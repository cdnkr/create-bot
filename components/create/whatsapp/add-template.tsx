import Message from '@/components/demo/whatsapp/message';
import Button from '@/components/general/button';
import Input from '@/components/general/input';
import Label from '@/components/general/label';
import Modal from '@/components/general/modal';
import messageTypeInitializers from '@/data/whatsapp/add-message-initializers';
import { getNestedValue, setNestedValue, useNestedState } from '@/hooks/useNestedState';
import { WhatsAppMessageType } from '@/types/whatsapp';
import { deepClone } from '@/utils/object';
import { camelCaseToText, capitalize } from '@/utils/text';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface Props {
    modalTitle: string;
    showModal: boolean;
    setShowModal: (val: boolean) => void;
    messages: WhatsAppMessageType[];
    setMessages: (val: WhatsAppMessageType[]) => void;
}

function AddTemplate({ modalTitle, showModal, setShowModal, messages, setMessages }: Props) {
    const [templateName, setTemplateName] = useState('');
    const initializerRef = useRef<WhatsAppMessageType>(messageTypeInitializers.text);
    const { state, getNestedState, setNestedState, resetState } = useNestedState(messageTypeInitializers.text);

    function onAddClick() {
        setMessages([...messages, state]);
        setShowModal(false);
    }

    function reInitialize(key: string) {
        if (messageTypeInitializers[key]) {
            initializerRef.current = deepClone(messageTypeInitializers[key]);
            resetState(deepClone(messageTypeInitializers[key]));
        }
    }

    const shouldRenderInput = (keys: string[]): boolean => {
        if (!initializerRef.current) return false;
        // @ts-ignore
        return getNestedValue(initializerRef.current, keys) === '';
    };

    useEffect(() => {
        console.log(state)
    }, [state]);

    function onAddButtonClick(fullKey: string[] | string) {
        const newButton = {
            "type": "reply",
            "reply": {
                "id": "",
                "title": ""
            }
        };

        const currentButtons = getNestedState(fullKey) || [];

        // <set initializer>
        const cp = initializerRef.current;
        const currentInitializerButtons = getNestedValue(cp, fullKey) || [];
        const updatedInitializer = setNestedValue(cp, fullKey, [...currentInitializerButtons, newButton]);
        initializerRef.current = updatedInitializer;
        // </set initializer>

        setNestedState(fullKey, [...currentButtons, newButton]);
    }

    const renderInputs = (messageObj: Record<string, any>, parentKey: string[] = []): (JSX.Element | null)[] => {
        return Object.keys(messageObj).map((key) => {
            const fullKey = [...parentKey, key];
            const value = messageObj[key];

            if (typeof value === 'string' && shouldRenderInput(fullKey)) {
                return (
                    <Input
                        label={formatPlaceholder(fullKey)}
                        key={fullKey.join('.')}
                        placeholder={formatPlaceholder(fullKey)}
                        value={getNestedState(fullKey) || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNestedState(fullKey, e.target.value)}
                    />
                );
            } else if (Array.isArray(value) && key === 'buttons') {
                return (
                    <div key={fullKey.join('.')} className="w-full flex flex-col gap-2">
                        <Label label='Options' />
                        <div className='ml-5'>
                            {value.map((button, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    {renderInputs(button, [...fullKey, String(index)])}
                                </div>
                            ))}
                            <Button
                                text='Add new option'
                                onClick={() => onAddButtonClick(fullKey)}
                                className="mt-5 w-full"
                            />
                        </div>
                    </div>
                );
            } else if (typeof value === 'object' && value !== null) {
                return (
                    <div key={fullKey.join('.')} className="w-full flex flex-col gap-2">
                        {renderInputs(value, fullKey)}
                    </div>
                );
            } else {
                return null;
            }
        });
    };

    function formatPlaceholder(keys: string[]): string {
        return capitalize(keys.slice(-1)[0].replace(/_/g, ' '));
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