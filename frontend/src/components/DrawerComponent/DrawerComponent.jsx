import { Drawer, Grid } from 'antd';
import React from 'react';

const { useBreakpoint } = Grid;

const DrawerComponent = ({ 
  title = 'Drawer', 
  placement = 'right', 
  isOpen = false, 
  children, 
  ...rests 
}) => {
  const screens = useBreakpoint();
  
  // Tính toán responsive
  const getDrawerProps = () => {
    if (screens.xs) { // Mobile
      return {
        height: '75%', // Giảm từ 85% xuống 75% để cao hơn
        placement: 'bottom',
        bodyStyle: { 
          padding: '16px 0',
          margin: 0,
        },
        headerStyle: {
          padding: '16px 16px 8px',
        },
        style: { 
          borderRadius: '16px 16px 0 0',
          overflow: 'hidden',
        },
        drawerStyle: {
          width: '100% !important',
          maxWidth: '100vw',
          top: '25%', // Đặt vị trí top 25% thay vì mặc định
          bottom: 0,
        },
        contentWrapperStyle: {
          height: '75%',
          top: '25%',
        }
      };
    } else if (screens.sm) { // iPad
      return {
        width: '80%',
        bodyStyle: { padding: '20px' }
      };
    } else { // PC
      return {
        width: '50%',
        bodyStyle: { padding: '24px' }
      };
    }
  };

  return (
    <Drawer 
      title={title}
      placement={placement}
      open={isOpen}
      closable={true}
      destroyOnClose={true}
      maskClosable={true}
      {...getDrawerProps()}
      {...rests}
    >
      <div style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: screens.xs ? '0 16px 20px' : undefined,
        boxSizing: 'border-box'
      }}>
        {children}
      </div>
    </Drawer>
  );
};

export default DrawerComponent;