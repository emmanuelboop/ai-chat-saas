const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },

    messages: {
        type: Array,
        default: [],
    }

});

module.exports = mongoose.model("Conversation", conversationSchema);