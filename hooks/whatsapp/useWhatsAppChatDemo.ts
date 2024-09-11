import { WhatsAppMessageSafeType, WhatsAppMessageType } from "@/types/whatsapp";
import { getTime } from "@/utils/time";
import { useEffect, useRef, useState } from "react";

const BOT_INFO = {
  name: 'Sample bot',
  picture: '/assets/whatsapp/images/demo.png'
};

export function useWhatsAppChatDemo(initialMessages: WhatsAppMessageType[]) {
  const [messages, setMessages] = useState<WhatsAppMessageType[]>([...initialMessages]);
  const [typing, setTyping] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([...initialMessages]);
  }, [initialMessages]);

  const addMessage = (msg: WhatsAppMessageType) => {
    setMessages(prevMessages => [...prevMessages, msg]);
  };

  const handleEmojiClick = () => {
    if (!inputRef?.current) return;

    inputRef.current.value += "🔥";
    inputRef.current.focus();
  };

  const handleImgUpload = () => {
    addMessage({
      safeType: WhatsAppMessageSafeType.WhatsAppImageMessage,
      type: 'image',
      isBot: false,
      image: {
        link: '/assets/whatsapp/images/demo.png',
        caption: inputRef?.current?.value || ''
      },
      time: getTime(),
    });
  };

  const handleInputChange = () => {
    if (!inputRef.current) return;
    setTyping(inputRef.current.value.length > 0);
  };

  const handleInputSubmit = () => {
    if (!inputRef.current || inputRef.current.value.length === 0) return;

    addMessage({
      safeType: WhatsAppMessageSafeType.WhatsAppTextMessage,
      type: 'text',
      text: {
        body: inputRef.current.value,
        preview_url: true
      },
      time: getTime(),
      isBot: false,
    });

    inputRef.current.value = "";
    inputRef.current.focus();
    setTyping(false);
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);

      return;
    }
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === "Enter") handleInputSubmit();
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);

  return {
    messages,
    setMessages,
    typing,
    inputRef,
    bottomRef,
    handleEmojiClick,
    handleImgUpload,
    handleInputChange,
    handleInputSubmit,
    BOT_INFO
  };
}
