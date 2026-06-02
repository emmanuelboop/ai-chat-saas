require('dotenv').config();
const openai = require('./config/openai');
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require('express');
const connectDB = require('./config/database');
const conversationRoutes = require('./routes/conversationRoutes');
const Conversation = require('./config/models/Conversation');

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Backend is running!</h1>');
});

app.get('/conversations', async (req, res) => { 
    try{
        const conversations = await Conversation.find();
        res.json(conversations);

    }catch(error){
        console.log('Error:', error);
        res.status(500).json({ error: error.message });
    }

});

app.get('/conversations/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        res.json(conversation);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/conversations/:id/messages', async (req, res) => {
    try {
        const conversation =
            await Conversation.findById(
                req.params.id
            );

        if (!conversation) {
            return res.status(404).json({
                error: "Conversation not found"
            });
        }

        conversation.messages.push(req.body);

        await conversation.save();

        res.json(conversation);
    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

app.post('/conversations', async (req, res) => {
    try {
        const data = req.body;
        const conversation = new Conversation(data);
        await conversation.save();
        res.json(conversation);
    } catch (error) {
        console.error('Error saving conversation:', error);
        res.status(500).json({ error: error.message });
    }
});

app.use("/chat", chatRoutes)
app.listen(5000, () => {
    console.log('Server is running on port 5000');

});