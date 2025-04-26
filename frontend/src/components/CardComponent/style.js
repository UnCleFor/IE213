import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0;
    width: 100%; /* Đảm bảo chiều rộng của Card không quá lớn */
  }
`;

export const CardWrapper = styled.div`
  position: relative;
  width: 100%; /* Đảm bảo thẻ chiếm 100% chiều rộng của slider */
  &:hover .hover-actions {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 264px;
  height:264px;
`;

export const HoverActions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20%; /* Chiếm một phần nhỏ bên phải để tránh che khuất mũi tên */
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Xám xuyên thấu */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1; /* Đảm bảo phần hover không che khuất mũi tên */
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }

  button {
    width: 35px !important; /* Thu nhỏ kích thước icon */
    height: 35px !important; /* Đảm bảo hình tròn */
    min-width: 35px !important;
    min-height: 35px !important;
    border-radius: 50% !important;
    background: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: brown;
    font-size: 16px; /* Thu nhỏ icon bên trong */
    transition: all 0.3s ease-in-out;
    padding: 0;
    z-index: 10; /* Đảm bảo nút có z-index cao hơn các phần tử khác trong hover */
  }

  button:hover {
    background: brown;
    color: white;
  }
`;

export const WrapperTitle = styled.h3`
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  color: rgb(170, 137, 108);
  font-weight: normal;
  margin: 12px 0 8px 0; /* 👈 thêm khoảng cách phía trên */
`;


export const WrapperPrice = styled.p`
    font-size: 15px;
    font-family: 'Quicksand', sans-serif; // ✅ Áp dụng font Quicksand
    color: brown; // ✅ Màu giá
    margin: 0px;
    justify-content: space-between;
`;
export const SizeProduct = styled.div`
  margin-bottom: 20px
`

export const SizeBox = styled.span`
  margin: 10px;
  padding: 5px;
  border: 1px solid black
`
export const WrapperQuantity = styled.div`
  display: flex;
  justify-content: flex-end;  /* Aligns children to the right */
`;