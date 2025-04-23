import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  UserOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import { getItem } from '../../utils';

const { Sider, Content } = Layout;

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [keySelected, setKeySelected] = useState('user');

  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return <AdminUser />;
      case 'product':
        return <AdminProduct />;
      default:
        return null;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />

      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsed={collapsed}
          trigger={null} // Ẩn trigger mặc định
          collapsible
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            background: '#fff',
            boxShadow: '0px 0 5px rgba(0,0,0,0.1)',
            zIndex: 1000,
            position: 'relative',
          }}
        >
          {/* Nút toggle custom nằm ở trên */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined style={{color:'white'}} /> : <MenuFoldOutlined style={{color:'white'}} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              position: 'absolute',
              top: 1,
              left: 1,
              zIndex: 1001,
              fontSize: 18,
              backgroundColor:'brown',
            }}
          />
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginTop: 40, // Đẩy logo xuống để nhường chỗ cho nút toggle
            }}
          >
            {collapsed ? 'A' : 'Admin'}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[keySelected]}
            onClick={handleOnClick}
            items={items}
            style={{ borderRight: 0 }}
          />
        </Sider>

        <Layout>
          <Content
            style={{
              
              padding: '24px',
              background: '#fff',
              
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {renderPage(keySelected)}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminPage;
