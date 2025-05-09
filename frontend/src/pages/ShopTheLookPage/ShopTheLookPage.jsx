import React, { useState } from 'react';
import { Row, Col, Image, Button, Card, Tag, Divider, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import './ShopTheLook.css';
import pic from "./pic.png";
import phong from "./phong 1.jpg";
import ContainerComponent from '../../components/ContainerComponent/ContainerComponent';
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";

const ShopTheLook = () => {
  // State lưu chỉ mục phối cảnh đang được chọn
  const [selectedLook, setSelectedLook] = useState(0);
  // State lưu hình ảnh đang được phóng to
  const [zoomedImage, setZoomedImage] = useState(null);
  // State xác định sản phẩm nào đang được hover hoặc click
  const [activeProduct, setActiveProduct] = useState(null);

  // Dữ liệu phối cảnh mẫu, mỗi cảnh chứa danh sách sản phẩm kèm vị trí trên ảnh
  const looks = [
    {
      id: 1,
      title: "Phòng khách hiện đại",
      image: phong,
      products: [
        {
          id: 101,
          name: "Sofa da cao cấp",
          price: "12.990.000đ",
          image: pic,
          position: { top: '60%', left: '30%' }
        },
        {
          id: 102,
          name: "Bàn trà gỗ óc chó",
          price: "3.490.000đ",
          image: pic,
          position: { top: '70%', left: '50%' }
        },
        {
          id: 103,
          name: "Đèn trang trí",
          price: "1.290.000đ",
          image: pic,
          position: { top: '30%', left: '75%' }
        }
      ]
    },
    {
      id: 2,
      title: "Phòng ngủ sang trọng",
      image: phong,
      products: [
        {
          id: 201,
          name: "Giường ngủ gỗ sồi",
          price: "8.990.000đ",
          image: pic,
          position: { top: '50%', left: '40%' }
        },
        {
          id: 202,
          name: "Tủ quần áo 4 cánh",
          price: "6.490.000đ",
          image: pic,
          position: { top: '40%', left: '80%' }
        },
        {
          id: 203,
          name: "Bàn trang điểm",
          price: "2.990.000đ",
          image: pic,
          position: { top: '60%', left: '20%' }
        }
      ]
    }
  ];

  // Mở modal phóng to ảnh phối cảnh
  const handleZoom = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  // Xử lý khi người dùng click vào hotspot sản phẩm
  const handleHotspotClick = (productId, e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    setActiveProduct(productId === activeProduct ? null : productId);
  };

  // Dữ liệu breadcrumb
  const breadcrumbs = [
    { name: 'Trang chủ', link: '/' },
    { name: 'Shop the look', link: '/shop-the-look', isCurrent: true },
  ];
  return (
    <ContainerComponent>
      <div className="shop-the-look-container">
        {/* Breadcrumb */}
        <div className="breadcrumb-wrapper">
          <BreadcrumbComponent
            breadcrumbs={breadcrumbs}
            className="breadcrumb-adjust"
          />
        </div>

        {/* Tiêu đề trang */}
        <div className="shop-the-look-header">
          <h1>SHOP THE LOOK</h1>
          <p>Khám phá bộ sưu tập nội thất được phối theo phong cách hoàn chỉnh</p>
        </div>

        {/* Các lựa chọn phối cảnh */}
        <div className="look-selector">
          {looks.map((look, index) => (
            <Button
              key={look.id}
              type={selectedLook === index ? 'primary' : 'default'}
              className={selectedLook === index ? 'active-look-btn' : ''}
              onClick={() => {
                setSelectedLook(index);
                setActiveProduct(null);
              }}
            >
              {look.title}
            </Button>
          ))}
        </div>

        <Row gutter={[24, 24]} className="look-display">
          {/* Cột trái: Hình ảnh phối cảnh */}
          <Col xs={24} md={14}>
            <div className="main-look-image" onClick={() => handleZoom(looks[selectedLook].image)}>
              <Image
                src={looks[selectedLook].image}
                alt={looks[selectedLook].title}
                preview={false}
              />

              {/* Hiển thị các hotspot sản phẩm */}
              {looks[selectedLook].products.map(product => (
                <Tooltip key={product.id}>
                  <div
                    className={`hotspot ${activeProduct === product.id ? 'active' : ''}`}
                    style={{
                      top: product.position.top,
                      left: product.position.left
                    }}
                    onClick={(e) => handleHotspotClick(product.id, e)}
                  >
                    <div className="hotspot-marker">
                      {activeProduct === product.id && (
                        <div className="hotspot-ripple"></div>
                      )}
                    </div>
                    {activeProduct === product.id && (
                      <div className="hotspot-tooltip">
                        <span>{product.name}</span>
                      </div>
                    )}
                  </div>
                </Tooltip>
              ))}

              <div className="zoom-hint">
                <ArrowsAltOutlined /> Click để phóng to
              </div>
            </div>
          </Col>

          {/* Cột phải: Danh sách sản phẩm */}
          <Col xs={24} md={10}>
            <div className="product-list">
              <h3>Sản phẩm trong phối cảnh</h3>
              <Divider />
              {looks[selectedLook].products.map(product => (
                <Card
                  key={product.id}
                  className={`product-card ${activeProduct === product.id ? 'highlighted' : ''}`}
                  onMouseEnter={() => setActiveProduct(product.id)}
                  onMouseLeave={() => setActiveProduct(null)}
                >
                  <Row align="middle" gutter={16}>
                    <Col span={8}>
                      <Image src={product.image} preview={false} />
                    </Col>
                    <Col span={16}>
                      <h4>{product.name}</h4>
                      <p className="price">{product.price}</p>
                      <div className="product-actions">
                        <Button icon={<HeartOutlined />} shape="circle" />
                        <Button icon={<ShoppingCartOutlined />} shape="circle" />
                        <Button type="primary" className="buy-now-btn">Mua ngay</Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>
        </Row>

        {/* Modal phóng to hình ảnh */}
        {zoomedImage && (
          <div className="image-zoom-modal" onClick={() => setZoomedImage(null)}>
            <div className="zoomed-image-container">
              <Image src={zoomedImage} preview={false} />
              <Tag className="close-tag">Nhấn ESC hoặc click để đóng</Tag>
            </div>
          </div>
        )}

        {/* CTA cuối trang */}
        <div className="cta-section">
          <h2>Bạn muốn phối sản phẩm theo ý mình?</h2>
          <p>Đội ngũ thiết kế nội thất của chúng tôi sẽ giúp bạn</p>
          <Button type="primary" size="large" className="design-consult-btn">ĐĂNG KÝ TƯ VẤN THIẾT KẾ</Button>
        </div>
      </div>
    </ContainerComponent>

  );
};

export default ShopTheLook;