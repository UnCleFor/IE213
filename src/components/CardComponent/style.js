import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0; // ✅ Bỏ padding mặc định của antd Card Body
  }
`;
export const CardWrapper = styled.div`
  position: relative;
  width: auto;
  &:hover .hover-actions {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const HoverActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 15%; /* Chỉ chiếm phần bên phải */
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Xám xuyên thấu */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }

  button {
    width: 35px !important;  /* ✅ Thu nhỏ kích thước icon */
    height: 35px !important; /* ✅ Đảm bảo hình tròn */
    min-width: 35px !important;
    min-height: 35px !important;
    border-radius: 50% !important;
    background: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: brown;
    font-size: 16px; /* ✅ Thu nhỏ icon bên trong */
    transition: all 0.3s ease-in-out;
    padding: 0;
  }

  button:hover {
    background: brown;
    color: white;
  }
`;


export const WrapperTitle = styled.h3`
  font-size: 14px;
  font-family: 'Quicksand', sans-serif; // ✅ Áp dụng font Quicksand
  color: rgb(170, 137, 108); // ✅ Màu title
  font-weight: normal;
  margin: 0 0 25px 0;
`;

export const WrapperPrice = styled.p`
    font-size: 15px;
    font-family: 'Quicksand', sans-serif; // ✅ Áp dụng font Quicksand
    color: brown; // ✅ Màu giá
    margin: 0px;
`;