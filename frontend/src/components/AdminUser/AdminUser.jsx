// [PHẦN ĐẦU GIỮ NGUYÊN]

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
    

  const [stateUser, setStateUser] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    isAdmin: false,
    password: '', // Đảm bảo có password
    confirmPassword: '', // Thêm confirmPassword vào state
  });

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    isAdmin: false, // Thêm
  });


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

  const { data, isLoading, isSuccess, isError } = mutation;
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDelete;

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user.access_token);
    return res;
  };

  const { isLoading: isLoadingUser, data: users } = useQuery({
    queryKey: ['users', user.access_token], // queryKey thêm token để theo dõi thay đổi
    queryFn: () => UserService.getAllUser(user.access_token),
  });

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
    // Gửi payload đầy đủ bao gồm confirmPassword
    mutation.mutate({
      ...stateUser, // Bao gồm confirmPassword vào đây
    });
  };


  const onUpdateUser = () => {
    //console.log('onUpdateUser called'); // Đảm bảo sự kiện này được gọi

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
            onClick={() => clearFilters && handleReset(clearFilters,confirm)}
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
          forceRender
          columns={columns}
          isLoading={isLoadingUser}
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

      <Modal forceRender title="Tạo người dùng mới" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Loading isLoading={isLoading}>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} form={form} onFinish={onFinish}>
            {['name', 'email', 'phone'].map((field) => (
              <Form.Item
                key={field}
                label={field}
                name={field}
                rules={[{ required: true, message: `Vui lòng nhập ${field}` }]}
              >
                <InputComponent value={stateUser[field]} onChange={handleOnchange} name={field} />
              </Form.Item>
            ))}

            {/* Trường mật khẩu */}
            <Form.Item
              label="Mật khẩu"
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
              label="Xác nhận mật khẩu"
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



            <Form.Item label="Avatar" name="avatar">
              <WrapperUploadFile
                onChange={handleOnchangeAvatar}
                maxCount={1}
                beforeUpload={() => false}
                customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              >
                <Button>Chọn ảnh</Button>
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
                    alt=""
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
              <Button type="primary" htmlType="submit">
                Tạo
              </Button>
            </Form.Item>
          </Form>

        </Loading>
      </Modal>

      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
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
              </WrapperUploadFile>
            </Form.Item>

            {/* Nút Cập nhật thủ công */}
            <Form.Item wrapperCol={{ offset: 18, span: 6 }}>
              <Button
                type="primary"
                onClick={() => {
                  // Gọi hàm cập nhật thủ công
                  //console.log('Cập nhật người dùng');
                  onUpdateUser();
                }}
              >
                Cập nhật
              </Button>
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
