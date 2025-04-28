import React from "react";
import { AboutContainer, AboutContent, AboutTitle } from "./style";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import { BreadcrumbWrapper } from "../../components/BreadcrumbComponent/style";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
const AboutUs = () => {
  return (
    <ContainerComponent>
      <BreadcrumbWrapper>
        {/* Breadcrumb Component */}
        <BreadcrumbComponent
          breadcrumbs={[
            { name: 'Trang chủ', link: '/' },
            { name: 'Về Chúng Tôi', isCurrent: true }
          ]}
        />
      </BreadcrumbWrapper>
    <AboutContainer>
      <AboutTitle>Về Chúng Tôi</AboutTitle>
      <AboutContent>
        <p>
          Chào mừng bạn đến với <strong>BeauteHome</strong> - nơi mang đến những thiết kế nội thất tinh tế và bền vững.
          Chúng tôi cam kết cung cấp các sản phẩm chất lượng cao, thân thiện với môi trường, mang lại sự thoải mái và phong cách cho ngôi nhà của bạn.
        </p>
        <h2>Sứ Mệnh Của Chúng Tôi</h2>
        <p>
          Chúng tôi tin rằng nội thất không chỉ đơn thuần là đồ dùng mà còn là nghệ thuật, giúp tạo nên không gian sống đầy cảm hứng. BeauteHome cam kết:
        </p>
        <ul>
          <li>Thiết kế hiện đại, sang trọng.</li>
          <li>Vật liệu bền vững, thân thiện với môi trường.</li>
          <li>Dịch vụ chăm sóc khách hàng tận tâm.</li>
        </ul>
        <h2>Liên Hệ</h2>
        <p>
          Hãy ghé thăm showroom của chúng tôi tại: <br />
          <strong>Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.HCM.</strong>
        </p>
      </AboutContent>
    </AboutContainer>
    </ContainerComponent>
  );
};

export default AboutUs;
