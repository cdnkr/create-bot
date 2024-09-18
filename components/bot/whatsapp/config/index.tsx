import Input from "@/components/general/input";
import Label from "@/components/general/label";
import DisplayHtmlString from "@/components/html/display-html-string";
import DisplayMarkdown from "@/components/markdown";
import { Doc } from "@/types/doc";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const DOCS = [
    'set up meta developers account',
    'create a meta app with whatsapp business service',
    'add a webhook',
    'add a phone number',
    'generate a temporary access token',
    'create a system user with a permanent access token'
]

interface Props {
    waAccessToken: string;
    setWaAccessToken: (val: string) => void;
    waNumber: string;
    setWaNumber: (val: string) => void;
    botName: string;
    setBotName: (val: string) => void;
    docs: Doc[];
}

function WhatsAppChatConfig({
    waAccessToken,
    setWaAccessToken,
    waNumber,
    setWaNumber,
    botName,
    setBotName,
    docs
}: Props) {
    const [expanded, setExpanded] = useState<string[]>([]);

    function toggleExpanded(key: string) {
        if (expanded.includes(key)) {
            setExpanded(exp => {
                return exp.filter(str => str !== key)
            });

            return;
        }

        setExpanded(exp => {
            return [...exp, key];
        });
    }

    return (
        <div className="w-full p-4 flex flex-col gap-3 mb-5">
            <div className="w-full flex flex-col gap-3">
                <div className="w-full p-4 bg-white shadow-lg rounded-lg">
                    <Label label="Bot Name" />
                    <Input
                        value={botName}
                        onChange={e => setBotName(e.target.value)}
                        placeholder="E.g. My Bot"
                    />
                </div>
                {docs.map(({ fileName, content }, i) => (
                    <>
                        <div className="border-b cursor-pointer border-gray-400 py-2 flex items-center" onClick={() => toggleExpanded((i + 1).toString())}>
                            <h1 className="capitalize">{fileName.replace(/-/g, ' ').replace('.md', '').slice(2)}</h1>
                            <div className="ml-auto">
                                {expanded.includes((i + 1).toString()) ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                        </div>
                        {expanded.includes((i + 1).toString()) && <DisplayHtmlString content={content} />}
                        {i === 2 && (
                            <div className="w-full p-4 bg-white shadow-lg rounded-lg">
                                <Label label="WhatsApp Phone Number" />
                                <Input
                                    value={waNumber}
                                    onChange={e => setWaNumber(e.target.value)}
                                    placeholder="E.g. 27871234567"
                                />
                            </div>
                        )}
                        {i === 5 && (
                            <div className="w-full p-4 bg-white shadow-lg rounded-lg">
                                <Label label="WhatsApp Access Token" />
                                <Input
                                    value={waAccessToken}
                                    onChange={e => setWaAccessToken(e.target.value)}
                                    placeholder="E.g. EAAGObFo..."
                                />
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    );
}

export default WhatsAppChatConfig;