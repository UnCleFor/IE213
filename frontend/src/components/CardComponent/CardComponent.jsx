import React, { useState } from "react";
import { Button, Tooltip, Modal } from "antd";
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined } from "@ant-design/icons";
import { StyledCard, CardWrapper, ImageWrapper, HoverActions, WrapperTitle, WrapperPrice } from "./style";
import tu_giay from "./tu_giay.webp";
import { useNavigate } from 'react-router-dom'
import { convertPrice } from "../../utils";

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

const CardComponent = ({ name, price, image, description, id }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showQuickView = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  const navigate = useNavigate()
  const handleDetailsProduct = (id) => {
    navigate(`/product_details/${id}`)
  }

  return (
    <CardWrapper>
      <StyledCard
        variant="borderless"
        style={{ borderRadius: "0px", boxShadow: "none" }}
        cover={
          <ImageWrapper style={{ overflow: "hidden", borderRadius: "0px" }}>
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
                    e.stopPropagation();  //ưu tiên sự kiện xam nhanh, tương tự button thêm vào giỏ và yêu thích
                    showQuickView();
                  }} />
              </Tooltip>
              <Tooltip title="Yêu thích" placement="left">
                <Button 
                  shape="circle" 
                  icon={<HeartOutlined />} />
              </Tooltip>
            </HoverActions>
          </ImageWrapper>
        }
        onClick= {() => handleDetailsProduct(id)}
      >
        <WrapperTitle>{name}</WrapperTitle>
        <WrapperPrice>{convertPrice(price)}</WrapperPrice>
      </StyledCard>

      <Modal
        title={name}
        open={isModalVisible}
        onCancel={handleClose}
        footer={[
          <Button key="add-cart" type="default" icon={<ShoppingCartOutlined />}>
            Thêm vào giỏ
          </Button>,
          <Button key="buy-now" type="primary" style={{ backgroundColor: 'brown', borderColor: 'brown' }}>
            Mua ngay
          </Button>,
        ]}
      >
        <img src={image} alt={name} style={{ width: '100%', marginBottom: 16 }} />
        <p><strong>Giá:</strong> {convertPrice(price)}</p>
        <p><strong>Mô tả:</strong> {description}</p>
      </Modal>
    </CardWrapper>
  );
};


export default CardComponent;
