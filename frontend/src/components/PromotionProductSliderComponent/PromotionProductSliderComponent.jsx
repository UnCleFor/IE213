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
  SwipeHint
} from './style';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import pic from "./pic.png";
import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";
import pic4 from "./pic4.png";
import pic5 from "./pic5.png";

import Slider from "react-slick";

// Custom arrows using styled-component
const NextArrow = ({ onClick }) => (
  <ArrowButton direction="right" onClick={onClick}>→</ArrowButton>
);

const PrevArrow = ({ onClick }) => (
  <ArrowButton direction="left" onClick={onClick}>←</ArrowButton>
);

const PromotionProductSliderComponent = () => {
  const products = [
    { name: 'Teddy - Giường ngủ', price: '16,000,000₫', img: pic },
    { name: 'Teddy - Giường ngủ', price: '10,000,000₫', img: pic1 },
    { name: 'Teddy - Giường ngủ', price: '20,000,000₫', img: pic2 },
    { name: 'Teddy - Giường ngủ', price: '15,000,000₫', img: pic3 },
    { name: 'Teddy - Giường ngủ', price: '18,000,000₫', img: pic4 },
    { name: 'Teddy - Giường ngủ', price: '14,000,000₫', img: pic5 },
  ];

  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        {products.map((product, index) => (
          <div key={index}>
            <PromotionWrapper>
              <ProductImage src={product.img} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.price}</ProductPrice>

                <InfoTable>
                  <div>Chất liệu</div>
                  <div>Khung gỗ dầu</div>
                  <div>Vận chuyển</div>
                  <div>Miễn phí nội thành HCM & TĐ</div>
                  <div>Thanh toán</div>
                  <div>Thanh toán & Trả góp 0% qua thẻ tín dụng</div>
                  <div>Liên hệ</div>
                  <div>
                    Hotline: 0931 799 744<br />
                    Liên hệ để được tư vấn và đặt hàng theo yêu cầu
                  </div>
                </InfoTable>

                <ActionsWrapper>
                  <button>Mua ngay</button>
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
