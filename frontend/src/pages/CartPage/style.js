import styled from "styled-components";

// Layout chính giữa
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 40px auto;
  padding: 20px 16px;
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  gap: 32px;

  @media (max-width: 992px) {
    gap: 24px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 576px) {
    gap: 8px;
    padding: 12px;
  }
`;

// Khung chứa danh sách sản phẩm
export const ProductList = styled.div`
  flex: 2;
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Từng sản phẩm trong danh sách
export const ProductItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 24px;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 16px;
  gap: 20px;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;

export const ProductImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 16px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 80px;
    margin-right: 0;
  }

  @media (max-width: 480px) {
    width: 70px;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin: 0;
  }

  a {
    color: #b00;
    text-decoration: none;
    display: inline-block;
    margin-top: 4px;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const ProductName = styled.h4`
  font-size: 16px;
  margin: 4px 0;
`;

export const ProductSKU = styled.div`
  color: gray;
  font-size: 13px;
`;

export const ProductPrice = styled.div`
  color: #b00;
  font-size: 18px;
  font-weight: bold;
  margin: 0 20px;
  white-space: nowrap;

  @media (max-width: 768px) {
  margin-left: auto;
  margin-right: 0;
}
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  height: 28px;

  button {
    width: 28px;
    height: 28px;
    font-size: 16px;
    background-color: white;
    border: none;
    border-right: 1px solid #ccc;
    cursor: pointer;

    &:last-of-type {
      border-right: none;
      border-left: 1px solid #ccc;
    }
  }

  input {
    width: 40px;
    height: 100%;
    text-align: center;
    border: none;
    font-size: 12px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    height: 26px;

    button {
      width: 26px;
      height: 26px;
      font-size: 14px;
    }

    input {
      width: 36px;
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    height: 24px;

    button {
      width: 24px;
      height: 24px;
      font-size: 12px;
    }

    input {
      width: 32px;
      font-size: 10px;
    }
  }
`;

// Khung thông tin đơn hàng bên phải
export const OrderSummary = styled.div`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
  background-color: #fff;
  box-sizing: border-box;
  width: 100%;

  h3 {
    font-size: 18px;
    margin-bottom: 16px;
  }

  p {
    color: gray;
    font-size: 13px;
    margin: 12px 0;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

export const OrderRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: bold;
  color: #b00;
  border-top: 1px solid #ccc;
  margin-top: 16px;
  padding-top: 16px;
`;

export const OrderButton = styled.button`
  background-color: brown;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  margin-top: 16px;
  cursor: pointer;
`;

export const InvoiceCheckbox = styled.div`
  margin-top: 12px;
  font-size: 14px;

  label {
    margin-left: 8px;
  }
`;

export const PriceQuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 10px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const ProductContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;



