
// src/services/apiService.js
export const sendMessageToAI = async (message) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/openai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      return { reply: 'Xin lỗi, có lỗi khi kết nối với AI.' };
    }
  };