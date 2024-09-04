import { WhatsAppTextMessage } from "@/types/whatsapp";
import { getTime } from "@/utils/time";
import EditWhatsAppMessageField from "../edit-field";
import { formatMessageText } from "./utils";

interface Props {
    message: WhatsAppTextMessage;
    editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function WATextMessage({ message, editing = null }: Props) {
    return (
        <div
            className="flex justify-between break-words items-end max-w-[410px] p-2"
        >
            {!editing ? formatMessageText(message.text.body || 'Body') : (
                <EditWhatsAppMessageField
                    value={editing.get(['text', 'body'])}
                    onChange={e => editing.set(['text', 'body'], e.target.value)}
                    placeholder="Body"
                />
            )}
            <p className="text-[#8796a1] text-[10px] min-w-[50px]">{message.time || getTime()}</p>
        </div>
    );
}

export default WATextMessage;
