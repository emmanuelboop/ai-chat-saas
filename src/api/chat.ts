import type { Message } from "@/types/message";
import { API_URL } from "@/api/config";

export async function sendChatMessageStream(
    messages: Message[],
    onChunk: (chunk: string) => void
): Promise<string> {
    const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
        throw new Error("Failed to get AI response");
    }

    const reader = response.body?.getReader();
    if (!reader) {
        throw new Error("Streaming not supported");
    }

    const decoder = new TextDecoder();
    let buffer = "";
    let fullReply = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
            if (!line.startsWith("data: ")) {
                continue;
            }

            const data = line.slice(6);
            if (data === "[DONE]") {
                return fullReply;
            }

            const parsed = JSON.parse(data) as { content?: string; error?: string };
            if (parsed.error) {
                throw new Error(parsed.error);
            }

            if (parsed.content) {
                fullReply += parsed.content;
                onChunk(parsed.content);
            }
        }
    }

    return fullReply;
}