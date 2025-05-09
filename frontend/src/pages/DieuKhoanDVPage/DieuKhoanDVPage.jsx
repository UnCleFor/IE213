import React from "react";
import { PolicyContainer, Title, SectionTitle, Content } from "./style";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import { BreadcrumbWrapper } from "../../components/BreadcrumbComponent/style";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
const ChinhSachBanHang = () => {
  return (
    <ContainerComponent>
      {/* Tạo Breadcrumb ở đầu trang */}
      <BreadcrumbWrapper>
        <BreadcrumbComponent
          breadcrumbs={[
            { name: 'Trang chủ', link: '/' },
            { name: 'Điều khoản dịch vụ', isCurrent: true }
          ]}
        />
      </BreadcrumbWrapper>

      {/* Các thông tin Về Chúng tôi */}
      <PolicyContainer>
        <Title>Chính sách bán hàng</Title>
        <SectionTitle>PHẠM VI ÁP DỤNG</SectionTitle>
        <Content>
          <p>- Chính sách này áp dụng cho tất cả khách hàng mua sắm tại website của chúng tôi.</p>
          <p>- Áp dụng cho tất cả sản phẩm được cung cấp trên hệ thống.</p>
        </Content>

        <SectionTitle>HƯỚNG DẪN MUA HÀNG</SectionTitle>
        <Content>
          <p>- Khách hàng có thể đặt hàng trực tiếp trên website một cách dễ dàng.</p>
          <p>- Hỗ trợ tư vấn qua hotline/zalo/tin nhắn fanpage để giúp khách hàng chọn sản phẩm phù hợp.</p>
        </Content>

        <SectionTitle>HÌNH THỨC THANH TOÁN</SectionTitle>
        <Content>
          <p>- Thanh toán bằng thẻ ngân hàng nội địa hoặc quốc tế.</p>
          <p>- Thanh toán khi nhận hàng (COD) áp dụng tại một số khu vực.</p>
          <p>- Hỗ trợ thanh toán qua ví điện tử và cổng thanh toán trực tuyến.</p>
        </Content>
      </PolicyContainer>
    </ContainerComponent>
  );
};

export default ChinhSachBanHang;