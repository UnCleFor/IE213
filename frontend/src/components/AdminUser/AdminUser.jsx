// [PHẦN ĐẦU GIỮ NGUYÊN]

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WrapperHeader } from './style'
import { Form, Button, Modal } from 'antd';
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import { WrapperUploadFile } from '../AdminProduct/style'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import * as message from '../../components/Message/Message';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const AdminUser = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state?.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  });

  const mutation = useMutationHooks((data) => {
    const { name, email, phone, avatar } = data;
    return UserService.signupUser({ name, email, phone, avatar });
  });

  const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
    return UserService.updateUser(id, rests, token);
  });

  const mutationDelete = useMutationHooks(({ id, token }) => {
    return UserService.deleteUser(id, token);
  });

  const { data, isLoading, isSuccess, isError } = mutation;
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;

  const getAllUsers = async () => {
    const res = await UserService.getAllUser();
    return res;
  };

  const { isLoading: isLoadingUser, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        avatar: res?.data?.avatar
      });
      setIsOpenDrawer(true);
    }
    setIsLoadingUpdate(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: '',
      email: '',
      phone: '',
      avatar: ''
    });
    form.resetFields();
  };

  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      avatar: file.preview
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview
    });
  };

  const handleDeleteUser = () => {
    mutationDelete.mutate({
      id: rowSelected,
      token: user.access_token,
    });
  };

  const onFinish = () => {
    mutation.mutate(stateUser);
  };

  const onUpdateUser = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: user.access_token,
      ...stateUserDetails
    });
  };

  const renderAction = (record) => (
    <div>
      <EditOutlined
        onClick={(e) => {
          e.stopPropagation();
          setRowSelected(record._id);
          fetchGetDetailsUser(record._id);
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

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Admin', dataIndex: 'isAdmin' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Hành động', dataIndex: 'action', render: (_, record) => renderAction(record) }
  ];

  const dataTable = users?.data?.map((user) => ({ ...user, key: user._id }));

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Thêm người dùng thành công!');
      handleCancel();
      queryClient.invalidateQueries(['users']);
    } else if (isError) {
      message.error('Thêm người dùng thất bại!');
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật thành công!');
      queryClient.invalidateQueries(['users']);
      setIsOpenDrawer(false);
    } else if (isErrorUpdated) {
      message.error('Cập nhật thất bại!');
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Xóa người dùng thành công!');
      queryClient.invalidateQueries(['users']);
      setIsModalOpenDelete(false);
    } else if (isErrorDeleted) {
      message.error('Xóa người dùng thất bại!');
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingUser}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id)
          })}
        />
      </div>

      <Modal forceRender title="Tạo người dùng mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form} onFinish={onFinish}>
            {['name', 'email', 'phone'].map((field) => (
              <Form.Item key={field} label={field} name={field} rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}>
                <InputComponent value={stateUser[field]} onChange={handleOnchange} name={field} />
              </Form.Item>
            ))}
            <Form.Item label="Avatar" name="avatar">
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}>
                <Button>Chọn ảnh</Button>
                {stateUser?.avatar && (
                  <img src={stateUser.avatar} style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover', marginLeft: '10px' }} alt="" />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
              <Button type="primary" htmlType="submit">Tạo</Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>

      <DrawerComponent title="Chi tiết người dùng" isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form} onFinish={onUpdateUser}>
            {['name', 'email', 'phone'].map((field) => (
              <Form.Item key={field} label={field} name={field} rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}>
                <InputComponent value={stateUserDetails[field]} onChange={handleOnchangeDetails} name={field} />
              </Form.Item>
            ))}
            <Form.Item label="Avatar" name="avatar">
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1} beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}>
                <Button>Chọn ảnh</Button>
                {stateUserDetails?.avatar && (
                  <img src={stateUserDetails.avatar} style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover', marginLeft: '10px' }} alt="" />
                )}
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
              <Button type="primary" htmlType="submit">Cập nhật</Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={() => setIsModalOpenDelete(false)}
        onOk={handleDeleteUser}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có chắc chắn muốn xóa người dùng này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
