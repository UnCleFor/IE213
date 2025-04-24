import React, { useState } from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../TypeProductPage/TypeProductPage';
import ContainerComponent from '../../components/ContainerComponent/ContainerComponent';
import slider1 from '../../assets/images/slide1.webp';
import slider2 from '../../assets/images/slide2.webp';
import slider3 from '../../assets/images/slide3.webp';
import ProductSliderComponent from '../../components/ProductSliderComponent/ProductSliderComponent';
import PromotionProductSliderComponent from '../../components/PromotionProductSliderComponent/PromotionProductSliderComponent';
import * as ProductService from '../../services/ProductService'
import {
  SectionWrapper,
  PromotionSectionWrapper,
  SectionTitle,
  ViewAllButton,
} from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [loading, setLoading] = useState(6)
  const [typeProducts, setTypeProducts] = useState([])

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)

    return res
  }
  const [limit, setLimit] = useState(10)

  return (
    <div>
      {/* Slider banner đầu trang */}
      <SliderComponent arrImages={[slider1, slider2, slider3]} />

      {/* Bộ sưu tập sản phẩm */}
      <ContainerComponent>
        <SectionWrapper>
          <SectionTitle>Bộ sưu tập Ondine 2025</SectionTitle>
          <ProductSliderComponent limit={limit} />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <ButtonComponent
              //onClick={handleUpdate}
              size="middle"
              styleButton={{
                backgroundColor: 'brown',
                //padding: '12px 28px',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginBottom: '10px'
              }}
              styleTextButton={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              textButton="Xem tất cả"
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </SectionWrapper>
      </ContainerComponent>

      {/* Sản phẩm khuyến mãi */}
      <ContainerComponent>
        <PromotionSectionWrapper>
          <SectionTitle>Sản phẩm khuyến mãi</SectionTitle>
          <PromotionProductSliderComponent />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <ButtonComponent
              //onClick={handleUpdate}
              size="middle"
              styleButton={{
                backgroundColor: 'brown',
                //padding: '12px 28px',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginBottom: '10px'
              }}
              styleTextButton={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              textButton="Xem tất cả"

            />
          </div>
        </PromotionSectionWrapper>
      </ContainerComponent>

      {/* Sản phẩm nổi bật */}
      <ContainerComponent>
        <SectionWrapper>
          <SectionTitle>Sản phẩm nổi bật</SectionTitle>
          <ProductSliderComponent />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* <ViewAllButton>Xem tất cả</ViewAllButton> */}
            <ButtonComponent
              //onClick={handleUpdate}
              size="middle"
              styleButton={{
                backgroundColor: 'brown',
                //padding: '12px 28px',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                marginBottom: '10px'
              }}
              styleTextButton={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              textButton="Xem tất cả"

            />
          </div>
        </SectionWrapper>
      </ContainerComponent>
    </div>
  );
};

export default HomePage;
