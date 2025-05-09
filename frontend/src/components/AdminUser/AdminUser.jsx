import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { WrapperHeader } from './style'
import { Form, Button, Modal, Switch, Input, Space } from 'antd';
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
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const AdminUser = () => {
  // Tách thành 2 form riêng biệt
  const [formAdd] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const queryClient = useQueryClient();
  const user = useSelector((state) => state?.user);

  // Các trạng thái cho UI
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


  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    isAdmin: false,
    password: '',
    confirmPassword: '',
  });

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    isAdmin: false, // Thêm
  });

  // Các mutation dùng để gọi API thêm, cập nhật, xóa
  const mutation = useMutationHooks((data) => {
    const { name, email, phone, avatar, password, confirmPassword } = data;
    return UserService.signupUser({ name, email, phone, avatar, password, confirmPassword });
  });

  const mutationUpdate = useMutationHooks(({ id, token, ...rests }) => {
    return UserService.updateUser(id, rests, token);
  });

  const mutationDelete = useMutationHooks(({ id, token }) => {
    return UserService.deleteUser(id, token);
  });

  const mutationDeleteMany = useMutationHooks(({ token, ...ids }) => {
    return UserService.deleteManyUser(ids, token);
  });

  // Trạng thái mutation
  const { data, isLoading, isSuccess, isError } = mutation;
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany } = mutationDeleteMany;

  // API lấy toàn bộ user
  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user.access_token);
    return res;
  };

  // Truy vấn danh sách người dùng
  const { isLoading: isLoadingUser, data: users } = useQuery({
    queryKey: ['users', user.access_token], // queryKey thêm token để theo dõi thay đổi
    queryFn: () => UserService.getAllUser(user.access_token),
  });

  // Lấy chi tiết người dùng theo ID
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        avatar: res?.data?.avatar,
        isAdmin: res?.data?.isAdmin, // ✅ THÊM DÒNG NÀY
      });
      setIsOpenDrawer(true);
    }
    setIsLoadingUpdate(false);
  };

  // Reset form và state khi hủy
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateUser({
      name: '',
      email: '',
      phone: '',
      avatar: ''
    });
    formAdd.resetFields();
    formUpdate.resetFields();
    mutation.reset();
  };

  // Thay đổi input form thêm user
  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value
    });
  };

  // Thay đổi input form chi tiết user
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    });
  };

  // Chọn avatar khi tạo user
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file) return;

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    // Cập nhật cả state và form
    setStateUser({
      ...stateUser,
      avatar: file.preview
    });
    formAdd.setFieldsValue({
      avatar: file.preview
    });
  };

  // Chọn avatar khi cập nhật user
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

  // Xóa 1 người dùng
  const handleDeleteUser = () => {
    mutationDelete.mutate({
      id: rowSelected,
      token: user.access_token,
    });
  };

  // Xóa nhiều người dùng
  const handleDeleteManyUsers = (ids) => {
    setIsFinishDeletedMany(true)
    mutationDeleteMany.mutate({
      ids: ids,
      token: user.access_token
    })
  }

  // Submit form tạo người dùng
  const onFinish = () => {
    mutation.mutate({ ...stateUser });
  };


  // Submit cập nhật người dùng
  const onUpdateUser = () => {
    setIsFinishUpdated(true)
    mutationUpdate.mutate({
      id: rowSelected,
      token: user.access_token,
      ...stateUserDetails
    });
  };

  // Action sửa/xóa trên từng dòng
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

  // Tìm kiếm theo cột
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // Reset bộ lọc tìm kiếm
  const handleReset = (clearFilters, confirm) => {
    clearFilters();          // Xóa bộ lọc hiện tại
    setSearchText('');       // Reset từ khóa tìm kiếm
    confirm();               // Kích hoạt lại lọc (với từ khóa rỗng)
  };

  // Cấu hình tìm kiếm cho từng cột
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

  // Định nghĩa cột cho bảng
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        { text: 'Admin', value: true },
        { text: 'User', value: false },
      ],
      onFilter: (value, record) => record.isAdmin === value,
      render: (isAdmin) => (isAdmin ? '✅' : '❌'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => renderAction(record),
    },
  ];

  // Chuẩn hóa dữ liệu người dùng cho bảng
  const dataTable = users?.data?.map((user) => ({ ...user, key: user._id }));

  // Đồng bộ state form khi mở modal
  useEffect(() => {
    if (isModalOpen) {
      formAdd.setFieldsValue(stateUser); // Đồng bộ state vào form mỗi khi mở lại
    }
  }, [isModalOpen]);

  // Đồng bộ form cập nhật khi dữ liệu thay đổi
  useEffect(() => {
    formUpdate.setFieldsValue(stateUserDetails);
  }, [formUpdate, stateUserDetails]);

  // Xử lý sau khi thêm user
  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Thêm người dùng thành công!');
      handleCancel();
      queryClient.invalidateQueries(['users']);
    } else if (data?.status === 'ERR') {
      message.error('Thêm người dùng thất bại!');
    }
  }, [isSuccess, isError]);

  // Xử lý sau khi cập nhật user
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật thành công!');
      queryClient.invalidateQueries(['users']);
      setIsFinishUpdated(false);
      setIsOpenDrawer(false);
    } else if (dataUpdated?.status === 'ERR') {
      setIsFinishUpdated(false);
      message.error('Cập nhật thất bại!');
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  // Xử lý sau khi xóa 1 user
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Xóa người dùng thành công!');
      queryClient.invalidateQueries(['users']);
      setIsModalOpenDelete(false);
    } else if (isErrorDeleted) {
      message.error('Xóa người dùng thất bại!');
    }
  }, [isSuccessDeleted, isErrorDeleted]);

  // Xử lý sau khi xóa nhiều user
  useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success('Xóa các người dùng thành công!');
      queryClient.invalidateQueries(['user']);
      setIsFinishDeletedMany(false);
    } else if (isErrorDeletedMany) {
      message.error('Xóa các người dùng thất bại!');
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany]);

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          type="dashed"
          onClick={() => setIsModalOpen(true)}
          style={{
            height: 150,
            width: 150,
            borderRadius: 10,
            fontSize: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999'
          }}
        >
          <PlusOutlined style={{ fontSize: 40, marginBottom: 8 }} />
          New User
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>

        {/* Bảng danh sách người dùng */}
        <TableComponent
          deleteAll={handleDeleteManyUsers}
          forceRender
          columns={columns}
          isLoading={isLoadingUser || isFinishDeletedMany}
          data={dataTable}
          onRow={(record) => ({
            onClick: () => setRowSelected(record._id)
          })}
          exportFileName="users_list"
        />
      </div>

      {/* Modal thêm người dùng */}
      <Modal forceRender title="Tạo người dùng mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={formAdd} onFinish={onFinish}>
            {['name', 'email', 'phone'].map((field) => (
              <Form.Item
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
              >
                <InputComponent value={stateUser[field]} onChange={handleOnchange} name={field} />
              </Form.Item>
            ))}

            {/* Trường mật khẩu */}
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password
                value={stateUser.password}
                onChange={(e) => setStateUser({ ...stateUser, password: e.target.value })}
              />
            </Form.Item>

            {/* Trường xác nhận mật khẩu */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu và xác nhận mật khẩu không khớp'));
                  },
                }),
              ]}
            >
              <Input.Password
                value={stateUser.confirmPassword}
                onChange={(e) => setStateUser({ ...stateUser, confirmPassword: e.target.value })}
              />
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
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
                {stateUser?.avatar && (
                  <img
                    src={stateUser.avatar}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px',
                    }}
                    alt="avatar"
                  />
                )}
              </div>
            </Form.Item>
            {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
            <Form.Item wrapperCol={{ offset: 21, span: 3 }}>
              <Button type="primary" htmlType="submit">
                Tạo
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>

      {/* Drawer cập nhật người dùng */}
      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
          mutationUpdate.reset();  // Reset mutation khi đóng drawer
        }}
      >
        <Loading isLoading={isLoadingUpdate || isFinishUpdated}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={formUpdate}
            onFinish={onUpdateUser}  // Vẫn giữ onFinish nếu bạn muốn form submit qua button submit
          >
            {['name', 'email', 'phone'].map((field) => (
              <Form.Item
                key={field}
                label={field}
                name={field}
                rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
              >
                <InputComponent value={stateUserDetails[field]} onChange={handleOnchangeDetails} name={field} />
              </Form.Item>
            ))}

            <Form.Item label="Quản trị viên" name="isAdmin" valuePropName="checked">
              <Switch
                checked={stateUserDetails.isAdmin}
                onChange={(checked) => setStateUserDetails({ ...stateUserDetails, isAdmin: checked })}
              />
            </Form.Item>

            <Form.Item label="Avatar" name="avatar">
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
                beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              >
                <Button>Chọn ảnh</Button>
              </WrapperUploadFile>
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {stateUserDetails?.avatar && (
                  <img
                    src={stateUserDetails.avatar}
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px',
                    }}
                    alt=""
                  />
                )}
              </div>
            </Form.Item>
            {dataUpdated?.status === 'ERR' && <span style={{ color: 'red' }}>{dataUpdated?.message}</span>}
            {/* Nút Cập nhật thủ công */}
            <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
              <Button
                type="primary"
                onClick={() => {
                  onUpdateUser();
                }}
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      {/* Modal xác nhận xóa */}
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
