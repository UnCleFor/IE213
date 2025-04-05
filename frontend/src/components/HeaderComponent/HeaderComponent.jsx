import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Col, Row, Button, Grid, theme } from "antd";
import {
  // WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  SearchInputWrapper,
  WrapperSearchMobile,
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

import ContainerComponent from "../ContainerComponent/ContainerComponent";

const { useBreakpoint } = Grid;
const { useToken } = theme;

const HeaderComponent = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [showSearch, setShowSearch] = useState(false);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`,
    },
    header: {
      backgroundColor: "white",
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      padding: "10px 20px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Thêm box-shadow
    },
    logo: {
      width: screens.xs ? "70px" : screens.md ? "90px" : "100px",
      height: "auto",
    },
    mobileMenuButton: {
      display: screens.md ? "none" : "block",
      marginLeft: "auto",
      color: "white",
      fontSize: "20px",
    },
  };

  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/sign_in')
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={styles.header}>
        <ContainerComponent>
          <Row align="middle" style={{ width: "100%" }} gutter={[16, 16]}>
            {/* Logo */}
            <Col xs={6} sm={4}>
              <img src={beautihome} alt="BeautiHome Logo" style={styles.logo} />
            </Col>

            {/* Thanh tìm kiếm trên PC */}
            {!screens.xs && (
              <Col sm={14} md={12} style={{ textAlign: "center" }}>
                <SearchButton
                  size="large"
                  placeholder="What you want to buy?"
                  textButton="Search"
                />
              </Col>
            )}

            {/* Icon Tìm kiếm, User, Giỏ hàng */}
            <Col xs={18} sm={6} md={8} style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
              {screens.xs && (
                <Button
                  type="text"
                  icon={<SearchOutlined style={{ fontSize: "20px", color: "brown" }} />}
                  onClick={() => setShowSearch(true)}
                />
              )}
              <WrapperHeaderAccount>
                <UserOutlined style={{ fontSize: "20px", color: "brown" }} />
                {!screens.xs && (
                  <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
                    <WrapperTextHeaderSmall>Sign in/ Register</WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </WrapperHeaderAccount>
              <WrapperHeaderAccount>
                <ShoppingCartOutlined style={{ fontSize: "20px", color: "brown" }} />
                {!screens.xs && <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>}
              </WrapperHeaderAccount>
            </Col>
          </Row>
        </ContainerComponent>
      </div>

      {/* Thanh tìm kiếm toàn màn hình khi nhấn kính lúp */}
      {screens.xs && showSearch && (
        <WrapperSearchMobile>
          <SearchInputWrapper>
            <SearchButton size="large" placeholder="What you want to buy?" textButton="Search" />
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
