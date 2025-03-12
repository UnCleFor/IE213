import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  padding: 30px 120px;
  background-color: rgb(184, 184, 184); // Thay đổi màu theo nhu cầu
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
