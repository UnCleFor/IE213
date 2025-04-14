import styled from "styled-components";

export const ProductSliderWrapper = styled.div`
  width: 100%;
  overflow: visible; /* ❗ Cho phép các phần tử như mũi tên hiển thị ra ngoài */
  padding: 0  /* 👈 Tạo khoảng đệm hai bên để mũi tên không bị cắt */
  box-sizing: border-box;
  position: relative;
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
  background-color: transparent;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #eee;
  }

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  ${(props) => props.direction === 'left' && `left: -40px;`}
  ${(props) => props.direction === 'right' && `right: -40px;`}

  @media (max-width: 768px) {
    ${(props) => props.direction === 'left' && `left: -20px;`}
    ${(props) => props.direction === 'right' && `right: -20px;`}
  }
`;

export const SlideItemWrapper = styled.div`
  padding: 16px 0px; // 👈 Thêm padding ngang giữa các card
`;