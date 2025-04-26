import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Col, Row, Button, Grid, theme, Popover, message } from "antd";
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
import { resetUser } from '../../redux/slices/userSlide';
import Loading from "../../components/LoadingComponent/Loading";
import { searchProduct } from "../../redux/slices/productSlide";
import { resetOrder } from '../../redux/slices/orderSlide'

const { useBreakpoint } = Grid;
const { useToken } = theme;
const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {

  const { token } = useToken();
  const screens = useBreakpoint();
  //const [showSearch, setShowSearch] = useState(false);
  const [showPopover, setShowPopover] = useState(false); // Khai báo state showPopover
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const order = useSelector((state) => state.order)
  const totalQuantity = order?.orderItems?.reduce((sum, item) => sum + item.amount, 0);
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
  const dispatch = useDispatch()
  const [search, setSearch] = useState()
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign_in')
  }
  const handleNavigateCart = () => {
    navigate('/order')
  }

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await UserService.logoutUser(); // Gọi API logout
      localStorage.removeItem('access_token'); // Xoá token khỏi localStorage
      dispatch(resetUser()); // Reset user trong Redux
      dispatch(resetOrder())
      navigate('/')
      message.success('Đăng xuất thành công')
      setLoading(false);
    } catch (error) {
      console.error('Logout error:', error);
      message.success('Đăng xuất thất bại')
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
  const handleAdmin = async () => {
    try {
      setLoading(true)
      navigate('/system/admin')
      setLoading(false)
    } catch (error) {
      console.error('Truy cập vào trang chủ quản lý faild:', error);
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])
  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/account')}>Thông tin người dùng</WrapperContentPopup>
      <WrapperContentPopup onClick={handleOrderHistory}>Lịch sử mua hàng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={handleAdmin}>Quản lý hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogOut}>Đăng xuất</WrapperContentPopup>
    </div>
  )

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  
  const handleSearchClick = () => {
    if (search.trim() !== "") {
      navigate("/search", { state: { keyword: search } });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {/* <div style= {styles.header}> */}
      <div style={isHiddenSearch && isHiddenCart ? styles.header : { justifyContent: 'space-between' }}>
        <ContainerComponent>
          <Row align="middle" style={{ width: "100%" }} gutter={[16, 16]}>
            {/* Logo */}
            <Col xs={6} sm={4}>
              <img src={beautihome} alt="BeautiHome Logo" style={{ ...styles.logo, cursor: 'pointer' }} onClick={handleHome} />
            </Col>

            {/* Thanh tìm kiếm luôn hiện ở mobile (ẩn ở md trở lên) */}


            {/* Thanh tìm kiếm trên PC */}
            {!screens.xs && !isHiddenSearch && (
              <Col sm={14} md={12} style={{ textAlign: "center" }}>
                <SearchButton
                  size="large"
                  placeholder="What you want to buy?"
                  textButton="Search"
                  onChange={handleInputChange}
                  onClick={handleSearchClick}
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
                  {userAvatar ? (
                    <img src={userAvatar}
                      style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      alt="avatar" />
                  ) : (
                    <UserOutlined style={{ fontSize: "20px", color: "brown" }} />
                  )}
                  {/* Trên PC: Hover để hiển thị Popover */}
                  {!screens.xs ? (
                    user?.name ? (
                      <Popover placement="bottom" content={content} trigger="hover">
                        <div style={{ cursor: 'pointer' }}>{user.name}</div>
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
                <WrapperHeaderAccount onClick={handleNavigateCart} style={{ cursor: 'pointer' }}>
                  <div style={{ position: 'relative' }}>
                    <ShoppingCartOutlined style={{ fontSize: "20px", color: "brown" }} />
                    {totalQuantity > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '-9px',
                        right: '-10px',
                        background: 'brown',
                        color: 'white',
                        borderRadius: '50%',
                        width: '14px',
                        height: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9.5px',
                        fontWeight: 'normal',
                        lineHeight: '1',
                        boxShadow: '0 0 0 1px white',
                      }}>
                        {totalQuantity}
                      </span>
                    )}
                  </div>

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
                onChange={handleInputChange}
                onClick={handleSearchClick}
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
    </div >
  );
};

export default HeaderComponent;
