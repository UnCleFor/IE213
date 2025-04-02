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

export const WrapperQuality = styled.div`

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
`;

export const Td = styled.td`
  padding: 10px 15px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const TitleCell = styled(Td)`
  width: 20%;
  font-weight: bold;
`;

export const DetailsCell = styled(Td)`
  width: 80%;
`;

export const RowDetail = styled.tr`
  background-color: ${(props) => (props.even ? "#f5f5f5" : "#ffffff")};
`;