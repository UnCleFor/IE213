import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Grid,
  theme,
  Popover,
  message
} from "antd";
import {
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./style";
import {
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import SearchButton from "../SearchButton/SearchButton";
import beautihome from "./beautihome.png";
import ContainerComponent from "../ContainerComponent/ContainerComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slices/userSlide';
import Loading from "../../components/LoadingComponent/Loading";
import { resetOrder } from '../../redux/slices/orderSlide'
const { useBreakpoint } = Grid;
const { useToken } = theme;

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const { token } = useToken(); // Lấy token
  const screens = useBreakpoint(); // Xác định kích thước màn hình
  const [showPopover, setShowPopover] = useState(false); // Khai báo state showPopover
  const [userName, setUserName] = useState('') // Quản lý biến Tên Người dùng
  const [userAvatar, setUserAvatar] = useState('') // Quản lý biến Ảnh đại diện
  const order = useSelector((state) => state.order) // Lấy thông tin Đơn hàng
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
  const user = useSelector((state) => state.user) // Lấy thông tin Người dùng
  const dispatch = useDispatch() // Truy vấn hàm dispatch từ redux
  const [search, setSearch] = useState() // Quản lý biến tìm kiếm
  const [loading, setLoading] = useState(false) // Quản lý biến loading môi trường
  const handleNavigateLogin = () => {
    navigate('/sign_in')
  }
  const handleNavigateCart = () => {
    navigate('/order')
  }
  // Hàm xử lý đăng xuất
  const handleLogOut = async () => {
    try {
      setLoading(true);
      await UserService.updateLogoutStatus(user?.id, user?.access_token)
      await UserService.logoutUser(); // Gọi API logout
      localStorage.removeItem('access_token'); // Xoá token khỏi localStorage
      dispatch(resetUser()); // Reset Thông tin Người dùng trong Redux
      dispatch(resetOrder()) // Reset Thông tin Đơn hàng trong Redux
      navigate('/')
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  // Điều hướng đến trang Đơn hàng
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
  // Điều hướng về Trang chủ
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
  // Điều hướng đến trang Admin
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
  // Theo dõi thái cập nhật Tên và Ảnh đại diện
  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])
  // Drop down điều hướng đến các trang quản lý
  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/account')}>Thông tin người dùng</WrapperContentPopup>
      <WrapperContentPopup onClick={handleOrderHistory}>Lịch sử mua hàng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={handleAdmin}>Quản lý hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => { handleLogOut(); message.success('Đăng xuất thành công') }}>Đăng xuất</WrapperContentPopup>
    </div>
  )
  // Hàm quản lý giá trị search
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  // Điều hướng đến Trang tìm kiếm
  const handleSearchClick = () => {
    if (search.trim() !== "") {
      navigate("/search", { state: { keyword: search } });
      setSearch('');
    }
  };
  // Theo dõi Trạng thái Đăng nhập
  useEffect(() => {
    // Nếu chưa có user hoặc access_token thì không làm gì
    if (!user?.id || !user?.access_token) return;

    const interval = setInterval(async () => {
      try {
        const res = await UserService.getDetailUser(user.id, user.access_token);

        if (res?.data?.isBlocked) {
          message.warning('Tài khoản của bạn đã bị chặn. Đăng xuất...');
          handleLogOut();
        }
        if (!res?.data?.isLoggedIn) {
          message.warning('Tài khoản của bạn đã bị buộc đăng xuất. Đăng xuất...');
          handleLogOut();
        }
      } catch (error) {
        console.error('Lỗi kiểm tra trạng thái chặn:', error);
      }
    }, 10000); // kiểm tra mỗi 10s

    return () => clearInterval(interval); // clear interval khi component unmount
  }, [user?.id, user?.access_token]); // chỉ chạy khi user đã có dữ liệu

  return (
    <div style={{ position: "relative" }}>
      <div style={isHiddenSearch && isHiddenCart ? styles.header : { justifyContent: 'space-between' }}>
        <ContainerComponent>
          <Row align="middle" style={{ width: "100%" }} gutter={[16, 16]}>
            {/* Logo */}
            <Col xs={6} sm={4}>
              <img src={beautihome} alt="BeautiHome Logo" style={{ ...styles.logo, cursor: 'pointer' }} onClick={handleHome} />
            </Col>

            {!screens.xs && !isHiddenSearch && (
              <Col sm={14} md={12} style={{ textAlign: "center" }}>
                <SearchButton
                  size="large"
                  placeholder="What you want to buy?"
                  textButton="Search"
                  value={search}
                  onChange={handleInputChange}
                  onClick={handleSearchClick}
                />
              </Col>
            )}
            <Col xs={18} sm={6} md={8} style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
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
                value={search}
                style={{ width: "100%" }} // Đảm bảo SearchButton chiếm 100% chiều rộng
                onChange={handleInputChange} 
                onClick={handleSearchClick}
              />
            </Col>
          )}
        </Row>
      </div>
    </div >
  );
};

export default HeaderComponent;