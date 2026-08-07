import ReactMarkdown from "react-markdown"
import type { Message } from "@/types/message"

type MessageBubbleProps = Message & {
    isStreaming?: boolean
    authorLabel?: string
}

function MessageBubble({ content, role, isStreaming, authorLabel }: MessageBubbleProps) {
    const isUser = role === "user"

    return (
        <div className={`flex flex-col gap-1.5 max-w-[85%] ${isUser ? "self-end items-end" : "self-start items-start"}`}>
            {authorLabel && (
                <span className="text-xs font-medium text-muted-foreground px-1">
                    {authorLabel}
                </span>
            )}
            <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                    isUser
                        ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-md"
                        : "bg-card border border-white/10 text-card-foreground rounded-bl-md"
                }`}
            >
                <div
                    className={`prose prose-sm max-w-none ${
                        isUser ? "prose-invert" : "prose-invert"
                    }`}
                >
                    {content ? (
                        <ReactMarkdown>{content}</ReactMarkdown>
                    ) : isStreaming ? (
                        <span className="text-muted-foreground italic">Thinking...</span>
                    ) : null}
                    {isStreaming && content && (
                        <span className="inline-block w-0.5 h-4 ml-0.5 bg-indigo-400 animate-pulse align-middle" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MessageBubble
