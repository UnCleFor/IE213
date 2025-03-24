import React from "react";
import { Row, Col } from "antd";
import {
  ColorFooter,
  FooterContainer,
  FooterSection,
  FooterTitle,
  FooterLink,
  FooterBottom,
  SubscribeSection,
  SocialIcons,
  ContactInfo
} from "./style";
import { useNavigate } from "react-router-dom";
import ContainerComponent from "../ContainerComponent/ContainerComponent";
import beautihome from "./beautihome.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <ColorFooter>
    <ContainerComponent>
      <FooterContainer gutter={[16, 16]}>

        
          {/* Cột 1: BeauteHome & Về chúng tôi */}
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <FooterTitle>BeauteHome</FooterTitle>
              
              <FooterLink onClick={() => navigate("/aboutus")}>
                Về chúng tôi
              </FooterLink>
            </FooterSection>
          </Col>

          {/* Cột 2: Khám phá */}
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <FooterTitle>Khám phá</FooterTitle>
              <FooterLink href="#">Phòng khách</FooterLink>
              <FooterLink href="#">Phòng ăn</FooterLink>
              <FooterLink href="#">Phòng ngủ</FooterLink>
              <FooterLink href="#">Phòng làm việc</FooterLink>
              <FooterLink href="#">Trang trí nhà cửa</FooterLink>
            </FooterSection>
          </Col>

          {/* Cột 3: Chính sách */}
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <FooterTitle>Chính sách</FooterTitle>
              <FooterLink onClick={() => navigate("/chinhsachdoitra")}>
                Chính sách đổi trả
              </FooterLink>
              <FooterLink onClick={() => navigate("/chinhsachbaomat")}>
                Chính sách bảo mật
              </FooterLink>
              <FooterLink onClick={() => navigate("/dieukhoandichvu")}>
                Điều khoản dịch vụ
              </FooterLink>
            </FooterSection>
          </Col>

          {/* Cột 4: Thông tin liên hệ */}
          <Col xs={24} sm={12} md={6}>
            <SubscribeSection>
              <FooterTitle>Thông tin liên hệ</FooterTitle>
              <ContactInfo>
                <p>
                  <i className="fas fa-map-marker-alt"></i> Khu phố 6, P.Linh
                  Trung, Tp.Thủ Đức, Tp.HCM.
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
            
          </Col>
          
      

        {/* Footer Bottom */}
        <FooterBottom>
          <p>© 2025 BeauteHome. All rights reserved.</p>

          <SocialIcons>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </SocialIcons>
        </FooterBottom>

      </FooterContainer>
    </ContainerComponent>
    </ColorFooter>
  );
};

export default Footer;
