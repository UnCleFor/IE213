import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Col, Row, Button, Grid, theme, Popover } from "antd";
import {
  // WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  SearchInputWrapper,
  WrapperSearchMobile,
  WrapperContentPopup,
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
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slices/userSlide'
import Loading from "../../components/LoadingComponent/Loading";
const { useBreakpoint } = Grid;
const { useToken } = theme;

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const { token } = useToken();
  const screens = useBreakpoint();
  //const [showSearch, setShowSearch] = useState(false);
  const [showPopover, setShowPopover] = useState(false); // Khai báo state showPopover
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
  const user = useSelector((state) => state.user)
  const dispath = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign_in')
  }

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await UserService.logoutUser(); // Gọi API logout
      localStorage.removeItem('access_token'); // Xoá token khỏi localStorage
      dispath(resetUser()); // Reset user trong Redux
      navigate('/')
      setLoading(false);
    } catch (error) {
      console.error('Logout error:', error);
      setLoading(false);
    }
  };
  const handleOrderHistory = async () => {
    try {
      setLoading(true)
      navigate('/order_history')
      setLoading(false)
    } catch (error) {
      console.error('Truy cập vào ls mua hàng fail:', error);
      setLoading(false);
    }
  }
  const handleHome = async () => {
    try {
      setLoading(true)
      navigate('/')
      setLoading(false)
    } catch (error) {
      console.error('Truy cập vào trang chủ fail:', error);
      setLoading(false);
    }
  }
  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/account')}>Thông tin người dùng</WrapperContentPopup>
      <WrapperContentPopup onClick={handleOrderHistory}>Lịch sử mua hàng</WrapperContentPopup>
      <WrapperContentPopup onClick={handleLogOut}>Đăng xuất</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup>Quản lý hệ thống</WrapperContentPopup>
      )}


    </div>
  )
  return (
    <div style={{ position: "relative" }}>
      {/* <div style= {styles.header}> */}
      <div style={isHiddenSearch && isHiddenCart ? styles.header : { justifyContent: 'space-between' }}>
        <ContainerComponent>
          <Row align="middle" style={{ width: "100%" }} gutter={[16, 16]}>
            {/* Logo */}
            <Col xs={6} sm={4}>
              <img src={beautihome} alt="BeautiHome Logo" style={styles.logo} onClick={handleHome} />
            </Col>

            {/* Thanh tìm kiếm luôn hiện ở mobile (ẩn ở md trở lên) */}


            {/* Thanh tìm kiếm trên PC */}
            {!screens.xs && !isHiddenSearch && (
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
              {/* {screens.xs && (
                <Button
                  type="text"
                  icon={<SearchOutlined style={{ fontSize: "20px", color: "brown" }} />}
                  onClick={() => setShowSearch(true)}
                />
              )} */}
              <Loading isLoading={loading}>
              <WrapperHeaderAccount>
  <UserOutlined style={{ fontSize: "20px", color: "brown" }} />

  {/* Trên PC: Hover để hiển thị Popover */}
  {!screens.xs ? (
    user?.name ? (
      <Popover placement="bottom" content={content} trigger="hover">
        <div>{user.name}</div>
      </Popover>
    ) : (
      <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
        <WrapperTextHeaderSmall>Đăng nhập</WrapperTextHeaderSmall>
      </div>
    )
  ) : (
    // Trên Mobile: Click để hiển thị Popover
    user?.name ? (
      <Popover
        placement="bottom"
        content={content}
        trigger="click"
        visible={showPopover}
        onVisibleChange={(visible) => setShowPopover(visible)}
      >
        <div>{user.name}</div>
      </Popover>
    ) : (
      <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
        <WrapperTextHeaderSmall>Đăng nhập</WrapperTextHeaderSmall>
      </div>
    )
  )}
</WrapperHeaderAccount>

              </Loading>
              {!isHiddenCart && (
                <WrapperHeaderAccount>
                  <ShoppingCartOutlined style={{ fontSize: "20px", color: "brown" }} />
                  {!screens.xs && <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>}
                </WrapperHeaderAccount>
              )}

            </Col>
          </Row>

        </ContainerComponent>

        <Row>
          {screens.xs && !isHiddenSearch && (
            <Col xs={24} style={{ padding: 10 }}>
              <SearchButton
                size="large"
                placeholder="What you want to buy?"
                textButton="Search"
                style={{ width: "100%" }} // Đảm bảo SearchButton chiếm 100% chiều rộng
              />
            </Col>
          )}
        </Row>
      </div>

      {/* Thanh tìm kiếm toàn màn hình khi nhấn kính lúp */}
      {/* {screens.xs && showSearch && (
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
      )} */}
    </div>
  );
};

export default HeaderComponent;
