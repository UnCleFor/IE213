import styled from "styled-components";

export const OrderDetailWrapper = styled.div`
  width: 100%;

  .product-list-header {
    display: none;
  }

  @media (min-width: 768px) {
    .product-list-header {
      display: flex;
    }
  }
`;
