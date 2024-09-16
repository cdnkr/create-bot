'use client'

import { saveBot } from "@/actions/bot/save";
import Button from "@/components/general/button";
import Input from "@/components/general/input";
import useLocalStorage from "@/hooks/state/useLocalStorage";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const MAX_STAGE = '6';

interface Props { stage: string, user: User | null }

const WhatsAppBotSetupForm: React.FC<Props> = ({
    stage,
    user
}) => {
    const [waAccessToken, setWaAccessToken] = useState('');
    const [waNumber, setWaNumber] = useState('');
    const [botId, setBotId] = useLocalStorage('newBotId', '');
    const [botName, setBotName] = useState('');

    const router = useRouter();

    async function onNextClick() {

        if (['1', '4', '5', '6'].includes(stage)) {
            const newBotId = await saveBot({
                id: botId || undefined,
                name: botName || undefined,
                waAccessToken: waAccessToken || undefined,
                waNumber: waNumber || undefined,
                userId: user?.id
            });
            if (newBotId) setBotId(newBotId);
        }

        if (stage === MAX_STAGE) {
            router.push(`/app/bot/whatsapp/${botId}`);
            return;
        }

        router.push(`/app/bot/whatsapp/set-up/${parseInt(stage) + 1}`);
    }

    return (
        <>
            {stage === '1' && (
                <Input
                    value={botName}
                    onChange={e => setBotName(e.target.value)}
                    placeholder="Enter the name of your bot"
                />
            )}
            {stage === '4' && (
                <Input
                    value={waNumber}
                    onChange={e => setWaNumber(e.target.value)}
                    placeholder="Enter the number here"
                />
            )}
            {stage === '5' && (
                <Input
                    value={waAccessToken}
                    onChange={e => setWaAccessToken(e.target.value)}
                    placeholder="Enter the temporary access token here"
                />
            )}
            {stage === '6' && (
                <Input
                    value={waAccessToken}
                    onChange={e => setWaAccessToken(e.target.value)}
                    placeholder="Enter the permanent access token here"
                />
            )}
            <div className="w-full flex mt-5">
                {(stage !== '0') && (
                    <Link href={`/app/bot/whatsapp/set-up/${parseInt(stage) - 1}`}>
                        <Button
                            text="Back"
                            className="min-w-60"
                            Icon={<FaArrowLeft />}
                        />
                    </Link>
                )}
                <Button
                    text="Next"
                    color="blue"
                    className="min-w-60 ml-auto"
                    Icon={<FaArrowRight />}
                    iconEnd
                    onClick={onNextClick}
                />
            </div>
        </>
    );
}

export default WhatsAppBotSetupForm;