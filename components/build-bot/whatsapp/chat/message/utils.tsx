import { isLink } from "@/utils/url";

export const formatMessageTextStyle = (inputText: string) => {
    const regex = /\*(.*?)\*/g; // Matches text between asterisks
    return inputText.split(regex).map((part, index) =>
        index % 2 === 1 ? <b key={index}>{part}</b> : part
    );
};

export function formatMessageText(text: string) {
    const words = text?.split(' ');

    return (
        <p className="text-white whitespace-pre-line text-sm mr-2 inline">
            {words.map((word, index) => (
                isLink(word) ? (
                    <a
                        key={index}
                        href={word}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#53beec] hover:text-[#53beec] focus:text-[#53beec] active:text-[#53beec] text-sm underline hover:underline mr-2"
                    >
                        {formatMessageTextStyle(word) + ' '}
                    </a>
                ) : (
                    <span key={index} >
                        {formatMessageTextStyle(word) + ' '}
                    </span>
                )
            ))}
        </p>
    );
};
