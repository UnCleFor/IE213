import React, { useEffect, useState } from "react";
import { Button, Tooltip, Modal, message } from "antd";
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { StyledCard, CardWrapper, ImageWrapper, HoverActions, WrapperTitle, WrapperPrice, SizeBox, SizeProduct, WrapperQuantity } from "./style";
import tu_giay from "./tu_giay.webp";
import { useLocation, useNavigate } from 'react-router-dom'
import { convertPrice } from "../../utils";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { addOrderProduct, buyNowProduct } from "../../redux/slices/orderSlide";
import { useDispatch } from "react-redux";


const CardComponent = ({ name, price, image, description, id, discount = 0, size, colors,countInStock,_id ,user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const showQuickView = () => setIsModalVisible(true);
  const handleClose = () => {setIsModalVisible(false); setQuantity(1);}
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
          if (countInStock > quantity) {
              setQuantity(prev => prev + 1);
          } else {
              message.warning('Số lượng mua vượt quá số lượng tồn kho');
          }
      };


  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  const handleAddOrderProduct = () => {
    console.log(user)
          if (!user) {
              navigate('/sign_in', { state: location?.pathname })
          } else if (countInStock === 0) {
              message.error('Sản phẩm đã hết hàng');
          } else {
              dispatch(addOrderProduct({
                  orderItem: {
                      name: name,
                      amount: quantity,
                      image: image,
                      price: price,
                      product: _id,
                      discount: discount,
                      countInStock: countInStock
                  }
              }))
              message.success('Thêm vào giỏ hàng thành công');
          }
      }
      const handleAddOrderOneProduct = () => {
        console.log(user)
              if (!user) {
                  navigate('/sign_in', { state: location?.pathname })
              } else if (countInStock === 0) {
                  message.error('Sản phẩm đã hết hàng');
              } else {
                  dispatch(addOrderProduct({
                      orderItem: {
                          name: name,
                          amount: 1,
                          image: image,
                          price: price,
                          product: _id,
                          discount: discount,
                          countInStock: countInStock
                      }
                  }))
                  message.success('Thêm vào giỏ hàng thành công');
              }
          }
  
      const handleBuyNow = () => {
          if (!user) {
              navigate('/sign_in', { state: location?.pathname })
          } else if (countInStock === 0) {
              message.error('Sản phẩm đã hết hàng');
          } else {
              dispatch(buyNowProduct({
                  orderItem: {
                      name: name,
                      amount: quantity,
                      image: image,
                      price: price,
                      product: _id,
                      discount: discount,
                      countInStock: countInStock
                  }
              }))
              navigate('/checkout')
          }
      }
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
                  icon={<ShoppingCartOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddOrderOneProduct();
                  }} />
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
          <Button onClick={handleAddOrderProduct} key="add-cart" type="default" icon={<ShoppingCartOutlined />}>
            Thêm vào giỏ
          </Button>,
          <Button onClick={handleBuyNow} key="buy-now" type="primary" style={{ backgroundColor: 'brown', borderColor: 'brown' }}>
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
          <p><strong>Số lượng còn lại:</strong> {countInStock}</p>
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