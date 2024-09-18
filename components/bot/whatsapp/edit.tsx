'use client'

import { saveBot } from "@/actions/bot/save";
import SelectMessageType from "@/components/bot/whatsapp/select-message-type";
import Button from "@/components/general/button";
import Modal from "@/components/general/modal";
import QRModal from "@/components/qr/in-modal";
import messageTypeInitializers from "@/data/whatsapp/message-type-initializers";
import { useNestedState } from "@/hooks/state/useNestedState";
import { useWhatsAppChatDemo } from "@/hooks/whatsapp/useWhatsAppChatDemo";
import { IBotResponse } from "@/types/bot";
import { formatDateTime } from "@/utils/date";
import { isEmptyObject } from "@/utils/object";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowRight, BsQrCode } from "react-icons/bs";
import { FaRegSave, FaWhatsapp } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import BuildWhatsAppBot from "./build";
import WhatsAppChatConfig from "./config";
import { Doc } from "@/types/doc";

interface Props {
  botDetails?: IBotResponse;
  user: User | null;
  docs: Doc[];
}

function EditWhatsAppChatBot({ botDetails, user, docs }: Props) {
  const [initialTemplates] = useState(botDetails?.templates);
  const [initialMessages] = useState(botDetails?.templates ? [botDetails.templates['start']] : []);

  console.log({ botDetails })

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
  const [templates, setTemplates] = useState<any>(initialTemplates || {});
  const [waAccessToken, setWaAccessToken] = useState(botDetails?.wa_access_token || '');
  const [waNumber, setWaNumber] = useState(botDetails?.wa_number || '');
  const [botId, setBotId] = useState<string | null>(botDetails?.id || null);
  const [botName, setBotName] = useState(botDetails?.name || '');

  const router = useRouter();

  const [tab, setTab] = useState('build bot');

  function onSelectMessageTypeClick(key: string) {
    resetState(messageTypeInitializers[key]);
  }

  async function handleSaveBot(templates: any) {
    const newBotId = await saveBot({
      id: botId || undefined,
      name: botName || undefined,
      templates: templates,
      waAccessToken,
      waNumber,
      userId: user?.id
    });

    if (newBotId) setBotId(newBotId);
  }

  async function onDoneClick() {
    if (isEmptyObject(templates)) return;
    console.log(templates);
    handleSaveBot(templates);
    setShowDoneModal(true);
  };

  function onSaveClick() {
    handleSaveBot(templates);
  };

  function onTestClick() {
    setShowDoneModal(true);
  }

  const buildBotState = {
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
    botDetails,
    setShowSelectMessageType,
    templates,
    setTemplates
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center">
          <div>
            <div className="w-full flex gap-2 text-3xl ">
              <h1 className="font-bold">{botName}</h1>
            </div>
            <div className="h-1" />
            {botDetails && (
              <div className="w-full flex items-center text-xl text-gray-500">
                <FaWhatsapp />
                &nbsp;<span className="text-sm">{waNumber}</span>
                &nbsp;&nbsp;
                <MdOutlineDateRange />
                &nbsp;<span className="text-sm">{formatDateTime(botDetails.created_at)}</span>
              </div>
            )}
          </div>
          <div className="ml-auto hidden md:flex gap-2">
            <Button
              text="Test"
              onClick={onTestClick}
              color="white"
              Icon={<BsQrCode />}
            />
            <Button
              text="Save"
              onClick={onSaveClick}
              Icon={<FaRegSave />}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex justify-center mb-5 transition-all w-full max-w-44">
          <div
            className="flex w-full h-fit p-1 text-sm text-gray-600  rounded-xl">
            {['build bot', 'config'].map(tabName => (
              <div
                key={tabName}
                className={`flex w-full capitalize whitespace-nowrap items-center justify-center h-8 px-5 cursor-pointer rounded-lg outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset ${tab === tabName ? "text-black shadow bg-white font-bold" : ""}`}
                onClick={() => setTab(tabName)}
              >
                {tabName}
              </div>
            ))}
          </div>
        </div>
        {tab === 'config' && (
          <WhatsAppChatConfig
            waAccessToken={waAccessToken}
            setWaAccessToken={setWaAccessToken}
            waNumber={waNumber}
            setWaNumber={setWaNumber}
            botName={botName}
            setBotName={setBotName}
            docs={docs}
          />
        )}
        {tab === 'build bot' && (
          <BuildWhatsAppBot
            buildBotState={buildBotState}
          />
        )}
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
          text="Save"
          Icon={<FaRegSave />}
          className="w-full md:w-80"
          onClick={onDoneClick}
          iconEnd
        />
      </div>
    </div>
  );
}

export default EditWhatsAppChatBot;