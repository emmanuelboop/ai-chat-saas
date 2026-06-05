import { API_URL } from "@/api/config";
import {getUserId} from "@/lib/auth";


export async function getConversations() {
    const userId = getUserId();
    const response = await fetch(
        `${API_URL}/conversations?userId=${userId}`
    );

    const conversations = await response.json();
    console.log("Fetched conversations:", conversations);

    return conversations.map((conversation: any) => ({
        id: conversation._id,
        title: conversation.title,
        messages: conversation.messages,
    }));
}

export async function saveMessage(
    conversationId: string,
    role: string,
    content: string
) {
    const response = await fetch(
        `${API_URL}/conversations/${conversationId}/messages`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role,
                content,
            }),
        }
    );

    return response.json();
}

export async function updateConversationTitle(
    conversationId: string,
    title: string
) {
    const response = await fetch(
        `${API_URL}/conversations/${conversationId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
            }),
        }
    );

    return response.json();
}

export async function createConversation() {
    console.log("userId:", getUserId());

    const response = await fetch(
        `${API_URL}/conversations`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: getUserId(),
                title: "New Chat",
            }),
        }
    );

    const conversation = await response.json();

    return {
        id: conversation._id,
        title: conversation.title,
        messages: conversation.messages,
    };
}

export async function deleteConversationAPI(
    conversationId: string
) {
    const response = await fetch(
        `${API_URL}/conversations/${conversationId}`,
        {
            method: "DELETE",
        }
    );

    return response.json();
}

