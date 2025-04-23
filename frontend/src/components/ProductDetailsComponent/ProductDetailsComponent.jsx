import { Col, Image, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import imageProduct from '../../assets/images/z6436857502524_b8df322fa070c2dd15fc904c2ee1c100.jpg'
import imageProductSmall from '../../assets/images/z6436857450475_595921696663d0fe0f381a7c4efb9de6.jpg'
import { DetailsCell, RowDetail, SizeBox, SizeProduct, TableProductDetails, TitleCell, WrapperBtnBuy, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStylePriceProduct, WrapperQuantity } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addOrderProduct } from '../../redux/slices/orderSlide'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'
import { initFacebookSDK } from '../../utils'

const ProductDetailsComponent = ({ idProduct }) => {
    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data
        }
    };

    useEffect(() => {
        initFacebookSDK()
    }, [])

    const { isLoading, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct
    });
    console.log('productDetails', productDetails)

    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };

    console.log('location', location)

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign_in', { state: location?.pathname })
        } else {
            // {
            //     name: { type: String, required: true },
            //     amount: { type: Number, required: true },
            //     image: { type: String, required: true },
            //     price: { type: Number, required: true },
            //     // tham chiếu đến bảng Product
            //     product: {
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref: 'Product',
            //         required: true,
            //     },
            // },
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: quantity,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id
                }
            }))
        }
    }
    console.log('productDetails', productDetails, user)

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
        <isLoading isLoading={isLoading}>
            <div>
                <Row style={{ padding: '16px 0px', background: 'white' }} gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={10} lg={10}>
                        <Image src={productDetails?.image} alt="image product" preview={false} style={{ width: '100%', padding: "10px 0px" }} />
                        <Row gutter={[8, 8]} justify="center">
                            {[...Array(5)].map((_, index) => (
                                <Col key={index} xs={4} sm={4} md={4} lg={4}>
                                    <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    <Col xs={24} sm={12} md={14} lg={14} style={{ padding: '0px 20px' }}>
                        <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                        <p><strong>Mã sản phẩm:</strong> {product.code}</p>
                        <p><strong>Tình trạng:</strong> {product.status}</p>
                        <p><strong>Thương hiệu:</strong> {product.brand}</p>
                        <p><strong>Phân khúc:</strong> {product.category}</p>
                        <p><strong>Nhóm sản phẩm:</strong> {product.tags.join(", ")}</p>

                        <WrapperStylePriceProduct>
                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(productDetails?.price)}
                        </WrapperStylePriceProduct>

                        <SizeProduct>
                            <p><strong>Kích thước</strong></p>
                            {product.sizes.map((size, index) => (
                                <SizeBox key={index}>{size}</SizeBox>
                            ))}
                        </SizeProduct>

                        <LikeButtonComponent dataHref={"https://developers.facebook.com/docs/plugins/"} />

                        <p><strong>Màu sắc</strong></p>

                        <WrapperQuantity>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
                                <ButtonComponent
                                    size="middle"
                                    textButton={<MinusOutlined />}
                                    styleButton={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: 'transparent',
                                        borderRadius: '0px',
                                        border: '1px solid black',
                                        boxShadow: 'none'
                                    }}
                                    styleTextButton={{
                                        color: '#000',
                                        fontSize: '15px',
                                    }}
                                    onClick={handleDecrease}
                                />
                                <div style={{ fontSize: '18px', minWidth: '32px', textAlign: 'center' }}>{quantity}</div>
                                <ButtonComponent
                                    size="middle"
                                    onClick={handleIncrease}
                                    textButton={<PlusOutlined />}
                                    styleButton={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: 'transparent',
                                        borderRadius: '0px',
                                        border: '1px solid black',
                                        boxShadow: 'none'
                                    }}
                                    styleTextButton={{
                                        color: '#000',
                                        fontSize: '15px',
                                    }}
                                />
                            </div>
                        </WrapperQuantity>

                        {/* <Row>
                        <Col span={12}></Col>
                        <Col span={12}></Col>
                    </Row> */}

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
                                onClick={handleAddOrderProduct}
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
                <CommentComponent dataHref={"https://developers.facebook.com/docs/plugins/comments#configurator"} width="1115"/>
            </div>
        </isLoading>
    )
}

export default ProductDetailsComponent;