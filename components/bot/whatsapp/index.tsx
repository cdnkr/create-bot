'use client'

import WhatsAppChat from "./chat";

interface Props {
  botDetails?: any;
}

export default function BuildWhatsAppBot({
  botDetails
}: Props) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-5">
      <div className="w-full">
        <WhatsAppChat botDetails={botDetails} />
      </div>
    </div>
  );
}
