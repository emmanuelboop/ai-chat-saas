import type { Message } from "@/types/message";
import { API_URL } from "@/api/config";

export async function sendChatMessage(messages: Message[]) {
    const response = await fetch(
        `${API_URL}/chat`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages,
            }),
        }
    );
    const data = await response.json();
    return data.reply;
}