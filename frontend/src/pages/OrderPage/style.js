import styled from 'styled-components';

export const WrapperLeft = styled.div`
  width: 100%;
  flex: 1;
`;

export const WrapperRight = styled.div`
  width: 30%;
  background-color: #fff;
  padding: 20px;
  margin-left: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
`;

export const WrapperStyleHeader = styled.div`
  display: flex;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const WrapperPriceDiscount = styled.div`
  font-size: 12px;
  color: #888;
  text-decoration: line-through;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 2px 6px;
  background-color: #f9f9f9;
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;
