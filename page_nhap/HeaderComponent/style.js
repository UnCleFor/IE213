import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: rgb(255, 255, 255); // Thay đổi màu theo nhu cầu
  justifyContent: "center";
`;

export const WrapperTextHeader = styled.span`
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  text-align: left;
`;

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: brown;
    gap: 10px;
`
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: brown;
`;
