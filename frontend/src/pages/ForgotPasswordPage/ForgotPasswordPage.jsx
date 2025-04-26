import React, { useState } from "react";
import { Row, Col, Image } from "antd";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import logo from "../../assets/images/beautihome.png";
import { useNavigate } from "react-router-dom";
import * as message from '../../components/Message/Message';
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập mật khẩu mới
    const navigate = useNavigate();

    const handleOnchange = (setter) => (value) => setter(value);

    const handleSendOTP = () => {
        // TODO: Gọi API gửi OTP
        message.success('Mã OTP đã được gửi đến email của bạn');
        setStep(2);
    };

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        } else {
            message.success('Đặt lại mật khẩu thành công');
            navigate('/sign_in');
        }
        // TODO: Gọi API đặt lại mật khẩu
    };

    const handleBackToSignIn = () => {
        navigate('/sign_in');
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
                {/* logo */}
                <Col xs={24} md={9} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <Image src={logo} preview={false} alt="logo" width="100%" />
                </Col>

                {/* nhập liệu */}
                <Col xs={24} md={15} style={{ padding: '20px' }}>
                    <p style={{ textAlign: 'center', fontSize: '20px' }}>QUÊN MẬT KHẨU</p>

                    {step === 1 ? (
                        <>
                            <p style={{ marginBottom: '20px' }}>Vui lòng nhập email đã đăng ký để đặt lại mật khẩu</p>
                            
                            {/* Input Email */}
                            <InputForm 
                                style={{ marginBottom: '20px' }} 
                                placeholder="Email*" 
                                value={email} 
                                onChange={handleOnchange(setEmail)} 
                            />

                            <ButtonComponent
                                disabled={!email}
                                onClick={handleSendOTP}
                                size="large"
                                styleButton={{
                                    backgroundColor: 'brown',
                                    padding: '10px',
                                    width: '100%',
                                    margin: '13px 0'
                                }}
                                styleTextButton={{ color: 'white', fontSize: '16px' }}
                                textButton="GỬI MÃ OTP"
                            />

                            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                                <WrapperTextLight onClick={handleBackToSignIn}>Quay lại đăng nhập</WrapperTextLight>
                            </p>
                        </>
                    ) : (
                        <>
                            <p style={{ marginBottom: '20px' }}>Vui lòng nhập mật khẩu mới</p>
                            
                            {/* Input Mật khẩu mới */}
                            <div style={{ position: 'relative', marginBottom: '15px' }}>
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
                                    placeholder="Mật khẩu mới*"
                                    type={isShowPassword ? "text" : "password"}
                                    value={newPassword} 
                                    onChange={handleOnchange(setNewPassword)}
                                    style={{ width: '100%', paddingRight: '40px', marginBottom: '15px' }}
                                />
                            </div>

                            {/* Input Xác nhận mật khẩu */}
                            <div style={{ position: 'relative', marginBottom: '20px' }}>
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
                                    type={isShowConfirmPassword ? "text" : "password"}
                                    value={confirmPassword} 
                                    onChange={handleOnchange(setConfirmPassword)}
                                    style={{ width: '100%', paddingRight: '40px' }}
                                />
                            </div>

                            {/* Input OTP (có thể thêm nếu cần) */}
                            {/* <InputForm 
                                style={{ marginBottom: '20px' }} 
                                placeholder="Mã OTP*" 
                                value={otp} 
                                onChange={handleOnchange(setOtp)} 
                            /> */}

                            <ButtonComponent
                                disabled={!newPassword || !confirmPassword}
                                onClick={handleResetPassword}
                                size="large"
                                styleButton={{
                                    backgroundColor: 'brown',
                                    padding: '10px',
                                    width: '100%',
                                    margin: '13px 0'
                                }}
                                styleTextButton={{ color: 'white', fontSize: '16px' }}
                                textButton="ĐẶT LẠI MẬT KHẨU"
                            />

                            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                                <WrapperTextLight onClick={() => setStep(1)}>Quay lại nhập email</WrapperTextLight>
                            </p>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ForgotPasswordPage;