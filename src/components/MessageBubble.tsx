import ReactMarkdown from "react-markdown";
import type { Message } from "@/types/message";

type MessageBubbleProps = Message & {
    isStreaming?: boolean;
}

function MessageBubble({ content, role, isStreaming }: MessageBubbleProps) {
    return (
        <div
            className={`p-4 rounded-xl max-w-xl ${role === "user"
                ? "bg-white text-black self-end"
                : "bg-gray-800 text-white self-start"
                }`}
        >
            <div className={`prose max-w-none ${role === "assistant"
                ? "prose-invert"
                : "prose-neutral"
                }`}>
                <ReactMarkdown>{content}</ReactMarkdown>
                {isStreaming && (
                    <span className="animate-pulse">
                        ▋
                    </span>)}
            </div>
        </div>
    )
}

export default MessageBubble;
