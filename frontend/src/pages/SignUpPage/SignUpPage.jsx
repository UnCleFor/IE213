import React, { useEffect } from "react"
import { Row, Col, Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'

import { WrapperTextLight } from "./style"
import InputForm from "../../components/InputForm/InputForm"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import Loading from "../../components/LoadingComponent/Loading"
import * as message from '../../components/Message/Message';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import logo from '../../assets/images/beautihome.png'

const SignUpPage = () => {
    const navigate = useNavigate()

    // State cho các trường form
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Hiện/ẩn mật khẩu
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

    // Mutation xử lý đăng ký người dùng
    const mutation = useMutationHooks(data => UserService.signupUser(data))
    const { data, isSuccess, isError } = mutation;

    // Hàm xử lý thay đổi input (dùng chung)
    const handleOnchange = (setter) => (value) => setter(value)

    // Điều hướng đến trang đăng nhập
    const handleNavigateSignIn = () => {
        navigate('/sign_in')
    }

    // Gửi form đăng ký
    const handleSignUp = () => {
        mutation.mutate({ name, phone, email, password, confirmPassword })

    }

    // Nhấn logo để trở về trang chủ
    const handleLogoClick = () => {
        navigate('/');
    };


    // Xử lý phản hồi khi mutation thành công/thất bại
    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
            message.success({
                content: "Đăng ký thành công!",
            });
            handleNavigateSignIn()
        } else if (isError) {
            message.error({
                content: "Đăng ký thất bại!",
            });
        }
    }, [isSuccess, isError])

    const isLoading = mutation.isPending

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.53)',
                height: '100vh',
                padding: '20px',
            }}
        >
            <Row
                gutter={[16, 16]}
                style={{
                    width: '90%',
                    maxWidth: '800px',
                    background: '#fff',
                    borderRadius: '6px',
                    overflow: 'hidden',
                }}
            >
                {/* Cột Logo bên trái */}
                <Col
                    xs={24}
                    md={9}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        cursor: 'pointer' 
                    }}
                    onClick={() => navigate('/')} 
                >
                    <Image
                        src={logo}
                        preview={false}
                        alt="logo"
                        width="100%"
                        style={{ pointerEvents: 'none' }} // Prevent double clicks
                    />
                </Col>

                {/* Cột form đăng ký bên phải */}
                <Col xs={24} md={15} style={{ padding: '20px' }}>
                    <p style={{ textAlign: 'center', fontSize: '20px' }}>ĐĂNG KÝ</p>

                    {/* Họ và tên */}
                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder="Họ và tên*"
                        value={name}
                        onChange={handleOnchange(setName)}
                    />

                    {/* Số điện thoại */}
                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={handleOnchange(setPhone)}
                    />

                    {/* Email */}
                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder="Email*"
                        value={email}
                        onChange={handleOnchange(setEmail)}
                    />

                    {/* Mật khẩu */}
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                fontSize: '18px',
                                color: '#666',
                                zIndex: 2,
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            placeholder="Mật khẩu*"
                            type={isShowPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handleOnchange(setPassword)}
                            style={{ paddingRight: '40px' }}
                        />
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <span
                            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                fontSize: '18px',
                                color: '#666',
                                zIndex: 2,
                            }}
                        >
                            {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            placeholder="Xác nhận mật khẩu*"
                            type={isShowConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleOnchange(setConfirmPassword)}
                            style={{ paddingRight: '40px' }}
                        />
                    </div>

                    {/* Hiển thị lỗi từ server nếu có */}
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

                    {/* Nút đăng ký */}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={
                                !name.length ||
                                !email.length ||
                                !password.length ||
                                !confirmPassword.length
                            }
                            onClick={handleSignUp}
                            size="large"
                            styleButton={{
                                backgroundColor: 'brown',
                                padding: '10px',
                                width: '100%',
                                margin: '13px 0',
                            }}
                            styleTextButton={{ color: 'white', fontSize: '16px' }}
                            textButton="ĐĂNG KÝ"
                        />
                    </Loading>

                    {/* Liên kết đến trang đăng nhập */}
                    <p>
                        Bạn đã có tài khoản?{' '}
                        <WrapperTextLight onClick={handleNavigateSignIn}>
                            Đăng nhập
                        </WrapperTextLight>
                    </p>
                </Col>
            </Row>
        </div>
    )
}

export default SignUpPage