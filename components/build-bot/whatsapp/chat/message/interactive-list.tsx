import { WhatsAppInteractiveListMessage, WhatsAppMessageType } from "@/types/whatsapp";
import { isLink } from "@/utils/url";
import { IoListOutline } from "react-icons/io5";
import React from "react";
import { getTime } from "@/utils/time";
import EditWhatsAppMessageField from "../edit-field";
import WATextMessage from "./text";
import WAImageMessage from "./image";
import { formatMessageText } from "./utils";

interface Props {
  message: WhatsAppInteractiveListMessage;
  editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function WAInteractiveListMessage({ message, editing = null }: Props) {
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
              <img
                src={message.interactive.header?.image?.link || './assets/whatsapp/images/demo.png'}
                alt="img_message"
                className="rounded-md w-full"
              />
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
      {(typeof message.interactive?.action?.button === 'string') && (
        <>
          <hr className="w-full" />
          <div className="w-full p-3 gap-1.5 text-sm text-green-500 flex justify-center items-center cursor-pointer">
            <div className="text-[22px]">
              <IoListOutline />
            </div>
            {!editing ? (
              <>
                {message.interactive.action.button || 'Action button'}
              </>
            ) : (
              <EditWhatsAppMessageField
                value={editing.get(['interactive', 'action', 'button'])}
                onChange={e => editing.set(['interactive', 'action', 'button'], e.target.value)}
                placeholder="Button"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default WAInteractiveListMessage;