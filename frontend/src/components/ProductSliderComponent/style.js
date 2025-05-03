import styled from "styled-components";

export const ProductSliderWrapper = styled.div`
  width: 100%;
  overflow: visible; // Quan trọng để không cắt mũi tên
  position: relative;
  padding: 0 24px; // hoặc padding ngang nếu muốn có khoảng đệm cho nút
  box-sizing: border-box;
`;


export const ProductSliderRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;  /* Đảm bảo đủ không gian cho mũi tên */
  justify-content: center;  /* Cân đối giữa các phần tử */
`;

export const SliderContainer = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  overflow: hidden; // giữ nguyên để nội dung không tràn

  .slick-slide > div {
    padding: 0 8px;
  }

  .slick-list {
    margin: 0 -8px;
  }
`;

// Chuyển đổi mũi tên sang sử dụng cùng một style từ PromotionProductSliderComponent
export const ArrowButton = styled.button`
  border: none;
  background-color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  ${(props) => props.direction === 'left' && `left: -48px;`}
  ${(props) => props.direction === 'right' && `right: -48px;`}

  &:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 16px;
    ${(props) => props.direction === 'left' && `left: -24px;`}
    ${(props) => props.direction === 'right' && `right: -24px;`}
  }

  @media (max-width: 480px) {
    display: none; // Ẩn hoàn toàn nếu cần trên mobile
  }
`;


export const SlideItemWrapper = styled.div`
  padding: 16px 0px; // 👈 Thêm padding ngang giữa các card
`;

export const SwipeHint = styled.div`
  text-align: center;
  font-size: 12px;
  color: #888;
  margin-top: 8px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
