import Message from '@/components/demo/whatsapp/message';
import Button from '@/components/general/button';
import Input from '@/components/general/input';
import Label from '@/components/general/label';
import Modal from '@/components/general/modal';
import messageTypeInitializers from '@/data/whatsapp/add-message-initializers';
import { WhatsAppMessageType } from '@/types/whatsapp';
import { deepClone } from '@/utils/object';
import { camelCaseToText, capitalize } from '@/utils/text';
import { ChangeEvent, useState } from 'react';

interface Props {
    modalTitle: string;
    showModal: boolean;
    setShowModal: (val: boolean) => void;
    messages: WhatsAppMessageType[];
    setMessages: (val: WhatsAppMessageType[]) => void;
}

function AddTemplate(props: Props) {
    const {
        modalTitle,
        showModal,
        setShowModal,
        messages,
        setMessages
    } = props;

    const [templateName, setTemplateName] = useState('');
    const initialValue = deepClone(messageTypeInitializers.text);
    const [message, setMessage] = useState<WhatsAppMessageType>({ ...initialValue });

    function onAddClick() {
        setMessages([...messages, message]);
        setShowModal(false);
    }

    function reInitialize(key: string) {
        if (!messageTypeInitializers[key]) return;

        const initialValue = deepClone(messageTypeInitializers[key]);

        setMessage({ ...initialValue });
    }


    const getValue = (key: string) => {
        const keys = getkeys(key);

        if (Array.isArray(keys)) {
            if (keys.length == 2) {
                // @ts-ignore the keys are keysing
                return message[keys[0]][keys[1]];
            } else if (keys.length == 3) {
                // @ts-ignore the keys are keysing
                return message[keys[0]][keys[1]][keys[2]];
            }
        } else {
            // @ts-ignore the keys are keysing
            return copy[key];
        }
    };

    const setValue = (key: string, value: string) => {
        let copy = { ...message };

        const keys = getkeys(key);

        if ((Array.isArray(keys))) {
            if (keys.length == 2) {
                // @ts-ignore the keys are keysing
                copy[keys[0]][keys[1]] = value;
            } else if (keys.length == 3) {
                // @ts-ignore the keys are keysing
                copy[keys[0]][keys[1]][keys[2]] = value;
            }
        } else {
            // @ts-ignore the keys are keysing
            copy[key] = keys;
        }

        setMessage({ ...copy });
    };

    function getkeys(key: string) {
        if (key.includes('.')) {
            const keys = key.split('.');
            return keys;
        } else {
            return key;
        }
    }

    function determineShouldRenderInput(fullKey: string) {
        const keys = getkeys(fullKey);

        if (Array.isArray(keys)) {
            if (keys.length == 2) {
                // @ts-ignore the keys are keysing
                if (messageTypeInitializers[message.messageKey][keys[0]][keys[1]] === '') return true;
            } else if (keys.length == 3) {
                // @ts-ignore the keys are keysing
                if (messageTypeInitializers[message.messageKey][keys[0]][keys[1]][keys[2]] === '') return true;
            }

            // @ts-ignore the keys are keysing
        } else if (messageTypeInitializers[message.messageKey][fullKey] === '') {
            return true;
        }

        return false;
    }

    function formatPlaceholder(str: string) {
        return capitalize(str.split('.').slice(1).join(' ').replace(/\stext/g, ''));
    }

    const renderInputs = (messageObj: WhatsAppMessageType, parentKey = ''): (JSX.Element | null)[] => {
        return Object.keys(messageObj).map((key) => {

            // @ts-ignore the keys are keysing
            const value = messageObj[key];
            const fullKey = parentKey ? `${parentKey}.${key}` : key;

            const shouldRenderInput = determineShouldRenderInput(fullKey);

            if (typeof value === 'string' && shouldRenderInput) {
                return (
                    <Input
                        label={formatPlaceholder(fullKey)}
                        key={fullKey}
                        placeholder={formatPlaceholder(fullKey)}
                        value={getValue(fullKey)}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(fullKey, e.target.value)}
                    />
                );
            } else if (typeof value === 'object' && value !== null) {
                return <div key={fullKey} className='w-full flex flex-col gap-2'>{renderInputs(value, fullKey)}</div>;
            } else {
                return null;
            }
        });
    };

    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <div className='w-full p-8 flex flex-col gap-5'>
                <h1 className='font-bold text-2xl'>{modalTitle}</h1>
                <Input
                    label='Template name'
                    placeholder='E.g. Find out more'
                    value={templateName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTemplateName(e.target.value)}
                />
                <hr className='border-gray-400' />
                <div>
                    <Label label='Select message type' />
                    <div className='flex flex-wrap gap-y-1 gap-x-5'>
                        {Object.keys(messageTypeInitializers).map(key => (
                            <div className={`cursor-pointer`} onClick={() => reInitialize(key)}>
                                <span className={`text-sm ${(message?.messageKey === key) ? 'text-black underline' : 'text-gray-600'} hover:underline transition-all`}>{camelCaseToText(key)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* {(message.type === 'interactive') && (message.interactive.type === 'button') && Array.isArray(message.interactive.action.buttons) && message.interactive.action.buttons.map((button, i) => (
                    <div className='w-full'>
                        <label className='text-sm font-bold'>Button {i}</label>
                        <Input
                            placeholder='E.g. Find out more'
                            value={getInteractiveButtonValue(i)}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setInteractiveButtonValue(i, e.target.value)}
                        />
                    </div>
                ))} */}
                <div className='flex w-full gap-5'>
                    <div className='flex w-2/3 flex-col gap-2'>
                        {renderInputs(message)}
                    </div>
                    <div className='w-1/2'>
                        <Label label='Preview' />
                        <Message
                            message={message}
                        />
                    </div>
                </div>
                <Button text='Add' onClick={onAddClick} />
            </div>
        </Modal>
    )
}

export default AddTemplate;