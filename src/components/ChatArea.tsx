import { useEffect, useRef, useState } from "react"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput"
import type { Message } from "@/types/message"
import { sendChatMessageStream } from "@/api/chat"
import type { Conversation } from "@/types/conversation"
import { saveMessage, updateConversationTitle as updateConversationTitleAPI } from "@/api/conversations"
import { getDisplayName } from "@/lib/auth"

type ChatAreaProps = {
    activeConversation?: Conversation
    updateConversationMessages: (
        conversationId: string,
        messages: Message[]
    ) => void
    updateConversationTitle: (
        conversationId: string,
        title: string
    ) => void
}

function ChatArea({ activeConversation, updateConversationMessages, updateConversationTitle }: ChatAreaProps) {
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [streamingContent, setStreamingContent] = useState("")
    const messagesEndRef = useRef<HTMLDivElement | null>(null)
    const messages = activeConversation?.messages || []
    const displayName = getDisplayName()

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, streamingContent])

    async function handleSendMessage() {
        if (!input.trim() || isLoading) return

        const userMessage = {
            content: input,
            role: "user" as const,
        }

        await saveMessage(
            activeConversation!.id,
            "user",
            input
        )

        if (messages.length === 0) {
            const title = input.slice(0, 30)

            updateConversationTitle(
                activeConversation!.id,
                title,
            )

            await updateConversationTitleAPI(
                activeConversation!.id,
                title
            )
        }

        updateConversationMessages(
            activeConversation!.id,
            [...messages, userMessage]
        )

        setIsLoading(true)
        setStreamingContent("")

        try {
            let fullReply = ""

            await sendChatMessageStream([...messages, userMessage], (chunk) => {
                fullReply += chunk
                setStreamingContent(fullReply)
            })

            await saveMessage(
                activeConversation!.id,
                "assistant",
                fullReply
            )

            updateConversationMessages(
                activeConversation!.id,
                [
                    ...messages,
                    userMessage,
                    {
                        role: "assistant",
                        content: fullReply,
                    },
                ]
            )
        } catch (error) {
            console.log("Error sending message:", error)
            updateConversationMessages(
                activeConversation!.id,
                [
                    ...messages,
                    userMessage,
                    {
                        role: "assistant",
                        content: "Sorry, something went wrong.",
                    },
                ]
            )
        } finally {
            setIsLoading(false)
            setStreamingContent("")
            setInput("")
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !isLoading) {
            handleSendMessage()
        }
    }

    return (
        <div className="flex flex-col h-full rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden">
            <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                        {activeConversation?.title || "New Conversation"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Signed in as <span className="text-indigo-300 font-medium">{displayName}</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    GPT-3.5 Turbo
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
                    {messages.length === 0 && !isLoading && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl shadow-lg shadow-indigo-500/25">
                                ✦
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Welcome, {displayName}!
                            </h3>
                            <p className="text-muted-foreground max-w-sm">
                                Ask anything to get started. Your conversations are saved automatically.
                            </p>
                        </div>
                    )}

                    {messages.map((message, index) => (
                        <MessageBubble
                            key={index}
                            content={message.content}
                            role={message.role}
                            authorLabel={message.role === "user" ? displayName : "Nova AI"}
                        />
                    ))}

                    {isLoading && (
                        <MessageBubble
                            content={streamingContent}
                            role="assistant"
                            authorLabel="Nova AI"
                            isStreaming
                        />
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="border-t border-white/10 px-6 py-4">
                <ChatInput
                    input={input}
                    setInput={setInput}
                    handleSendMessage={handleSendMessage}
                    handleKeyDown={handleKeyDown}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}

export default ChatArea
