const express = require('express');
const router = express.Router();
const OpenAiController = require('../controllers/OpenAiController');

router.post('/openai', OpenAiController.chatWithAI);

module.exports = router;