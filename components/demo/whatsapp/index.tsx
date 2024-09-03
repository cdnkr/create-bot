'use client'

import React, { useState, useEffect, useRef } from "react";
import Message from "./message";
import RoundedBtn from "./rounded-button";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { getTime } from "../../../utils/time";
import { WhatsAppMessageType } from "../../../types/whatsapp";

const BOT_INFO = {
  name: 'Sample bot',
  picture: './assets/whatsapp/images/demo.png'
}

interface Props {
  initialMessages: WhatsAppMessageType[]
}

function WhatsAppChatDemo({ initialMessages }: Props) {
  const [messages, setMessages] = useState<WhatsAppMessageType[]>([...initialMessages]);
  const [typing, setTyping] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([...initialMessages]);
  }, [initialMessages]);

  const addMessage = (msg: WhatsAppMessageType) => {
    const newMessages: WhatsAppMessageType[] = [...messages, msg];
    setMessages(newMessages);
  };

  const handleEmojiClick = () => {
    if (!inputRef?.current) return;

    inputRef.current.value += "🔥";
    inputRef.current.focus();
  };

  const handleImgUpload = () => {
    addMessage({
      type: 'image',
      isBot: false,
      image: {
        link: './assets/whatsapp/images/demo.png',
        caption: inputRef?.current?.value || ''
      },
      time: getTime(),
    });
  };

  const handleInputChange = () => {
    inputRef?.current?.value.length === 0 ? setTyping(false) : setTyping(true);
  };

  const handleInputSubmit = () => {
    if (!inputRef.current) return;

    if (inputRef.current.value.length > 0) {
      addMessage({
        type: 'text',
        text: {
          body: inputRef.current.value,
          preview_url: true
        },
        time: getTime(),
        isBot: false,
      });
      inputRef.current.value = "";
      inputRef.current.focus();
      setTyping(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.code === "Enter") handleInputSubmit();
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });

  return (
    // ChatDetail main container
    <div className="flex flex-col h-[80vh] no-scrollbar rounded-xl overflow-hidden">
      {/* Contact nav */}
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        {/* Contact info */}
        <div className="flex items-center">
          {/* Profile picture */}
          <img
            src={BOT_INFO.picture}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
          />

          {/* Info */}
          <div className="flex flex-col">
            {/* Contact */}
            <h1 className="text-white font-medium">{BOT_INFO.name}</h1>
            {/* Status */}
            <p className="text-[#8796a1] text-xs">online</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Messages section */}
      <div
        className="bg-[#0a131a] h-full bg-contain overflow-y-scroll"
        style={{ padding: "12px 7%" }}
      >
        {messages.map((message) => (
          <Message
            message={message}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Bottom section */}
      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        {/* Emoji btn */}
        <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} />

        {/* Upload btn */}
        <span className="mr-2">
          <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
        </span>

        {/* Input bar */}
        <input
          type="text"
          placeholder="Type a message"
          className="bg-[#2c3943] w-full h-full rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
          onChange={handleInputChange}
          ref={inputRef}
        />

        {/* Mic/Send btn */}
        <span className="ml-2">
          {typing ? (
            <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} />
          ) : (
            <RoundedBtn icon={<BsFillMicFill />} />
          )}
        </span>
      </div>
    </div>
  );
}

export default WhatsAppChatDemo;
