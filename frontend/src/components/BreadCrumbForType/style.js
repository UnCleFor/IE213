import styled from "styled-components";

export const BreadcrumbWrapper = styled.div`
  padding: 0 10px;
  margin-top: 12px;

  .ant-breadcrumb-link {
    color:rgb(174, 34, 27); // Màu sắc cho các liên kết bình thường
  }

  .ant-breadcrumb-item span {
    font-weight: bold;
    color: rgb(174, 34, 27); // Màu sắc cho trang hiện tại (nếu muốn điều chỉnh thêm)
  }
`;
