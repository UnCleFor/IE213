import React from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import ContainerComponent from '../../components/ContainerComponent/ContainerComponent';
import ProductSliderComponent from '../../components/ProductSliderComponent/ProductSliderComponent';
import PromotionProductSliderComponent from '../../components/PromotionProductSliderComponent/PromotionProductSliderComponent';

import {
  SectionWrapper,
  PromotionSectionWrapper,
  SectionTitle,
  ViewAllButton,
} from './style';

import slider1 from '../../assets/images/slide1.webp';
import slider2 from '../../assets/images/slide2.webp';
import slider3 from '../../assets/images/slide3.webp';

const HomePage = () => {
  return (
    <div>
      {/* Slider banner đầu trang */}
      <SliderComponent arrImages={[slider1, slider2, slider3]} />

      {/* Bộ sưu tập sản phẩm */}
      <ContainerComponent>
        <SectionWrapper>
          <SectionTitle>Bộ sưu tập Ondine 2025</SectionTitle>
          <ProductSliderComponent />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <ViewAllButton>Xem tất cả</ViewAllButton>
          </div>
        </SectionWrapper>
      </ContainerComponent>

      {/* Sản phẩm khuyến mãi */}
      <ContainerComponent>
        <PromotionSectionWrapper>
          <SectionTitle>Sản phẩm khuyến mãi</SectionTitle>
          <PromotionProductSliderComponent />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <ViewAllButton>Xem tất cả</ViewAllButton>
          </div>
        </PromotionSectionWrapper>
      </ContainerComponent>

      {/* Sản phẩm nổi bật */}
      <ContainerComponent>
        <SectionWrapper>
          <SectionTitle>Sản phẩm nổi bật</SectionTitle>
          <ProductSliderComponent />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <ViewAllButton>Xem tất cả</ViewAllButton>
          </div>
        </SectionWrapper>
      </ContainerComponent>
    </div>
  );
};

export default HomePage;
