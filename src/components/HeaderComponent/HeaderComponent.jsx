import React from 'react'
import { Col } from 'antd';
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style';
import { Input } from 'antd';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';


const { Search } = Input; const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
        {/* Logo */}
          <WrapperTextHeader>BeautiHome</WrapperTextHeader>
        </Col>
        <Col span={12}>
          {/* Thanh tìm kiếm */}
          <Search placeholder="input search text" allowClear enterButton />
        </Col>
        <Col span={6}style={{ display: 'flex', gap:'20px'}}>
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
