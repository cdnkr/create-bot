import FileUpload from "@/components/general/file-upload";
import LoadingSpinner from "@/components/general/loading-spinner";
import { WhatsAppDocumentMessage } from "@/types/whatsapp";
import { getFileNameFromUrl } from "@/utils/file";
import { getTime } from "@/utils/time";
import { useState } from "react";
import EditWhatsAppMessageField from "../../edit-field";
import { formatMessageText } from "../utils";
import DocumentDisplay from "./display";

interface Props {
    message: WhatsAppDocumentMessage;
    editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function WADocumentMessage({ message, editing = null }: Props) {
    const [isUploading, setIsUploading] = useState(false);

    return (
        <div
            className="max-w-[410px] p-2"
        >
            {editing ? (
                <FileUpload
                    setFileUrl={fileUrl => editing.set(['document'], {
                        link: fileUrl,
                        filename: getFileNameFromUrl(fileUrl),
                        caption: editing.get(['document', 'caption'])
                    })}
                    setIsUploading={setIsUploading}
                >
                    {!isUploading ? (
                        <DocumentDisplay documentUrl={editing.get(['document', 'link']) || "Click to upload your document"} />
                    ) : (
                        <LoadingSpinner />
                    )}
                </FileUpload>
            ) : (
                <DocumentDisplay
                    documentUrl={message.document.filename || "Your-Document"}
                />
            )}

            <div
                className="flex justify-between break-words items-end max-w-full mt-2"
            >
                {!editing ? formatMessageText(message.document.caption || 'Caption') : (
                    <EditWhatsAppMessageField
                        value={editing.get(['document', 'caption'])}
                        onChange={e => editing.set(['document', 'caption'], e.target.value)}
                        placeholder="Caption"
                    />
                )}
                <p className="text-[#8796a1] text-[10px] min-w-[50px]">{message.time || getTime()}</p>
            </div>
        </div>
    );
}

export default WADocumentMessage;
