//Chưa responsive
import React from 'react'
import { Col } from 'antd';
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import SearchButton from '../SearchButton/SearchButton';
import beautihome from './beautihome.png'

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader style={{ alignItems:'center'}}>
        <Col span={4}>
        {/* Logo */}
          {/* <WrapperTextHeader>BeautiHome</WrapperTextHeader> */}
          <img
          src={beautihome} // ✅ Thay đường dẫn ảnh tại đây
          alt="BeautiHome Logo"
          style={{ width: "100px", height: "auto" }} // ✅ Điều chỉnh kích thước logo
        />
        </Col>
        <Col span={14}>
          {/* Thanh tìm kiếm */}
          {/* <Search placeholder="input search text" allowClear enterButton  /> */}
          <SearchButton size="large" placeholder="What you want to buy?" textButton="Search"/>
        </Col>
        <Col span={6}style={{ display: 'flex', gap:'20px', alignItems:'center',paddingLeft:'20px'}}>
          {/* Phần đăng nhập và tài khoản */}
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: '20px' }} />
            <div>
              <WrapperTextHeaderSmall>Sign in/ Register</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          {/* Phần giỏ hàng */}
          
            <WrapperHeaderAccount>
            <ShoppingCartOutlined style={{ fontSize: '20px'}}/>
            <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
            </WrapperHeaderAccount>
          
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent