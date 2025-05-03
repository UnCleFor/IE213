import styled from 'styled-components';

export const NotFoundWrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 96px;
  font-weight: bold;
  color: brown;

  @media (max-width: 768px) {
    font-size: 64px;
  }
`;

export const Description = styled.p`
  font-size: 20px;
  color: #555;
  margin: 20px 0;
`;

export const BackButton = styled.button`
  background-color: brown;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #8c6c52;
  }
`;
