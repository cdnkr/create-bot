import GoogleMapComponent from "@/components/google-places/map";
import SelectLocationModal from "@/components/google-places/select-location/in-modal";
import { WhatsAppLocationMessage } from "@/types/whatsapp";
import { getTime } from "@/utils/time";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import WhatsAppUtilityButton from "../utility-button";
import { formatMessageText } from "./utils";

interface Props {
    message: WhatsAppLocationMessage;
    editing?: { get: (path: string[] | string) => any, set: (path: string[] | string, val: any) => void } | null;
}

function WALocationMessage({ message, editing = null }: Props) {
    const [showSelectLocation, setShowSelectLocation] = useState(false);

    return (
        <>
            <div className="relative min-w-44 w-100 p-2 pb-7">
                <div className="w-full">
                    {editing ? (
                        <div onClick={() => setShowSelectLocation(true)} className="cursor-pointer w-full h-auto rounded-md">

                            {editing.get(['location'])?.latitude ? (
                                <GoogleMapComponent
                                    location={editing.get(['location'])}
                                    height="160px"
                                />
                            ) : (
                                <WhatsAppUtilityButton 
                                    label="Click to add location" 
                                    Icon={<BiPlus />}
                                />
                            )}
                        </div>
                    ) : (
                        <GoogleMapComponent
                            location={message.location}
                            height="160px"
                        />
                    )}
                    <div>
                        {formatMessageText(editing?.get(['location', 'name']) || message.location.name || 'Location name')}
                    </div>
                    <div>
                        <p className="text-[#8796a1] text-[10px] underline">
                            {editing?.get(['location', 'address']) || message.location.address || 'Location address'}
                        </p>
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