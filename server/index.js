require('dotenv').config();
const openai = require('./config/openai');
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require('express');
const connectDB = require('./config/database');

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>Backend is running!</h1>');
});

app.use("/chat", chatRoutes)
app.listen(5000, () => {
    console.log('Server is running on port 5000');

});