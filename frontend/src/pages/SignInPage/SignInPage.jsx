import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import logo from "../../assets/images/beautihome.png";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/Message';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/slices/userSlide";

const SignInPage = () => {
    // State hiển thị mật khẩu
    const [isShowPassword, setIsShowPassword] = useState(false);

    // Lấy thông tin điều hướng trước đó (nếu có)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // State cho form
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Gọi API đăng nhập qua custom hook
    const mutation = useMutationHooks(data => UserService.loginUser(data))
    const { data, isSuccess, isError } = mutation
    const isLoading = mutation.isPending

    // Hàm xử lý khi đăng nhập thành công
    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
            // Điều hướng: nếu có vị trí trước đó => quay lại, ngược lại về home
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }

            // Lưu access token vào localStorage
            localStorage.setItem('access_token', data?.access_token)

            // Decode token để lấy userId
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token)
                }
            }
        }
    }, [isSuccess])

    // Hàm lấy thông tin chi tiết người dùng sau đăng nhập
    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    // Thông báo sau khi mutation hoàn tất
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success('Đăng nhập thành công!');
        } else if (data?.status === 'ERR') {
            message.error(data?.message);
        }
    }, [isSuccess, isError]);

    // Chuyển hướng đến trang đăng ký
    const handleNavigateSignUp = () => {
        navigate('/sign_up')
    }

    // Chuyển hướng đến trang quên mật khẩu
    const handleForgotPass = () => {
        navigate('/forgot-password')
    }

    // Cập nhật giá trị email/password từ input
    const handleOnchange = (setter) => (value) => setter(value)

    // Gửi thông tin đăng nhập
    const handleSignIn = () => {
        mutation.mutate({ email, password })
        console.log('sign_in', email, password)
    }

    // Bấm logo quay về trang chủ
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.53)',
            height: '100vh',
            padding: '20px'
        }}>
            <Row
                gutter={[16, 16]}
                style={{
                    width: '90%',
                    maxWidth: '800px',
                    background: '#fff',
                    borderRadius: '6px',
                    overflow: 'hidden'
                }}
            >
                {/* Cột bên trái: Logo */}
                <Col xs={24} md={9} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div
                        onClick={handleLogoClick}
                        style={{ cursor: 'pointer', width: '100%' }}
                    >
                        <Image
                            src={logo}
                            preview={false}
                            alt="logo"
                            width="100%"
                            style={{ pointerEvents: 'none' }} // This prevents double clicks
                        />
                    </div>
                </Col>

                {/* Cột bên phải: Form đăng nhập */}
                <Col xs={24} md={15} style={{ padding: '20px' }}>
                    <p style={{ textAlign: 'center', fontSize: '20px' }}>ĐĂNG NHẬP</p>

                    {/* Input Email */}
                    <InputForm style={{ marginBottom: '10px' }} placeholder="Email*" value={email} onChange={handleOnchange(setEmail)} />

                    {/* Input Mật khẩu kèm Icon hiển thị mật khẩu */}
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
                                zIndex: 2, // thêm zIndex để icon nổi lên trên
                            }}
                        >
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            placeholder="Mật khẩu*"
                            type={isShowPassword ? "text" : "password"}
                            value={password} onChange={handleOnchange(setPassword)}
                            style={{ width: '100%', paddingRight: '40px' }}
                        />
                    </div>

                    {/* Thông báo lỗi đăng nhập */}
                    {data?.status === 'Lỗi' && (
                        <span style={{ color: 'red' }}>{data?.message}</span>
                    )}

                    {/* Nút đăng nhập với trạng thái loading */}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size="large"
                            styleButton={{
                                backgroundColor: 'brown',
                                padding: '10px',
                                width: '100%',
                                margin: '13px 0'
                            }}
                            styleTextButton={{ color: 'white', fontSize: '16px' }}
                            textButton="ĐĂNG NHẬP"
                        />
                    </Loading>

                    {/* Liên kết phụ */}
                    <p><WrapperTextLight onClick={handleForgotPass}>Quên mật khẩu</WrapperTextLight></p>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </Col>
            </Row>
        </div>
    );
};

export default SignInPage;
