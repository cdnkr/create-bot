'use client'

import { User } from "@supabase/supabase-js";
import WhatsAppChat from "./chat";

interface Props {
  botDetails?: any;
  user: User | null;
}

export default function BuildWhatsAppBot({
  botDetails,
  user
}: Props) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-5">
      <div className="w-full">
        <WhatsAppChat botDetails={botDetails} user={user} />
      </div>
    </div>
  );
}
