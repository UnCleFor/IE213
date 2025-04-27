import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { WrapperHeader } from './style'
import { Form, Button, Modal, Switch, Input, Space, Divider, Table, Select, Tabs } from 'antd';
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
import * as UserService from '../../services/UserService';
import OrderReports from '../OrderReports/OrderReports';
import ProductSalesChart from '../ProductSalesChart/ProductSalesChart';
import PerformanceChart from '../PerformanceChart/PerformanceChart';

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
    state: '',
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
    state: '',
  });

  const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
    return OrderService.updatedOrder(id, rests, token);
  });

  const mutationDelete = useMutationHooks(({ id, token }) => {
    return OrderService.deleteOrder(id, token);
  });

  const mutationDeleteMany = useMutationHooks(({ token, ...ids }) => {
    return OrderService.deleteManyOrder(ids, token);
  });

  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;

  const { isLoading: isLoadingOrder, data: orders } = useQuery({
    queryKey: ['orders', user.access_token],
    queryFn: () => OrderService.getAllOrders(user.access_token),
  });

  const fetchGetDetailsOrder = async (rowSelected) => {
    setIsLoadingUpdate(true);
    setIsOpenDrawer(true);
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
        state: res?.data?.state,
      });

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
      state: '',
    });
    formUpdate.resetFields();
  };

  const handleOnchangeDetails = (e) => {
    setStateOrderDetails({
      ...stateOrderDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteOrder = () => {
    mutationDelete.mutate({
      id: rowSelected,
      token: user.access_token,
    });
  };

  const handleDeleteManyOrders = (ids) => {
    setIsFinishDeletedMany(true)
    mutationDeleteMany.mutate({
      ids: ids,
      token: user.access_token
    })
  }

  const handleGetUserEmail = async (id, access_token) => {
    try {
      const res = await UserService.getUserEmail(id, access_token);
      if (res?.status === "OK") {
        return res.data.email; // Trả về chuỗi email
      }
      return "Không xác định"; // Trường hợp lỗi
    } catch (error) {
      console.error("Lỗi khi lấy email:", error);
      return "Lỗi tải email";
    }
  };
  // Tạo cache ở component cha
  const emailCache = useRef(new Map());

  // Component EmailCell với cache
  const EmailCell = ({ userId, token }) => {
    const [email, setEmail] = useState(emailCache.current.get(userId) || "Loading...");

    useEffect(() => {
      if (!emailCache.current.has(userId)) {
        handleGetUserEmail(userId, token).then(email => {
          emailCache.current.set(userId, email);
          setEmail(email);
        });
      }
    }, [userId, token]);

    return <span>{email}</span>;
  };

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
  const getColumnEmailSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm theo email`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => {
              clearFilters?.();
              confirm(); // Xóa filter và đóng dropdown
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      </div>
    ),
    onFilter: (value, record) => {
      const email = emailCache.current.get(record.user) || '';
      return email.toLowerCase().includes(value.toLowerCase());
    },
  });

  const columns = [
    {
      title: 'Ordered Account',
      dataIndex: 'user',
      render: (id) => <EmailCell userId={id} token={user?.access_token} />,
      ...getColumnEmailSearchProps('user'), // Sử dụng hàm search mới
      sorter: (a, b) => {
        const emailA = emailCache.current.get(a.user) || '';
        const emailB = emailCache.current.get(b.user) || '';
        return emailA.localeCompare(emailB);
      },
    },
    {
      title: 'Items',
      dataIndex: 'orderItems',
      render: (items) => `${items.length} items`,
      sorter: (a, b) => a.orderItems.length - b.orderItems.length,
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      render: (price) => `${price.toLocaleString()} VND`, // Format price
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    // {
    //   title: 'Discount',
    //   dataIndex: 'totalDiscount',
    //   render: (discount) => `${discount.toLocaleString()} VND`, // Format discount
    // },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      filters: [
        { text: 'Thanh toán khi nhận hàng', value: 'Thanh toán khi nhận hàng' },
        { text: 'Chuyển khoản ngân hàng', value: 'Chuyển khoản ngân hàng' },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      filters: [
        { text: 'Đã thanh toán', value: true },
        { text: 'Chưa thanh toán', value: false },
      ],
      onFilter: (value, record) => record.isPaid === value,
      render: (isPaid) => isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
    },
    {
      title: 'Status',
      dataIndex: 'isDelivered',
      filters: [
        { text: 'Đã giao', value: true },
        { text: 'Đang xử lý', value: false },
      ],
      onFilter: (value, record) => record.isDelivered === value,
      render: (isDelivered) => isDelivered ? 'Đã giao' : 'Đang xử lý',
    },
    {
      title: 'State',
      dataIndex: 'state',
      filters: [
        { text: 'Đã đặt', value: 'Đã đặt' },
        { text: 'Đã xác nhận', value: 'Đã xác nhận' },
        { text: 'Đang giao hàng', value: 'Đang giao hàng' },
        { text: 'Đã giao', value: 'Đã giao' },
        { text: 'Đã hủy', value: 'Đã hủy' },
      ],
      onFilter: (value, record) => record.state === value,
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(), // Format date
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      // defaultSortOrder: 'descend',
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

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Xóa đơn hàng thành công!');
      queryClient.invalidateQueries(['orders']);
      setIsModalOpenDelete(false);
    } else if (isErrorDeleted) {
      message.error('Xóa đơn hàng thất bại!');
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success('Xóa các đơn hàng thành công!');
      queryClient.invalidateQueries(['orders']);
      setIsFinishDeletedMany(false);
    } else if (isErrorDeletedMany) {
      message.error('Xóa các đơn hàng thất bại!');
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  const items = [
    {
      key: '1',
      label: 'Danh sách đơn hàng',
      children: (
        <div style={{ marginTop: '20px' }}>
          <TableComponent
            deleteAll={handleDeleteManyOrders}
            forceRender
            columns={columns}
            isLoading={isLoadingOrder || isFinishDeletedMany}
            data={dataTable}
            onRow={(record) => ({
              onClick: () => setRowSelected(record._id)
            })}
            exportFileName="orders_list"
          />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Báo cáo thống kê tổng quát',
      children: <OrderReports orders={orders} access_token={user?.access_token} isLoading={isLoadingOrder || isFinishDeletedMany}/>,
    },
    {
      key: '3',
      label: 'Top sản phẩm bán chạy',
      children: <ProductSalesChart orders={orders} isLoading={isLoadingOrder || isFinishDeletedMany}/>,
    },
    {
      key: '4',
      label: 'Hiệu suất bán hàng theo thời gian',
      children: <PerformanceChart orders={orders} isLoading={isLoadingOrder || isFinishDeletedMany} />,
    },
  
  ];
  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <Tabs defaultActiveKey="1" items={items} />
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

            <Form.Item
              label={<span style={{ fontWeight: 'bold', color: '#1890ff' }}>Trạng thái thanh toán</span>}
              name="isPaid"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái thanh toán' }]}
            >
              <Select
                value={stateOrderDetails.isPaid}
                onChange={(value) => handleOnchangeDetails({ target: { name: 'isPaid', value } })}
                options={[
                  { value: false, label: 'Chưa thanh toán' },
                  { value: true, label: 'Đã thanh toán' }
                ]}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ fontWeight: 'bold', color: '#1890ff' }}>Trạng thái giao hàng</span>}
              name="isDelivered"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái giao hàng' }]}
            >
              <Select
                value={stateOrderDetails.isDelivered}
                onChange={(value) => handleOnchangeDetails({ target: { name: 'isDelivered', value } })}
                options={[
                  { value: false, label: 'Đang xử lý' },
                  { value: true, label: 'Đã giao' }
                ]}
              />
            </Form.Item>

            <Form.Item 
              label={<span style={{ fontWeight: 'bold', color: '#1890ff' }}>Trạng thái đơn hàng</span>}
              name="state"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn hàng' }]}
            >
              <Select
                value={stateOrderDetails.state}
                onChange={(value) => handleOnchangeDetails({ target: { name: 'state', value } })}
                options={[
                  { value: 'Đã đặt', label: 'Đã đặt' },
                  { value: 'Đã xác nhận', label: 'Đã xác nhận' },
                  { value: 'Đang giao hàng', label: 'Đang giao hàng' },
                  { value: 'Đã giao', label: 'Đã giao' },
                  { value: 'Đã hủy', label: 'Đã hủy' }
                ]}
              />
            </Form.Item>
            {dataUpdated?.status === 'ERR' && <span style={{ color: 'red' }}>{dataUpdated?.message}</span>}
            <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
              <Button type="primary" htmlType="submit">Áp dụng</Button>
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
      <ModalComponent
        title="Xóa đơn hàng"
        open={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={handleDeleteOrder}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc chắn muốn xóa đơn hàng này không?</div>
        </Loading>
      </ModalComponent>  
    </div>
  );
};
export default AdminOrder;
