import FileUpload from "@/components/general/file-upload";
import LoadingSpinner from "@/components/general/loading-spinner";
import { WhatsAppInteractiveButtonMessage, WhatsAppMessageReply, WhatsAppMessageReplyButton, WhatsAppMessageSafeType, WhatsAppMessageType } from "@/types/whatsapp";
import { getTime } from "@/utils/time";
import Image from "next/image";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { v4 } from "uuid";
import EditWhatsAppMessageField from "../../../edit-field";
import WhatsAppUtilityButton from "../../../utility-button";
import { formatMessageText } from "../../utils";

interface Props {
  message: WhatsAppInteractiveButtonMessage;
  setUserResponse?: (val: string) => void;
  setMessages?: (val: WhatsAppMessageType[] | ((val: WhatsAppMessageType[]) => WhatsAppMessageType[])) => void;
  editing?: { get: (path: string[] | string) => any, set: (path: string[] | string, val: any) => void } | null;
}

function WAInteractiveReplyMessage({ message, setUserResponse, setMessages, editing = null }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  function onReplyClick(reply: WhatsAppMessageReply) {
    if (editing) return;
    if (editing || !setMessages || !setUserResponse) return;

    setMessages(messages => {
      return [...messages, {
        isBot: false,
        messageKey: "text",
        safeType: WhatsAppMessageSafeType.WhatsAppTextMessage,
        type: "text",
        text: {
          "preview_url": true,
          "body": `${reply.title}`
        }
      }];
    });

    setUserResponse(reply.id);
  }

  function onAddReplyButtonClick() {
    if (!editing) return;

    const replyButtons = editing.get(['interactive', 'action', 'buttons']);

    const newButton: WhatsAppMessageReplyButton = {
      type: "reply",
      reply: {
        id: v4(),
        title: ""
      }
    };

    editing.set(['interactive', 'action', 'buttons'], [...replyButtons, newButton]);
  }

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
      {Array.isArray(message.interactive?.action?.buttons) && message.interactive?.action?.buttons.map((reply, i) => (
        <>
          <hr className="w-full opacity-20" />
          <div onClick={() => onReplyClick(reply.reply)} className="w-full p-3 gap-1.5 text-sm text-green-500 flex justify-center items-center cursor-pointer">
            <div className="text-[22px]">
              <BsReply />
            </div>
            {!editing ? (
              <>
                {reply?.reply?.title || 'Reply button'}
              </>
            ) : (
              <EditWhatsAppMessageField
                value={editing.get(['interactive', 'action', 'buttons', i.toString(), 'reply', 'title'])}
                onChange={e => editing.set(['interactive', 'action', 'buttons', i.toString(), 'reply', 'title'], e.target.value)}
                placeholder="Reply button"
              />
            )}
          </div>
        </>
      ))}
      {editing && (editing.get(['interactive', 'action', 'buttons'])?.length < 3) && (
        <div className="p-2 pt-0">
          <WhatsAppUtilityButton
            label="Add reply button"
            Icon={<BiPlus />}
            size="small"
            className="mt-0"
            onClick={onAddReplyButtonClick}
          />
        </div>
      )}
    </div>
  );
}

export default WAInteractiveReplyMessage;