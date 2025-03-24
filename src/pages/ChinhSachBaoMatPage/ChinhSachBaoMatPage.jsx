import React from "react";
import { PrivacyContainer, PrivacyTitle, PrivacyContent } from "./style";

const ChinhSachBaoMat = () => {
  return (
    <PrivacyContainer>
      <PrivacyTitle>Chính sách bảo mật</PrivacyTitle>
      <PrivacyContent>
        <p>
          Chính sách bảo mật này giúp khách hàng hiểu về cách chúng tôi thu thập, lưu trữ và sử dụng thông tin cá nhân khi bạn truy cập website, đăng ký tài khoản hoặc sử dụng dịch vụ của chúng tôi.
        </p>
        <p>
          Chúng tôi chỉ sử dụng thông tin cá nhân của bạn để hỗ trợ quá trình mua hàng, chăm sóc khách hàng và nâng cao trải nghiệm dịch vụ.
        </p>
        <p>
          Website cam kết bảo vệ dữ liệu cá nhân của khách hàng bằng các biện pháp bảo mật tốt nhất, đảm bảo an toàn thông tin giao dịch và thanh toán.
        </p>
        <p>
          Chúng tôi không chia sẻ thông tin của bạn với bên thứ ba, trừ trường hợp có yêu cầu từ cơ quan pháp luật hoặc theo thỏa thuận của bạn.
        </p>
      </PrivacyContent>
    </PrivacyContainer>
  );
};

export default ChinhSachBaoMat;
