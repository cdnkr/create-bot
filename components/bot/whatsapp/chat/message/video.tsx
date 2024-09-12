import FileUpload from "@/components/general/file-upload";
import LoadingSpinner from "@/components/general/loading-spinner";
import { WhatsAppVideoMessage } from "@/types/whatsapp";
import { getTime } from "@/utils/time";
import { useState } from "react";
import EditWhatsAppMessageField from "../edit-field";
import { formatMessageText } from "./utils";

interface Props {
    message: WhatsAppVideoMessage;
    editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function WAVideoMessage({ message, editing = null }: Props) {
    const [isUploading, setIsUploading] = useState(false);

    return (
        <div className="relative w-100 p-2">
            <div className="w-full">
                {editing ? (
                    <FileUpload
                        setFileUrl={fileUrl => editing.set(['video'], {
                            link: fileUrl,
                            caption: editing.get(['video', 'caption'])
                        })}
                        setIsUploading={setIsUploading}
                    >
                        {!isUploading ? (
                            <video
                                src={editing.get(['video', 'link']) || '/assets/sample/demo.mp4'}
                                className="rounded-md max-w-[270px] w-100"
                                controls
                            />
                        ) : (
                            <LoadingSpinner />
                        )}
                    </FileUpload>
                ) : (
                    <video
                        src={message.video.link || '/assets/sample/demo.mp4'}
                        className="rounded-md max-w-[270px] w-100"
                        controls
                    />
                )}
                {!editing ? formatMessageText(message.video.caption || 'Caption') : (
                    <EditWhatsAppMessageField
                        value={editing.get(['video', 'caption'])}
                        onChange={e => editing.set(['video', 'caption'], e.target.value)}
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

export default WAVideoMessage;
