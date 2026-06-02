const {generateChatResponse} = require("../services/openaiService");

async function sendMessage(req, res) {

    try {
        const { messages } = req.body;

        const reply = await generateChatResponse(messages);
        res.json({ reply });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports = {
    sendMessage
};