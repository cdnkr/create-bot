import { isValidUUID } from "@/utils/uuid";
import Image from "next/image";
import { Dispatch, LegacyRef, SetStateAction, useEffect, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiCheckCircle, BiHappy, BiPlus } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdSearch, MdSend } from "react-icons/md";
import Message from "./message";
import RoundedBtn from "./rounded-button";
import WhatsAppUtilityButton from "./utility-button";
import { WhatsAppMessageType } from "@/types/whatsapp";

interface BuildBotState {
  messages: WhatsAppMessageType[];
  setMessages: Dispatch<SetStateAction<WhatsAppMessageType[]>>;
  typing: boolean;
  inputRef: LegacyRef<HTMLInputElement> | undefined;
  bottomRef: LegacyRef<HTMLDivElement> | undefined;
  handleEmojiClick: () => void;
  handleImgUpload: () => void;
  handleInputChange: () => void;
  handleInputSubmit: () => void;
  BOT_INFO: {
    name: string;
    picture: string;
  },
  newMessage: any;
  resetState: (newState: any) => void;
  getNestedState: (path: string[] | string) => any;
  setNestedState: (path: string[] | string, value: any) => void;
  setShowSelectMessageType: Dispatch<SetStateAction<boolean>>;
  templates: any;
  setTemplates: Dispatch<SetStateAction<any>>;
}

interface Props {
  buildBotState: BuildBotState;
}

function BuildWhatsAppBot({ buildBotState }: Props) {
  const {
    messages,
    setMessages,
    typing,
    inputRef,
    bottomRef,
    handleEmojiClick,
    handleImgUpload,
    handleInputChange,
    handleInputSubmit,
    BOT_INFO,
    newMessage,
    resetState,
    getNestedState,
    setNestedState,
    setShowSelectMessageType,
    templates,
    setTemplates
  } = buildBotState;

  const [userResponse, setUserResponse] = useState('');

  function onAddClick() {
    setShowSelectMessageType(true);
  }

  function onAddDoneClick() {
    setMessages([...messages, newMessage]);

    if (messages[messages.length - 1]?.isBot) {
      resetState(null);
      return;
    }

    setTemplates((t: any) => {
      const hasStartMessageInTemplates = Boolean(t['start']);

      console.log({
        hasStartMessageInTemplates,
        userResponse,
        chk: isValidUUID(userResponse)
      })

      if (!userResponse && hasStartMessageInTemplates) return t;
      if (userResponse && !isValidUUID(userResponse)) return t;

      return {
        ...t,
        [userResponse || 'start']: newMessage
      };
    });

    resetState(null);
  }

  function getNewMessagePlaceholder() {
    if (messages && messages.length === 0) return 'Add welcome message';
    if (messages && !messages[messages.length - 1]?.isBot) return 'Add bot reply';
    return 'Add follow up message';
  }

  useEffect(() => {
    if (templates[userResponse]) {
      setMessages((messages: WhatsAppMessageType[]) => [...messages, templates[userResponse]])
    } else if ((messages.length === 0) && templates['start']) {
      setMessages((messages: WhatsAppMessageType[]) => [...messages, templates['start']])
    }
  }, [userResponse]);

  return (
    <div className="flex w-full relative flex-col h-[80vh] no-scrollbar rounded-xl overflow-hidden">
      <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
        <div className="flex items-center">
          <Image
            src={BOT_INFO.picture}
            alt="profile_picture"
            className="rounded-full w-[45px] h-[45px] mr-5"
            height={45}
            width={45}
          />
          <div className="flex flex-col">
            <h1 className="text-white font-medium">{BOT_INFO.name}</h1>
            <p className="text-[#8796a1] text-xs">online</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-[85px]">
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      <div
        className="bg-[#0a131a] h-full bg-contain overflow-y-scroll"
        style={{ padding: "12px 7%" }}
      >
        {messages.map((message: WhatsAppMessageType, index: number) => (
          <Message
            key={index}
            message={message}
            setUserResponse={setUserResponse}
            setMessages={setMessages}
          />
        ))}
        {newMessage && (
          <Message
            message={newMessage}
            editing={{
              get: getNestedState,
              set: setNestedState
            }}
          />
        )}
        {!newMessage ? (
          <WhatsAppUtilityButton
            onClick={onAddClick}
            label={getNewMessagePlaceholder()}
            Icon={<BiPlus />}
            type="blueDashed"
          />
        ) : (
          <WhatsAppUtilityButton
            onClick={onAddDoneClick}
            label='Done editing'
            Icon={<BiCheckCircle />}
            type="greenDashed"
          />
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center bg-[#202d33] w-100 h-[70px] p-2">
        <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} />
        <span className="mr-2">
          <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
        </span>
        <input
          type="text"
          placeholder="Type a message"
          className="bg-[#2c3943] w-full h-full rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#8796a1]"
          onChange={handleInputChange}
          ref={inputRef}
        />
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

export default BuildWhatsAppBot;