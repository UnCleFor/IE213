import React, { useEffect, useState } from "react";
import { Button, Tooltip, Modal } from "antd";
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { StyledCard, CardWrapper, ImageWrapper, HoverActions, WrapperTitle, WrapperPrice, SizeBox, SizeProduct, WrapperQuantity } from "./style";
import tu_giay from "./tu_giay.webp";
import { useNavigate } from 'react-router-dom'
import { convertPrice } from "../../utils";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

// const CardComponent = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showQuickView = () => {
//     setIsModalVisible(true);
//   };

//   const handleClose = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <CardWrapper>
//       <StyledCard
//         variant="borderless"
//         style={{ borderRadius: "0px", boxShadow: "none" }}
//         cover={
//           <ImageWrapper style={{ overflow: "hidden", borderRadius: "0px" }}>
//             <img
//               alt="product"
//               src={tu_giay}
//               style={{ objectFit: "cover", width: "100%", borderRadius: "0px" }}
//             />
//             <HoverActions className="hover-actions">
//               <Tooltip title="Thêm vào giỏ hàng" placement="left">
//                 <Button shape="circle" icon={<ShoppingCartOutlined />} />
//               </Tooltip>
//               <Tooltip title="Xem nhanh" placement="left">
//                 <Button shape="circle" icon={<EyeOutlined />} onClick={showQuickView} />
//               </Tooltip>
//               <Tooltip title="Yêu thích" placement="left">
//                 <Button shape="circle" icon={<HeartOutlined />} />
//               </Tooltip>
//             </HoverActions>
//           </ImageWrapper>
//         }
//       >
//         <WrapperTitle>Teddy - Tủ để giày</WrapperTitle>
//         <WrapperPrice>10,188,000đ</WrapperPrice>
//       </StyledCard>

//       {/* Modal Xem nhanh */}
//       <Modal
//         title="Teddy - Tủ để giày"
//         open={isModalVisible}
//         onCancel={handleClose}
//         footer={[
//           <Button key="add-cart" type="default" icon={<ShoppingCartOutlined />}>
//             Thêm vào giỏ
//           </Button>,
//           <Button key="buy-now" type="primary" style={{ backgroundColor: 'brown', borderColor: 'brown' }}>
//             Mua ngay
//           </Button>,
//         ]}
//       >
//         <img src={tu_giay} alt="product" style={{ width: '100%', marginBottom: 16 }} />
//         <p><strong>Giá:</strong> 10,188,000đ</p>
//         <p><strong>Mô tả:</strong> Tủ giày hiện đại phù hợp với mọi không gian nội thất.</p>
//       </Modal>
//     </CardWrapper>
//   );
// };

