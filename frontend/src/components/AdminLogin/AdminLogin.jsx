import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { WrapperHeader } from './style'
import { Form, Button, Modal, Switch, Input, Space, Tag, Tooltip } from 'antd';
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
import * as UserService from '../../services/UserService';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';

import * as LoginHistoryService from '../../services/LoginHistoryService';
const AdminLogin = () => {
  // Tách thành 2 form riêng biệt

  const queryClient = useQueryClient();
  const user = useSelector((state) => state?.user);



  const [isFinishDeletedMany, setIsFinishDeletedMany] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [isLoginHistoryOpen, setIsLoginHistoryOpen] = useState(false);
  const [loginHistory, setLoginHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const [rowSelected, setRowSelected] = useState('');

const { isLoading: isLoadingUser, data: users } = useQuery({
  queryKey: ['users', user.access_token],
  queryFn: () => UserService.getAllUser(user.access_token),
  refetchInterval: 5000, // Tự động refetch mỗi 5 giây
  refetchIntervalInBackground: true, // Tiếp tục refetch ngay cả khi tab không active
});


  const fetchLoginHistory = async (userId) => {
    setIsLoadingHistory(true);
    try {
      const res = await LoginHistoryService.getLoginHistory(userId, user?.access_token);
      setLoginHistory(res.data);
      console.log('login', loginHistory)
    } catch (error) {
      console.error('Error fetching login history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleViewLoginHistory = (userId) => {
    fetchLoginHistory(userId);
    setIsLoginHistoryOpen(true);
  };
  const handleToggleBlock = async (record) => {
    try {
      Modal.confirm({
        title: record.isBlocked ? 'Xác nhận bỏ chặn người dùng' : 'Xác nhận chặn người dùng',
        content: `Bạn có chắc muốn ${record.isBlocked ? 'bỏ chặn' : 'chặn'} người dùng ${record.name}?`,
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        onOk: async () => {
          await UserService.blockUser(record._id, !record.isBlocked, user?.access_token);
          message.success(`${record.isBlocked ? 'Đã bỏ chặn' : 'Đã chặn'} người dùng ${record.name}`);
          queryClient.invalidateQueries(['users', user?.access_token]);
        }
      });
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra khi cập nhật trạng thái người dùng');
    }
  };
  
  const handleForceLogout = async (userId) => {
    try {
      Modal.confirm({
        title: 'Xác nhận buộc đăng xuất',
        content: 'Bạn có chắc muốn buộc đăng xuất người dùng này?',
        okText: 'Xác nhận',
        cancelText: 'Hủy',
        onOk: async () => {
          await UserService.updateLogoutStatus(userId, user?.access_token);
          message.success('Đã buộc đăng xuất người dùng thành công');
          queryClient.invalidateQueries(['users', user?.access_token]);
        }
      });
    } catch (error) {
      console.error('Error forcing logout:', error);
      message.error('Có lỗi xảy ra khi buộc đăng xuất');
    }
  };
  const renderAction = (record) => {
    const isAdmin = record.isAdmin;
  
    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        <Tooltip title="Xem lịch sử đăng nhập">
          <EyeOutlined
            onClick={(e) => {
              e.stopPropagation();
              handleViewLoginHistory(record._id);
            }}
            style={{ color: 'blue', fontSize: '22px', cursor: 'pointer' }}
          />
        </Tooltip>
        
        {!isAdmin && (
          <>
            <Tooltip title={record.isBlocked ? 'Bỏ chặn người dùng' : 'Chặn người dùng'}>
              <Button
                type={record.isBlocked ? 'default' : 'primary'}
                danger={!record.isBlocked}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleBlock(record);
                }}
              >
                {record.isBlocked ? 'Bỏ chặn' : 'Chặn'}
              </Button>
            </Tooltip>
            
            {record.isLoggedIn && (
              <Tooltip title="Buộc đăng xuất">
                <Button
                  type="primary"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleForceLogout(record._id);
                  }}
                  style={{ background: '#faad14', borderColor: '#faad14' }}
                >
                  Đăng xuất
                </Button>
              </Tooltip>
            )}
          </>
        )}
      </div>
    );
  };

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
      title: 'Trạng thái',
      dataIndex: 'isLoggedIn',
      render: (isLoggedIn) => (
        <Tag color={isLoggedIn ? 'green' : 'red'}>
          {isLoggedIn ? 'Đang hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
      filters: [
        { text: 'Đang hoạt động', value: true },
        { text: 'Không hoạt động', value: false },
      ],
      onFilter: (value, record) => record.isLoggedIn === value,
    },
    {
      title: 'Lần đăng nhập cuối',
      dataIndex: 'lastActive',
      render: (lastActive) => lastActive ? new Date(lastActive).toLocaleString() : 'Chưa đăng nhập',
      sorter: (a, b) => new Date(a.lastActive) - new Date(b.lastActive),
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      render: (isAdmin) => (isAdmin ? '✅' : '❌'),
    },
    {
      title: 'Đang hoạt động trong',
      render: (record) => {
        if (!record.isLoggedIn || !record.lastActive) return '-';
        const minutes = Math.floor((Date.now() - new Date(record.lastActive)) / 60000);
        return `${minutes} phút`;
      }
    },
    {
  title: 'Bị chặn',
  dataIndex: 'isBlocked',
  render: (isBlocked) => (
    <Tag color={isBlocked ? 'red' : 'green'}>
      {isBlocked ? 'Bị chặn' : 'Hoạt động'}
    </Tag>
  ),
  filters: [
    { text: 'Hoạt động', value: false },
    { text: 'Bị chặn', value: true },
  ],
  onFilter: (value, record) => record.isBlocked === value,
},

    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => renderAction(record),
    },
  ];

  const dataTable = users?.data?.map((user) => ({ ...user, key: user._id }));
  const activeUsersCount = users?.data?.filter(user => user.isLoggedIn).length || 0;
  const inactiveUsersCount = users?.data?.filter(user => !user.isLoggedIn).length || 0;


  return (
    <div>
      <WrapperHeader>Quản lý truy cập</WrapperHeader>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
        <Tag color="green" style={{ fontSize: '16px', padding: '6px 12px' }}>
          🟢 Đang truy cập: {activeUsersCount}
        </Tag>
        <Tag color="red" style={{ fontSize: '16px', padding: '6px 12px' }}>
          🔴 Không truy cập: {inactiveUsersCount}
        </Tag>
      </div>

      <div style={{ marginTop: '20px' }}>
        <TableComponent

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
      <DrawerComponent
        title="Lịch sử đăng nhập"

        open={isLoginHistoryOpen}
        onClose={() => setIsLoginHistoryOpen(false)}
      >
        <Loading isLoading={isLoadingHistory}>
          <TableComponent
            columns={[
              {
                title: 'Thời gian',
                dataIndex: 'loginAt',
                render: (loginAt) => new Date(loginAt).toLocaleString(),
              },
              {
                title: 'Địa chỉ IP',
                dataIndex: 'ipAddress',
              },
              {
                title: 'Thiết bị',
                dataIndex: 'userAgent',
              },
              {
                title: 'Trạng thái',
                dataIndex: 'status',
                render: (status) => (
                  <Tag color={status === 'success' ? 'green' : 'red'}>
                    {status === 'success' ? 'Thành công' : 'Thất bại'}
                  </Tag>
                ),
              },
            ]}
            data={loginHistory}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </Loading>
      </DrawerComponent>
    </div>
  );
};

export default AdminLogin;
