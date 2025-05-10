import { Col } from "antd";
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
import { Link } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  // Scroll lên đầu trang khi chuyển trang
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ColorFooter>
      <ContainerComponent>
        <FooterContainer gutter={[16, 16]}>
          {/* Cột 1: Giới thiệu BeauteHome */}
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <FooterTitle>BeauteHome</FooterTitle>
              <FooterLink onClick={() => {
                navigate("/aboutus");
                handleScrollToTop();
              }}>
                Về chúng tôi
              </FooterLink>
            </FooterSection>
          </Col>

          {/* Cột 2: Danh mục Khám phá sản phẩm */}
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <FooterTitle>Khám phá</FooterTitle>

              <FooterLink
                to="/product/phong-khach"
                as={Link}
                state={{ label: "Phòng khách", filterBy: "room" }}
                onClick={handleScrollToTop}
              >
                Phòng khách
              </FooterLink>

              <FooterLink
                to="/product/phong-an"
                as={Link}
                state={{ label: "Phòng ăn", filterBy: "room" }}
                onClick={handleScrollToTop}
              >
                Phòng ăn
              </FooterLink>

              <FooterLink
                to="/product/phong-ngu"
                as={Link}
                state={{ label: "Phòng ngủ", filterBy: "room" }}
                onClick={handleScrollToTop}
              >
                Phòng ngủ
              </FooterLink>

              <FooterLink
                to="/product/phong-lam-viec"
                as={Link}
                state={{ label: "Phòng làm việc", filterBy: "room" }}
                onClick={handleScrollToTop}
              >
                Phòng làm việc
              </FooterLink>

              <FooterLink
                to="/product/trang-tri-nha-cua"
                as={Link}
                state={{ label: "Trang trí nhà cửa", filterBy: "room" }}
                onClick={handleScrollToTop}
              >
                Trang trí nhà cửa
              </FooterLink>
            </FooterSection>
          </Col>

          {/* Cột 3: Chính sách liên quan đến dịch vụ */}
          <Col xs={24} sm={12} md={6}>
            <FooterSection>
              <FooterTitle>Chính sách</FooterTitle>

              <FooterLink onClick={() => {
                navigate("/chinhsachdoitra");
                handleScrollToTop();
              }}>
                Chính sách đổi trả
              </FooterLink>

              <FooterLink onClick={() => {
                navigate("/chinhsachbaomat");
                handleScrollToTop();
              }}>
                Chính sách bảo mật
              </FooterLink>

              <FooterLink onClick={() => {
                navigate("/dieukhoandichvu");
                handleScrollToTop();
              }}>
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

          {/* Dòng dưới cùng của Footer chứa bản quyền và mạng xã hội */}
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
