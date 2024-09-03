import { WhatsAppMessageType } from "@/types/whatsapp";
import { isLink } from "@/utils/url";
import { IoListOutline } from "react-icons/io5";
import React from "react";

interface Props {
  message: WhatsAppMessageType;
}

function Message({ message }: Props) {
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
      className={`flex justify-center items-center rounded-md w-fit my-1 ${!message.isBot ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"
        }`}
    >
      {/* Image message */}
      {(message.type === 'image') && (
        <div className="relative w-100 p-2">
          <img
            src={message.image.link}
            alt="img_message"
            className="rounded-md max-w-[270px] w-100"
          />
          <p className="absolute right-2 bottom-3 text-[#8796a1] text-[10px] min-w-[50px]">
            {message.time}
          </p>
        </div>
      )}

      {/* Text (link/normal) message */}
      {(message.type === 'text') && (
        <div
          className="flex justify-between items-end max-w-[410px] p-2"
          style={{ wordBreak: "break-word" }}
        >
          {formatMessageText(message.text.body)}
          <p className="text-[#8796a1] text-[10px] min-w-[50px]">{message.time}</p>
        </div>
      )}

      {/* Interactive messages */}
      {(message.type === 'interactive') && (
        <div className="w-full flex flex-col">
          <div
            className="flex justify-between items-end max-w-[410px] p-2"
            style={{ wordBreak: "break-word" }}
          >
            <div className="w-full flex flex-col gap-2 mb-1">
              {(message.interactive.header?.type === 'text') ? (
                <p className="text-white whitespace-pre-line text-base font-bold mr-2 inline">
                  {message.interactive.header.text}
                </p>
              ) : (message.interactive.header?.type === 'image') && (
                <div className="relative w-100 p-2">
                  {message.interactive.header?.image?.link && (
                    <img
                      src={message.interactive.header.image.link}
                      alt="img_message"
                      className="rounded-md max-w-[270px] w-100"
                    />
                  )}
                </div>
              )}
              {message.interactive.body?.text && formatMessageText(message.interactive.body.text)}
            </div>
            <p className="text-[#8796a1] text-[10px] min-w-[50px]">{message.time}</p>
          </div>
          {message.interactive?.action?.button && (
            <>
              <hr className="w-full" />
              <div className="w-full p-3 gap-1.5 text-sm text-green-500 flex justify-center items-center cursor-pointer">
                <div className="text-[22px]">
                  <IoListOutline />
                </div>
                {message.interactive.action.button}
              </div>
            </>
          )}
        </div>
      )}

    </div>
  );
}

export default Message;
