// src/services/apiService.js

/**
 * Gửi tin nhắn người dùng tới API ChatBot và nhận phản hồi từ AI
 * @param {string} message - Nội dung tin nhắn người dùng
 * @returns {Promise<Object>} - Phản hồi từ máy chủ hoặc thông báo lỗi
 */
export const sendMessageToAI = async (message) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/openai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }), // Gửi nội dung tin nhắn dạng JSON
    });

    // Trả về kết quả phản hồi từ server (đã parse JSON)
    return await response.json();
  } catch (error) {
    // Ghi log lỗi ra console
    console.error('API call failed:', error);

    // Trả về phản hồi mặc định khi gặp lỗi
    return { reply: 'Xin lỗi, có lỗi khi kết nối với ChatBot.' };
  }
};