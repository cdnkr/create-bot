import { WhatsAppMessageSafeType, WhatsAppMessageType } from "@/types/whatsapp";
import WADocumentMessage from "./document";
import WAImageMessage from "./image";
import WAInteractiveListMessage from "./interactive/list";
import WALocationMessage from "./location";
import WATextMessage from "./text";
import WAInteractiveReplyMessage from "./interactive/reply";
import WAInteractiveUrlMessage from "./interactive/link";
import WAVideoMessage from "./video";

interface Props {
  message: WhatsAppMessageType;
  setUserResponse?: (val: string) => void;
  setMessages?: (val: WhatsAppMessageType[] | ((val: WhatsAppMessageType[]) => WhatsAppMessageType[])) => void;
  editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function Message({ message, setUserResponse, setMessages, editing = null }: Props) {
  return (
    // Message container
    <div
      className={`flex justify-center items-center rounded-md w-fit my-1 ${message.type === 'interactive' ? 'min-w-44' : ''} ${!message.isBot ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"}`}
    >

      {/* Text (link/normal) message */}
      {(message.type === 'text') && (
        <WATextMessage
          message={message}
          editing={editing}
        />
      )}

      {/* Image message */}
      {(message.type === 'image') && (
        <WAImageMessage
          message={message}
          editing={editing}
        />
      )}

      {/* Video message */}
      {(message.type === 'video') && (
        <WAVideoMessage
          message={message}
          editing={editing}
        />
      )}

      {/* Text (link/normal) message */}
      {(message.type === 'document') && (
        <WADocumentMessage
          message={message}
          editing={editing}
        />
      )}

      {/* Location message */}
      {(message.type === 'location') && (
        <WALocationMessage
          message={message}
          editing={editing}
        />
      )}

      {/* Interactive messages */}
      {/* Interactive list messages */}
      {/* use `safeType` as standard WA Cloud API `type` field is not sufficient for TypeScript checking */}
      {(message.safeType === WhatsAppMessageSafeType.WhatsAppInteractiveListMessage) && (
        <WAInteractiveListMessage
          message={message}
          setUserResponse={setUserResponse}
          editing={editing}
          setMessages={setMessages}
        />
      )}

      {/* Interactive reply button messages */}
      {(message.safeType === WhatsAppMessageSafeType.WhatsAppInteractiveButtonMessage) && (
        <WAInteractiveReplyMessage
          message={message}
          setUserResponse={setUserResponse}
          editing={editing}
          setMessages={setMessages}
        />
      )}

      {/* Interactive CTA URL messages */}
      {(message.safeType === WhatsAppMessageSafeType.WhatsAppInteractiveCtaUrlMessage) && (
        <WAInteractiveUrlMessage
          message={message}
          setUserResponse={setUserResponse}
          editing={editing}
          setMessages={setMessages}
        />
      )}

    </div>
  );
}

export default Message;
