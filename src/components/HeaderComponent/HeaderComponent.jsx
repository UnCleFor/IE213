import React, { useState } from "react";
import { Col, Row, Button } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  SearchInputWrapper,
  WrapperSearchMobile, // ✅ Thêm style cho tìm kiếm mobile
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import SearchButton from "../SearchButton/SearchButton";
import beautihome from "./beautihome.png";

const HeaderComponent = () => {
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [showSearch, setShowSearch] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <WrapperHeader
        style={{
          alignItems: "center",
          padding: isMobile ? "10px" : isTablet ? "15px 30px" : "",
        }}
      >
        <Row align="middle" style={{ width: "100%" }} gutter={[16, 16]}>
          {/* Logo */}
          <Col xs={6} sm={4}>
            <img
              src={beautihome}
              alt="BeautiHome Logo"
              style={{
                width: isMobile ? "70px" : isTablet ? "90px" : "100px",
                height: "auto",
              }}
            />
          </Col>

          {/* Thanh tìm kiếm trên PC */}
          {!isMobile && (
            <Col sm={14} md={12} style={{ textAlign: "center" }}>
              <SearchButton size="large" placeholder="What you want to buy?" textButton="Search" />
            </Col>
          )}

          {/* Kính lúp + User + Cart */}
          <Col xs={18} sm={6} md={8} style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
            {isMobile && (
              <Button
                type="text"
                icon={<SearchOutlined style={{ fontSize: "20px", color: "brown" }} />}
                onClick={() => setShowSearch(true)}
              />
            )}
            <WrapperHeaderAccount>
              <UserOutlined style={{ fontSize: "20px" }} />
              {!isMobile && (
                <div>
                  <WrapperTextHeaderSmall>Sign in/ Register</WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
            <WrapperHeaderAccount>
              <ShoppingCartOutlined style={{ fontSize: "20px" }} />
              {!isMobile && <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>}
            </WrapperHeaderAccount>
          </Col>
        </Row>
      </WrapperHeader>

      {/* Thanh tìm kiếm toàn màn hình khi nhấn kính lúp */}
      {isMobile && showSearch && (
        <WrapperSearchMobile>
          <SearchInputWrapper>
            <SearchButton
              size="large"
              placeholder="What you want to buy?"
              textButton="Search"
            />
            <Button
              type="text"
              icon={<CloseOutlined style={{ fontSize: "18px", color: "brown" }} />}
              onClick={() => setShowSearch(false)}
              style={{ padding: 5 }}
            />
          </SearchInputWrapper>
        </WrapperSearchMobile>
      )}
    </div>
  );
};


export default HeaderComponent;
