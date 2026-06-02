import { useEffect, useRef, useState } from "react"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput"
import type { Message } from "@/types/message"
import { sendChatMessage } from "@/api/chat"
import type { Conversation } from "@/types/conversation"

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
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messages = activeConversation?.messages || [];

    useEffect(
        () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        , [messages])

    async function handleSendMessage() {
        if (!input.trim()) return;

        const userMessage = {
            content: input,
            role: "user" as const,
        };

        if (messages.length === 0) {
            updateConversationTitle(
                activeConversation!.id,
                input.slice(0,30),
            )
        }

        updateConversationMessages(
            activeConversation!.id,
            [...messages, userMessage]
        );

        setIsLoading(true);
        try {


            const reply = await sendChatMessage([...messages, userMessage]);

            updateConversationMessages(
                activeConversation!.id,
                [
                    ...messages,
                    userMessage,
                    {
                        role: "assistant",
                        content: reply,
                    },
                ]
            )

        } catch (error) {
            console.log("Error sending message:", error);
            updateConversationMessages(
                activeConversation!.id,
                [
                    ...messages,
                    userMessage,
                    {
                        role: "assistant",
                content: "Sorry, something went wrong."
            }]);

        } finally {
            setIsLoading(false);
            setInput("");
        }

    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && !isLoading) {
            handleSendMessage();
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="border-b border-gray-800 p-4 text-lg font-semibold">
                AI Chat SaaS
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">

                    {messages.map((message, index) => (
                        <MessageBubble
                            key={index}
                            content={message.content}
                            role={message.role}
                            isStreaming={
                                isLoading && index === messages.length - 1 && (
                                    message.role === "assistant"
                                )
                            }
                        />
                    ))
                    }
                    {isLoading && (
                        <div className="bg-gray-800 text-white p-4 rounded-xl max-w-xl self-start">
                            Thinking...
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="border-t border-gray-800 p-4">
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

export default ChatArea;
