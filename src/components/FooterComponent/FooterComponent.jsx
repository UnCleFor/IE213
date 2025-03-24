import React from "react";
import { FooterContainer, FooterSection, FooterTitle, FooterLink, FooterBottom, SubscribeSection, SocialIcons, ContactInfo } from "./style";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Footer = () => {
  const navigate = useNavigate(); // Hook điều hướng
  return (
    <FooterContainer>
      <FooterSection>
        <FooterTitle>BeauteHome</FooterTitle>
        <FooterLink onClick={() => navigate("/aboutus")}>Về chúng tôi</FooterLink> 
      </FooterSection>

      <FooterSection>
        <FooterTitle>Khám phá</FooterTitle>
        <FooterLink href="#">Phòng khách</FooterLink>
        <FooterLink href="#">Phòng ăn</FooterLink>
        <FooterLink href="#">Phòng ngủ</FooterLink>
        <FooterLink href="#">Phòng làm việc</FooterLink>
      </FooterSection>

      

      <FooterSection>
        <FooterTitle>Chính sách</FooterTitle>
        <FooterLink onClick={() => navigate("/chinhsachdoitra")}>Chính sách đổi trả</FooterLink>
        <FooterLink href="#">Chính sách bảo mật</FooterLink>
        <FooterLink href="#">Điều khoản dịch vụ</FooterLink>
      </FooterSection>

      <SubscribeSection>
        <FooterTitle>Thông tin liên hệ</FooterTitle>
        <ContactInfo>
          <p>
            <i className="fas fa-map-marker-alt"></i> Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.HCM.
          </p>
          <p>
            <i className="fas fa-phone"></i> 0123 456 789
          </p>
          <p>
            <i className="fas fa-envelope"></i> ilovebeautehome@gmail.com
          </p>
          <p>
            <i className="fas fa-clock"></i> 08:30 S - 20:30 T Cả tuần
          </p>
        </ContactInfo>
      </SubscribeSection>

      <FooterBottom>
        <p>© 2025 BeauteHome. All rights reserved.</p>
        
        <SocialIcons>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-pinterest"></i></a>
        </SocialIcons>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
