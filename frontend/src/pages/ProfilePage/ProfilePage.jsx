import React, { useEffect, useState } from 'react'
import { WrapperInput, WrapperLabel, WrapperUploadFile } from './style.js'
import { Input, Button } from 'antd'
import InputForm from '../../components/InputForm/InputForm'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as message from '../../components/Message/Message';
import Loading from '../../components/LoadingComponent/Loading'
import { updateUser } from '../../redux/slices/userSlide'
import { UploadOutlined } from '@ant-design/icons'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.jsx'

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [isUpdating, setIsUpdating] = useState(false)

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            return UserService.updateUser(id, rests, access_token)
        }
    )

    const { data, isSuccess, isError } = mutation
    const isLoading = mutation.isPending

    const dispatch = useDispatch()

    useEffect(() => {
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
    }, [user])

    useEffect(() => {
        if (isSuccess && isUpdating) {
            if (data?.status === 'OK') {
                message.success(data?.message || 'Cập nhật thông tin thành công!')
                handleGetDetailUser(user?.id, user.access_token)
            } else if (data?.status === 'ERR') {
                message.error(data?.message || 'Cập nhật thất bại')
            }
            setIsUpdating(false)
        } else if (isError && isUpdating) {
            message.error('Lỗi hệ thống khi cập nhật')
            setIsUpdating(false)
        }
    }, [isSuccess, isError, data])

    const handleGetDetailUser = async (id, token) => {
        try {
            const res = await UserService.getDetailUser(id, token)
            dispatch(updateUser({ ...res?.data, access_token: token }))
        } catch (error) {
            message.error('Lỗi khi tải thông tin người dùng')
        }
    }

    const handleOnchangeName = (value) => {
        setName(value)
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePhone = (value) => {
        setPhone(value)
    }

    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if(!file) return 
        const data = new FormData()
        data.append("file", file.originFileObj)
        data.append("upload_preset", "images")
        data.append("cloud_name", "dvmuk0u4e")
        const res = await fetch("https://api.cloudinary.com/v1_1/dvmuk0u4e/image/upload", {
            method: "POST",
            body: data
        })
        const uploadedImageURL = await res.json()
        setAvatar(uploadedImageURL.url)
    }

    const handleUpdate = () => {
        // Validate required fields
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

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            message.error('Email không hợp lệ')
            return
        }

        // Basic phone validation
        const phoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-9])[0-9]{7}$/
        if (!phoneRegex.test(phone)) {
            message.error('Số điện thoại không hợp lệ')
            return
        }

        setIsUpdating(true)
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

    return (
        <div style={{ maxWidth: '700px', margin: '40px auto', padding: '40px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>
                Thông tin người dùng
            </h2>
            <Loading isLoading={isLoading}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'>Họ và tên <span style={{color: 'red'}}>*</span></WrapperLabel>
                        <InputForm 
                            id="name" 
                            value={name} 
                            onChange={handleOnchangeName} 
                           
                        />
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email <span style={{color: 'red'}}>*</span></WrapperLabel>
                        <InputForm 
                            id="email" 
                            value={email} 
                            onChange={handleOnchangeEmail} 
                            
                            type="email"
                        />
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>Điện thoại <span style={{color: 'red'}}>*</span></WrapperLabel>
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
                                customRequest={({ file, onSuccess }) => {
                                    setTimeout(() => {
                                    onSuccess("ok")
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
    )
}

export default ProfilePage