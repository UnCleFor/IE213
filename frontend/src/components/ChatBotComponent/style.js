// src/components/Chatbot/style.js
import styled, { keyframes } from 'styled-components';
import { FaRobot, FaTimes, FaMinus, FaPaperPlane } from 'react-icons/fa';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const loading = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
`;

export const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export const ChatbotButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #8B4513;  // Màu nâu đậm
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: #6B3F28;  // Màu nâu trung bình khi hover
    animation: ${bounce} 0.5s ease;
  }
`;

export const ChatbotContainer = styled.div`
  width: 350px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background: #F5F5DC;  // Màu be sáng
  overflow: hidden;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  max-height: 500px;
`;

export const ChatHeader = styled.div`
  background: #8B4513;  // Màu nâu đậm
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

export const MinimizeButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #FAF0E6;  // Màu be sáng
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  word-break: break-word;
  background: ${props => props.role === 'user' ? '#D2B48C' : 'white'};  // Nâu nhạt cho người dùng và nâu sáng cho bot
  margin-left: ${props => props.role === 'user' ? 'auto' : '0'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  span {
    flex: 1;
  }
`;

export const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #DDD;
  background: #8B4513; 
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #DDD;
  border-radius: 20px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #8B4513;  // Màu nâu đậm khi focus
  }
`;

export const Button = styled.button`
  margin-left: 10px;
  padding: 0 15px;
  background: #8B4513;  // Màu nâu đậm
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: #6B3F28;  // Màu nâu trung bình khi hover
  }

  &:disabled {
    background: #D2B48C;  // Nâu nhạt khi vô hiệu hóa
    cursor: not-allowed;
  }
`;

export const LoadingIndicator = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px;

  div {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #8B4513;  // Màu nâu đậm
    animation: ${loading} 1.4s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
`;

export const BotIcon = styled(FaRobot)`
  font-size: ${props => props.small ? '16px' : '24px'};
  color: ${props => props.small ? '#8B4513' : 'white'};  // Màu nâu đậm hoặc trắng cho icon
  flex-shrink: 0;
`;

export const CloseIcon = styled(FaTimes)`
  font-size: 16px;
`;

export const MinimizeIcon = styled(FaMinus)`
  font-size: 16px;
`;
