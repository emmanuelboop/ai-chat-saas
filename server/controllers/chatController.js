const { generateChatResponseStream } = require("../services/openaiService");

async function sendMessage(req, res) {
    try {
        const { messages } = req.body;

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders?.();

        await generateChatResponseStream(messages, (chunk) => {
            res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
        });

        res.write("data: [DONE]\n\n");
        res.end();
    } catch (error) {
        console.log("Error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        res.write(`data: ${JSON.stringify({ error: "Internal Server Error" })}\n\n`);
        res.end();
    }
}

module.exports = {
    sendMessage,
};