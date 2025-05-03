import { Col, Image, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import imageProduct from '../../assets/images/z6436857502524_b8df322fa070c2dd15fc904c2ee1c100.jpg'
import imageProductSmall from '../../assets/images/z6436857450475_595921696663d0fe0f381a7c4efb9de6.jpg'
import { DetailsCell, RowDetail, SizeBox, SizeProduct, TableProductDetails, TitleCell, WrapperBtnBuy, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStylePriceProduct, WrapperQuantity } from './style'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addOrderProduct, buyNowProduct } from '../../redux/slices/orderSlide'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent'
import CommentComponent from '../CommentComponent/CommentComponent'
import { convertPrice, initFacebookSDK } from '../../utils'
import Loading from '../LoadingComponent/Loading'
import SliderComponent from '../SliderComponent/SliderComponent'
import ProductImageGallery from '../ProductImageGallery/ProductImageGallery'
import ContainerComponent from '../ContainerComponent/ContainerComponent'
import * as message from '../Message/Message'
import BreadcrumbComponent from '../BreadcrumbComponent/BreadcrumbComponent'

const ProductDetailsComponent = ({ idProduct }) => {
    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [selectedColor, setSelectedColor] = useState(null);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const fetchGetDetailsProduct = async (context) => {
        setIsLoadingDetail(true)
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data
        }
        setIsLoadingDetail(false)
    };

    useEffect(() => {
        initFacebookSDK()
    }, [])

    const { isLoading, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct
    });

    // useEffect(() => {
    //      if (order.isSucessOrder) {
    //         message.success('Đã thêm vào giỏ hàng')
    //      }
    // })

    const handleIncrease = () => {
        if (productDetails?.countInStock > quantity) {
            setQuantity(prev => prev + 1);
        } else {
            message.warning('Số lượng mua vượt quá số lượng tồn kho');
        }
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
        } else if (productDetails?.countInStock === 0) {
            message.error('Sản phẩm đã hết hàng');
        } else {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: quantity,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id,
                    discount: productDetails?.discount,
                    countInStock: productDetails?.countInStock
                }
            }))
            message.success('Thêm vào giỏ hàng thành công');
        }
    }

    const handleBuyNow = () => {
        if (!user?.id) {
            navigate('/sign_in', { state: location?.pathname })
        } else if (productDetails?.countInStock === 0) {
            message.error('Sản phẩm đã hết hàng');
        } else {
            dispatch(buyNowProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: quantity,
                    image: productDetails?.image,
                    price: productDetails?.price,
                    product: productDetails?._id,
                    discount: productDetails?.discount,
                    countInStock: productDetails?.countInStock
                }
            }))
            navigate('/checkout')
        }
    }
    useEffect(() => {
        // Mặc định chọn màu đầu tiên trong mảng màu nếu có
        if (productDetails?.colors && productDetails?.colors.length > 0) {
            setSelectedColor(productDetails.colors[0]);
        }
    }, [productDetails]);
    const breadcrumbs = [
        { name: 'Trang chủ', link: '/' },
        { 
          name: productDetails?.room, 
          link: `/product/${productDetails?.room}`,
          navigateOptions: { state: { filterBy: 'room' } }
        },
        {
          name: productDetails?.type,
          link: `/product/${productDetails?.type}`,
          navigateOptions: { state: { filterBy: 'type' } }
        },
        {
          name: productDetails?.name,
          isCurrent: true
        }
      ];
    return (
        isLoading  ? (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Spin size="large" />
            </div>
        ) : (<div> <BreadcrumbComponent breadcrumbs={breadcrumbs}/>
            <Row style={{ padding: '16px 0px', background: 'white' }} gutter={[16, 16]}>

                {/* Căn giữa slide trong cột */}
                <ProductImageGallery productDetails={productDetails} />

                <Col xs={24} sm={12} md={14} lg={14} style={{ padding: '0px 20px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    {/* <p><strong>Mã sản phẩm:</strong> {product.code}</p> */}
                    <p><strong>Số lượng còn lại:</strong> {productDetails?.countInStock}</p>
                    <p><strong>Thương hiệu:</strong> {productDetails?.brand}</p>
                    <p><strong>Phân khúc:</strong> {productDetails?.type}</p>
                    <p><strong>Nhóm sản phẩm:</strong> {`${productDetails?.type}, ${productDetails?.room}`}</p>

                    <WrapperStylePriceProduct>
                        {/* Giá gốc - có gạch ngang nếu có discount */}
                        {productDetails?.discount > 0 ? (
                            <span style={{ textDecoration: 'line-through', color: '#666', fontSize: '20px' }}>
                                {convertPrice(productDetails?.price)}
                            </span>
                        ) : (
                            convertPrice(productDetails?.price)
                        )}

                        {/* Hiển thị giá sau discount nếu có */}
                        {productDetails?.discount > 0 && (
                            <div style={{ color: '#ff424e', fontWeight: 'bold', marginTop: '4px', color: 'brown' }}>
                                {convertPrice(productDetails?.price * (1 - productDetails?.discount / 100))}
                                <span style={{ fontSize: '14px', marginLeft: '4px' }}>
                                    (-{productDetails?.discount}%)
                                </span>
                            </div>
                        )}
                        {/* Nút chia sẻ - đã điều chỉnh margin */}
                        <LikeButtonComponent dataHref={"https://developers.facebook.com/docs/plugins/"} />
                    </WrapperStylePriceProduct>

                    <SizeProduct>
                        <p><strong>Kích thước</strong></p>
                        {productDetails?.size && (
                            <SizeBox>
                                {`${productDetails.size.length}mm x ${productDetails.size.width}mm x ${productDetails.size.height}mm`}
                            </SizeBox>
                        )}
                    </SizeProduct>

                    {selectedColor && (
                        <p style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: 0, marginBottom: '18px', marginTop: '10px' }}>
                            <strong>Màu sắc: </strong>
                            <span style={{ fontWeight: 'normal' }}>{selectedColor}</span>
                        </p>
                    )}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {productDetails?.colors?.map((color, index) => {
                            const colorMap = {
                                'Đỏ': '#ff0000',
                                'Xanh': '#0000ff',
                                'Vàng': '#ffff00',
                                'Trắng': '#ffffff',
                                'Đen': '#000000',
                                // Thêm các màu khác nếu cần
                            };
                            const colorCode = colorMap[color] || '#cccccc';
                            return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedColor(color)}
                                    style={{
                                        marginLeft: '10px',
                                        width: '60px',
                                        height: '60px',
                                        backgroundColor: colorCode,
                                        border: color === 'Trắng' ? '1px solid #ddd' : 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: color === 'Đen' ? '#fff' : '#000',
                                        // Thêm border khi được chọn
                                        outline: selectedColor === color ? '2px solid #000' : 'none',
                                        outlineOffset: '4px', // Khoảng cách giữa border và box
                                        transition: 'all 0.2s ease' // Hiệu ứng mượt khi chuyển đổi
                                    }}
                                >

                                </div>
                            );
                        })}
                    </div>

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


                    <WrapperBtnBuy>
                        <div>
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
                                textButton="Mua ngay"
                                onClick={handleBuyNow}
                                styleTextButton={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                }}
                            ></ButtonComponent>
                            {/* {order?.isErrorOrder && <div style={{marginTop: '8px', color: 'red'}}>Sản phẩm đã hết hàng</div>}  */}
                        </div>
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
                            onClick={handleAddOrderProduct}
                            textButton="Thêm vào giỏ hàng"
                            styleTextButton={{
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        ></ButtonComponent>
                    </WrapperBtnBuy>
                </Col>
            </Row>

            <h2>Mô tả sản phẩm</h2>
            <div className="border border-gray-300 rounded-md" style={{ paddingBottom: "20px" }}>
                <TableProductDetails>
                    <tbody>
                        <RowDetail style={{ backgroundColor: '#f9f9f9' }}>
                            <TitleCell>Mô tả</TitleCell>
                            <DetailsCell>
                                {productDetails?.description}
                            </DetailsCell>
                        </RowDetail>
                        <RowDetail>
                            <TitleCell>Thanh toán</TitleCell>
                            <DetailsCell>
                                Thanh toán & Trả góp 0% qua thẻ tín dụng
                            </DetailsCell>
                        </RowDetail>
                        <RowDetail style={{ backgroundColor: '#f9f9f9' }}>
                            <TitleCell>Liên hệ</TitleCell>
                            <DetailsCell>
                                Hotline: 0931 799 744 (Liên hệ để được tư vấn và đặt hàng theo yêu cầu)
                            </DetailsCell>
                        </RowDetail>
                    </tbody>
                </TableProductDetails>
            </div>
            <CommentComponent dataHref={"https://developers.facebook.com/docs/plugins/comments#configurator"} width="1115" />
        </div>)

    )
}

export default ProductDetailsComponent;