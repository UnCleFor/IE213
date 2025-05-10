import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0;
    width: 100%; 
  }
`;

export const CardWrapper = styled.div`
  position: relative;
  width: 100%; 
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
  width: 20%; 
  height: 100%;
  background: rgba(0, 0, 0, 0.3); 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1; 
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }

  button {
    width: 35px !important; 
    height: 35px !important; 
    min-width: 35px !important;
    min-height: 35px !important;
    border-radius: 50% !important;
    background: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: brown;
    font-size: 16px; 
    transition: all 0.3s ease-in-out;
    padding: 0;
    z-index: 10; 
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
  margin: 12px 0 8px 0; 
`;

export const WrapperPrice = styled.p`
    font-size: 15px;
    font-family: 'Quicksand', sans-serif; 
    color: brown; 
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
  justify-content: flex-end;  
`;