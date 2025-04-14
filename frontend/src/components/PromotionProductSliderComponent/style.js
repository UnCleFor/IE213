import styled from 'styled-components';
export const PromotionWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
  padding: 40px 0;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 24px 16px; // thêm padding ngang cho mobile
    gap: 24px;
  }
`;


export const ProductImage = styled.img`
  width: 600px;
  max-width: 100%;
  object-fit: contain;
  border-radius: 8px;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ProductName = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #e20000;
  margin-bottom: 16px;
`;

export const InfoTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-size: 14px;
  border: 1px solid #ddd;
  background-color: #f6f6f6;
  margin-bottom: 20px;

  > div {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  > div:nth-child(2n) {
    border-right: none;
    background-color: #fff;
  }

  > div:last-child,
  > div:nth-last-child(2) {
    border-bottom: none;
  }

  > div:nth-child(odd) {
    font-weight: 500;
    background-color: #f0f0f0;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  button {
    background-color: white;
    border: 1px solid #a6836d;
    color: #a6836d;
    padding: 6px 20px;
    border-radius: 6px;
    font-weight: 900;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #a6836d;
      color: white;
    }

    &:nth-child(2) {
      background-color: #a6836d;
      color: white;
    }
  }
`;

export const SliderWrapper = styled.div`
  position: relative;
  overflow: visible; // Quan trọng để mũi tên không bị cắt

  .slick-slider {
    position: relative;
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
  }
`;


export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  ${(props) =>
    props.direction === 'left' && `
      left: -48px;
    `}
  ${(props) =>
    props.direction === 'right' && `
      right: -48px;
    `}

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 16px;

    ${(props) => props.direction === 'left' && `left: -24px;`}
    ${(props) => props.direction === 'right' && `right: -24px;`}
  }

  @media (max-width: 480px) {
    display: none;
  }
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
