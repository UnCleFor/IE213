import styled from "styled-components";
import { Row } from "antd";

// Wrapper chính cho Footer
export const WrapperFooter = styled(Row)`
  background-color:rgb(76, 50, 50);
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
  flex-direction: column;
`;

// Tiêu đề từng phần trong Footer
export const WrapperFooterTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
  color: brown;
`;

// Các liên kết
export const WrapperFooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
      color: brown;
    }
  }
`;

// Đoạn văn bản nhỏ trong footer
export const WrapperFooterText = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 8px;
`;

// Khu vực chứa icon mạng xã hội
export const WrapperFooterIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  a {
    font-size: 20px;
    color: #ffffff;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
    }
  }
`;

// ✅ Style cho logo trong Footer
export const WrapperFooterLogo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 10px;
`;