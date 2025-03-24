import { Col, Image, Row } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/z6436857502524_b8df322fa070c2dd15fc904c2ee1c100.jpg'
import imageProductSmall from '../../assets/images/z6436857450475_595921696663d0fe0f381a7c4efb9de6.jpg'
import { DetailsCell, RowDetail, SizeBox, SizeProduct, TableProductDetails, TitleCell, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStylePriceProduct } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

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
            <Row style={{ padding: '16px', background: 'white' }}>
                <Col span={10}>
                    <Image src={imageProduct} alt="image product" preview={false} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4} ><WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} ><WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} ><WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} ><WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} /></WrapperStyleColImage>
                        <WrapperStyleColImage span={4} ><WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} /></WrapperStyleColImage>
                        {/* <WrapperStyleColImage span={4} ><WrapperStyleImageSmall src={imageProductSmall} alt='image small' preview={false} /></WrapperStyleColImage> */}
                    </Row>
                </Col>
                <Col span={14} style={{ padding: '0px 50px' }}>
                    <div style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                        <WrapperStyleNameProduct>{product.name}</WrapperStyleNameProduct>
                        <p><strong>Mã sản phẩm:</strong> {product.code}</p>
                        <p><strong>Tình trạng:</strong> {product.status}</p>
                        <p><strong>Thương hiệu:</strong> {product.brand}</p>
                        <p><strong>Phân khúc:</strong> {product.category}</p>
                        <p><strong>Nhóm sản phẩm:</strong> {product.tags ? product.tags.join(", ") : "Không có thông tin"}</p>
                    </div>
                    <div style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                        <WrapperStylePriceProduct>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}</WrapperStylePriceProduct>
                    </div>
                    <div>
                        <SizeProduct>
                            <p><strong>Kích thước</strong></p>
                            {product.sizes.map((size, index) => (
                                <SizeBox key={index}>
                                    {size}
                                </SizeBox>
                            ))}
                            <SizeBox>
                                order
                            </SizeBox>
                        </SizeProduct>
                        <div>
                            <p><strong>Màu sắc</strong></p>
                        </div>
                        <div>
                            <Row>
                                <Col span={12}>

                                </Col>
                                <Col span={12}></Col>
                            </Row>
                        </div>
                        <div>
                            ButtonComponent
                        </div>
                    </div>
                </Col>
            </Row>

            <h2>Mô tả sản phẩm</h2>
            <div className="border border-gray-300 rounded-md">
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