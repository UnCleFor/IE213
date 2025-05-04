import styled from 'styled-components';
import { InputNumber, Checkbox as AntCheckbox } from 'antd';

export const PageContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 10px 0;
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

export const CartTitle = styled.h2`
  font-size: 28px;
  color: #2a2a2a;
  margin-bottom: 30px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const CartLayout = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start; /* Keep items aligned at the top */
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const CartLeft = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
  
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const CartRight = styled.div`
  width: 350px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  position: sticky;
  top: 20px;
  height: fit-content; /* Add this to make the height fit its content */
  min-height: 100%; /* Add this to match the left side height */
  
  @media (max-width: 992px) {
    width: 100%;
    position: static;
    min-height: auto; /* Reset for mobile */
  }
`;
export const CartHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 60%;
  }
`;

export const Checkbox = styled(AntCheckbox)`
  .ant-checkbox-inner {
    width: 18px;
    height: 18px;
  }
`;

export const HeaderText = styled.span`
  font-weight: 500;
  color: #555;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CartItem = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
  
  &:hover {
    background: #fafafa;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
    position: relative;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  gap: 16px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 12px;
  }
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const ProductDetails = styled.div`
  flex: 1;
  position: relative;
`;

export const ProductName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ProductActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  gap: 40px;
  
  @media (max-width: 768px) {
    width: 100%;
    gap: 16px;
    flex-wrap: wrap;
  }
`;

export const PriceColumn = styled.div`
  width: 35%;
  text-align: center;
  padding-left: 30px;
  
  @media (max-width: 768px) {
    width: 50%;
    text-align: left;
    padding-left: 0;
    order: 1;
  }
`;

export const QuantityColumn = styled.div`
  width: 35%;
  text-align: center;
  
  @media (max-width: 768px) {
    width: 100%;
    order: 3;
    margin-top: 12px;
  }
`;

export const PriceText = styled.div`
  font-weight: 600;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const OriginalPrice = styled.div`
  color: #999;
  text-decoration: line-through;
  font-size: 13px;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    justify-content:flex-end;
  }
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #a52a2a;
    color: #a52a2a;
  }
`;

export const QuantityInput = styled(InputNumber)`
  width: 50px !important;
  
  .ant-input-number-input {
    text-align: center;
  }
  
  @media (max-width: 768px) {
    width: 40px !important;
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 13px;
  padding: 5px 0;
  margin-top: 8px;
  transition: all 0.2s;
  
  &:hover {
    text-decoration: underline;
  }
  

`;

export const SummaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SummaryLabel = styled.span`
  color: #666;
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  font-size: 18px;
  font-weight: 600;
  color: #2a2a2a;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 16px;
    padding-top: 16px;
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #a52a2a;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #8c2323;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 10px;
    margin-top: 16px;
  }
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #999;
  
  h3 {
    margin-bottom: 10px;
    font-size: 18px;
  }
  
  p {
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

export const QuantityInputWrapper = styled.div`
  .ant-input-number-handler-wrap {
    display: none !important;
  }
  
  .ant-input-number-input {
    text-align: center;
    padding: 0 5px;
  }
`;

export const DisabledQuantityButton = styled(QuantityButton)`
  cursor: not-allowed;
  color: #ccc;
  border-color: #eee;
  
  &:hover {
    border-color: #eee !important;
    color: #ccc !important;
  }
`;

export const MobilePriceLabel = styled.div`
  display: none;
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileQuantityLabel = styled.div`
  display: none;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content:flex-end;
    display: none;
  }
`;

export const ProductMaterial = styled.div`
  font-size: 13px;
  color: #666;
  margin-top: 4px;
`;

export const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 10px;
`;

export const ProductBottomSection = styled.div`
  display: flex;
  width: 100%;
  padding-top: 10px;
  border-top: 1px dashed #eee;
  margin-top: 10px;
`;

export const SummaryValue = styled.span`
  font-weight: 500;
  color: #333;
`;
