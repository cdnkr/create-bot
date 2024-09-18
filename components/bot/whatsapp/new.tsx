'use client'

import { saveBot } from "@/actions/bot/save";
import Button from "@/components/general/button";
import { IBotResponse } from "@/types/bot";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import WhatsAppChatConfig from "./config";

interface Props {
  botDetails?: IBotResponse;
  user: User | null;
}

function NewWhatsAppChatBot({ botDetails, user }: Props) {
  const [waAccessToken, setWaAccessToken] = useState(botDetails?.wa_access_token || '');
  const [waNumber, setWaNumber] = useState(botDetails?.wa_number || '');
  const [botName, setBotName] = useState(botDetails?.name || '');

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