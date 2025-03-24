import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  padding: 10px 250px;
  background-color: rgb(255, 255, 255); // Thay đổi màu theo nhu cầu
  justifyContent: "center";
`;

export const WrapperTextHeader = styled.span`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  text-align: left;
`;

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: brown;
    gap: 10px;
`
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: brown;
`;
export const WrapperSearchMobile = styled.div`
  position: absolute; /* ✅ Hiển thị trên header thay vì thay thế */
  top: 0;
  left: 0;
  width: 100%;
  height: 70px; /* Giữ chiều cao giống header */
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  z-index: 1000; /* ✅ Đảm bảo hiển thị trên header */
`;

// ✅ Style để thu gọn input tìm kiếm trên mobile
export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 80%; /* ✅ Giảm độ rộng thanh tìm kiếm */
  max-width: 400px; /* ✅ Giới hạn chiều rộng */
`;
