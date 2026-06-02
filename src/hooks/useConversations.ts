import { useState } from "react";
import type { Conversation } from "@/types/conversation";
import { useEffect } from "react";
import type { Message } from "@/types/message";

function loadConversations() {
    const stored = localStorage.getItem("conversations");
    if (!stored) {
        return [
            {
                id: crypto.randomUUID(),
                title: "New Chat",
                messages: [],
            },
        ]
    }
    return JSON.parse(stored);
}

function loadActiveConversationId(conversations: Conversation[]) {
    return (
        localStorage.getItem("activeConversationId") || conversations[0].id
    )
}

export function useConversations() {
    const [conversations, setConversations] =
        useState<Conversation[]>(loadConversations);

    const [activeConversationId, setActiveConversationId] =
        useState(() =>
            loadActiveConversationId(conversations)
        );

    function updateConversationTitle(conversationId: string, title: string) {
        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === conversationId
                    ? { ...conversation, title }
                    : conversation
            )

        )
    }

    function updateConversationMessages(conversationId: string, messages: Message[]) {
        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === conversationId
                    ? { ...conversation, messages }
                    : conversation
            )

        )
    }

    function createNewConversation() {
        const newConversation = {
            id: crypto.randomUUID(),
            title: "New Chat",
            messages: [],
        }

        setConversations((prev) => [...prev, newConversation]);
        setActiveConversationId(newConversation.id);
    }

    function deleteConversation(conversationId: string) {
        const updatedConversations = conversations.filter(
            (conversation) => conversation.id !== conversationId
        )

        if (updatedConversations.length === 0) {
            return
        }

        setConversations(updatedConversations);
        if (activeConversationId === conversationId) {
            setActiveConversationId(updatedConversations[0].id);
        }

    }

    function renameConversation(conversationId: string, title: string) {
        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === conversationId
                    ? { ...conversation, title }
                    : conversation
            )
        )
    }

    useEffect(() => {
        localStorage.setItem("conversations", JSON.stringify(conversations));
    }, [conversations]);

    useEffect(() => {
        localStorage.setItem("activeConversationId", activeConversationId);
    }, [activeConversationId]);

    return {
        conversations,
        activeConversationId,
        setActiveConversationId,
        createNewConversation,
        updateConversationTitle,
        updateConversationMessages,
        deleteConversation,
        renameConversation,
    }
}