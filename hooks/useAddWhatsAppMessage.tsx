import Button from '@/components/general/button';
import Input from '@/components/general/input';
import Label from '@/components/general/label';
import messageTypeInitializers from '@/data/whatsapp/add-message-initializers';
import { getNestedValue, setNestedValue, useNestedState } from '@/hooks/useNestedState';
import { WhatsAppMessageType } from '@/types/whatsapp';
import { deepClone } from '@/utils/object';
import { useRef, useState } from 'react';

function useAddWhatsAppMessage(initialMessageType: keyof typeof messageTypeInitializers) {
    const [templateName, setTemplateName] = useState('');
    const initializerRef = useRef<WhatsAppMessageType>(messageTypeInitializers[initialMessageType]);
    const { state, getNestedState, setNestedState, resetState } = useNestedState(null);

    const reInitialize = (key: string | null) => {
        if (!key) {
            resetState(null);
            return;
        }

        if (messageTypeInitializers[key]) {
            initializerRef.current = deepClone(messageTypeInitializers[key]);
            resetState(deepClone(messageTypeInitializers[key]));
        }
    };

    const onAddButtonClick = (fullKey: string[] | string) => {
        const newButton = {
            type: 'reply',
            reply: {
                id: '',
                title: ''
            }
        };

        const currentButtons = getNestedState(fullKey) || [];

        const cp = initializerRef.current;
        const currentInitializerButtons = getNestedValue(cp, fullKey) || [];
        const updatedInitializer = setNestedValue(cp, fullKey, [...currentInitializerButtons, newButton]);
        initializerRef.current = updatedInitializer;

        setNestedState(fullKey, [...currentButtons, newButton]);
    };

    const shouldRenderInput = (keys: string[]): boolean => {
        if (!initializerRef.current) return false;
        return getNestedValue(initializerRef.current, keys) === '';
    };

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
                        onChange={(e) => setNestedState(fullKey, e.target.value)}
                    />
                );
            } else if (Array.isArray(value) && key === 'buttons') {
                return (
                    <div key={fullKey.join('.')} className="w-full flex flex-col gap-2">
                        <Label label="Options" />
                        <div className="ml-5">
                            {value.map((button, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    {renderInputs(button, [...fullKey, String(index)])}
                                </div>
                            ))}
                            <Button
                                text="Add new option"
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
        return keys.slice(-1)[0].replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }

    return {
        state,
        getNestedState,
        setNestedState,
        templateName,
        setTemplateName,
        reInitialize,
        onAddButtonClick,
        renderInputs
    };
};

export default useAddWhatsAppMessage;
