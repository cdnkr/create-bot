import React from "react";

interface Props {
  msg?: string;
  time: string;
  isLink?: boolean;
  img?: string;
  sent: boolean;
}

function Message({ msg, time, isLink = false, img, sent }: Props) {
  const formatMessageText = (inputText: string) => {
    const regex = /\*(.*?)\*/g; // Matches text between asterisks
    return inputText.split(regex).map((part, index) =>
      index % 2 === 1 ? <b key={index}>{part}</b> : part
    );
  };

  return (
    // Message container
    <div
      className={`flex justify-center items-center rounded-md w-fit my-1 ${sent ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"
        }`}
    >
      {/* Image message */}
      {img ? (
        <div className="relative w-100 p-2">
          {/* Image */}
          <img
            src={img}
            alt="img_message"
            className="rounded-md max-w-[270px] w-100"
          />
          {/* Time */}
          <p className="absolute right-2 bottom-3 text-[#8796a1] text-[10px] min-w-[50px]">
            {time}
          </p>
        </div>
      ) : (
        // Text (link/normal) message
        <div
          className="flex justify-between items-end max-w-[410px] p-2"
          style={{ wordBreak: "break-word" }}
        >
          {/* Link */}
          {(isLink && msg) ? (
            <a
              href={msg}
              target="blank"
              className="text-[#53beec] hover:text-[#53beec] focus:text-[#53beec] active:text-[#53beec] text-sm underline hover:underline mr-2"
            >
              {formatMessageText(msg)}
            </a>
          ) : msg && (
            // Normal text
            <p className="text-white whitespace-pre-line text-sm mr-2">{formatMessageText(msg)}</p>
          )}
          <p className="text-[#8796a1] text-[10px] min-w-[50px]">{time}</p>
        </div>
      )}
    </div>
  );
}

export default Message;
