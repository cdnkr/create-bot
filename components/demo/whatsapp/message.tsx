import { WhatsAppMessageType } from "@/types/whatsapp";
import { isLink } from "@/utils/url";
import { IoListOutline } from "react-icons/io5";
import React from "react";
import { getTime } from "@/utils/time";
import EditWhatsAppMessageInput from "./edit-input";

interface Props {
  message: WhatsAppMessageType;
  editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function Message({ message, editing = null }: Props) {
  const formatMessageTextStyle = (inputText: string) => {
    const regex = /\*(.*?)\*/g; // Matches text between asterisks
    return inputText.split(regex).map((part, index) =>
      index % 2 === 1 ? <b key={index}>{part}</b> : part
    );
  };

  function formatMessageText(text: string) {
    const words = text?.split(' ');

    return (
      <p className="text-white whitespace-pre-line text-sm mr-2 inline">
        {words.map((word, index) => (
          isLink(word) ? (
            <a
              key={index}
              href={word}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#53beec] hover:text-[#53beec] focus:text-[#53beec] active:text-[#53beec] text-sm underline hover:underline mr-2"
            >
              {formatMessageTextStyle(word) + ' '}
            </a>
          ) : (
            <span key={index} >
              {formatMessageTextStyle(word) + ' '}
            </span>
          )
        ))}
      </p>
    );
  };

  return (
    // Message container
    <div
      className={`flex justify-center items-center rounded-md w-fit my-1 ${message.type === 'interactive' ? 'min-w-44' : ''} ${!message.isBot ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"}`}
    >
      {/* Image message */}
      {(message.type === 'image') && (
        <div className="relative w-100 p-2">
          <div className="w-full">
            <img
              src={message.image.link || './assets/whatsapp/images/demo.png'}
              alt="img_message"
              className="rounded-md max-w-[270px] w-100"
            />
            {!editing ? formatMessageText(message.image.caption || 'Caption') : (
              <EditWhatsAppMessageInput
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
      )}

      {/* Text (link/normal) message */}
      {(message.type === 'text') && (
        <div
          className="flex justify-between break-words items-end max-w-[410px] p-2"
        >
          {!editing ? formatMessageText(message.text.body || 'Body') : (
            <EditWhatsAppMessageInput
              value={editing.get(['text', 'body'])}
              onChange={e => editing.set(['text', 'body'], e.target.value)}
              placeholder="Body"
            />
          )}
          <p className="text-[#8796a1] text-[10px] min-w-[50px]">{message.time || getTime()}</p>
        </div>
      )}

      {/* Interactive messages */}
      {(message.type === 'interactive') && (
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
                    <EditWhatsAppMessageInput
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
                <EditWhatsAppMessageInput
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
                  <EditWhatsAppMessageInput
                    value={editing.get(['interactive', 'action', 'button'])}
                    onChange={e => editing.set(['interactive', 'action', 'button'], e.target.value)}
                    placeholder="Button"
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}

    </div>
  );
}

export default Message;
