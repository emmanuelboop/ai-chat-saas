import type { Message } from "@/types/message";


export async function sendChatMessage(messages: Message[]) {
    const response = await fetch(
        "http://localhost:5000/chat",
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