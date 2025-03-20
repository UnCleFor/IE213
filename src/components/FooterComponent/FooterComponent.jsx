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
        <Col xs={24} sm={24} md={12} style={{ textAlign: "center" }}>
          <WrapperFooterLogo src={beautihome} alt="BeautiHome Logo" />
     
        </Col>

        {/* Cột 2: Điều hướng */}
        <Col xs={12} sm={12} md={12}>
          <WrapperFooterTitle>DANH MỤC</WrapperFooterTitle>
          <WrapperFooterLinks>
            <a href="#">Tìm kiếm</a>
            <a href="#">Về chúng tôi</a>
            <a href="#">Sản phẩm</a>
          </WrapperFooterLinks>
        </Col>

        {/* Cột 3: Chính sách */}
   

        {/* Cột 4: Liên hệ */}
 
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