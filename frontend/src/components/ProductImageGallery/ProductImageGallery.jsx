import React, { useState, useEffect } from 'react';
import { Image, Col, Row, Modal } from 'antd';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Styled cho ảnh nhỏ
const WrapperStyleImageSmall = styled(Image)`
  width: 90px !important;  
  height: 90px !important; 
  object-fit: cover;
  padding: 5px 5px;
  cursor: pointer;
  border: ${(props) => (props.active ? '2px solid black' : '1px solid #ccc')};
  transition: all 0.3s ease;
  opacity: ${(props) => (props.active ? 1 : 0.7)};
`;

// Styled cho ảnh lớn
const StyledMainImage = styled(Image)`
  width: 100%;
  height: auto;
  max-height: 450px;
  object-fit: contain;
  padding: 10px;
  transition: all 0.5s ease;
  cursor: zoom-in;
`;

const ProductImageGallery = ({ productDetails }) => {
    const [currentImage, setCurrentImage] = useState(''); // Quản lý ảnh chính của Sản phẩm

    // Lắng nghe sự thay đổi của Thông tin Sản phẩm
    useEffect(() => {
        if (productDetails?.image) {
            setCurrentImage(productDetails.image);
        }
    }, [productDetails]);

    // Tổng hợp tất cả ảnh từ Thông tin Sản phẩm
    const allImages = [productDetails?.image, ...(productDetails?.images || [])].filter(Boolean);

    const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái mở/đóng modal phóng to ảnh

    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,  // Đảm bảo có thể cuộn vô hạn
        arrows: true,
        speed: 500,
        centerMode: false,  // Tắt chế độ căn giữa, nếu bạn muốn tất cả các hình đều có thể kéo qua lại đều nhau
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    };

    return (
        <Col xs={24} sm={12} md={10} lg={10}>
            {currentImage && (
                <>
                    <StyledMainImage
                        src={currentImage}
                        alt="main image"
                        preview={false}
                        onClick={() => setIsModalOpen(true)}
                    />
                    <Modal
                        open={isModalOpen}
                        footer={null}
                        onCancel={() => setIsModalOpen(false)}
                        centered
                    >
                        <Image src={currentImage} alt="zoomed image" width="100%" />
                    </Modal>
                </>
            )}

            {allImages.length > 1 && ( // Kiểm tra nếu có nhiều hơn một ảnh mới hiển thị slider
                <Row justify="center" style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <Slider
                            {...settings}
                            style={{
                                margin: '0 -4px',
                                width: 'calc(100% + 8px)',  // Điều chỉnh chiều rộng của slider để tránh thừa khoảng trống
                            }}
                        >
                            {allImages.map((img, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '0 4px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <WrapperStyleImageSmall
                                        src={img}
                                        alt={`thumb-${index}`}
                                        preview={false}
                                        onClick={() => setCurrentImage(img)}
                                        active={currentImage === img}
                                        style={{
                                            flexShrink: 0  // Đảm bảo hình ảnh không bị dãn ra
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </Col>
                </Row>
            )}
        </Col>
    );
};

export default ProductImageGallery;
