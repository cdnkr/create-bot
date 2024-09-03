import { WhatsAppMessageType } from "@/types/whatsapp";
import { isLink } from "@/utils/url";
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
          {message.type === 'text' && (
            <>
              {formatMessageText(message.text.body)}
            </>
          )}
          <p className="text-[#8796a1] text-[10px] min-w-[50px]">{message.time}</p>
        </div>
      )}
      
    </div>
  );
}

export default Message;
