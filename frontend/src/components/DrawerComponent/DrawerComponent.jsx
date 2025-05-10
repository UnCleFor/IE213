import { Drawer, Grid } from 'antd';

const { useBreakpoint } = Grid;

const DrawerComponent = ({
  title = 'Drawer', // Tiêu đề mặc định của Drawer
  placement = 'right',  // Vị trí hiển thị mặc định
  isOpen = false,  // Trạng thái mở/đóng
  children,  // Nội dung bên trong Drawer
  ...rests  // Các props bổ sung
}) => {
  const screens = useBreakpoint(); // Lấy thông tin kích thước màn hình để xử lý responsive

  // Xác định các thuộc tính Drawer dựa trên độ rộng màn hình
  const getDrawerProps = () => {
    if (screens.xs) {
      // Đối với thiết bị di động
      return {
        height: '75%',
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
          top: '25%',
          bottom: 0,
        },
        contentWrapperStyle: {
          height: '75%',
          top: '25%',
        }
      };
    } else if (screens.sm) {
      // Đối với tablet (iPad, màn hình nhỏ hơn PC)
      return {
        width: '80%',
        bodyStyle: { padding: '20px' }
      };
    } else {
      // Đối với PC, laptop
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
      {...getDrawerProps()} // Gán props tương ứng với từng loại màn hình
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