import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Button, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { WrapperHeader, WrapperUploadFile } from './style';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import Loading from '../LoadingComponent/Loading';
import * as ProductService from '../../services/ProductService';
import * as message from '../../components/Message/Message';
import { getBase64 } from '../../utils';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminProduct = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state?.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

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
    const res = await ProductService.getAllProduct();
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
          e.stopPropagation(); // Chặn click lan tới onRow
          setRowSelected(record._id); // Gán thủ công
          setIsOpenDrawer(true);      // Mở Drawer tại đây
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


  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
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
    if (rowSelected && !isModalOpenDelete) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);


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
          columns={columns}
          isLoading={isLoadingProduct}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id)
          })}
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
                <InputComponent
                  value={stateProduct[field]}
                  onChange={handleOnchange}
                  name={field}
                />
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
                <InputComponent
                  value={stateProductDetails[field]}
                  onChange={handleOnchangeDetails}
                  name={field}
                />
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
