const axios = require('axios');

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message format' });
    }


    // Gọi Hugging Face API
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${process.env.HF_MODEL_NAME}`,
      {
        inputs: `[INST] <<SYS>>Bạn là trợ lý ảo cho cửa hàng nội thất. Hãy trả lời ngắn gọn bằng tiếng Việt.<</SYS>> ${message} [/INST]`,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Xử lý kết quả (tùy model)
    let reply = response.data[0]?.generated_text || "Xin lỗi, tôi không hiểu câu hỏi.";
    
    // Loại bỏ phần prompt trong reply (nếu cần)
    if (reply.includes('[/INST]')) {
      reply = reply.split('[/INST]')[1].trim();
    }

    res.json({ reply });

  } catch (error) {
    console.error('Hugging Face Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: "Lỗi AI",
      details: error.response?.data?.error || error.message 
    });
  }
};

module.exports = { chatWithAI };
