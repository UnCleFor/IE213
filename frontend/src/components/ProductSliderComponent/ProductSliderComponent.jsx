import React, { useRef } from "react";
import Slider from "react-slick";
import CardComponent from "../CardComponent/CardComponent";
import { ArrowButton } from "../PromotionProductSliderComponent/style"; // Import ArrowButton
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ProductSliderWrapper,
  ProductSliderRow,
  SliderContainer,
  SlideItemWrapper
} from "./style";

const ProductSliderComponent = () => {
  const sliderRef = useRef(null);

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
  
  const data = [1, 2, 3, 4, 5, 6]; // demo
  const items = data.map((item, index) => (
    <SlideItemWrapper key={index}>
      <CardComponent />
    </SlideItemWrapper>
  ));

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
    </ProductSliderWrapper>
  );
};

export default ProductSliderComponent;
