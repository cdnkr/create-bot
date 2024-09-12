import FileUpload from "@/components/general/file-upload";
import LoadingSpinner from "@/components/general/loading-spinner";
import { WhatsAppInteractiveCtaUrlMessage, WhatsAppMessageType } from "@/types/whatsapp";
import { getTime } from "@/utils/time";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import EditWhatsAppMessageField from "../../../edit-field";
import { formatMessageText } from "../../utils";

interface Props {
  message: WhatsAppInteractiveCtaUrlMessage;
  setUserResponse?: (val: string) => void;
  setMessages?: (val: WhatsAppMessageType[] | ((val: WhatsAppMessageType[]) => WhatsAppMessageType[])) => void;
  editing?: { get: (path: string[] | string) => any, set: (path: string[] | string, val: any) => void } | null;
}

function WAInteractiveUrlMessage({ message, setUserResponse, setMessages, editing = null }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <div
        className="justify-between relative break-words items-end w-full max-w-[410px] p-2"
      >
        <div className="w-full flex flex-col gap-2 mb-1">
          {(message.interactive.header?.type === 'text') ? (
            <>
              {!editing ? (
                <p className="text-white whitespace-pre-line text-base font-bold mr-2 inline">
                  {message.interactive.header.text || 'Header'}
                </p>
              ) : (
                <EditWhatsAppMessageField
                  value={editing.get(['interactive', 'header', 'text'])}
                  onChange={e => editing.set(['interactive', 'header', 'text'], e.target.value)}
                  placeholder="Header"
                />
              )}
            </>
          ) : (message.interactive.header?.type === 'image') && (
            <div className="relative w-full">
              {editing ? (
                <FileUpload
                  setFileUrl={fileUrl => editing.set(['interactive', 'header', 'image', 'link'], fileUrl)}
                  setIsUploading={setIsUploading}
                >
                  {!isUploading ? (
                    <Image
                      src={editing.get(['interactive', 'header', 'image', 'link']) || '/assets/whatsapp/images/demo.png'}
                      alt="img_message"
                      className="rounded-md max-w-[270px] w-full"
                      width={270}
                      height={270}
                    />
                  ) : (
                    <LoadingSpinner />
                  )}
                </FileUpload>
              ) : (
                <Image
                  src={message.interactive.header?.image?.link || '/assets/whatsapp/images/demo.png'}
                  alt="img_message"
                  className="rounded-md max-w-[270px] w-full"
                  height={270}
                  width={270}
                />
              )}
            </div>
          )}
          {!editing ? (
            <>
              {message.interactive.body?.text ? formatMessageText(message.interactive.body.text) : formatMessageText('Body')}
            </>
          ) : (
            <EditWhatsAppMessageField
              value={editing.get(['interactive', 'body', 'text'])}
              onChange={e => editing.set(['interactive', 'body', 'text'], e.target.value)}
              placeholder="Body"
            />
          )}
        </div>
        <p className="absolute right-2 bottom-3 text-[#8796a1] text-[10px] min-w-[50px]">
          {message.time || getTime()}
        </p>
      </div>
      <hr className="w-full opacity-20" />
      {message.interactive?.action?.parameters?.url && !editing ? (
        <Link href={message.interactive?.action?.parameters?.url || "#"} target="_blank">
          <div className="w-full p-3 gap-1.5 text-sm text-green-500 flex justify-center items-center cursor-pointer">
            <div className="text-[22px]">
              <MdOpenInNew />
            </div>
            {message.interactive?.action?.parameters?.display_text || 'URL button'}
          </div>
        </Link>
      ) : editing ? (
        <div className="w-full p-3 gap-1.5 text-sm text-green-500 flex justify-center items-center cursor-pointer">
          <div className="text-[22px]">
            <MdOpenInNew />
          </div>
          <div className="flex flex-col">
            <EditWhatsAppMessageField
              value={editing.get(['interactive', 'action', 'parameters', 'display_text'])}
              onChange={e => editing.set(['interactive', 'action', 'parameters', 'display_text'], e.target.value)}
              placeholder="Button text"
            />
            <EditWhatsAppMessageField
              value={editing.get(['interactive', 'action', 'parameters', 'url'])}
              onChange={e => editing.set(['interactive', 'action', 'parameters', 'url'], e.target.value)}
              placeholder="E.g. https://a-website-url.com"
            />
          </div>
        </div>
      ) : (
        <div className="w-full p-3 gap-1.5 text-sm text-green-500 flex justify-center items-center cursor-pointer">
          <div className="text-[22px]">
            <MdOpenInNew />
          </div>
          {message.interactive?.action?.parameters?.display_text || 'URL button'}
        </div>
      )}
    </div>
  );
}

export default WAInteractiveUrlMessage;