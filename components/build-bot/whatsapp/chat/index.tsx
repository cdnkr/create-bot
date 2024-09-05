import SelectMessageType from "@/components/build-bot/whatsapp/select-message-type";
import Modal from "@/components/general/modal";
import messageTypeInitializers from "@/data/whatsapp/message-type-initializers";
import { useNestedState } from "@/hooks/state/useNestedState";
import { useWhatsAppChatDemo } from "@/hooks/whatsapp/useWhatsAppChatDemo";
import { WhatsAppMessageType } from "@/types/whatsapp";
import { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiCheckCircle, BiHappy, BiPlus } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { MdSearch, MdSend } from "react-icons/md";
import Message from "./message";
import RoundedBtn from "./rounded-button";
import WhatsAppUtilityButton from "./utility-button";

interface Props {
  initialMessages: WhatsAppMessageType[];
}

function WhatsAppChat({ initialMessages }: Props) {
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
  } = useWhatsAppChatDemo(initialMessages);

  const {
    state: newMessage,
    resetState,
    getNestedState,
    setNestedState
  } = useNestedState(null);

  const [showSelectMessageType, setShowSelectMessageType] = useState(false);

  function onAddClick() {
    setShowSelectMessageType(true);
  }

  function onAddDoneClick() {
    setMessages([...messages, newMessage]);
    resetState(null);
  }

  function onSelectMessageTypeClick(key: string) {
    resetState(messageTypeInitializers[key]);
    setShowSelectMessageType(false);
  }

  function getNewMessagePlaceholder() {
    if (messages && messages.length === 0) return 'Add welcome message';
    if (messages && !messages[messages.length -1].isBot) return 'Add bot reply';
    return 'Add follow up message';
  }
  
  return (
    <>
      <div className="flex relative flex-col h-[80vh] no-scrollbar rounded-xl overflow-hidden">
        <div className="flex justify-between bg-[#202d33] h-[60px] p-3">
          <div className="flex items-center">
            <img
              src={BOT_INFO.picture}
              alt="profile_picture"
              className="rounded-full w-[45px] h-[45px] mr-5"
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
          {messages.map((message, index) => (
            <Message key={index} message={message} />
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
      <Modal showModal={showSelectMessageType} setShowModal={setShowSelectMessageType}>
        <div className="w-full p-8 flex flex-col gap-5">
          <h1 className="font-bold text-2xl">Select message type</h1>
          <SelectMessageType
            onSelectMessageTypeClick={onSelectMessageTypeClick}
          />
        </div>
      </Modal>
    </>
  );
}

export default WhatsAppChat;