import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";

export const WrapperStyleImageSmall = styled(Image)`
    // height: 64px;
    // width: 64px;
`

export const WrapperStyleColImage = styled(Col)`
    flex-basics: unset
    display: flex
`

export const WrapperStyleNameProduct = styled.h1`
    font-size: 25px;
    font-weight: 700;
    margin: 0px
`

export const WrapperStylePriceProduct = styled.span`
    font-size: 25px;
    opacity: 0.92;
    font-weight: bold;
    color: brown;
`

export const SizeProduct = styled.div`
  margin-bottom: 20px
`

export const SizeBox = styled.span`
  margin: 10px;
  padding: 5px;
  border: 1px solid black
`

export const WrapperQuantity = styled.div`

`

export const WrapperBtnBuy = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 70%
`

export const WrapperBtnQualityProduct = styled.span`

`

export const WrapperInputNumber = styled(InputNumber)`
`

export const TableProductDetails = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  font-size: 16px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const RowDetail = styled.tr`
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
  }
`;

export const Td = styled.td`
  padding: 10px 15px;
  border: 1px solid #ddd;
  text-align: left;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #eee;
  }
`;

export const TitleCell = styled(Td)`
  font-weight: bold;
  background-color: #f1f1f1;

  @media (max-width: 768px) {
    background-color: transparent;
    font-weight: 600;
  }
`;

export const DetailsCell = styled(Td)`
  @media (max-width: 768px) {
    padding-left: 20px;
  }
`;
