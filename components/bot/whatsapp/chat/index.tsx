import SelectMessageType from "@/components/bot/whatsapp/select-message-type";
import Button from "@/components/general/button";
import Input from "@/components/general/input";
import Modal from "@/components/general/modal";
import messageTypeInitializers from "@/data/whatsapp/message-type-initializers";
import { useNestedState } from "@/hooks/state/useNestedState";
import { useWhatsAppChatDemo } from "@/hooks/whatsapp/useWhatsAppChatDemo";
import { isEmptyObject } from "@/utils/object";
import { isValidUUID } from "@/utils/uuid";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiCheckCircle, BiHappy, BiPlus } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdSearch, MdSend } from "react-icons/md";
import Message from "./message";
import RoundedBtn from "./rounded-button";
import WhatsAppUtilityButton from "./utility-button";
import QRModal from "@/components/qr/in-modal";

interface Props {
  botDetails: any;
}

function WhatsAppChat({ botDetails }: Props) {
  const [initialTemplates] = useState(botDetails?.templates);
  const [initialMessages] = useState(botDetails?.templates ? [botDetails.templates['start']] : []);

  // TODO: add aut add of follow up message if exists on new user message

  console.log({botDetails})

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
  const [showDoneModal, setShowDoneModal] = useState(false);

  const [userResponse, setUserResponse] = useState('');
  const [templates, setTemplates] = useState<any>(initialTemplates || {});
  const [waAccessToken, setWaAccessToken] = useState(botDetails?.wa_token || process.env.NEXT_PUBLIC_WA_AT || '');
  const [waNumber, setWaNumber] = useState(botDetails?.wa_number || process.env.NEXT_PUBLIC_WA_TEST_NUMBER || '');
  const [botId, setBotId] = useState<string | null>(botDetails?.id || null);
  const [botName, setBotName] = useState(botDetails?.name || '');

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

  function onSelectMessageTypeClick(key: string) {
    resetState(messageTypeInitializers[key]);
  }

  function getNewMessagePlaceholder() {
    if (messages && messages.length === 0) return 'Add welcome message';
    if (messages && !messages[messages.length - 1].isBot) return 'Add bot reply';
    return 'Add follow up message';
  }

  async function saveBot(templates: any) {
    // TODO: add success failure handling
    if (botId) {
      await axios.put('/api/bot/save', { id: botId, templates: templates, waAccessToken, waNumber, name: botName });

      return;
    }
    const response = await axios.post('/api/bot/save', { templates: templates, waAccessToken, waNumber, name: botName });

    const newBotId = response.data.id;

    setBotId(newBotId);
  }

  // TODO: re-enable later for drafts
  // useEffect(() => {
  //   if (isEmptyObject(templates)) return;
  //   console.log(templates);
  //   saveBot(templates);
  // }, [templates]);

  function onDoneClick() {
    setShowDoneModal(true);
    // if (isEmptyObject(templates)) return;
    // console.log(templates);
    // saveBot(templates);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-3 mb-5">
        <h2 className="bold text-2xl font-semibold">Config</h2>
        <div className="w-full flex flex-col md:flex-row gap-3">
          <Input
            value={botName}
            onChange={e => setBotName(e.target.value)}
            placeholder="Bot name"
          />
          <Input
            value={waNumber}
            onChange={e => setWaNumber(e.target.value)}
            placeholder="wa number"
          />
          <Input
            value={waAccessToken}
            onChange={e => setWaAccessToken(e.target.value)}
            placeholder="wa access token"
          />
        </div>
      </div>
      <h2 className="bold text-2xl font-semibold mb-3">Create bot</h2>
      <div className="flex relative flex-col h-[80vh] no-scrollbar rounded-xl overflow-hidden">
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
          {messages.map((message, index) => (
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
      <Modal showModal={showSelectMessageType} setShowModal={setShowSelectMessageType}>
        <div className="w-full p-8 flex flex-col gap-5">
          <h1 className="font-bold text-2xl text-center">Select message type</h1>
          <SelectMessageType
            onSelectMessageTypeClick={onSelectMessageTypeClick}
            newMessage={newMessage}
            setShowSelectMessageType={setShowSelectMessageType}
          />
        </div>
      </Modal>
      <QRModal 
        showModal={showDoneModal}
        setShowModal={setShowDoneModal}
        content={`https://wa.me/${waNumber}?text=Hi`}
      />
      <div className="w-full flex justify-center mt-5">
        <Button
          text="Done"
          Icon={<IoCheckmarkDone />}
          className="w-full md:w-80"
          onClick={onDoneClick}
        />
      </div>
    </>
  );
}

export default WhatsAppChat;