import React, { useState } from "react";
import { Button, Grid, Menu, Drawer, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ContainerComponent from "../ContainerComponent/ContainerComponent";
import TypeProduct from "../TypeProduct/TypeProduct";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function NavbarComponent() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [currentType, setCurrentType] = useState(null);

  const typeLabels = {
    // Phòng khách
    sofa: "Sofa",
    bantra: "Bàn trà",
  
    // Phòng ăn
    banan: "Bàn ăn",
    ghean: "Ghế ăn",
  
    // Phòng ngủ
    giuong: "Giường",
    tuquanao: "Tủ",
  
    // Phòng làm việc
    ghevanphong: "Ghế văn phòng",
    banlamviec: "Bàn làm việc",
  
    // Trang trí nhà cửa
    thamtraisan: "Thảm trải sàn",
    tranhcanvas: "Tranh canvas",
  };

  const handleClick = (e) => {
    console.log("Bấm vào: ", e.key);
    setCurrent(e.key);

    const mappedType = typeLabels[e.key]; //lấy type của sản phẩm
    if (mappedType) {
      setCurrentType(mappedType);
    } else {
      setCurrentType(null);
    }

    setOpen(false); // Đóng menu khi chọn item trên mobile
  };

  // Xử lý khi click vào parent item
  const handleParentClick = (key) => {
    console.log("Bấm vào parent: ", key);
    setCurrent(key);
    setCurrentType(null);
    setOpen(false);
  };

  const menuItems = [
    {
      label: <span onClick={() => handleParentClick("PhongKhach")}>Phòng khách</span>,
      key: "PhongKhach",
      children: [
        { label: "Sofa", key: "sofa" },
        { label: "Bàn trà", key: "bantra" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("PhongAn")}>Phòng ăn</span>,
      key: "PhongAn",
      children: [
        { label: "Bàn ăn", key: "banan" },
        { label: "Ghế ăn", key: "ghean" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("PhongNgu")}>Phòng ngủ</span>,
      key: "PhongNgu",
      children: [
        { label: "Giường", key: "giuong" },
        { label: "Tủ quần áo", key: "tuquanao" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("PhongLamViec")}>Phòng làm việc</span>,
      key: "PhongLamViec",
      children: [
        { label: "Ghế văn phòng", key: "ghevanphong" },
        { label: "Bàn làm việc", key: "banlamviec" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("TrangTriNhaCua")}>Trang trí nhà cửa</span>,
      key: "TrangTriNhaCua",
      children: [
        { label: "Thảm trải sàn", key: "thamtraisan" },
        { label: "Tranh canvas", key: "tranhcanvas" },
      ],
    },
  ];

  const styles = {
    header: {
      backgroundColor: "brown",
      borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
      padding: "0px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.18)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    menu: {
      backgroundColor: "transparent",
      borderBottom: "none",
      fontFamily: "'Quicksand', sans-serif",
      fontSize: "14px",
      flexGrow: 1,
      overflow: "visible",
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
    <>
    <nav style={styles.header}>
      <ContainerComponent>
        <div style={styles.menuContainer}>
          {screens.md ? (
            <Menu
              rootClassName="custom-navbar"
              style={styles.menu}
              mode="horizontal"
              items={menuItems}
              onClick={handleClick}
              selectedKeys={[current]}
            />
          ) : (
            <>
              <Button
                type="text"
                icon={<MenuOutlined />}
                style={styles.mobileMenuButton}
                onClick={() => setOpen(true)}
              />
              <Drawer
                title="Danh mục"
                placement="right"
                width={screens.xs ? "65vw" : 320}
                onClose={() => setOpen(false)}
                open={open}
              >
                <Menu mode="inline" items={menuItems} onClick={handleClick} selectedKeys={[current]} />
              </Drawer>
            </>
          )}
        </div>
      </ContainerComponent>
    </nav>

    {currentType && (
      <TypeProduct
        type={currentType}
        title={`Sản phẩm: ${typeLabels[currentType] || currentType}`}
        showFilter={true}
      />
    )}
  </>
);
}
