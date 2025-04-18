import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import Slider from "react-slick";
import CardComponent from "../CardComponent/CardComponent";
import { ArrowButton } from "../PromotionProductSliderComponent/style"; // Import ArrowButton
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ProductSliderWrapper,
  ProductSliderRow,
  SliderContainer,
  SlideItemWrapper,
  SwipeHint
} from "./style";

const ProductSliderComponent = () => {
  const sliderRef = useRef(null);
  //
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
        setProducts(res.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      }
    };

    fetchProducts();
  }, []);

  const items = products.map((item, index) => (
    <SlideItemWrapper key={item._id || index}>
      <CardComponent
        name={item.name}
        price={item.price}
        image={item.image}
        description={item.description}
      />
    </SlideItemWrapper>
  ));


  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 820, settings: { slidesToShow: 2 } }, // thêm breakpoint cho iPad Air portrait
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
  };
  
  // const data = [1, 2, 3, 4, 5, 6]; // demo
  // const items = data.map((item, index) => (
  //   <SlideItemWrapper key={index}>
  //     <CardComponent />
  //   </SlideItemWrapper>
  // ));

  return (
    <ProductSliderWrapper>
      <ProductSliderRow>
        <ArrowButton direction="left" onClick={() => sliderRef.current?.slickPrev()}>
          ←
        </ArrowButton>

        <SliderContainer>
          <Slider ref={sliderRef} {...settings}>
            {items}
          </Slider>
        </SliderContainer>

        <ArrowButton direction="right" onClick={() => sliderRef.current?.slickNext()}>
          →
        </ArrowButton>
        

      </ProductSliderRow>
      <SwipeHint>← Vuốt để xem thêm →</SwipeHint>
    </ProductSliderWrapper>
  );
};

export default ProductSliderComponent;
