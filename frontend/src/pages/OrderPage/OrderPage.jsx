import React, { useEffect, useMemo, useState } from 'react';
import { increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder } from '../../redux/slices/orderSlide';
import {
  PageContainer,
  ContentContainer,
  CartTitle,
  CartLayout,
  CartLeft,
  CartRight,
  CartHeader,
  CheckboxContainer,
  Checkbox,
  HeaderText,
  HeaderActions,
  CartItem,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductName,
  ProductActions,
  PriceColumn,
  QuantityColumn,
  PriceText,
  OriginalPrice,
  QuantityControl,
  QuantityButton,
  DisabledQuantityButton,
  QuantityInput,
  QuantityInputWrapper,
  DeleteButton,
  SummaryTitle,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  TotalPrice,
  CheckoutButton,
  EmptyCart
} from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import { BreadcrumbWrapper } from "../../components/BreadcrumbComponent/style";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const navigate = useNavigate()
  const [listChecked, setListChecked] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked])

  const priceMemo = useMemo(() => {
    return order?.orderItems?.reduce((total, curr) => total + (curr.price * curr.amount), 0);
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    return order?.orderItems?.reduce((total, curr) => {
      return curr.discount ? total + (curr.price * curr.amount * (curr.discount / 100)) : total;
    }, 0);
  }, [order]);

  const totalQuantity = useMemo(() => {
    return order?.orderItems?.reduce((total, item) => {
      return listChecked.includes(item?.product) ? total + item?.amount : total;
    }, 0);
  }, [order, listChecked]);

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      setListChecked(listChecked.filter((item) => item !== e.target.value));
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCount = (type, idProduct) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ idProduct }));
    } else {
      const product = order.orderItems.find(item => item.product === idProduct);
      if (product && product.amount > 1) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleInputChange = (value, idProduct) => {
    setInputValues(prev => ({ ...prev, [idProduct]: value }));

    if (value >= 1) {
      const currentItem = order.orderItems.find(item => item.product === idProduct);
      if (currentItem) {
        const difference = value - currentItem.amount;
        if (difference > 0) {
          for (let i = 0; i < difference; i++) {
            dispatch(increaseAmount({ idProduct }));
          }
        } else if (difference < 0) {
          for (let i = 0; i < Math.abs(difference); i++) {
            if (currentItem.amount > 1) {
              dispatch(decreaseAmount({ idProduct }));
            }
          }
        }
      }
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      setListChecked(order?.orderItems?.map((item) => item?.product));
    } else {
      setListChecked([]);
    }
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleAddCard = () => {
    console.log("alo")
    navigate('/checkout')
  }

  const styles = {
    breadcrumbWrapper: {
      marginBottom: 20,  // Điều chỉnh khoảng cách nếu cần
      marginLeft: '20px',  // Căn giữa nếu cần
      marginRight: 'auto',  // Căn giữa nếu cần
    },
  };
  return (
    <PageContainer>
      <ContentContainer>
      <div style={styles.breadcrumbWrapper}>
                <BreadcrumbComponent
                        breadcrumbs={[
                            { name: "Trang chủ", link: "/" },
                            { name: "Giỏ hàng", isCurrent: true },
                        ]}
                    />
          </div>

        <CartTitle>Giỏ hàng của bạn</CartTitle>

        {order?.orderItems?.length > 0 ? (
          <CartLayout>
            <CartLeft>
              <CartHeader>
                <CheckboxContainer>
                  <Checkbox
                    onChange={handleOnchangeCheckAll}
                    checked={listChecked?.length === order?.orderItems?.length}
                  />
                  <HeaderText>Sản phẩm ({order?.orderItems?.length})</HeaderText>
                </CheckboxContainer>
                <HeaderActions>
                  <PriceColumn>
                    <HeaderText>Đơn giá</HeaderText>
                  </PriceColumn>
                  <QuantityColumn>
                    <HeaderText>Số lượng</HeaderText>
                  </QuantityColumn>
                </HeaderActions>
              </CartHeader>

              {order?.orderItems?.map((orderItem) => (
                <CartItem key={orderItem?.product}>
                  <ProductInfo>
                    <Checkbox
                      onChange={onChange}
                      value={orderItem?.product}
                      checked={listChecked.includes(orderItem?.product)}
                    />
                    <ProductImage src={orderItem?.image} alt={orderItem?.name} />
                    <ProductDetails>
                      <ProductName>{orderItem?.name}</ProductName>
                      <DeleteButton onClick={() => handleDeleteOrder(orderItem?.product)}>
                        <DeleteOutlined /> Xóa
                      </DeleteButton>
                    </ProductDetails>
                  </ProductInfo>

                  <ProductActions>
                    <PriceColumn>
                      <PriceText>{convertPrice(orderItem?.price)}</PriceText>
                      {orderItem?.originalPrice && (
                        <OriginalPrice>{convertPrice(orderItem?.originalPrice)}</OriginalPrice>
                      )}
                    </PriceColumn>

                    <QuantityColumn>
                      <QuantityControl>
                        {orderItem.amount <= 1 ? (
                          <DisabledQuantityButton>
                            <MinusOutlined style={{ fontSize: '12px' }} />
                          </DisabledQuantityButton>
                        ) : (
                          <QuantityButton
                            onClick={() => handleChangeCount('decrease', orderItem?.product)}
                          >
                            <MinusOutlined style={{ fontSize: '12px' }} />
                          </QuantityButton>
                        )}

                        <QuantityInputWrapper>
                          <QuantityInput
                            min={1}
                            value={orderItem.amount}
                            onChange={(value) => handleInputChange(value, orderItem.product)}
                          />
                        </QuantityInputWrapper>

                        <QuantityButton
                          onClick={() => handleChangeCount('increase', orderItem?.product)}
                        >
                          <PlusOutlined style={{ fontSize: '12px' }} />
                        </QuantityButton>
                      </QuantityControl>
                    </QuantityColumn>
                  </ProductActions>
                </CartItem>
              ))}
            </CartLeft>

            <CartRight>
              <SummaryTitle>Thông tin đơn hàng</SummaryTitle>

              {listChecked.length > 0 ? (
                <>
                  <SummaryItem>
                    <SummaryLabel>Tạm tính ({totalQuantity} sản phẩm)</SummaryLabel>
                    <SummaryValue>
                      {convertPrice(
                        order?.orderItems?.reduce((total, item) => {
                          return listChecked.includes(item?.product)
                            ? total + (item?.price * item?.amount)
                            : total;
                        }, 0)
                      )}
                    </SummaryValue>
                  </SummaryItem>

                  {priceDiscountMemo > 0 && (
                    <SummaryItem>
                      <SummaryLabel>Giảm giá</SummaryLabel>
                      <SummaryValue style={{ color: '#ff4d4f' }}>
                        -{convertPrice(priceDiscountMemo)}
                      </SummaryValue>
                    </SummaryItem>
                  )}

                  <p style={{ color: '#666', fontSize: '14px', margin: '10px 0' }}>
                    Phí vận chuyển được tính ở trang thanh toán.
                  </p>

                  <TotalPrice>
                    <span>Tổng cộng</span>
                    <span>
                      {convertPrice(
                        order?.orderItems?.reduce((total, item) => {
                          if (listChecked.includes(item?.product)) {
                            const discount = item.discount
                              ? (item.price * item.amount * (item.discount / 100))
                              : 0;
                            return total + (item.price * item.amount) - discount;
                          }
                          return total;
                        }, 0)
                      )}
                    </span>
                  </TotalPrice>
                </>
              ) : (
                <p style={{ color: '#666', fontSize: '14px' }}>
                  Vui lòng chọn sản phẩm để xem thông tin đơn hàng.
                </p>
              )}

              <CheckoutButton
                disabled={listChecked.length === 0}
                style={{
                  position: 'relative',
                  opacity: listChecked.length === 0 ? 0.7 : 1,
                }}
                onClick={handleAddCard}
              >
                TIẾN HÀNH THANH TOÁN
              </CheckoutButton>
            </CartRight>
          </CartLayout>
        ) : (
          <EmptyCart>
            <h3>Giỏ hàng của bạn đang trống</h3>
            <p>Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm</p>
          </EmptyCart>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default OrderPage;