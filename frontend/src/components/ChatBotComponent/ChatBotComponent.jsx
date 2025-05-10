// src/components/Chatbot/Chatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { sendMessageToAI } from '../../services/ChatBotService';
import {
  ChatbotWrapper,
  ChatbotButton,
  ChatbotContainer,
  ChatHeader,
  MinimizeButton,
  ChatMessages,
  Message,
  ChatInputContainer,
  Input,
  Button,
  LoadingIndicator,
  BotIcon,
  CloseIcon,
  MinimizeIcon
} from './style';

const Chatbot = () => {
  // Danh sách tin nhắn, mặc định với một tin nhắn từ bot
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Xin chào! Tôi là trợ lý ảo của cửa hàng nội thất. Bạn cần tư vấn gì ạ?' }
  ]);

  // Tin nhắn người dùng đang nhập
  const [inputMessage, setInputMessage] = useState('');

  // Trạng thái mở/đóng chatbot
  const [isOpen, setIsOpen] = useState(false);

  // Trạng thái loading khi đang đợi phản hồi từ AI
  const [isLoading, setIsLoading] = useState(false);

  // Tham chiếu đến phần cuối danh sách tin nhắn để tự động cuộn
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Thêm tin nhắn người dùng vào danh sách
    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Gửi yêu cầu tới AI và nhận phản hồi
      const { reply } = await sendMessageToAI(inputMessage);
      setMessages(prev => [...prev, { role: 'bot', content: reply }]);
    } catch (error) {
      // Trường hợp lỗi
      setMessages(prev => [...prev, { role: 'bot', content: 'Xin lỗi, có lỗi xảy ra!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Gửi tin nhắn khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  // Toggle mở/đóng chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChatbotWrapper>
      {/* Nút mở chatbot nếu đang đóng */}
      {!isOpen ? (
        <ChatbotButton onClick={toggleChatbot}>
          <BotIcon />
        </ChatbotButton>
      ) : (
        <ChatbotContainer>
          {/* Tiêu đề chatbot */}
          <ChatHeader>
            <span>Trợ lý ảo Nội thất</span>
            <MinimizeButton onClick={toggleChatbot}>
              {isOpen ? <MinimizeIcon /> : <CloseIcon />}
            </MinimizeButton>
          </ChatHeader>
          
          {/* Khu vực hiển thị tin nhắn */}
          <ChatMessages>
            {messages.map((msg, index) => (
              <Message key={index} role={msg.role}>
                {msg.role === 'bot' && <BotIcon small />}
                <span>{msg.content}</span>
              </Message>
            ))}

            {/* Hiển thị chỉ báo loading nếu đang xử lý */}
            {isLoading && (
              <Message role="bot">
                <BotIcon small />
                <LoadingIndicator>
                  <div></div>
                  <div></div>
                  <div></div>
                </LoadingIndicator>
              </Message>
            )}
            {/* Mục tiêu cuộn tới */}
            <div ref={messagesEndRef} />
          </ChatMessages>
          
          {/* Ô nhập và nút gửi */}
          <ChatInputContainer>
            <Input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi..."
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isLoading}
            >
              Gửi
            </Button>
          </ChatInputContainer>
        </ChatbotContainer>
      )}
    </ChatbotWrapper>
  );
};

export default Chatbot;