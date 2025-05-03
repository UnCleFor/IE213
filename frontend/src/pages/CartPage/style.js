import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin: 24px auto;
  padding: 0 16px;
  max-width: 1200px;
  flex-wrap: nowrap; 
  align-items: flex-start;
  overflow-x: hidden; 

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
    gap: 16px;
    padding: 0 8px;
  }
`;

export const TableWrapper = styled.div`
  flex: 1 1 70%;
  min-width: 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;

  table {
    min-width: 600px;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    margin-bottom: 16px;
  }
`;

export const OrderSummary = styled.div`
  flex: 1 1 30%;
  padding: 16px;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    margin-top: 16px;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 16px;
  }

  p {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 16px;
  }
`;

export const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 16px;
`;

export const OrderButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: rgb(149, 33, 33);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: rgb(179, 36, 36);
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 10px;
  }
`;

export const InvoiceCheckbox = styled.div`
  margin-top: 16px;
  font-size: 0.875rem;
  color: #666;

  input {
    margin-right: 8px;
  }
`;

export const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const QuantityButton = styled.button`
  padding: 6px 12px;
  font-size: 1.0rem;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  width: 36px;
  height: 30px;

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

export const QuantityInput = styled.input`
  width: 48px;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #ddd;
  padding: 6px;
  border-radius: 8px;
  background-color: #fff;
  font-weight: bold;
  color: #333;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ScrollHint = styled.div`
  display: none;
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 8px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const EmptyCartWrapper = styled.div`
  text-align: center;
  padding: 80px 20px;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
`;

export const ContinueButton = styled.button`
  background-color:rgb(149, 33, 33);
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    background-color:rgb(179, 36, 36);
  }
`;

export const DeleteText = styled.span`
  display: inline-block;
  margin-top: 8px;
  color: #f5222d;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #cf1322;
    text-decoration: underline;
  }
`;

