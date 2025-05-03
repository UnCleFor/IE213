import styled from "styled-components";
import { Button } from "antd";

// Wrapper cho mỗi section: Bộ sưu tập & Sản phẩm nổi bật
export const SectionWrapper = styled.div`
  width: 100%;
  padding: 40px 0;
  box-sizing: border-box; // ✅ Quan trọng

  @media (max-width: 768px) {
    padding: 24px 16px;
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
  background-color: brown;
  color: white;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background-color: brown !important;
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



// Các components mới cần thêm
export const HeroSection = styled.section`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

export const HeroContent = styled.div`
  position: absolute;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
`;

export const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 40px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureItem = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h4 {
    margin: 15px 0 10px;
    font-size: 18px;
  }
  
  p {
    color: #666;
    font-size: 14px;
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin: 30px 0;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled.div`
  position: relative;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-image: url(${props => props.bgimage});
  background-size: cover;
  background-position: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    
    .overlay {
      background: rgba(0,0,0,0.5);
    }
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    transition: all 0.3s ease;
  }
  
  .category-icon {
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
    background: rgba(139, 69, 19, 0.8);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  h3 {
    position: relative;
    z-index: 1;
    font-size: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
`;

export const TestimonialSection = styled.div`
  padding: 60px 0;
  background-color: #f5f5f5;
  margin: 40px 0;
`;

export const TestimonialCard = styled.div`
  min-width: 300px;
  padding: 25px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  .rating {
    color: gold;
    font-size: 18px;
    margin-bottom: 15px;
  }
  
  .comment {
    font-style: italic;
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .name {
    font-weight: bold;
    text-align: right;
  }
`;

export const InstagramSection = styled.div`
  margin: 60px 0;
`;

export const InstagramPost = styled.div`
  position: relative;
  height: 200px;
  background-image: url(${props => props.bgimage});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    svg {
      color: white;
    }
  }
  
  &:hover .overlay {
    opacity: 1;
  }
`;

export const NewsletterSection = styled.div`
  padding: 40px 0;
  background-color: #f5f5f5;
`;

export const NewsletterForm = styled.div`
  display: flex;
  
  input {
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    width: 300px;
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: brown;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    input {
      width: 100%;
      border-radius: 4px;
      margin-bottom: 10px;
    }
  }
`;

export const PromotionCountdown = styled.div`
  margin: 20px 0;
  text-align: center;
`;

