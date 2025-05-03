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
  const handleParentClick = (key, label) => {
    navigate(`/product/${key}`, {state: {label, filterBy: 'room' }});
    setOpen(false);
  };

  const productTypesByRoom = [   //thể hiện trên navbar
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
  ];

  const handleNavigatetype = (e) => {
    const { key } = e;
    const { keyPath } = e;
    //console.log('key parent nè', keyPath[1])// key cua parent
    // Tìm label tương ứng từ menuItems
    const findLabel = (items, key) => {
      for (const item of items) {
        if (item.key === key) return item.label;
        const child = item.children.find(c => c.key === key);
        if (child) return child.label;
      }
      return null;
    };
  

    
    const label = findLabel(productTypesByRoom, key);
  
    //console.log("Đi tới:", key, "Label:", label);
  
    const normalizedKey = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '_');
    navigate(`/product/${key}`, {state: {label, filterBy: 'type'}});
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
  
  // const menuItems = productTypesByRoom.map((category) => ({
  //   label: category.label,//<span>{category.label}</span>, // không cần onClick ở đây nữa
  //   key: category.key,
  //   children: category.children.map((child) => ({
  //     label: child.label,//<span>{child.label}</span>,
  //     key: child.key,
  //   })),
  // }));
    
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