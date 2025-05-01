import React, { useState, useEffect } from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import ContainerComponent from '../../components/ContainerComponent/ContainerComponent';
import slider1 from '../../assets/images/slide1.webp';
import slider2 from '../../assets/images/slide2.webp';
import slider3 from '../../assets/images/slide3.webp';
import slider4 from '../../assets/images/slide4.jpeg';
import slider5 from '../../assets/images/slide5.jpeg';
import img1 from '../../assets/images/img1.jpeg';
import img2 from '../../assets/images/img2.jpeg';
import img3 from '../../assets/images/img3.jpeg';
import img4 from '../../assets/images/img4.jpeg';
import img5 from '../../assets/images/img5.jpeg';
import img6 from '../../assets/images/img6.jpeg';

import ProductSliderComponent from '../../components/ProductSliderComponent/ProductSliderComponent';
import PromotionProductSliderComponent from '../../components/PromotionProductSliderComponent/PromotionProductSliderComponent';
import * as ProductService from '../../services/ProductService';
import {
  SectionWrapper,
  PromotionSectionWrapper,
  SectionTitle,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CategoryGrid,
  CategoryCard,
  NewsletterSection,
  NewsletterForm,
  TestimonialSection,
  TestimonialCard,
  InstagramSection,
  InstagramPost,
  FeatureGrid,
  FeatureItem,
  PromotionCountdown
} from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import { FaShippingFast, FaExchangeAlt, FaGift, FaLock } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const categories = [
    { id: 1, name: 'Phòng khách', image: slider3 },
    { id: 2, name: 'Phòng ăn', image: slider1 },
    { id: 3, name: 'Phòng ngủ', image: slider2 },
    { id: 4, name: 'Phòng làm việc', image: slider5 },
    { id: 5, name: 'Trang trí nhà cửa', image: slider4 }
  ];

  const navigate = useNavigate();
  const handleNavigateRoom = (name) => {
    return () => { // Trả về một hàm mới
      if (name) {
        navigate(`/product/${name}`, { state: { filterBy: 'room' } });
      }
    };
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const [limit, setLimit] = useState(10);
  const testimonials = [
    { id: 1, name: 'Ngọc Anh', comment: 'Nội thất đẹp, chất lượng tốt, lắp đặt chuyên nghiệp!', rating: 5 },
    { id: 2, name: 'Minh Tuấn', comment: 'Thiết kế hiện đại, đúng như hình ảnh, giao hàng đúng hẹn.', rating: 5 },
    { id: 3, name: 'Thanh Hà', comment: 'Rất hài lòng với dịch vụ và sản phẩm của cửa hàng.', rating: 4 }
  ];

  const images = [img1, img2, img3, img4, img5, img6];
  const instagramPosts = images.map((image, i) => ({
    id: i + 1,
    image: image
  }));

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Hero Banner */}
      <HeroSection>
        <SliderComponent
          arrImages={[slider1, slider2, slider3]}
          autoPlay={true}
          interval={5000}
        />
        <HeroContent>
          <HeroTitle>The Beauté Home</HeroTitle>
          <HeroSubtitle>Tôn vinh vẻ đẹp trong từng không gian sống</HeroSubtitle>

        </HeroContent>
      </HeroSection>

      {/* Các tính năng nổi bật */}
      <ContainerComponent>
        <FeatureGrid>
          <FeatureItem>
            <FaShippingFast size={32} />
            <h4>Phí vận chuyển phải chăng</h4>
            <p>Chỉ từ 20.000 đ</p>
          </FeatureItem>
          <FeatureItem>
            <FaExchangeAlt size={32} />
            <h4>Đổi trả trong 7 ngày</h4>
            <p>Nếu không hài lòng</p>
          </FeatureItem>
          <FeatureItem>
            <FaGift size={32} />
            <h4>Thiết kế miễn phí</h4>
            <p>Tư vấn không gian sống</p>
          </FeatureItem>
          <FeatureItem>
            <FaLock size={32} />
            <h4>Bảo hành dài hạn</h4>
            <p>Lên đến 24 tháng</p>
          </FeatureItem>
        </FeatureGrid>
      </ContainerComponent>

      {/* Danh mục sản phẩm */}
      <ContainerComponent>
        <SectionWrapper>
          <SectionTitle>Danh Mục Nội Thất</SectionTitle>
          <CategoryGrid>
            {categories.map(category => (
              <CategoryCard key={category.id} bgimage={category.image}>
                <div className="overlay"></div>
                <h3>{category.name}</h3>
                <ButtonComponent
                  size="small"
                  styleButton={{
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    borderRadius: '4px',
                    marginTop: '10px'
                  }}
                  styleTextButton={{
                    color: 'white',
                    fontSize: '14px'
                  }}
                  textButton="Xem ngay"
                  onClick={handleNavigateRoom(category.name)}
                />
              </CategoryCard>
            ))}
          </CategoryGrid>
        </SectionWrapper>
      </ContainerComponent>

      {/* Sản phẩm bán chạy */}
      {/* <ContainerComponent>
        <SectionWrapper>
          <SectionTitle>Sản Phẩm Bán Chạy</SectionTitle>
          <ProductSliderComponent limit={limit} />
        </SectionWrapper>
      </ContainerComponent> */}

      {/* Sản phẩm khuyến mãi */}
      <ContainerComponent>
        <PromotionSectionWrapper>
          <SectionTitle>Khuyến Mãi Đặc Biệt</SectionTitle>
          <PromotionCountdown>
            <CountdownTimer targetDate={new Date('2025-12-31')} />
          </PromotionCountdown>
          <PromotionProductSliderComponent />
        </PromotionSectionWrapper>
      </ContainerComponent>

      {/* Sản phẩm mới về */}
      <ContainerComponent>
        <SectionWrapper>
          <SectionTitle>Sản Phẩm Mới Về</SectionTitle>
          <ProductSliderComponent type='newest' limit={limit} />
        </SectionWrapper>
      </ContainerComponent>

      {/* Phản hồi khách hàng */}
      <NewsletterSection>
        <ContainerComponent>
          <TestimonialSection>
            <SectionTitle>Khách Hàng Nói Về Chúng Tôi</SectionTitle>
            <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '20px 0' }}>
              {testimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id}>
                  <div className="rating">
                    {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                  </div>
                  <p className="comment">"{testimonial.comment}"</p>
                  <p className="name">- {testimonial.name}</p>
                </TestimonialCard>
              ))}
            </div>
          </TestimonialSection>
        </ContainerComponent>
      </NewsletterSection>
      {/* Instagram */}
      <ContainerComponent>
        <InstagramSection>
          <SectionTitle>
            <BsInstagram style={{ marginRight: '10px' }} />
            Không Gian Sống Đẹp Trên Instagram
          </SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {instagramPosts.map(post => (
              <InstagramPost key={post.id} bgimage={post.image}>
                <div className="overlay">
                  <BsInstagram size={24} />
                </div>
              </InstagramPost>
            ))}
          </div>
        </InstagramSection>
      </ContainerComponent>

      {/* Newsletter */}
      <NewsletterSection>
        <ContainerComponent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3>Nhận Ưu Đãi Đặc Biệt</h3>
              <p>Đăng ký để nhận thông tin mới nhất và khuyến mãi từ chúng tôi</p>
            </div>
            {/* <NewsletterForm>
              <input type="email" placeholder="Nhập email của bạn" />
              <ButtonComponent
                textButton="Đăng ký"
                styleButton={{
                  backgroundColor: '#8B4513',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '0 4px 4px 0'
                }}
                styleTextButton={{ color: 'white' }}
              />
            </NewsletterForm> */}
          </div>
        </ContainerComponent>
      </NewsletterSection>
    </div>
  );
};

// Component đồng hồ đếm ngược
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      margin: '20px 0',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#8B4513',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '24px',
          fontWeight: 'bold',
          minWidth: '50px'
        }}>
          {timeLeft.days}
        </div>
        <div style={{ fontSize: '12px', marginTop: '5px' }}>Ngày</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#8B4513',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '24px',
          fontWeight: 'bold',
          minWidth: '50px'
        }}>
          {timeLeft.hours}
        </div>
        <div style={{ fontSize: '12px', marginTop: '5px' }}>Giờ</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#8B4513',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '24px',
          fontWeight: 'bold',
          minWidth: '50px'
        }}>
          {timeLeft.minutes}
        </div>
        <div style={{ fontSize: '12px', marginTop: '5px' }}>Phút</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#8B4513',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '24px',
          fontWeight: 'bold',
          minWidth: '50px'
        }}>
          {timeLeft.seconds}
        </div>
        <div style={{ fontSize: '12px', marginTop: '5px' }}>Giây</div>
      </div>
    </div>
  );
};

export default HomePage;