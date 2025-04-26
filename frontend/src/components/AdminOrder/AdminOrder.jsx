import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { WrapperHeader } from './style'
import { Form, Button, Modal, Switch, Input, Space, Divider, Table } from 'antd';
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import { WrapperUploadFile } from '../AdminProduct/style'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import * as message from '../Message/Message';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as OrderService from '../../services/OrderService';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const AdminOrder = () => {
  // Tách thành 2 form riêng biệt
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const queryClient = useQueryClient();
  const user = useSelector((state) => state?.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isFinishUpdated, setIsFinishUpdated] = useState(false);
  const [isFinishDeletedMany, setIsFinishDeletedMany] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


  const [stateOrder, setStateOrder] = useState({
    _id: '',
    user: '',
    orderItems: [],
    shippingAddress: {
      fullName: '',
      address: '',
      phone: '',
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalDiscount: 0,
    totalPrice: 0,
    isPaid: false,
    isDelivered: false,
    createdAt: '',
  });
  const [stateOrderDetails, setStateOrderDetails] = useState({
    _id: '',
    user: '',
    orderItems: [],
    shippingAddress: {
      fullName: '',
      address: '',
      phone: '',
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalDiscount: 0,
    totalPrice: 0,
    isPaid: false,
    isDelivered: false,
    createdAt: '',
  });

  // const mutation = useMutationHooks((data) => {
  //   const { name, email, phone, avatar, password, confirmPassword } = data;
  //   return UserService.signupUser({ name, email, phone, avatar, password, confirmPassword });
  // });


  const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
    return OrderService.updatedOrder(id, rests, token);
  });

  // const mutationDelete = useMutationHooks(({ id, token }) => {
  //   return UserService.deleteUser(id, token);
  // });

  // const mutationDeleteMany = useMutationHooks(({ token, ...ids }) => {
  //   return UserService.deleteManyUser(ids, token);
  // });

  //const { data, isLoading, isSuccess, isError } = mutation;
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  // const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
  // const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;

  const { isLoading: isLoadingOrder, data: orders } = useQuery({
    queryKey: ['orders', user.access_token], // queryKey thêm token để theo dõi thay đổi
    queryFn: () => OrderService.getAllOrders(user.access_token),
  });

  const fetchGetDetailsOrder = async (rowSelected) => {
    const res = await OrderService.getDetailOrder(rowSelected);
    if (res?.data) {
      setStateOrderDetails({
        _id: res?.data?._id,
        user: res?.data?.user,
        orderItems: res?.data?.orderItems,
        shippingAddress: {
          fullName: res?.data?.shippingAddress?.fullName,
          address: res?.data?.shippingAddress?.address,
          phone: res?.data?.shippingAddress?.phone,
        },
        paymentMethod: res?.data?.paymentMethod,
        itemsPrice: res?.data?.itemsPrice,
        shippingPrice: res?.data?.shippingPrice,
        totalDiscount: res?.data?.totalDiscount,
        totalPrice: res?.data?.totalPrice,
        isPaid: res?.data?.isPaid,
        isDelivered: res?.data?.isDelivered,
        createdAt: res?.data?.createdAt,
      });
      setIsOpenDrawer(true);
    }
    setIsLoadingUpdate(false);
  };
  console.log('orderItems', stateOrderDetails?.orderItems)
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateOrder({
      _id: '',
      user: '',
      orderItems: [],
      shippingAddress: {
        fullName: '',
        address: '',
        phone: '',
      },
      paymentMethod: '',
      itemsPrice: 0,
      shippingPrice: 0,
      totalDiscount: 0,
      totalPrice: 0,
      isPaid: false,
      isDelivered: false,
      createdAt: '',
    });
    //formAdd.resetFields();
    formUpdate.resetFields();
    //mutation.reset();
  };

  // const handleOnchange = (e) => {
  //   setStateUser({
  //     ...stateUser,
  //     [e.target.name]: e.target.value
  //   });
  // };

  const handleOnchangeDetails = (e) => {
    setStateOrderDetails({
      ...stateOrderDetails,
      [e.target.name]: e.target.value
    });
  };

  // const handleOnchangeAvatar = async ({ fileList }) => {
  //   const file = fileList[0];
  //   if (!file) return;

  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   // Cập nhật cả state và form
  //   setStateUser({
  //     ...stateUser,
  //     avatar: file.preview
  //   });
  //   formAdd.setFieldsValue({
  //     avatar: file.preview
  //   });
  // };

  // const handleOnchangeAvatarDetails = async ({ fileList }) => {
  //   const file = fileList[0];
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   setStateUserDetails({
  //     ...stateUserDetails,
  //     avatar: file.preview
  //   });
  // };

  // const handleDeleteUser = () => {
  //   mutationDelete.mutate({
  //     id: rowSelected,
  //     token: user.access_token,
  //   });
  // };

  // const handleDeleteManyUsers = (ids) => {
  //   setIsFinishDeletedMany(true)
  //   mutationDeleteMany.mutate({
  //     ids: ids,
  //     token: user.access_token
  //   })
  // }

  // const onFinish = () => {
  //   mutation.mutate({
  //     ...stateUser,
  //   });
  // };


  const onUpdateOrder = () => {
    setIsFinishUpdated(true)
    mutationUpdate.mutate({
      id: rowSelected,
      token: user.access_token,
      ...stateOrderDetails
    });
  };

  const renderAction = (record) => (
    <div>
      <EditOutlined
        onClick={(e) => {
          e.stopPropagation();
          setRowSelected(record._id);
          fetchGetDetailsOrder(record._id);
        }}
        style={{ color: 'black', fontSize: '30px', paddingLeft: '10px', cursor: 'pointer' }}
      />
      <DeleteOutlined
        onClick={(e) => {
          e.stopPropagation();
          setRowSelected(record._id);
          setIsModalOpenDelete(true);
        }}
        style={{ color: 'red', fontSize: '30px', paddingLeft: '10px', cursor: 'pointer' }}
      />
    </div>
  );

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();          // Xóa bộ lọc hiện tại
    setSearchText('');       // Reset từ khóa tìm kiếm
    confirm();               // Kích hoạt lại lọc (với từ khóa rỗng)
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Đặt lại
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => {
            var _a;
            return (_a = searchInput.current) === null || _a === void 0 ? void 0 : _a.select();
          }, 100);
        }
      },
    },
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      render: (id) => id.substring(0, 8) + '...', // Show shortened ID
      ...getColumnSearchProps('_id'),
    },
    {
      title: 'User ID',
      dataIndex: 'user',
      render: (userId) => userId.substring(0, 8) + '...', // Show shortened user ID
    },
    {
      title: 'Items',
      dataIndex: 'orderItems',
      render: (items) => `${items.length} items`, // Show count of items
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (price) => `${price.toLocaleString()} VND`, // Format price
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Discount',
      dataIndex: 'totalDiscount',
      render: (discount) => `${discount.toLocaleString()} VND`, // Format discount
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      filters: [
        { text: 'Cash on Delivery', value: 'Thanh toán khi nhận hàng' },
        // Add other payment methods if available
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: 'Status',
      dataIndex: 'isDelivered',
      filters: [
        { text: 'Delivered', value: true },
        { text: 'Pending', value: false },
      ],
      onFilter: (value, record) => record.isDelivered === value,
      render: (isDelivered) => isDelivered ? 'Delivered' : 'Pending',
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(), // Format date
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (_, record) => renderAction(record), // Your existing action renderer
    },
  ];


  const dataTable = orders?.data?.map((order) => ({ ...order, key: order._id }));

  // useEffect(() => {
  //   if (isModalOpen) {
  //     formAdd.setFieldsValue(stateUser); // Đồng bộ state vào form mỗi khi mở lại
  //   }
  // }, [isModalOpen]);

  useEffect(() => {
    formUpdate.setFieldsValue(stateOrderDetails);
  }, [formUpdate, stateOrderDetails]);

  // useEffect(() => {
  //   if (isSuccess && data?.status === 'OK') {
  //     message.success('Thêm người dùng thành công!');
  //     handleCancel();
  //     queryClient.invalidateQueries(['users']);
  //   } else if (data?.status === 'ERR') {
  //     message.error('Thêm người dùng thất bại!');
  //   }
  // }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật tình trạng đơn thành công!');
      queryClient.invalidateQueries(['orders']);
      setIsFinishUpdated(false);
      setIsOpenDrawer(false);
    } else if (dataUpdated?.status === 'ERR') {
      setIsFinishUpdated(false);
      message.error('Cập nhật tình trạng đơn hàng thất bại!');
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  // useEffect(() => {
  //   if (isSuccessDeleted && dataDeleted?.status === 'OK') {
  //     message.success('Xóa người dùng thành công!');
  //     queryClient.invalidateQueries(['users']);
  //     setIsModalOpenDelete(false);
  //   } else if (isErrorDeleted) {
  //     message.error('Xóa người dùng thất bại!');
  //   }
  // }, [isSuccessDeleted, isErrorDeleted]);

  // useEffect(() => {
  //   if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
  //     message.success('Xóa các người dùng thành công!');
  //     queryClient.invalidateQueries(['user']);
  //     setIsFinishDeletedMany(false);
  //   } else if (isErrorDeletedMany) {
  //     message.error('Xóa các người dùng thất bại!');
  //   }
  // }, [isSuccessDeletedMany, isErrorDeletedMany]);

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{ marginTop: '20px' }}>
        <TableComponent
          //deleteAll={handleDeleteManyUsers}
          forceRender
          columns={columns}
          isLoading={isLoadingOrder|| isFinishDeletedMany}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id)
          })}
          exportFileName="orders_list"
        />
      </div>
      <DrawerComponent
        title="Chi tiết đơn hàng"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
          mutationUpdate.reset();
        }}
      >
        <Loading isLoading={isLoadingUpdate || isFinishUpdated}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={formUpdate}
            onFinish={onUpdateOrder}
          >
            {/* Order Information */}
            <Form.Item label="Mã đơn hàng">
              <Input value={stateOrderDetails._id} readOnly />
            </Form.Item>

            <Form.Item label="Ngày tạo đơn">
              <Input value={new Date(stateOrderDetails.createdAt).toLocaleString()} readOnly />
            </Form.Item>

            <Form.Item label="Tổng tiền">
              <Input value={`${stateOrderDetails.totalPrice?.toLocaleString()} VND`} readOnly />
            </Form.Item>

            <Form.Item label="Giảm giá">
              <Input value={`${stateOrderDetails.totalDiscount?.toLocaleString()} VND`} readOnly />
            </Form.Item>

            <Form.Item label="Phương thức thanh toán">
              <Input value={stateOrderDetails.paymentMethod} readOnly />
            </Form.Item>

            <Form.Item label="Trạng thái thanh toán">
              <Input value={stateOrderDetails.isPaid ? "Đã thanh toán" : "Chưa thanh toán"} readOnly />
            </Form.Item>

            <Form.Item label="Trạng thái giao hàng">
              <Input value={stateOrderDetails.isDelivered ? "Đã giao" : "Đang xử lý"} readOnly />
            </Form.Item>

            {/* Shipping Address */}
            <Divider orientation="left">Thông tin giao hàng</Divider>

            <Form.Item label="Họ tên người nhận">
              <Input value={stateOrderDetails.shippingAddress?.fullName} readOnly />
            </Form.Item>

            <Form.Item label="Địa chỉ">
              <Input value={stateOrderDetails.shippingAddress?.address} readOnly />
            </Form.Item>

            <Form.Item label="Số điện thoại">
              <Input value={stateOrderDetails.shippingAddress?.phone} readOnly />
            </Form.Item>

            {/* Order Items */}
            <Divider orientation="left">Chi tiết sản phẩm</Divider>

            <TableComponent
              data={stateOrderDetails.orderItems}
              showDeleteAll={false}
              columns={[
                {
                  title: 'Sản phẩm',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text, record) => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={record.image}
                        style={{
                          width: 50,
                          height: 50,
                          marginRight: 10,
                          objectFit: 'cover'
                        }}
                        alt={text}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.png'; // Fallback image
                          e.target.onerror = null;
                        }}
                      />
                      <span>{text}</span>
                    </div>
                  )
                },
                {
                  title: 'Số lượng',
                  dataIndex: 'amount',
                  key: 'amount',
                  align: 'center',
                  render: (amount) => `x${amount}`
                },
                {
                  title: 'Giá gốc',
                  dataIndex: 'price',
                  key: 'price',
                  align: 'right',
                  render: (price) => `${price?.toLocaleString('vi-VN')} ₫`
                },


              ]}
              pagination={false}
              rowKey="_id"
            />
          </Form>
        </Loading>
      </DrawerComponent>


      {/* <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={handleDeleteUser}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc chắn muốn xóa người dùng này không?</div>
        </Loading>
      </ModalComponent>   */}
    </div>
  );
};

export default AdminOrder;
