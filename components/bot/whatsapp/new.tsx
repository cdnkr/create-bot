'use client'

import { saveBot } from "@/actions/bot/save";
import Button from "@/components/general/button";
import { Doc } from "@/types/doc";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import WhatsAppChatConfig from "./config";

interface Props {
  user: User | null;
  docs: Doc[];
}

function NewWhatsAppChatBot({ user, docs }: Props) {
  const [waAccessToken, setWaAccessToken] = useState('');
  const [waNumber, setWaNumber] = useState('');
  const [botName, setBotName] = useState('');

  const router = useRouter();

  async function onDoneClick() {
    const newBotId = await saveBot({
      name: botName || undefined,
      waAccessToken,
      waNumber,
      userId: user?.id
    });

    router.push(`/app/bot/whatsapp/${newBotId}`);

    return;
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center">
          <div>
            <div className="w-full flex gap-2 text-3xl ">
              <h1 className="font-bold">New WhatsApp Bot</h1>
            </div>
            <div className="h-1" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <WhatsAppChatConfig
          waAccessToken={waAccessToken}
          setWaAccessToken={setWaAccessToken}
          waNumber={waNumber}
          setWaNumber={setWaNumber}
          botName={botName}
          setBotName={setBotName}
          docs={docs}
        />
      </div>
      <div className="w-full flex justify-center mt-5">
        <Button
          text="Start building"
          Icon={<BsArrowRight />}
          className="w-full md:w-80"
          onClick={onDoneClick}
          iconEnd
        />
      </div>
    </div>
  );
}

export default NewWhatsAppChatBot;