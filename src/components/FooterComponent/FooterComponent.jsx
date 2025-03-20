import React from "react";
import { Row, Col } from "antd";
import {
  WrapperFooter,
  WrapperFooterTitle,
  WrapperFooterLinks,
  WrapperFooterText,
  WrapperFooterIcons,
  WrapperFooterLogo
} from "./style";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble, BsLinkedin } from "react-icons/bs";
import beautihome from "./beautihome.png"; 
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";
const FooterComponent = () => {
  return (
    <WrapperFooter>
      <Row justify="center" gutter={[16, 16]}>
        {/* Cột 1: Logo thay thế "Về chúng tôi" */}
        <Col xs={24} sm={12} md={6} style={{ textAlign: "center" }}>
          <WrapperFooterLogo src={beautihome} alt="BeautiHome Logo" />
     
        </Col>

        {/* Cột 2: Điều hướng */}
        <Col xs={12} sm={6} md={4}>
          <WrapperFooterTitle>DANH MỤC</WrapperFooterTitle>
          <WrapperFooterLinks>
            <a href="#">Tìm kiếm</a>
            <a href="#">Về chúng tôi</a>
            <a href="#">Sản phẩm</a>
          </WrapperFooterLinks>
        </Col>

        {/* Cột 3: Chính sách */}
        <Col xs={12} sm={6} md={4}>
          <WrapperFooterTitle>CHÍNH SÁCH</WrapperFooterTitle>
          <WrapperFooterLinks>
            <a href="#">Chính sách đổi trả</a>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản dịch vụ</a>
          </WrapperFooterLinks>
        </Col>

        {/* Cột 4: Liên hệ */}
        <Col xs={12} sm={6} md={4}>
          <WrapperFooterTitle>LIÊN HỆ</WrapperFooterTitle>
          <WrapperFooterText><HomeOutlined /> 123 Đường ABC, TP.HCM</WrapperFooterText>
          <WrapperFooterText><PhoneOutlined /> 0123 456 789</WrapperFooterText>
          <WrapperFooterText><MailOutlined /> beautehome@gmail.com</WrapperFooterText>
        </Col>
      </Row>

      {/* Mạng xã hội */}
      <WrapperFooterIcons>
        <a href="#"><BsFacebook /></a>
        <a href="#"><BsInstagram /></a>
        <a href="#"><BsTwitter /></a>
        <a href="#"><BsGithub /></a>
        <a href="#"><BsDribbble /></a>
        <a href="#"><BsLinkedin /></a>
      </WrapperFooterIcons>

      {/* Copyright */}
      <WrapperFooterText>© 2025 Công ty TNHH BeauteHome. All Rights Reserved.</WrapperFooterText>
    </WrapperFooter>
  );
};

export default FooterComponent;