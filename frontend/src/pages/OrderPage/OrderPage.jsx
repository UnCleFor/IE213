import React, { useMemo, useState } from 'react';
import { increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct } from '../../redux/slices/orderSlide';
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
  TotalColumn,
  ActionColumn,
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

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const [listChecked, setListChecked] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();

  const priceMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, curr) => {
      return total + ((curr.price * curr.amount))
    }, 0)
    return result
  }, [order])
  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, curr) => {
      if(curr.discount) {
              return total + ((curr.price * curr.amount * (curr.discount / 100)))
      }
      return total
    }, 0)
    return result
  }, [order])
  console.log(order)
  console.log(priceDiscountMemo)

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
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
      const newListChecked = order?.orderItems?.map((item) => item?.product);
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 0) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const totalAmount = order?.orderItems?.reduce((total, item) => {
    if (listChecked.includes(item?.product)) {
      return total + (item?.price * item?.amount);
    }
    return total;
  }, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <PageContainer>
      <ContentContainer>
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
                  <TotalColumn>
                    <HeaderText>Thành tiền</HeaderText>
                  </TotalColumn>
                  <ActionColumn>
                    <DeleteButton onClick={handleRemoveAllOrder}>
                      <DeleteOutlined />
                    </DeleteButton>
                  </ActionColumn>
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
                    <TotalColumn>
                      <PriceText>
                        {convertPrice(orderItem?.price * orderItem?.amount)}
                      </PriceText>
                    </TotalColumn>
                    <ActionColumn>
                      <DeleteButton onClick={() => handleDeleteOrder(orderItem?.product)}>
                        <DeleteOutlined />
                      </DeleteButton>
                    </ActionColumn>
                  </ProductActions>
                </CartItem>
              ))}
            </CartLeft>

            <CartRight>
              <SummaryTitle>Tóm tắt đơn hàng</SummaryTitle>
              <SummaryItem>
                <SummaryLabel>Tạm tính</SummaryLabel>
                <SummaryValue>{convertPrice(priceMemo)}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Giảm giá</SummaryLabel>
                <SummaryValue>{convertPrice(priceDiscountMemo)}</SummaryValue>
              </SummaryItem>
              <TotalPrice>
                <span>Thành tiền</span>
                <span>{convertPrice(priceMemo - priceDiscountMemo)}</span>
              </TotalPrice>
              <CheckoutButton>TIẾN HÀNH THANH TOÁN</CheckoutButton>
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