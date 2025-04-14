import styled from "styled-components";
import { Button } from "antd";

// Wrapper cho mỗi section: Bộ sưu tập & Sản phẩm nổi bật
export const SectionWrapper = styled.div`
  width: 100%;
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 24px 16px;  // Điều chỉnh padding khi màn hình nhỏ hơn 768px
  }
`;

// Wrapper riêng cho phần khuyến mãi để dễ tuỳ chỉnh thêm nếu cần
export const PromotionSectionWrapper = styled(SectionWrapper)`
  background-color: #fdf9f6;
  border-radius: 12px;
  padding: 40px 24px;
`;

// Tiêu đề mỗi section
export const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
  position: relative;
  display: inline-block;

  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: #a6836d;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 22px;
    text-align: center;
    display: block;
    &::before {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

// Nút "Xem tất cả"
export const ViewAllButton = styled(Button)`
  background-color: #a6836d;
  color: white;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a6836d !important;
    color: white !important;
    box-shadow: none !important;
    border-color: transparent !important;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    width: 100%;
    text-align: center;
  }
`;

// Slider nằm ngang dùng cho Bộ sưu tập và Sản phẩm nổi bật
export const ProductSliderWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  scroll-behavior: smooth;
  padding: 0 12px; // <- thêm padding ngang

  &::-webkit-scrollbar {
    display: none;
  }
`;

// Mỗi sản phẩm trong slider
export const ProductItemWrapper = styled.div`
  flex: 0 0 auto;
  width: 260px;

  @media (max-width: 820px) {
    width: 220px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;


