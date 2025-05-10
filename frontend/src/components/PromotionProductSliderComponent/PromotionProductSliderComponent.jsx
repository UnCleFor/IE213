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
} from './style';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { convertPrice } from '../../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { buyNowProduct } from '../../redux/slices/orderSlide';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

// Các mũi tên tùy chỉnh cho slider
const NextArrow = ({ onClick }) => (
  <ArrowButton direction="right" onClick={onClick}>→</ArrowButton>
);
const PrevArrow = ({ onClick }) => (
  <ArrowButton direction="left" onClick={onClick}>←</ArrowButton>
);

const PromotionProductSliderComponent = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector((state) => state.user); // Lấy Thông tin Người dùng
  // Lấy sản phẩm khuyến mãi từ API sử dụng react-query
  const { data: products } = useQuery({
    queryKey: ['products-promotion'],
    queryFn: () => ProductService.getDiscountedProducts(6, 0) 
  });
  // Điều hướng xem Chi tiết Sản phẩm
  const handleDetailsProduct = (id) => {
    navigate(`/product_details/${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Cuộn mượt
    });
  };

  // Cấu hình cho slider (hiển thị 1 sản phẩm mỗi lần)
  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!products?.data) return <div style={{alignContent:'center'}}>Đang tải sản phẩm...</div>;
  // Mua ngay
  const handleBuyNow = (product) => {
    if (!user?.id) {
      navigate('/sign_in', { state: location?.pathname }); // Khi chưa đăng nhập
      message.warning('Vui lòng đăng nhập để mua hàng');
    } else if (product.countInStock === 0) {
      message.error('Sản phẩm đã hết hàng'); // Sản phẩm hết hàng
    } else {
      // Dispatch action để thêm sản phẩm vào giỏ và điều hướng đến trang thanh toán
      dispatch(buyNowProduct({
        orderItem: {
          name: product.name,
          amount: 1,
          image: product.image,
          price: product.price,
          product: product._id,
          discount: product.discount,
          countInStock: product.countInStock
        }
      }));
      navigate('/checkout'); 
    }
  };
  return (
    <SliderWrapper>
      <Slider {...settings}>
        {products.data.map((product) => (
          <div key={product._id}>
            <PromotionWrapper>
              <ProductImage src={product.image} alt={product.name} />

              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <ProductPrice>{convertPrice(product.price * (1 - product.discount/100))} (-{product.discount}%)</ProductPrice>
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
                <button onClick={() => handleBuyNow(product)}>Mua ngay</button>
                  <button 
                    onClick={() => handleDetailsProduct(product._id)} // Sửa thành arrow function
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