import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/z6436857502524_b8df322fa070c2dd15fc904c2ee1c100.jpg'
import imageProductSmall from '../../assets/images/z6436857450475_595921696663d0fe0f381a7c4efb9de6.jpg'
import { DetailsCell, RowDetail, SizeBox, SizeProduct, TableProductDetails, TitleCell, WrapperBtnBuy, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStylePriceProduct } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ProductDetailsComponent = () => {
    const product =
    {
        name: "Teddy - Sofa 2 seaters",
        code: "teddysofabang-5",
        status: "Còn hàng",
        brand: "I'm Home",
        category: "Sofa modular",
        price: 12500000,
        sizes: [
            "2200x950mm",
            "2400x950mm"
        ],
        colors: [

        ],
        tags: [
            "Color Pop",
            "Sofa modular",
            "Phòng khách",
            "Sản phẩm nổi bật",
            "Sản phẩm khuyến mãi",
        ],
        details: [
            { label: "Chất liệu", value: "Khung gỗ dầu, Nệm mousse D40 + lò xo túi, Vải bọc tùy chọn" },
            { label: "Vận chuyển", value: "Miễn phí nội thành HCM & TĐ" },
            { label: "Thanh toán", value: "Thanh toán & Trả góp 0% qua thẻ tín dụng" },
            { label: "Liên hệ", value: "Hotline: 0931 799 744 (Liên hệ để được tư vấn và đặt hàng theo yêu cầu)" },
        ],
    }

    return (
        <div>
            <Row style={{ padding: '16px 0px', background: 'white' }} gutter={[16, 16]}>
                <Col xs={24} sm={12} md={10} lg={10}>
                    <Image src={imageProduct} alt="image product" preview={false} style={{ width: '100%', padding: "10px 0px" }} />
                    <Row gutter={[8, 8]} justify="center">
                        {[...Array(5)].map((_, index) => (
                            <Col key={index} xs={4} sm={4} md={4} lg={4}>
                                <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col xs={24} sm={12} md={14} lg={14} style={{ padding: '0px 20px' }}>
                    <WrapperStyleNameProduct>{product.name}</WrapperStyleNameProduct>
                    <p><strong>Mã sản phẩm:</strong> {product.code}</p>
                    <p><strong>Tình trạng:</strong> {product.status}</p>
                    <p><strong>Thương hiệu:</strong> {product.brand}</p>
                    <p><strong>Phân khúc:</strong> {product.category}</p>
                    <p><strong>Nhóm sản phẩm:</strong> {product.tags.join(", ")}</p>

                    <WrapperStylePriceProduct>
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                    </WrapperStylePriceProduct>

                    <SizeProduct>
                        <p><strong>Kích thước</strong></p>
                        {product.sizes.map((size, index) => (
                            <SizeBox key={index}>{size}</SizeBox>
                        ))}
                    </SizeProduct>

                    <p><strong>Màu sắc</strong></p>

                    <Row>
                        <Col span={12}></Col>
                        <Col span={12}></Col>
                    </Row>

                    <WrapperBtnBuy>
                        <ButtonComponent
                            size="large"
                            styleButton={{
                                backgroundColor: 'brown',
                                padding: '12px 28px',
                                border: 'none',
                                borderRadius: '0px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                            styleTextButton={{
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                            textButton="Mua ngay"
                        />
                        <ButtonComponent
                            size="large"
                            styleButton={{
                                backgroundColor: '#AA896C',
                                padding: '12px 28px',
                                border: 'none',
                                borderRadius: '0px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                            styleTextButton={{
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                            textButton="Thêm vào giỏ hàng"
                        />
                    </WrapperBtnBuy>
                </Col>
            </Row>


            <h2>Mô tả sản phẩm</h2>
            <div className="border border-gray-300 rounded-md" style={{ paddingBottom: "20px" }}>
                <TableProductDetails>
                    <tbody>
                        {product.details.map((item, index) => (
                            <RowDetail key={index} even={index % 2 === 0}>
                                <TitleCell>{item.label}</TitleCell>
                                <DetailsCell>
                                    {item.value.split(", ").map((line, i) => (
                                        <div key={i}>{line}</div>
                                    ))}
                                </DetailsCell>
                            </RowDetail>
                        ))}
                    </tbody>
                </TableProductDetails>
            </div>
        </div>
    )
}

export default ProductDetailsComponent;