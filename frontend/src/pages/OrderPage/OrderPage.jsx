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
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { Button, Form, Switch } from 'antd';
import { WrapperUploadFile } from '../../components/AdminProduct/style';
import { useForm } from 'antd/es/form/Form';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [rowSelected, setRowSelected] = useState('');
  const [isFinishUpdated, setIsFinishUpdated] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
    return UserService.updateUser(id, rests, token);
  });
  const { isLoading, data} = mutationUpdate
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;

  const [form] = useForm()

  const dispatch = useDispatch();

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, curr) => {
      return total + ((curr.price * curr.amount))
    }, 0)
    return result
  }, [order])
  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, curr) => {
      if (curr.discount) {
        return total + ((curr.price * curr.amount * (curr.discount / 100)))
      }
      return total
    }, 0)
    return result
  }, [order])

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

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }))
  }, [listChecked])

  
    useEffect(() => {
      form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

  useEffect(() => {
    if(isOpenModalUpdateInfo) {
      setStateUserDetails({
        ...stateUserDetails,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
        email: user?.email
      })
    }
  }, [isOpenModalUpdateInfo])

  const totalPrice = order?.orderItems?.reduce((total, item) => {
    if (listChecked.includes(item?.product)) {
      return total + (item?.price * item?.amount);
    }
    return total;
  }, 0);

  const totalDiscount = order?.orderItems?.reduce((total, item) => {
    if (listChecked.includes(item?.product)) {
      if (item.discount) {
        return total + (item?.price * item?.amount * (item?.discount / 100));
      }
      return total
    }
    return total;
  }, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleAddCard = () => {
    if(!order?.orderItemsSelected?.length) {
      message.error('Bạn chưa chọn sản phẩm')
    } else if (!user?.phone || !user?.address || !user?.name) {
      setIsOpenModalUpdateInfo(true)
    }
  }

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      address: ''    
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false)
  }
  console.log('data', data)
  const handleUpdateInfoUser = () => {
    console.log('stateUserDetails', stateUserDetails)
    const { name, email, phone, address } = stateUserDetails
    if (name && email && phone && address) {
      setIsFinishUpdated(true)
      mutationUpdate.mutate({
        id: user?.id,
        token: user?.access_token,
        ...stateUserDetails
      }, {
        onSuccess: () => {
          dispatch(UserService.updateUser({ name, email, phone, address }))
          setIsOpenModalUpdateInfo(false)
        }
      });
    };
  }

const handleOnchangeDetails = (e) => {
  setStateUserDetails({
    ...stateUserDetails,
    [e.target.name]: e.target.value
  });
};

const onUpdateUser = () => {
  //console.log('onUpdateUser called'); // Đảm bảo sự kiện này được gọi
  setIsFinishUpdated(true)
  mutationUpdate.mutate({
    id: rowSelected,
    token: user.access_token,
    ...stateUserDetails
  });
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
            <CheckoutButton onClick={() => { handleAddCard() }}>TIẾN HÀNH THANH TOÁN</CheckoutButton>
          </CartRight>
        </CartLayout>
      ) : (
        <EmptyCart>
          <h3>Giỏ hàng của bạn đang trống</h3>
          <p>Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm</p>
        </EmptyCart>
      )}
    </ContentContainer>
    <ModalComponent
      title="Cập nhật thông tin giao hàng"
      open={isOpenModalUpdateInfo}
      onCancel={handleCancelUpdate}
      onOk={handleUpdateInfoUser}
    >
      <Loading isLoading={isLoadingUpdated}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
      // onFinish={onUpdateUser}  // Vẫn giữ onFinish nếu bạn muốn form submit qua button submit
      >
        {['name', 'email', 'phone', 'address'].map((field) => (
          <Form.Item
            key={field}
            label={field}
            name={field}
            rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
          >
            <InputComponent value={stateUserDetails[field]} onChange={handleOnchangeDetails} name={field} />
          </Form.Item>
        ))}
        {dataUpdated?.status === 'ERR' && <span style={{ color: 'red' }}>{dataUpdated?.message}</span>}
        {/* Nút Cập nhật thủ công */}
      </Form>
      </Loading>
    </ModalComponent>
  </PageContainer>
);
};

export default OrderPage;