const CardComponent = ({ name, price, image, description, id, discount = 0, size, colors }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showQuickView = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  useEffect(() => {
    // Mặc định chọn màu đầu tiên trong mảng màu nếu có
    if (colors && colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [colors]);
  const handleDetailsProduct = (id) => {
    navigate(`/product_details/${id}`)
  }
  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };


  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  return (
    <CardWrapper>
      <StyledCard
        variant="borderless"
        style={{ borderRadius: "0px", boxShadow: "none" }}
        cover={
          <ImageWrapper style={{ overflow: "hidden", borderRadius: "0px", position: "relative" }} onClick={() => handleDetailsProduct(id)}>
            {/* Discount badge */}
            {discount > 0 && (
              <div style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                backgroundColor: "brown",
                color: "white",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "normal",
                fontSize: "14px",
                zIndex: 1
              }}>
                -{discount}%
              </div>
            )}
            <img
              alt={name}
              src={image}
              style={{ objectFit: "cover", width: "100%", borderRadius: "0px" }}
            />
            <HoverActions className="hover-actions">
              <Tooltip title="Thêm vào giỏ hàng" placement="left">
                <Button
                  shape="circle"
                  icon={<ShoppingCartOutlined />} />
              </Tooltip>
              <Tooltip title="Xem nhanh" placement="left">
                <Button
                  shape="circle"
                  icon={<EyeOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    showQuickView();
                  }} />
              </Tooltip>
              {/* <Tooltip title="Yêu thích" placement="left">
                <Button
                  shape="circle"
                  icon={<HeartOutlined />} />
              </Tooltip> */}
            </HoverActions>
          </ImageWrapper>
        }
        
      >
        <WrapperTitle>{name}</WrapperTitle>
        <WrapperPrice>
          {discount > 0 ? (
            <span style={{ textDecoration: 'line-through', color: '#666' }}>
              {convertPrice(price)}
            </span>
          ) : (
            convertPrice(price)
          )}

          {discount > 0 && (
            <div>
              {convertPrice(price * (1 - discount / 100))}
            </div>
          )}
        </WrapperPrice>
      </StyledCard>

      <Modal
        title={name}
        open={isModalVisible}
        onCancel={handleClose}
        width={800} // Increased width to accommodate two columns
        footer={[
          <Button key="add-cart" type="default" icon={<ShoppingCartOutlined />}>
            Thêm vào giỏ
          </Button>,
          <Button key="buy-now" type="primary" style={{ backgroundColor: 'brown', borderColor: 'brown' }}>
            Mua ngay
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Left Column - Image */}
          <div style={{ flex: 1 }}>
            <img
              src={image}
              alt={name}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Right Column - Product Details */}
          <div style={{ flex: 1 }}>
            <SizeProduct>
              {size && (
                <>
                  <p><strong>Kích thước</strong></p>
                  <SizeBox>
                    {`${size.length}mm x ${size.width}mm x ${size.height}mm`}
                  </SizeBox>
                </>
              )}
            </SizeProduct>

            {selectedColor && (
              <p style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: 0, marginBottom: '18px', marginTop: '10px' }}>
                <strong>Màu sắc: </strong>
                <span style={{ fontWeight: 'normal' }}>{selectedColor}</span>
              </p>
            )}

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {colors?.map((color, index) => {
                const colorMap = {
                  'Đỏ': '#ff0000',
                  'Xanh': '#0000ff',
                  'Vàng': '#ffff00',
                  'Trắng': '#ffffff',
                  'Đen': '#000000',
                };
                const colorCode = colorMap[color] || '#cccccc';
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: colorCode,
                      border: color === 'Trắng' ? '1px solid #ddd' : 'none',
                      cursor: 'pointer',
                      outline: selectedColor === color ? '2px solid #000' : 'none',
                      outlineOffset: '2px',
                      transition: 'all 0.2s ease'
                    }}
                  />
                );
              })}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ display: 'flex', gap: '5px', alignItems: 'baseline' }}>
                <strong>Giá:</strong>
                {discount > 0 ? (
                  <>
                    <span style={{ textDecoration: 'line-through', color: '#666' }}>
                      {convertPrice(price)}
                    </span>
                    <span style={{ marginLeft: '8px', color: 'brown', fontWeight: 'bold' }}>
                      {convertPrice(price * (1 - discount / 100))}
                      <span style={{ fontSize: '14px', marginLeft: '4px' }}>
                        (-{discount}%)
                      </span>
                    </span>
                  </>
                ) : (
                  <span>{convertPrice(price)}</span>
                )}
              </p>
            </div>

            <div>
              <p><strong>Mô tả:</strong></p>
              <p style={{ marginTop: '8px' }}>{description}</p>
            </div>
            <WrapperQuantity>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
                <ButtonComponent
                  size="middle"
                  textButton={<MinusOutlined />}
                  styleButton={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'transparent',
                    borderRadius: '0px',
                    border: '1px solid black',
                    boxShadow: 'none'
                  }}
                  styleTextButton={{
                    color: '#000',
                    fontSize: '15px',
                  }}
                  onClick={handleDecrease}
                />
                <div style={{ fontSize: '18px', minWidth: '32px', textAlign: 'center' }}>{quantity}</div>
                <ButtonComponent
                  size="middle"
                  onClick={handleIncrease}
                  textButton={<PlusOutlined />}
                  styleButton={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'transparent',
                    borderRadius: '0px',
                    border: '1px solid black',
                    boxShadow: 'none'
                  }}
                  styleTextButton={{
                    color: '#000',
                    fontSize: '15px',
                  }}
                />
              </div>
            </WrapperQuantity>
          </div>



        </div>
      </Modal>
    </CardWrapper>
  );
};


export default CardComponent;
