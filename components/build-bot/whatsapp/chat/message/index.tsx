import { WhatsAppMessageSafeType, WhatsAppMessageType } from "@/types/whatsapp";
import WAImageMessage from "./image";
import WAInteractiveListMessage from "./interactive-list";
import WATextMessage from "./text";

interface Props {
  message: WhatsAppMessageType;
  editing?: { get: (path: string[] | string) => string, set: (path: string[] | string, val: any) => void } | null;
}

function Message({ message, editing = null }: Props) {
  return (
    // Message container
    <div
      className={`flex justify-center items-center rounded-md w-fit my-1 ${message.type === 'interactive' ? 'min-w-44' : ''} ${!message.isBot ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"}`}
    >
      {/* Image message */}
      {(message.type === 'image') && (
        <WAImageMessage
          message={message}
          editing={editing}
        />
      )}

      {/* Text (link/normal) message */}
      {(message.type === 'text') && (
        <WATextMessage
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
          editing={editing}
        />
      )}

    </div>
  );
}

export default Message;
