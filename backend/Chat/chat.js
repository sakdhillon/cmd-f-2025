const express = require('express');
const axios = require('axios')
const router = express.Router();

const chatUrl = "http://127.0.0.1:5000/chat"

router.get('/', (req, res) => {
    res.json({ message: 'Chat route!' });
});

router.post('/', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "No question provided" });
        }
        const response = await axios.post(chatUrl, { question });
        res.json(response.data);

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Could not send the question to the chatbot" });
    }
});

console.log(userQuestion)
module.exports = router; 