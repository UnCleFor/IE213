// src/components/Chatbot/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
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
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Xin chào! Tôi là trợ lý ảo của cửa hàng nội thất. Bạn cần tư vấn gì ạ?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Thêm tin nhắn người dùng
    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Gọi API và thêm phản hồi AI
    try {
      const { reply } = await sendMessageToAI(inputMessage);
      setMessages(prev => [...prev, { role: 'bot', content: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Xin lỗi, có lỗi xảy ra!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChatbotWrapper>
      {!isOpen ? (
        <ChatbotButton onClick={toggleChatbot}>
          <BotIcon />
        </ChatbotButton>
      ) : (
        <ChatbotContainer>
          <ChatHeader>
            <span>Trợ lý ảo Nội thất</span>
            <MinimizeButton onClick={toggleChatbot}>
              {isOpen ? <MinimizeIcon /> : <CloseIcon />}
            </MinimizeButton>
          </ChatHeader>
          
          <ChatMessages>
            {messages.map((msg, index) => (
              <Message key={index} role={msg.role}>
                {msg.role === 'bot' && <BotIcon small />}
                <span>{msg.content}</span>
              </Message>
            ))}
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
            <div ref={messagesEndRef} />
          </ChatMessages>
          
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