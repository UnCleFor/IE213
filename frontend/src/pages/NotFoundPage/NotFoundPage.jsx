import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  NotFoundWrapper, 
  Title, 
  Description, 
  BackButton 
} from './style';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <NotFoundWrapper>
      {/* Thông báo về lỗi không tìm thấy trang với người dùng */}
      <Title>404</Title> 
      <Description>Trang bạn tìm không tồn tại hoặc đã bị xoá.</Description>
      <BackButton onClick={() => navigate('/')}>
        Quay về trang chủ
      </BackButton>
    </NotFoundWrapper>
  );
};

export default NotFoundPage;