import React from 'react';
import {
  PromotionWrapper,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  InfoTable,
  ActionsWrapper,
  SliderWrapper,
  ArrowButton,
  SwipeHint,
  DiscountBadge
} from './style';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { convertPrice } from '../../utils';
import { useNavigate } from 'react-router-dom';

// Custom arrows
const NextArrow = ({ onClick }) => (
  <ArrowButton direction="right" onClick={onClick}>→</ArrowButton>
);

const PrevArrow = ({ onClick }) => (
  <ArrowButton direction="left" onClick={onClick}>←</ArrowButton>
);

const PromotionProductSliderComponent = () => {
  const navigate = useNavigate(); // Đã di chuyển vào trong component
  const { data: products } = useQuery({
    queryKey: ['products-promotion'],
    queryFn: () => ProductService.getAllProduct({ discount: { $gt: 0 } }, 6)
  });

  const handleDetailsProduct = (id) => {
    navigate(`/product_details/${id}`);
  };

  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!products?.data) return <div>Loading...</div>;

  return (
    <SliderWrapper>
      <Slider {...settings}>
        {products.data.map((product) => (
          <div key={product._id}>
            <PromotionWrapper>
              <ProductImage src={product.image} alt={product.name} />
              {product.discount > 0 && (
                <DiscountBadge>-{product.discount}%</DiscountBadge>
              )}
              
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <ProductPrice>{convertPrice(product.price * (1 - product.discount/100))}</ProductPrice>
                  {product.discount > 0 && (
                    <span style={{ 
                      textDecoration: 'line-through', 
                      color: '#999',
                      fontSize: '14px'
                    }}>
                      {convertPrice(product.price)}
                    </span>
                  )}
                </div>

                <InfoTable>
                  <div>Phân loại</div>
                  <div>{product.type} {product.room && `- ${product.room}`}</div>
                  
                  <div>Kích thước</div>
                  <div>
                    {product.size?.length && `${product.size.length}mm`} ×
                    {product.size?.width && `${product.size.width}mm`} ×
                    {product.size?.height && `${product.size.height}mm`}
                  </div>
                  
                  <div>Vận chuyển</div>
                  <div>Miễn phí nội thành HCM & HN</div>
                  
                  <div>Thanh toán</div>
                  <div>Trả góp 0% qua thẻ tín dụng</div>
                  
                  <div>Liên hệ</div>
                  <div>
                    Hotline: 0931 799 744<br />
                    Tư vấn và đặt hàng theo yêu cầu
                  </div>
                </InfoTable>

                <ActionsWrapper>
                  <button>Mua ngay</button>
                  <button 
                    onClick={() => handleDetailsProduct(product._id)} // Sửa thành arrow function
                    style={{ 
                      backgroundColor: 'transparent', 
                      border: '1px solid #8B4513',
                      color: '#8B4513'
                    }}
                  >
                    Xem chi tiết
                  </button>
                </ActionsWrapper>
              </ProductInfo>
            </PromotionWrapper>
          </div>
        ))}
      </Slider>
      <SwipeHint>← Vuốt để xem thêm →</SwipeHint>
    </SliderWrapper>
  );
};

export default PromotionProductSliderComponent;