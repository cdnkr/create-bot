import FileUpload from "@/components/general/file-upload";
import LoadingSpinner from "@/components/general/loading-spinner";
import { WhatsAppImageMessage } from "@/types/whatsapp";
import { getTime } from "@/utils/time";
import Image from "next/image";
import { useState } from "react";
import EditWhatsAppMessageField from "../edit-field";
import { formatMessageText } from "./utils";

interface Props {
    message: WhatsAppImageMessage;
    editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function WAImageMessage({ message, editing = null }: Props) {
    const [isUploading, setIsUploading] = useState(false);

    return (
        <div className="relative w-100 p-2">
            <div className="w-full">
                {editing ? (
                    <FileUpload
                        setFileUrl={fileUrl => editing.set(['image'], {
                            link: fileUrl,
                            caption: editing.get(['image', 'caption'])
                        })}
                        setIsUploading={setIsUploading}
                    >
                        {!isUploading ? (
                            <Image
                                src={editing.get(['image', 'link']) || '/assets/whatsapp/images/demo.png'}
                                alt="img_message"
                                className="rounded-md max-w-[270px] w-100"
                                height={270}
                                width={270}
                            />
                        ) : (
                            <LoadingSpinner />
                        )}
                    </FileUpload>
                ) : (
                    <Image
                        src={message.image.link || '/assets/whatsapp/images/demo.png'}
                        alt="img_message"
                        className="rounded-md max-w-[270px] w-100"
                        height={270}
                        width={270}
                    />
                )}
                {!editing ? formatMessageText(message.image.caption || 'Caption') : (
                    <EditWhatsAppMessageField
                        value={editing.get(['image', 'caption'])}
                        onChange={e => editing.set(['image', 'caption'], e.target.value)}
                        placeholder="Caption"
                    />
                )}
            </div>
            <p className="absolute right-2 bottom-3 text-[#8796a1] text-[10px] min-w-[50px]">
                {message.time || getTime()}
            </p>
        </div>
    );
}

export default WAImageMessage;
