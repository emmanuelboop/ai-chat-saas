import { useState } from "react";
import type { Conversation } from "@/types/conversation";
import { useEffect } from "react";
import type { Message } from "@/types/message";
import { getConversations, createConversation, updateConversationTitle as updateConversationTitleAPI, deleteConversationAPI } from "@/api/conversations";

/*
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
}*/

export function useConversations() {
    const [conversations, setConversations] =
        useState<Conversation[]>([]);

    const [activeConversationId, setActiveConversationId] =
        useState("");

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

    async function createNewConversation() {
        const newConversation =
            await createConversation();

        setConversations((prev) => [
            ...prev,
            newConversation,
        ]);

        setActiveConversationId(
            newConversation.id
        );
    }

    async function deleteConversation(
        conversationId: string
    ) {

        await deleteConversationAPI(
            conversationId
        );

        const updatedConversations =
            conversations.filter(
                (conversation) =>
                    conversation.id !== conversationId
            );

        if (updatedConversations.length === 0) {
            return;
        }

        setConversations(updatedConversations);

        if (
            activeConversationId === conversationId
        ) {
            setActiveConversationId(
                updatedConversations[0].id
            );
        }
    }

    async function renameConversation(conversationId: string, title: string) {

        await updateConversationTitleAPI(
            conversationId,
            title
        );

        setConversations((prev) =>
            prev.map((conversation) =>
                conversation.id === conversationId
                    ? { ...conversation, title }
                    : conversation
            )
        )
    }


    useEffect(() => {
        localStorage.setItem("activeConversationId", activeConversationId);
    }, [activeConversationId]);

    useEffect(() => {
        async function fetchConversations() {
            const data = await getConversations();

            setConversations(data);
        }

        fetchConversations();
    }, []);

    useEffect(() => {
        if (
            conversations.length > 0 &&
            !activeConversationId
        ) {
            setActiveConversationId(
                conversations[0].id
            );
        }
    }, [conversations, activeConversationId]);

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