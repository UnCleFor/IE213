import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Button, Modal, Space, Select, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

import { WrapperHeader, WrapperUploadFile } from './style';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import Loading from '../LoadingComponent/Loading';
import * as ProductService from '../../services/ProductService';
import * as message from '../../components/Message/Message';
import { getBase64 } from '../../utils';
import ModalComponent from '../ModalComponent/ModalComponent';
import numeral from 'numeral';
const AdminProduct = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state?.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isFinishUpdated, setIsFinishUpdated] = useState(false);
  const [isFinishDeletedMany, setIsFinishDeletedMany] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState('');

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: '',
    image: '',
    images: [],
    type: '',
    price: '',
    countInStock: '',
    description: '',
    room: '',      // Thêm phòng
    brand: '',     // Thêm thương hiệu
    origin: '',    // Thêm xuất xứ
    discount: '',  // Thêm giảm giá
    selled: '',    // Thêm số lượng đã bán
    colors: [],    // Thêm màu sắc
    size: {
      length: '',
      width: '',
      height: ''
    }
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    image: '',
    images: [],
    type: '',
    price: '',
    countInStock: '',
    description: '',
    room: '',      // Thêm phòng
    brand: '',     // Thêm thương hiệu
    origin: '',    // Thêm xuất xứ
    discount: '',  // Thêm giảm giá
    selled: '',    // Thêm số lượng đã bán
    colors: [],    // Thêm màu sắc
    size: {
      length: '',
      width: '',
      height: ''
    }
  });
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(stateProductDetails?.room || '');

  const mutation = useMutationHooks((data) => {
    const { name, image, images, type, price, countInStock, description, room, brand, origin, discount, colors, size } = data;
    return ProductService.createProduct({ name, image, images, type, price, countInStock, description, room, brand, origin, discount, colors, size });
  });

  const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
    return ProductService.updateProduct(id, rests, token);
  });

  const mutationDelete = useMutationHooks(({ id, token }) => {
    return ProductService.deleteProduct(id, token);
  });

  const mutationDeleteMany = useMutationHooks(({ token, ...ids }) => {
    return ProductService.deleteManyProduct(ids, token);
  });

  console.log('mutationDeleteMany', mutationDeleteMany)

  const { data, isLoading, isSuccess, isError } = mutation;
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;
  const getAllProducts = async () => {
    const res = await ProductService.getAllProductAdmin();
    return res;
  };

  const { isLoading: isLoadingProduct, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const fetchGetDetailsProduct = async (rowSelected) => {
    setIsLoadingUpdate(true);
    setIsOpenDrawer(true);

    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        images: res?.data?.images || [],
        type: res?.data?.type,
        price: res?.data?.price,
        countInStock: res?.data?.countInStock,
        description: res?.data?.description,
        room: res?.data?.room || '',
        brand: res?.data?.brand || '',
        origin: res?.data?.origin || '',
        discount: res?.data?.discount || '',
        selled: res?.data?.selled || '',
        colors: res?.data?.colors || [],
        size: {
          length: res?.data?.size?.length || '',
          width: res?.data?.size?.width || '',
          height: res?.data?.size?.height || ''
        }
      });

    }
    setIsLoadingUpdate(false);
  };

  const handleDetailsProduct = () => {
    if (rowSelected) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  };



  const handleCancel = () => {

    setIsModalOpen(false);

    setStateProduct({
      name: '',
      image: '',
      images: [],
      type: '',
      price: '',
      countInStock: '',
      description: '',
      room: '',      // Thêm phòng
      brand: '',     // Thêm thương hiệu
      origin: '',    // Thêm xuất xứ
      discount: '',  // Thêm giảm giá
      selled: '',    // Thêm số lượng đã bán
      colors: [],    // Thêm màu sắc
      size: {
        length: '',
        width: '',
        height: ''
      }
    });
    form.resetFields();
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    if (name === 'length' || name === 'width' || name === 'height') {
      setStateProduct((prevState) => ({
        ...prevState,
        size: {
          ...(prevState.size || {}),
          [name]: value
        }
      }));
    } else {
      setStateProduct((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };



  const handleOnchangeDetails = (e) => {
    const { name, value } = e.target;

    // Xử lý cho các trường liên quan đến size nếu cần (ví dụ: length, width, height)
    if (name === 'length' || name === 'width' || name === 'height') {
      setStateProductDetails((prevState) => ({
        ...prevState,
        size: {
          ...(prevState.size || {}),
          [name]: value
        }
      }));
    } else {
      setStateProductDetails((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };


  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    });
  };

  const handleOnchangeImages = async ({ fileList }) => {
    const newImages = await Promise.all(fileList.map(file => getBase64(file.originFileObj)));
    setStateProduct({
      ...stateProduct,
      images: newImages
    });
  };
  const handleOnchangeImagesDetails = async ({ fileList }) => {
    const newImages = await Promise.all(
      fileList.map(file => {
        if (file.originFileObj) {
          return getBase64(file.originFileObj); // ảnh mới upload
        }
        return file.url || file.thumbUrl; // ảnh cũ đã có
      })
    );
    setStateProductDetails(prev => ({
      ...prev,
      images: newImages
    }));
  };


  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const onFinish = () => {
    mutation.mutate(stateProduct);
  };

  const onUpdateProduct = () => {
    setIsFinishUpdated(true);
    mutationUpdate.mutate({
      id: rowSelected,
      token: user.access_token,
      ...stateProductDetails
    });
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate({
      id: rowSelected,
      token: user.access_token,
    });
    // Đóng modal sau khi xóa thành công

  };
  const handleDeleteManyProducts = (ids) => {
    setIsFinishDeletedMany(true)
    mutationDeleteMany.mutate({
      ids: ids,
      token: user.access_token
    })
  }

  const renderAction = (record) => (
    <div>
      <EditOutlined
        onClick={(e) => {
          e.stopPropagation(); // Ngăn click lan lên dòng
          setIsLoadingUpdate(true);
          setRowSelected(record._id);
          fetchGetDetailsProduct(record._id); // Gọi fetch chi tiết ở đây
        }}

        style={{ color: 'black', fontSize: '30px', paddingLeft: '10px', cursor: 'pointer' }}
      />
      <DeleteOutlined
        onClick={(e) => {
          e.stopPropagation(); // Chặn click lan tới onRow
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
  const productTypesByRoom = {
    'Phòng khách': ['Sofa', 'Bàn trà', 'Kệ tivi', 'Ghế đơn', 'Tủ trang trí'],
    'Phòng ngủ': ['Giường', 'Tủ quần áo', 'Tab đầu giường', 'Bàn trang điểm', 'Chăn ga gối'],
    'Phòng ăn': ['Bàn ăn', 'Ghế ăn', 'Tủ bếp', 'Tủ rượu', 'Phụ kiện bàn ăn'],
    'Phòng làm việc': ['Bàn làm việc', 'Ghế làm việc', 'Kệ sách', 'Tủ hồ sơ', 'Đèn bàn'],
    'Trang trí nhà cửa': ['Tranh treo tường', 'Đèn trang trí', 'Thảm', 'Cây giả', 'Đồng hồ trang trí']
  };
  const productTypes = [
    "Sofa", "Bàn trà", "Kệ tivi", "Ghế đơn", "Tủ trang trí", "Giường", "Tủ quần áo",
    "Tab đầu giường", "Bàn trang điểm", "Chăn ga gối", "Bàn ăn", "Ghế ăn", "Tủ bếp",
    "Tủ rượu", "Phụ kiện bàn ăn", "Bàn làm việc", "Ghế làm việc", "Kệ sách", "Tủ hồ sơ",
    "Đèn bàn", "Tranh treo tường", "Đèn trang trí", "Thảm", "Cây giả", "Đồng hồ trang trí"
  ];
  const [filters, setFilters] = useState({
    room: undefined,
    type: undefined,
  });
  
  const handleTableChange = (pagination, currentFilters) => {
    setFilters({
      room: currentFilters.room || undefined,
      type: currentFilters.type || undefined,
    });
  };
  
  const getAvailableTypes = () => {
    // Nếu không chọn phòng nào, trả về tất cả type
    if (!filters.room || filters.room.length === 0) {
      return productTypes;
    }
    
    // Lấy tất cả type của các room được chọn
    const types = new Set();
    filters.room.forEach(room => {
      productTypesByRoom[room]?.forEach(type => types.add(type));
    });
    return Array.from(types);
  };
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${numeral(price).format('0,0').replace(/,/g, '.')} đ`,
      filters: [
        { text: 'Dưới 1.000.000đ', value: 'under1tr' },
        { text: '1.000.000đ - 5.000.000đ', value: '1to5tr' },
        { text: '5.000.000đ - 10.000.000đ', value: '5to10tr' },
        { text: 'Trên 10.000.000đ', value: 'above10tr' },
      ],
      onFilter: (value, record) => {
        const price = record.price;
        switch (value) {
          case 'under1tr': return price < 1000000;
          case '1to5tr': return price >= 1000000 && price <= 5000000;
          case '5to10tr': return price > 5000000 && price <= 10000000;
          case 'above10tr': return price > 10000000;
          default: return true;
        }
      },
      width: '30%',
    },
    {
      title: 'Room',
      dataIndex: 'room',
      filters: Object.keys(productTypesByRoom).map(room => ({
        text: room,
        value: room,
      })),
      filteredValue: filters.room,
      onFilter: (value, record) => {
        // Nếu có filter type, kiểm tra cả type
        if (filters.type && filters.type.length > 0) {
          return record.room === value && 
                 filters.type.includes(record.type);
        }
        return record.room === value;
      },
      filterMultiple: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filters: getAvailableTypes().map(type => ({
        text: type,
        value: type,
      })),
      filteredValue: filters.type,
      onFilter: (value, record) => {
        // Luôn ưu tiên kiểm tra type trước
        if (record.type !== value) return false;
        
        // Nếu có chọn phòng thì kiểm tra phòng
        if (filters.room && filters.room.length > 0) {
          return filters.room.includes(record.room);
        }
        
        // Nếu không chọn phòng thì chỉ cần khớp type
        return true;
      },
      filterMultiple: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => renderAction(record),
    },
  ];



  const dataTable = products?.data?.length && products?.data?.map((product) => ({
    ...product,
    key: product._id
  }));

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(stateProduct); // Đồng bộ state vào form mỗi khi mở lại
    }
  }, [isModalOpen]);

  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Thêm sản phẩm thành công!');
      handleCancel();
    } else if (data?.status === 'ERR') {
      message.error('Thêm sản phẩm thất bại!');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật thành công!');
      queryClient.invalidateQueries(['products']);
      setIsFinishUpdated(false)
      setIsOpenDrawer(false);
    } else if (dataUpdated?.status === 'ERR') {
      setIsFinishUpdated(false);
      message.error('Cập nhật thất bại!');
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Xóa sản phẩm thành công!');
      queryClient.invalidateQueries(['products']);
      setIsModalOpenDelete(false);
    } else if (isErrorDeleted) {
      message.error('Xóa sản phẩm thất bại!');
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success('Xóa các sản phẩm thành công!');
      queryClient.invalidateQueries(['products']);
      setIsFinishDeletedMany(false);
    } else if (isErrorDeletedMany) {
      message.error('Xóa các sản phẩm thất bại!');
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>

      <div style={{ marginTop: '10px' }}>
        <Button
          style={{
            height: '150px',
            width: '150px',
            borderRadius: '6px',
            borderStyle: 'dashed'
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <TableComponent
          deleteAll={handleDeleteManyProducts}
          forceRender
          columns={columns}
          isLoading={isLoadingProduct || isFinishDeletedMany}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id)
          })}
          // phân trang tượng trưng
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} sản phẩm`
          }}
          onChange={handleTableChange}
        />
      </div>

      {/* Modal thêm sản phẩm */}
      <Modal forceRender title="Tạo sản phẩm mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
            onFinish={onFinish}
            autoComplete="off"
          >
            {['name', 'price', 'countInStock', 'description', 'brand', 'origin', 'discount'].map((field) => (
              <Form.Item
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
              >
                <InputComponent
                  value={stateProduct[field]}
                  onChange={handleOnchange}
                  name={field}
                />
              </Form.Item>
            ))}

            <Form.Item
              label="Room"
              name="room"
              rules={[{ required: true, message: 'Vui lòng chọn phòng' }]}
            >
              <Select
                value={stateProduct.room}
                onChange={(value) => {
                  handleOnchange({ target: { name: 'room', value } });
                  setSelectedRoom(value);
                  // Reset type nếu đổi phòng
                  form.setFieldsValue({ type: undefined });
                }}
              >
                {Object.keys(productTypesByRoom).map((room) => (
                  <Select.Option key={room} value={room}>
                    {room}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
            >
              <Select
                value={stateProduct.type}
                onChange={(value) => handleOnchange({ target: { name: 'type', value } })}
                disabled={!selectedRoom}
                placeholder={!selectedRoom ? 'Vui lòng chọn phòng trước' : 'Chọn loại sản phẩm'}
              >
                {(productTypesByRoom[selectedRoom] || []).map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* Cập nhật màu sắc */}
            <Form.Item
              label="Colors"
              name="colors"
              rules={[{ required: true, message: 'Vui lòng chọn màu sắc' }]}
            >
              <Select
                mode="multiple"
                value={stateProduct.colors}
                onChange={(value) => handleOnchange({ target: { name: 'colors', value } })}
              >
                {['Đỏ', 'Xanh', 'Vàng', 'Trắng', 'Đen'].map((color) => (
                  <Select.Option key={color} value={color}>
                    {color}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Cập nhật kích thước */}
            <Form.Item label="Size" required>
              <Input.Group compact>
                <Form.Item
                  name={['size', 'length']}
                  rules={[{ required: true, message: 'Vui lòng nhập chiều dài' }]}
                  noStyle
                >
                  <InputComponent
                    style={{ width: '33.3%' }}
                    placeholder="Length"
                    onChange={handleOnchange}
                  />
                </Form.Item>

                <Form.Item
                  name={['size', 'width']}
                  rules={[{ required: true, message: 'Vui lòng nhập chiều rộng' }]}
                  noStyle
                >
                  <InputComponent
                    style={{ width: '33.3%' }}
                    placeholder="Width"
                    onChange={handleOnchange}
                  />
                </Form.Item>

                <Form.Item
                  name={['size', 'height']}
                  rules={[{ required: true, message: 'Vui lòng nhập chiều cao' }]}
                  noStyle
                >
                  <InputComponent
                    style={{ width: '33.3%' }}
                    placeholder="Height"
                    onChange={handleOnchange}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>



            {/* Cập nhật ảnh */}
            <Form.Item
              label="Avatar"
              name="image"
              rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatar}
                maxCount={1}
                beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              >
                <Button>Select Avatar</Button>
              </WrapperUploadFile>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: '60px',
                      width: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                    alt=""
                  />
                )}
              </div>

            </Form.Item>

            {/* Thêm ảnh phụ */}
            <Form.Item label="Images">
              <WrapperUploadFile
                multiple
                onChange={handleOnchangeImages}
                maxCount={5}
                beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              >
                <Button>Select Images</Button>
              </WrapperUploadFile>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {stateProduct.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                ))}
              </div>
            </Form.Item>
            {data?.status === 'ERR' && (<span style={{ color: 'red' }}>{data?.message}</span>)}
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">Xác nhận</Button>
            </Form.Item>
          </Form>

        </Loading>
      </Modal>

      {/* Drawer chi tiết sản phẩm */}
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
          mutationUpdate.reset();  // Reset mutation khi đóng drawer
        }}
        width="50%"
      >
        <Loading isLoading={isLoadingUpdate || isFinishUpdated}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            form={form}
            onFinish={onUpdateProduct}
            autoComplete="off"
          >
            {/* Các trường cơ bản */}
            {['name', 'price', 'countInStock', 'description'].map((field) => (
              <Form.Item
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
              >
                <InputComponent
                  value={stateProductDetails[field]}
                  onChange={handleOnchangeDetails}
                  name={field}
                />
              </Form.Item>
            ))}

            <Form.Item
              label="Room"
              name="room"
              rules={[{ required: true, message: 'Vui lòng chọn phòng' }]}
            >
              <Select
                value={stateProductDetails.room}
                onChange={(value) => {
                  handleOnchangeDetails({ target: { name: 'room', value } });
                  setSelectedRoomDetails(value);
                  form.setFieldsValue({ type: undefined }); // reset loại sản phẩm khi đổi phòng
                }}
              >
                {Object.keys(productTypesByRoom).map((room) => (
                  <Select.Option key={room} value={room}>
                    {room}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
            >
              <Select
                value={stateProductDetails.type}
                onChange={(value) => handleOnchangeDetails({ target: { name: 'type', value } })}
                disabled={!selectedRoomDetails}
                placeholder={!selectedRoomDetails ? 'Vui lòng chọn phòng trước' : 'Chọn loại sản phẩm'}
              >
                {(productTypesByRoom[selectedRoomDetails] || []).map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Các trường bổ sung */}
            {['brand', 'origin', 'discount', 'selled'].map((field) => (
              <Form.Item
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
              >
                <InputComponent
                  value={stateProductDetails[field]}
                  onChange={handleOnchangeDetails}
                  name={field}
                />
              </Form.Item>
            ))}

            {/* Trường màu sắc */}
            <Form.Item
              label="Colors"
              name="colors"
              rules={[{ required: true, message: 'Vui lòng chọn màu sắc' }]}
            >
              <Select
                mode="multiple"
                value={stateProductDetails.colors}
                onChange={(value) => handleOnchangeDetails({ target: { name: 'colors', value } })}
              >
                {['Đỏ', 'Xanh', 'Vàng', 'Trắng', 'Đen'].map((color) => (
                  <Select.Option key={color} value={color}>
                    {color}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Trường kích thước */}
            <Form.Item label="Size" required>
              <Input.Group compact>
                <Form.Item
                  name={['size', 'length']}
                  rules={[{ required: true, message: 'Vui lòng nhập chiều dài' }]}
                  noStyle
                >
                  <InputComponent
                    style={{ width: '33.3%' }}
                    placeholder="Length"
                    name="length"
                    value={stateProductDetails?.size?.length || ''}
                    onChange={handleOnchangeDetails}
                  />
                </Form.Item>
                <Form.Item
                  name={['size', 'width']}
                  rules={[{ required: true, message: 'Vui lòng nhập chiều rộng' }]}
                  noStyle
                >
                  <InputComponent
                    style={{ width: '33.3%' }}
                    placeholder="Width"
                    name="width"
                    value={stateProductDetails?.size?.width || ''}
                    onChange={handleOnchangeDetails}
                  />
                </Form.Item>
                <Form.Item
                  name={['size', 'height']}
                  rules={[{ required: true, message: 'Vui lòng nhập chiều cao' }]}
                  noStyle
                >
                  <InputComponent
                    style={{ width: '33.3%' }}
                    placeholder="Height"
                    name="height"
                    value={stateProductDetails?.size?.height || ''}
                    onChange={handleOnchangeDetails}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>



            {/* Ảnh chính */}
            <Form.Item
              label="Avatar"
              name="image"
              rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
                beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              >
                <Button>Select Avatar</Button>
              </WrapperUploadFile>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }}
                    alt=""
                  />
                )}
              </div>
            </Form.Item>

            {/* Ảnh phụ */}
            <Form.Item label="Images" name="images">
              <WrapperUploadFile
                multiple
                onChange={handleOnchangeImagesDetails}
                beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              >
                <Button>Select Images</Button>
              </WrapperUploadFile>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {stateProductDetails.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                ))}
              </div>
            </Form.Item>
            {dataUpdated?.status === 'ERR' && <span style={{ color: 'red' }}>{dataUpdated?.message}</span>}
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">Áp dụng</Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>


      {/* Modal xoá sản phẩm */}
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có muốn xóa sản phẩm này không ?</div>
        </Loading>
      </ModalComponent>


    </div>
  );
};

export default AdminProduct;
