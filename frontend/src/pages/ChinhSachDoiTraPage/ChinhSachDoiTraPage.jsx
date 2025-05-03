import React from "react";
import { PolicyContainer, Title, SectionTitle, Content } from "./style";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import { BreadcrumbWrapper } from "../../components/BreadcrumbComponent/style";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";

const ReturnPolicyPage = () => {
  return (
    <ContainerComponent>
    <BreadcrumbWrapper>
      {/* Breadcrumb Component */}
      <BreadcrumbComponent
        breadcrumbs={[
          { name: 'Trang chủ', link: '/' },
          { name: 'Chính sách đổi trả', isCurrent: true }
        ]}
      />
    </BreadcrumbWrapper>  
      <PolicyContainer>
        <Title>Chính sách đổi trả</Title>
        <SectionTitle>1. Điều kiện đổi trả</SectionTitle>
        <Content>
          <p>* Khách hàng có thể đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng.</p>
          <p>* Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng và có đầy đủ hóa đơn mua hàng.</p>
          <p>* Không áp dụng đổi trả cho các sản phẩm giảm giá, khuyến mãi hoặc đặt hàng theo yêu cầu riêng.</p>
          <p>* Phí đổi hàng: 10% giá trị sản phẩm.</p>
          <p>* Phí trả hàng: 20% giá trị sản phẩm (áp dụng cho khách hàng tại TP. Hồ Chí Minh).</p>
        </Content>

        <SectionTitle>2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</SectionTitle>
        <Content>
          <p><strong>Thời gian thông báo đổi trả:</strong> Trong vòng 48h kể từ khi nhận hàng.</p>
          <p><strong>Địa điểm đổi trả:</strong> Khách hàng có thể gửi qua bưu điện hoặc mang trực tiếp đến cửa hàng của chúng tôi.</p>
          <p>Nếu có thắc mắc, vui lòng liên hệ với bộ phận chăm sóc khách hàng để được hỗ trợ.</p>
        </Content>
      </PolicyContainer>
    </ContainerComponent>
  );
};

export default ReturnPolicyPage;
