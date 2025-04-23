import styled from 'styled-components';
import { InputNumber, Checkbox as AntCheckbox } from 'antd';

export const PageContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 40px 0;
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
`;

export const CartLayout = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const CartLeft = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const CartRight = styled.div`
  width: 350px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 20px;
  position: sticky;
  top: 20px;
  @media (max-width: 992px) {
    width: 100%;
    position: static;
  }
`;

export const CartHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  gap: 12px;
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
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
`;

export const CartItem = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
  &:hover {
    background: #fafafa;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  gap: 16px;
`;

export const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #f0f0f0;
`;

export const ProductDetails = styled.div`
  flex: 1;
`;

export const ProductName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  align-items: center;
`;

export const PriceColumn = styled.div`
  width: 25%;
  text-align: center;
`;

export const QuantityColumn = styled.div`
  width: 30%;
  text-align: center;
`;

export const TotalColumn = styled.div`
  width: 25%;
  text-align: center;
`;

export const ActionColumn = styled.div`
  width: 20%;
  text-align: center;
`;

export const PriceText = styled.div`
  font-weight: 600;
  color: #333;
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
    border-color: #1890ff;
    color: #1890ff;
  }
`;

export const QuantityInput = styled(InputNumber)`
  width: 50px !important;
  .ant-input-number-input {
    text-align: center;
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #ff4d4f;
  }
`;

export const SummaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const SummaryLabel = styled.span`
  color: #666;
`;

export const SummaryValue = styled.span`
  font-weight: 500;
  color: #333;
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
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #40a9ff;
  }
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #999;
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

