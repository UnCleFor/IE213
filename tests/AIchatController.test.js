const axios = require('axios');
const { chatWithAI } = require('../backend/src/controllers/OpenAiController');

jest.mock('axios');

describe('chatWithAI', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
    process.env.HF_API_KEY = 'test_key';
    process.env.HF_MODEL_NAME = 'test_model';
  });

  it('should return 400 if message is missing or not a string', async () => {
    req.body.message = null;

    await chatWithAI(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid message format' });

    req.body.message = 123;
    await chatWithAI(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return reply from Hugging Face API', async () => {
    req.body.message = 'Bạn có bàn ghế gỗ không?';

    const mockReply = '[INST] <<SYS>>Bạn là trợ lý<</SYS>> Bạn có bàn ghế gỗ không? [/INST] Dĩ nhiên là có!';
    axios.post.mockResolvedValueOnce({
      data: [{ generated_text: mockReply }]
    });

    await chatWithAI(req, res);

    expect(axios.post).toHaveBeenCalledWith(
      `https://api-inference.huggingface.co/models/test_model`,
      {
        inputs: expect.stringContaining(req.body.message),
        parameters: expect.objectContaining({
          max_new_tokens: 500,
          temperature: 0.7,
        }),
      },
      {
        headers: {
          Authorization: `Bearer test_key`,
          'Content-Type': 'application/json',
        },
      }
    );

    expect(res.json).toHaveBeenCalledWith({ reply: 'Dĩ nhiên là có!' });
  });

  it('should handle error from Hugging Face API', async () => {
    req.body.message = 'Hello';
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          error: 'Model failed'
        }
      }
    });

    await chatWithAI(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Lỗi AI',
      details: 'Model failed'
    });
  });

  it('should handle network or unexpected errors', async () => {
    req.body.message = 'Hello';
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    await chatWithAI(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Lỗi AI',
      details: 'Network Error'
    });
  });
});
