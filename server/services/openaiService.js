const openai = require('../config/openai');
const systemPrompt = require('../prompts/systemPrompt');
const MAX_MESSAGES = 10;

async function generateChatResponse(messages) {
    // Limit the number of messages sent to the API
    const recentMessages = messages.slice(-MAX_MESSAGES);

    const completion =
        await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                ...recentMessages
            ],  
        });

    const reply = completion.choices[0].message.content;
    return reply;
}

module.exports = {
    generateChatResponse
};