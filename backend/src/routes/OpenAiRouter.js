const express = require('express');
const router = express.Router();
const OpenAiController = require('../controllers/OpenAiController');

// gửi câu hỏi tới chatbot và nhận phản hổi
router.post('/openai', OpenAiController.chatWithAI);

module.exports = router;