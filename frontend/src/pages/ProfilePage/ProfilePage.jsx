import React, { useEffect, useState } from 'react'
import { WrapperInput, WrapperLabel, WrapperUploadFile } from './style.js'
import { Button } from 'antd'
import InputForm from '../../components/InputForm/InputForm'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message';
import Loading from '../../components/LoadingComponent/Loading'
import { updateUser } from '../../redux/slices/userSlide'
import { UploadOutlined } from '@ant-design/icons'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.jsx'
import BreadcrumbComponent from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import ContainerComponent from '../../components/ContainerComponent/ContainerComponent.jsx'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    // Khai báo state lưu trữ thông tin người dùng
    const user = useSelector((state) => state.user) // Lấy thông tin người dùng từ Redux store
    const [email, setEmail] = useState('') // State lưu email
    const [name, setName] = useState('') // State lưu tên
    const [phone, setPhone] = useState('') // State lưu số điện thoại
    const [address, setAddress] = useState('') // State lưu địa chỉ
    const [avatar, setAvatar] = useState('') // State lưu URL ảnh đại diện
    const [isUpdating, setIsUpdating] = useState(false) // State xác định trạng thái đang cập nhật

    // Khai báo mutation để cập nhật thông tin người dùng
    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data // Tách id và token, giữ lại phần còn lại
            return UserService.updateUser(id, rests, access_token) // Gọi service cập nhật người dùng
        }
    )

    // Destructuring kết quả mutation
    const { data, isSuccess, isError } = mutation
    const isLoading = mutation.isPending // Biến xác định nếu mutation đang trong trạng thái chờ

    const dispatch = useDispatch() // Khai báo hook dispatch để dispatch action vào Redux store

    // Lấy thông tin người dùng từ Redux và thiết lập vào state khi component mount
    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user]) // Chạy lại khi thông tin người dùng trong Redux thay đổi

    // Xử lý các hiệu ứng khi cập nhật thông tin người dùng thành công hoặc thất bại
    useEffect(() => {
        if (isSuccess && isUpdating) { // Cập nhật thành công
            if (data?.status === 'OK') {
                message.success(data?.message || 'Cập nhật thông tin thành công!') // Hiển thị thông báo thành công
                handleGetDetailUser(user?.id, user.access_token) // Lấy lại thông tin người dùng mới nhất
            } else if (data?.status === 'ERR') { // Cập nhật thất bại
                message.error(data?.message || 'Cập nhật thất bại')
            }
            setIsUpdating(false) // Reset trạng thái cập nhật
        } else if (isError && isUpdating) { // Nếu có lỗi trong quá trình cập nhật
            message.error('Lỗi hệ thống khi cập nhật')
            setIsUpdating(false) // Reset trạng thái cập nhật
        }
    }, [isSuccess, isError, data]) // Chạy khi isSuccess, isError hoặc data thay đổi

    // Hàm lấy chi tiết người dùng từ API và cập nhật vào Redux store
    const handleGetDetailUser = async (id, token) => {
        try {
            const res = await UserService.getDetailUser(id, token) // Lấy thông tin người dùng từ API
            dispatch(updateUser({ ...res?.data, access_token: token })) // Dispatch action để cập nhật vào Redux store
        } catch (error) {
            message.error('Lỗi khi tải thông tin người dùng') // Hiển thị thông báo lỗi
        }
    }

    // Các hàm xử lý thay đổi giá trị của các input
    const handleOnchangeName = (value) => setName(value)
    const handleOnchangeEmail = (value) => setEmail(value)
    const handleOnchangePhone = (value) => setPhone(value)
    const handleOnchangeAddress = (value) => setAddress(value)

    // Xử lý thay đổi ảnh đại diện
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file) return
        const data = new FormData() // Tạo FormData để gửi ảnh
        data.append("file", file.originFileObj) // Đính kèm file ảnh
        data.append("upload_preset", "images") // Cài đặt upload preset
        data.append("cloud_name", "dvmuk0u4e") // Cài đặt cloud name
        const res = await fetch("https://api.cloudinary.com/v1_1/dvmuk0u4e/image/upload", {
            method: "POST",
            body: data
        })
        const uploadedImageURL = await res.json() // Lấy URL ảnh đã upload
        setAvatar(uploadedImageURL.url) // Cập nhật URL ảnh đại diện
    }

    // Hàm xử lý cập nhật thông tin người dùng
    const handleUpdate = () => {
        // Kiểm tra các trường bắt buộc
        if (!name.trim()) {
            message.error('Vui lòng nhập họ và tên')
            return
        }
        if (!email.trim()) {
            message.error('Vui lòng nhập email')
            return
        }
        if (!phone.trim()) {
            message.error('Vui lòng nhập số điện thoại')
            return
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            message.error('Email không hợp lệ')
            return
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$/
        if (!phoneRegex.test(phone)) {
            message.error('Số điện thoại không hợp lệ')
            return
        }

        setIsUpdating(true) // Đánh dấu đang cập nhật
        mutation.mutate({
            id: user?.id,
            email,
            name,
            phone,
            address,
            avatar,
            access_token: user?.access_token
        })
    }

    // Breadcrumbs để hiển thị đường dẫn
    const breadcrumbs = [
        { name: 'Trang chủ', link: '/' },
        { name: 'Thông tin người dùng', link: '/profile', isCurrent: true },
    ];

    // Hook navigate để điều hướng đến trang reset mật khẩu
    const navigate = useNavigate();
    const handleResetPassword = () => {
        navigate('/reset-password'); // Chuyển hướng đến trang đặt lại mật khẩu
    };
    return (
        <div>
            <ContainerComponent>
                <BreadcrumbComponent breadcrumbs={breadcrumbs} /> {/* Hiển thị breadcrumb */}
            </ContainerComponent>
            <div style={{ maxWidth: '700px', margin: '40px auto', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>
                    Thông tin người dùng
                </h2>
                <Loading isLoading={isLoading}> {/* Hiển thị loading khi đang xử lý */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {/* Các trường thông tin người dùng */}
                        <WrapperInput>
                            <WrapperLabel htmlFor='name'>Họ và tên <span style={{ color: 'red' }}>*</span></WrapperLabel>
                            <InputForm
                                id="name"
                                value={name}
                                onChange={handleOnchangeName}
                            />
                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor='email'>Email <span style={{ color: 'red' }}>*</span></WrapperLabel>
                            <InputForm
                                id="email"
                                value={email}
                                onChange={handleOnchangeEmail}
                                type="email"
                            />
                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor='phone'>Điện thoại <span style={{ color: 'red' }}>*</span></WrapperLabel>
                            <InputForm
                                id="phone"
                                value={phone}
                                onChange={handleOnchangePhone}
                            />
                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor='address'>Địa chỉ</WrapperLabel>
                            <InputForm id="address" value={address} onChange={handleOnchangeAddress} />
                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel htmlFor="avatar">Ảnh đại diện</WrapperLabel>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <WrapperUploadFile
                                    customRequest={({ file, onSuccess }) => { // Hàm customRequest cho việc upload ảnh
                                        setTimeout(() => {
                                            onSuccess("ok") // Trả về thành công ngay lập tức
                                        }, 0)
                                    }}
                                    onChange={handleOnchangeAvatar}
                                    maxCount={1}>
                                    <Button icon={<UploadOutlined />}>Chọn file</Button>
                                </WrapperUploadFile>
                                {avatar && (
                                    <img
                                        src={avatar}
                                        alt="avatar"
                                        style={{
                                            height: '80px',
                                            width: '80px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '2px solid #ddd',
                                        }}
                                    />
                                )}
                            </div>
                        </WrapperInput>

                        <WrapperInput>
                            <WrapperLabel>Mật khẩu</WrapperLabel>
                            <ButtonComponent
                                onClick={handleResetPassword}
                                size="middle"
                                styleButton={{
                                    backgroundColor: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    width: 'fit-content'
                                }}
                                styleTextButton={{
                                    color: 'brown',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                                textButton="Đặt lại mật khẩu"
                            />
                        </WrapperInput>

                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <ButtonComponent
                                onClick={handleUpdate}
                                size="large"
                                styleButton={{
                                    backgroundColor: 'brown',
                                    padding: '12px 28px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                }}
                                styleTextButton={{
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                }}
                                textButton="Cập nhật thông tin"
                            />
                        </div>
                    </div>
                </Loading>
            </div>
        </div>
    )
}

export default ProfilePage