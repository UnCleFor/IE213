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
  
  // const category = {
  //   // Phòng khách
  //   sofa: "Sofa",
  //   bantra: "Bàn trà",
  //   ketivi: "Kệ tivi",
  //   ghedon: "Ghế đơn",
  //   tutrangtri: "Tủ trang trí",
  
  //   // Phòng ăn
  //   banan: "Bàn ăn",
  //   ghean: "Ghế ăn",
  //   tubep: "Tủ bếp",
  //   turuou: "Tủ rượu",
  //   phukienbanan: "Phụ kiện bàn ăn",
  
  //   // Phòng ngủ
  //   giuong: "Giường",
  //   tuquanao: "Tủ quần áo",
  //   tabdaugiuong: "Tab đầu giường",
  //   bantrangdiem: "Bàn trang điểm",
  //   changagoi: "Chăn ga gối",
  
  //   // Phòng làm việc
  //   banlamviec: "Bàn làm việc",
  //   ghelamviec: "Ghế làm việc",
  //   kesach: "Kệ sách",
  //   tuhoso: "Tủ hồ sơ",
  //   denban: "Đèn bàn",
  
  //   // Trang trí nhà cửa
  //   tranhtreotuong: "Tranh treo tường",
  //   dentrangtri: "Đèn trang trí",
  //   tham: "Thảm",
  //   caygia: "Cây giả",
  //   donghotrangtri: "Đồng hồ trang trí",
  // };
  const handleClick = (e) => {
    // const mappedType = typeLabels[e.key]; //lấy type của sản phẩm
    // if (mappedType) {
    //   setCurrentType(mappedType);
    // } else {
    //   setCurrentType(null);
    // }

    setOpen(false); // Đóng menu khi chọn item trên mobile
  };

  // Xử lý khi click vào parent item
  const handleParentClick = (key) => {
    navigate(`/product/${key}`);
    setOpen(false);
  };

  const productTypesByRoom = [   //thể hiện trên navbar
    {
      label: <span onClick={() => handleParentClick("PhongKhach")}>Phòng khách</span>,
      key: "PhongKhach",
      children: [
        { label: "Sofa", key: "sofa" },
        { label: "Bàn trà", key: "bantra" },
        { label: "Kệ tivi", key: "ketivi" },
        { label: "Ghế đơn", key: "ghedon" },
        { label: "Tủ trang trí", key: "tutrangtri" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("PhongAn")}>Phòng ăn</span>,
      key: "PhongAn",
      children: [
        { label: "Bàn ăn", key: "banan" },
        { label: "Ghế ăn", key: "ghean" },
        { label: "Tủ bếp", key: "tubep" },
        { label: "Tủ rượu", key: "turuou" },
        { label: "Phụ kiện bàn ăn", key: "phukienbanan" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("PhongNgu")}>Phòng ngủ</span>,
      key: "PhongNgu",
      children: [
        { label: "Giường", key: "giuong" },
        { label: "Tủ quần áo", key: "tuquanao" },
        { label: "Tab đầu giường", key: "tabdaugiuong" },
        { label: "Bàn trang điểm", key: "bantrangdiem" },
        { label: "Chăn ga gối", key: "changagoi" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("PhongLamViec")}>Phòng làm việc</span>,
      key: "PhongLamViec",
      children: [
        { label: "Bàn làm việc", key: "banlamviec" },
        { label: "Ghế làm việc", key: "ghelamviec" },
        { label: "Kệ sách", key: "kesach" },
        { label: "Tủ hồ sơ", key: "tuhoso" },
        { label: "Đèn bàn", key: "denban" },
      ],
    },
    {
      label: <span onClick={() => handleParentClick("TrangTriNhaCua")}>Trang trí nhà cửa</span>,
      key: "TrangTriNhaCua",
      children: [
        { label: "Tranh treo tường", key: "tranhtreotuong" },
        { label: "Đèn trang trí", key: "dentrangtri" },
        { label: "Thảm", key: "tham" },
        { label: "Cây giả", key: "caygia" },
        { label: "Đồng hồ trang trí", key: "donghotrangtri" },       
      ],
    },
  ];

  const handleNavigatetype = (e) => {
    const { key } = e;
  
    // Tìm label tương ứng từ menuItems
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
  

    
    const label = findLabel(menuItems, key);
  
    console.log("Đi tới:", key, "Label:", label?.props?.children || label);
  
    const normalizedKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_');
    navigate(`/product/${normalizedKey}`);
  };
  
  // const categories = [
  //   {
  //     label: "Phòng khách",
  //     key: "PhongKhach",
  //     children: ["sofa", "bantra", "ketivi", "ghedon", "tutrangtri"],
  //   },
  //   {
  //     label: "Phòng ăn",
  //     key: "PhongAn",
  //     children: ["banan", "ghean", "tubep", "turuou", "phukienbanan"],
  //   },
  //   {
  //     label: "Phòng ngủ",
  //     key: "PhongNgu",
  //     children: ["giuong", "tuquanao", "tabdaugiuong", "bantrangdiem", "changagoi"],
  //   },
  //   {
  //     label: "Phòng làm việc",
  //     key: "PhongLamViec",
  //     children: ["banlamviec", "ghelamviec", "kesach", "tuhoso", "denban"],
  //   },
  //   {
  //     label: "Trang trí nhà cửa",
  //     key: "TrangTriNhaCua",
  //     children: ["tranhtreotuong", "dentrangtri", "tham", "caygia", "donghotrangtri"],
  //   },
  // ];
  
  const menuItems = productTypesByRoom.map((category) => ({
    label: <span>{category.label}</span>, // không cần onClick ở đây nữa
    key: category.key,
    children: category.children.map((child) => ({
      label: <span>{child.label}</span>,
      key: child.key,
    })),
  }));
    
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
                <Menu mode="inline" items={menuItems} onClick={handleNavigatetype} selectedKeys={[current]} />
              </Drawer>
            </>
          )}
        </div>
      </ContainerComponent>
    </nav>

    {/* {currentType && (
      <TypeProduct
        type={currentType}
        name={`Sản phẩm: ${typeLabels[currentType] || currentType}`}
        showFilter={true}
      />
    )} */}
  </>
);
}
