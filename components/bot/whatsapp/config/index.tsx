import Input from "@/components/general/input";
import Label from "@/components/general/label";
import DisplayMarkdown from "@/components/markdown";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
    waAccessToken: string;
    setWaAccessToken: (val: string) => void;
    waNumber: string;
    setWaNumber: (val: string) => void;
    botName: string;
    setBotName: (val: string) => void;
}

function WhatsAppChatConfig({
    waAccessToken,
    setWaAccessToken,
    waNumber,
    setWaNumber,
    botName,
    setBotName
}: Props) {
    return (
        <div className="w-full flex flex-col gap-3 mb-5">
            <div className="w-full flex flex-col gap-3">
                <Label label="Bot Name" />
                <Input
                    value={botName}
                    onChange={e => setBotName(e.target.value)}
                    placeholder="E.g. My Bot"
                />
                <div className="border-b border-gray-400 py-2 flex items-center">
                    <h1>Setting up a Meta Developers Account</h1>
                    <div className="ml-auto">
                        <FaChevronDown />
                    </div>
                </div>
                <DisplayMarkdown markdownFileUrl="/api/docs/whatsapp/how-to/1" />
                <DisplayMarkdown markdownFileUrl="/api/docs/whatsapp/how-to/2" />
                <DisplayMarkdown markdownFileUrl="/api/docs/whatsapp/how-to/4" />
                <Label label="WhatsApp Phone Number" />
                <Input
                    value={waNumber}
                    onChange={e => setWaNumber(e.target.value)}
                    placeholder="E.g. 27871234567"
                />
                <DisplayMarkdown markdownFileUrl="/api/docs/whatsapp/how-to/5" />
                <DisplayMarkdown markdownFileUrl="/api/docs/whatsapp/how-to/6" />
                <Label label="WhatsApp Access Token" />
                <Input
                    value={waAccessToken}
                    onChange={e => setWaAccessToken(e.target.value)}
                    placeholder="E.g. EAAGObFo..."
                />
                <DisplayMarkdown markdownFileUrl="/api/docs/whatsapp/how-to/3" />
            </div>
        </div>
    );
}

export default WhatsAppChatConfig;