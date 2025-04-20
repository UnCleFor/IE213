import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Button, Modal, Space, Select } from 'antd';
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
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: '',
    image: '',
    type: '',
    price: '',
    countInstock: '',
    description: ''
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    image: '',
    type: '',
    price: '',
    countInstock: '',
    description: ''
  });

  const mutation = useMutationHooks((data) => {
    const { name, image, type, price, countInstock: countInStock, description } = data;
    return ProductService.createProduct({ name, image, type, price, countInStock, description });
  });

  const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
    return ProductService.updateProduct(id, rests, token);
  });

  const mutationDelete = useMutationHooks(({ id, token }) => {
    return ProductService.deleteProduct(id, token);
  });

  const { data, isLoading, isSuccess, isError } = mutation;
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
  const getAllProducts = async () => {
    const res = await ProductService.getAllProductAdmin();
    return res;
  };

  const { isLoading: isLoadingProduct, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        type: res?.data?.type,
        price: res?.data?.price,
        countInstock: res?.data?.countInStock,
        description: res?.data?.description
      });
      setIsOpenDrawer(true);
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
      type: '',
      price: '',
      countInstock: '',
      description: ''
    });
    form.resetFields();
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    });
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


  const renderAction = (record) => (
    <div>
      <EditOutlined
        onClick={(e) => {
          e.stopPropagation(); // Ngăn click lan lên dòng
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
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button> */}
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
    // render: text =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ''}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      //render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${numeral(price).format('0,0').replace(/,/g, '.')} đ`,
      filters: [
        {
          text: 'Dưới 1.000.000đ',
          value: 'under1tr',
        },
        {
          text: '1.000.000đ - 5.000.000đ',
          value: '1to5tr',
        },
        {
          text: '5.000.000đ - 10.000.000đ',
          value: '5to10tr',
        },
        {
          text: 'Trên 10.000.000đ',
          value: 'above10tr',
        },
      ],
      onFilter: (value, record) => {
        const price = record.price;
        switch (value) {
          case 'under1tr':
            return price < 1000000;
          case '1to5tr':
            return price >= 1000000 && price <= 5000000;
          case '5to10tr':
            return price > 5000000 && price <= 10000000;
          case 'above10tr':
            return price > 10000000;
          default:
            return true;
        }
      },
      width: '30%',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => renderAction(record),
    }
  ];

  const dataTable = products?.data?.length && products?.data?.map((product) => ({
    ...product,
    key: product._id
  }));

  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Thêm sản phẩm thành công!');
      handleCancel();
    } else if (isError) {
      message.error('Thêm sản phẩm thất bại!');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật thành công!');
      queryClient.invalidateQueries(['products']);
      setIsOpenDrawer(false);
    } else if (isErrorUpdated) {
      message.error('Cập nhật thất bại!');
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Xóa sản phẩm thành công!');
      queryClient.invalidateQueries(['products']);
      setIsModalOpenDelete(false);
    } else if (isErrorUpdated) {
      message.error('Xóa sản phẩm thất bại!');
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  const productTypes = [
    "Sofa", "Bàn trà", "Kệ tivi", "Ghế đơn", "Tủ trang trí", "Giường", "Tủ quần áo",
    "Tab đầu giường", "Bàn trang điểm", "Chăn ga gối", "Bàn ăn", "Ghế ăn", "Tủ bếp",
    "Tủ rượu", "Phụ kiện bàn ăn", "Bàn làm việc", "Ghế làm việc", "Kệ sách", "Tủ hồ sơ",
    "Đèn bàn", "Tranh treo tường", "Đèn trang trí", "Thảm", "Cây giả", "Đồng hồ trang trí"
  ];
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
          forceRender
          columns={columns}
          isLoading={isLoadingProduct}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id)
          })}
          // phân trang tượng trưng
          pagination={{
            pageSize: 5,
            showTotal: (total, range) => `${range[0]}-${range[1]} trong ${total} sản phẩm`
          }}
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
            {['name', 'type', 'price', 'countInstock', 'description'].map((field) => (
              <Form.Item
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
              >
                {field === 'type' ? (
                  <Select
                    value={stateProduct[field]}
                    onChange={(value) => handleOnchange({ target: { name: field, value } })}
                  >
                    {productTypes.map((type) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <InputComponent
                    value={stateProduct[field]}
                    onChange={handleOnchange}
                    name={field}
                  />
                )}
              </Form.Item>
            ))}

            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatar}
                maxCount={1}
                beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              >
                <Button>Select File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }}
                    alt=""
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>

      {/* Drawer chi tiết sản phẩm */}
      <DrawerComponent title="Chi tiết sản phẩm" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            form={form}
            onFinish={onUpdateProduct}
            autoComplete="off"
          >
            {['name', 'type', 'price', 'countInstock', 'description'].map((field) => (
              <Form.Item
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
              >
                {field === 'type' ? (
                  <Select
                    value={stateProductDetails[field]}
                    onChange={(value) => handleOnchangeDetails({ target: { name: field, value } })}
                  >
                    {productTypes.map((type) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <InputComponent
                    value={stateProductDetails[field]}
                    onChange={handleOnchangeDetails}
                    name={field}
                  />
                )}

              </Form.Item>
            ))}

            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
                beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              >
                <Button>Select File</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }}
                    alt=""
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

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
