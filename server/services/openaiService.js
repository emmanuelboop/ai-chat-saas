const openai = require('../config/openai');
const systemPrompt = require('../prompts/systemPrompt');
const MAX_MESSAGES = 10;

function buildMessages(messages) {
    const recentMessages = messages.slice(-MAX_MESSAGES);
    return [
        { role: "system", content: systemPrompt },
        ...recentMessages,
    ];
}

async function generateChatResponse(messages) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: buildMessages(messages),
    });

    return completion.choices[0].message.content;
}

async function generateChatResponseStream(messages, onChunk) {
    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: buildMessages(messages),
        stream: true,
    });

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            onChunk(content);
        }
    }
}

module.exports = {
    generateChatResponse,
    generateChatResponseStream,
};