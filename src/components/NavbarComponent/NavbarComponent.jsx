import React, { useState } from "react";
import { Button, Grid, Menu, Drawer, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function NavbarComponent() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      label: "Phòng khách",
      key: "PhongKhach",
      children: [
        { label: "Sofa", key: "sofa" },
        { label: "Bàn trà", key: "bantra" },
      ],
    },
    {
      label: "Phòng ăn",
      key: "PhongAn",
      children: [
        { label: "Bàn ăn", key: "banan" },
        { label: "Ghế ăn", key: "ghean" },
      ],
    },
    {
      label: "Phòng ngủ",
      key: "PhongNgu",
      children: [
        { label: "Giường", key: "giuong" },
        { label: "Tủ quần áo", key: "tuquanao" },
      ],
    },
    {
      label: "Phòng làm việc",
      key: "PhongLamViec",
      children: [
        { label: "Ghế văn phòng", key: "ghevanphong" },
        { label: "Bàn làm việc", key: "banlamviec" },
      ],
    },
    {
      label: "Trang trí nhà cửa",
      key: "TrangTriNhaCua",
      children: [
        { label: "Thảm trải sàn", key: "thamtraisan" },
        { label: "Tranh canvas", key: "tranhcanvas" },
      ],
    },
  ];

  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    console.log('Bấm vào ', e);
    setCurrent(e.key);
    setOpen(false); // Đóng menu khi chọn item trên mobile
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "0 auto",
      maxWidth: token.screenXL,
      padding: screens.md ? `0 ${token.paddingLG}px` : `0 ${token.padding}px`,
    },
    header: {
      backgroundColor: "brown",
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      padding: "0px 0px 0px 0px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.18)", // Thêm box-shadow
      position: "sticky", // Giữ navbar cố định khi cuộn
      top: 0,
      zIndex: 1000, // Giữ navbar nổi trên cùng
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      fontFamily: "'Quicksand', sans-serif",
      fontSize: "14px",
      flexGrow: 1, // Giúp menu không bị thu nhỏ thành "..."
      overflow: "visible", // Tránh bị ẩn item
      whiteSpace: "nowrap",
    },
    menuContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    mobileMenuButton: {
      display: screens.md ? "none" : "block",
      marginLeft: "auto",
      color: "white",
      fontSize: "20px",
    },
  };

  return (
    <nav style={styles.header}>
      <div style={styles.container}>
        <div style={styles.menuContainer}>
          {/* Hiển thị menu ngang nếu là PC */}
          {screens.md ? (
            <Menu
              rootClassName="custom-navbar"
              style={styles.menu}
              mode="horizontal"
              items={menuItems}
              onClick={onClick}
              selectedKeys={[current]}
            />
          ) : (
            <>
              {/* Nút mở menu ở mobile */}
              <Button
                type="text"
                icon={<MenuOutlined />}
                style={styles.mobileMenuButton}
                onClick={() => setOpen(true)}
              />
              {/* Drawer menu ở mobile */}
              <Drawer
                title="Danh mục"
                placement="right"
                width={screens.xs ? "65vw" : 320} // 🔥 Thu nhỏ trên điện thoại (65% viewport width)
                onClose={() => setOpen(false)}
                open={open}
              >
                <Menu
                  mode="inline" // Menu dọc trên mobile
                  items={menuItems}
                  onClick={onClick}
                  selectedKeys={[current]}
                />
              </Drawer>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
