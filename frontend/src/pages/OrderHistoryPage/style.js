import {
  css,
  styled
} from "styled-components";

// Định dạng cho Card sản phẩm
export const orderCardStyle = css `
  .ant-card {
    margin-bottom: 16px;
  }
    
  /* Khi màn hình nhỏ hơn 768px */
  @media (max-width: 768px) {
    .ant-card-body {
      display: flex;
      flex-direction: column;
    }

    .order-info {
      display: flex;
      justify-content: space-between;
      flex-direction: column; /* Sắp xếp theo chiều dọc */
    }

    /* Chỉnh sửa vị trí nút khi ở mobile */
    .order-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
  }
    
  /* Khi màn hình lớn hơn 768px */
  @media (min-width: 768px) {
    .order-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 0;
    }
  }
`;
export const ProductImage = styled.img `
  width: 100px;
  height: auto;
  margin-right: 16px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin-right: 0;
  }

  @media (max-width: 480px) {
   margin-top: 11px;
    width: 70px;
    height: 70px;
  }
`;