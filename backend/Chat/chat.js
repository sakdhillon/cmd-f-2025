const express = require('express');
const axios = require('axios')
const router = express.Router();
const db = require("../model/db");

const chatUrl = process.env.CHAT_URL

router.get('/', (req, res) => {
    db.ChatHistory.find().then(chatHistory => {
        res.status(200).json(chatHistory)
    })
    // res.json({ message: 'Chat route!' });
});

router.post('/', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "No question provided" });
        }
        const response = await axios.post(chatUrl, { question });
        res.json(response.data);
        const chatEntry = new db.ChatHistory({
            userQuery: question,
            botResponse: response.data.answer
        })
        chatEntry.save().then(() => console.log("Chat entry saved to the database")).catch(error => console.error("Error saving chat entry to the database:", error.message));

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Could not send the question to the chatbot" });
    }
});

module.exports = router; 