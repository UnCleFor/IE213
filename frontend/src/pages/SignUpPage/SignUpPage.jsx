import React, { useEffect } from "react"
import { Row, Col } from "antd";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style"
import InputForm from "../../components/InputForm/InputForm"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import logo from '../../assets/images/beautihome.png'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading"
import * as message from '../../components/Message/Message';

const SignUpPage = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    // Hàm dùng chung để cập nhật state
    const handleOnchange = (setter) => (value) => setter(value)

    const mutation = useMutationHooks(
        data => UserService.signupUser(data)
    )

    const { data, isSuccess, isError } = mutation;

    // lỗi ko in ra được thông báo, nhưng chuyển trang đc
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

    const handleNavigateSignIn = () => {
        navigate('/sign_in')
    }
    const handleSignUp = () => {
        mutation.mutate({ name, phone, email, password, confirmPassword })

    }

    const handleLogoClick = () => {
        navigate('/');
    };

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
                {/* Logo bên trái */}
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
                {/* Form đăng ký */}
                <Col xs={24} md={15} style={{ padding: '20px' }}>
                    <p style={{ textAlign: 'center', fontSize: '20px' }}>ĐĂNG KÝ</p>

                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder="Họ và tên*"
                        value={name}
                        onChange={handleOnchange(setName)}
                    />

                    <InputForm
                        style={{ marginBottom: '10px' }}
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={handleOnchange(setPhone)}
                    />

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

                    {/* Hiển thị lỗi nếu có */}
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

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