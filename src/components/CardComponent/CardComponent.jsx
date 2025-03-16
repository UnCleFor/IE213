import React from "react";
import { Button,Tooltip } from "antd";
import { ShoppingCartOutlined, EyeOutlined, HeartOutlined } from "@ant-design/icons";
import { StyledCard,CardWrapper, ImageWrapper, HoverActions,WrapperTitle,WrapperPrice } from "./style";
import tu_giay from "./tu_giay.webp";


const CardComponent = () => {
  return (
    <CardWrapper>
      <StyledCard
        variant="borderless"
        style={{
          borderRadius: "0px", // ✅ Xóa bo góc của Card
          boxShadow:"none"
        }}
        cover={
          <ImageWrapper
            style={{
              overflow: "hidden", // ✅ Ngăn bo góc Card ảnh hưởng đến ảnh bên trong
              borderRadius: "0px", // ✅ Đảm bảo không có bo góc
            }}
          >
            <img
              alt="product"
              src={tu_giay}
              height="290px"
              style={{
                objectFit: "cover",
                width: "100%",
                borderRadius: "0px", // ✅ Xóa bo góc ảnh
              }}
            />
            <HoverActions className="hover-actions">
            <Tooltip title="Thêm vào giỏ hàng" placement="left">
                <Button shape="circle" icon={<ShoppingCartOutlined />} />
              </Tooltip>
              <Tooltip title="Xem nhanh" placement="left">
                <Button shape="circle" icon={<EyeOutlined />} />
              </Tooltip>
              <Tooltip title="Yêu thích" placement="left">
                <Button shape="circle" icon={<HeartOutlined />} />
              </Tooltip>
            </HoverActions>
          </ImageWrapper>
        }
      >
        <WrapperTitle>Teddy - Tủ để giày</WrapperTitle>
        <WrapperPrice>10,188,000đ</WrapperPrice>
      </StyledCard>
    </CardWrapper>
  );
};

export default CardComponent;
