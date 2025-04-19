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
import { useSelector } from 'react-redux';
import { getAllProduct } from "../../services/ProductService";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

const ProductSliderComponent = () => {
  const sliderRef = useRef(null);
  //
  //const [products, setProducts] = useState([]);
  const searchProduct = useSelector((state) => state.product.search);
  const searchDebounce = useDebounce(searchProduct, 1000)

////////////////////////
  const fetchProducts = async () => {
    const res = await getAllProduct(searchDebounce)
    return res.data
  }

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await getAllProduct(searchDebounce);
  //       setProducts(res.data);
  //     } catch (error) {
  //       console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  //     }
  //   };

  //   fetchProducts();
  // }, [searchDebounce]);

  const { isLoading, data: products = [], error } = useQuery({
    queryKey: ['products', searchDebounce],
    queryFn: fetchProducts,
    retry: 3,
    retryDelay: 1000,
  });

  if (error) {
    return <div>Lỗi khi tải sản phẩm.</div>;
  }
  if (isLoading) { //đang tìmtìm
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        Đang tải sản phẩm...
      </div>
    );
  }
  if (!isLoading && products.length === 0) { // tìm không ra
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        Không tìm thấy sản phẩm phù hợp.
      </div>
    );
  }

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
