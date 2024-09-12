import GoogleMapComponent from "@/components/google-places/map";
import SelectLocationModal from "@/components/google-places/select-location/in-modal";
import { WhatsAppLocationMessage } from "@/types/whatsapp";
import { getTime } from "@/utils/time";
import { useState } from "react";
import EditWhatsAppMessageField from "../edit-field";
import { formatMessageText } from "./utils";

interface Props {
    message: WhatsAppLocationMessage;
    editing?: { get: (path: string[] | string) => any, set: (path: string[] | string, val: any) => void } | null;
}

function WALocationMessage({ message, editing = null }: Props) {
    const [isUploading, setIsUploading] = useState(false);
    const [showSelectLocation, setShowSelectLocation] = useState(false);

    return (
        <>
            <div className="relative min-w-44 max-w-52 w-100 p-2 pb-7">
                <div className="w-full">
                    {editing ? (
                        <div onClick={() => setShowSelectLocation(true)} className="cursor-pointer w-full h-auto min-w-40 min-h-40 bg-slate-400 rounded-md">
                            <GoogleMapComponent
                                location={editing.get(['location'])}
                                height="160px"
                            />
                        </div>
                    ) : (
                        <GoogleMapComponent
                            location={message.location}
                            height="160px"
                        />
                    )}
                    <div>
                        {!editing ? formatMessageText(message.location.name || 'Location name') : (
                            <EditWhatsAppMessageField
                                value={editing.get(['location', 'name'])}
                                onChange={e => editing.set(['location', 'name'], e.target.value)}
                                placeholder="Location name"
                            />
                        )}
                    </div>
                    <div>
                        {!editing ? (
                            <p className="text-[#8796a1] text-[10px] underline">
                                {message.location.address || 'Location address'}
                            </p>
                        ) : (
                            <EditWhatsAppMessageField
                                value={editing.get(['location', 'address'])}
                                onChange={e => editing.set(['location', 'address'], e.target.value)}
                                placeholder="Location address"
                            />
                        )}
                    </div>
                </div>
                <p className="absolute right-2 bottom-2 text-[#8796a1] text-[10px] min-w-[50px]">
                    {message.time || getTime()}
                </p>
            </div>
            {editing && (
                <SelectLocationModal
                    showModal={showSelectLocation}
                    setShowModal={setShowSelectLocation}
                    location={editing.get(['location'])}
                    setLocation={(place) => editing.set(['location'], place)}
                />
            )}
        </>
    );
}

export default WALocationMessage;