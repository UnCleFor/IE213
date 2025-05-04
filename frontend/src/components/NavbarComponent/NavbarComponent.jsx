import React, { useEffect, useState } from "react";
import { Button, Grid, Menu, Drawer, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import ContainerComponent from "../ContainerComponent/ContainerComponent";
import { getAllTypeProduct } from "../../services/ProductService";
import { useNavigate } from 'react-router-dom'

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function NavbarComponent() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [currentType, setCurrentType] = useState(null);
  const navigate = useNavigate()
  
  const handleClick = (e) => {
    setOpen(false);
  };

  const handleParentClick = (key, label) => {
    navigate(`/product/${key}`, {state: {label, filterBy: 'room' }});
    setOpen(false);
  };

  const handleShopTheLookClick = () => {
    navigate('/shop-the-look');
    setOpen(false);
  };

  // Tạo style cho label
  const getLabelStyle = () => ({
    color: 'white',
    ':hover': {
      color: 'white',
    },
  });

  const productTypesByRoom = [
    {
      label: <span onClick={() => handleParentClick("phong-khach", "Phòng khách")}>Phòng khách</span>,
      key: "PhongKhach",
      children: [
        { label: "Sofa", key: "sofa" },
        { label: "Bàn trà", key: "ban-tra" },
        { label: "Kệ tivi", key: "ke-tivi" },
        { label: "Ghế đơn", key: "ghe-don" },
        { label: "Tủ trang trí", key: "tu-trang-tri" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("phong-an", "Phòng ăn")}>Phòng ăn</span>,
      key: "PhongAn",
      children: [
        { label: "Bàn ăn", key: "ban-an" },
        { label: "Ghế ăn", key: "ghe-an" },
        { label: "Tủ bếp", key: "tu-bep" },
        { label: "Tủ rượu", key: "tu-ruou" },
        { label: "Phụ kiện bàn ăn", key: "phu-kien-ban-an" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("phong-ngu", "Phòng ngủ")}>Phòng ngủ</span>,
      key: "PhongNgu",
      children: [
        { label: "Giường", key: "giuong" },
        { label: "Tủ quần áo", key: "tu-quan-ao" },
        { label: "Tab đầu giường", key: "tab-dau-giuong" },
        { label: "Bàn trang điểm", key: "ban-trang-diem" },
        { label: "Chăn ga gối", key: "chan-ga-goi" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("phong-lam-viec", "Phòng làm việc")}>Phòng làm việc</span>,
      key: "PhongLamViec",
      children: [
        { label: "Bàn làm việc", key: "ban-lam-viec" },
        { label: "Ghế làm việc", key: "ghe-lam-viec" },
        { label: "Kệ sách", key: "ke-sach" },
        { label: "Tủ hồ sơ", key: "tu-ho-so" },
        { label: "Đèn bàn", key: "den-ban" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("trang-tri-nha-cua", "Trang trí nhà cửa")}>Trang trí nhà cửa</span>,
      key: "TrangTriNhaCua",
      children: [
        { label: "Tranh treo tường", key: "tranh-treo-tuong" },
        { label: "Đèn trang trí", key: "den-trang-tri" },
        { label: "Thảm", key: "tham" },
        { label: "Cây giả", key: "cay-gia" },
        { label: "Đồng hồ trang trí", key: "dong-ho-trang-tri" },       
      ],
    },
    {
      label: (
        <span 
          onClick={handleShopTheLookClick}
          style={screens.md ? { color: 'white' } : {}}
        >
          Shop The Look
        </span>
      ),
      key: "ShopTheLook",
    },
  ];

  const handleNavigatetype = (e) => {
    const { key } = e;
    const findLabel = (items, key) => {
      for (const item of items) {
        if (item.key === key) return item.label;
        if (item.children) {
          const child = item.children.find(c => c.key === key);
          if (child) return child.label;
        }
      }
      return null;
    };
  
    const label = findLabel(productTypesByRoom, key);
    
    if (key === 'ShopTheLook') {
      handleShopTheLookClick();
    } else {
      navigate(`/product/${key}`, {state: {label, filterBy: 'type'}});
    }
  };
  
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
      // Thêm style cho menu item
      '& .ant-menu-item': {
        color: 'white !important',
        '&:hover': {
          color: 'white !important',
        },
      },
      '& .ant-menu-submenu-title': {
        color: 'white !important',
        '&:hover': {
          color: 'white !important',
        },
      },
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
                items={productTypesByRoom}
                onClick={handleNavigatetype}
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
                  <Menu mode="inline" items={productTypesByRoom} onClick={handleNavigatetype} selectedKeys={[current]} />
                </Drawer>
              </>
            )}
          </div>
        </ContainerComponent>
      </nav>
    </>
  );
}