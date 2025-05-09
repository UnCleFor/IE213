import React, { useState } from "react";
import { Row, Col, Image } from "antd";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import logo from "../../assets/images/beautihome.png";
import { useNavigate } from "react-router-dom";
import * as message from '../../components/Message/Message';
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import * as EmailService from "../../services/EmailService";
import * as UserService from '../../services/UserService'
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slices/userSlide";
import { resetOrder } from "../../redux/slices/orderSlide";

const ResetPasswordPage = () => {
    const user = useSelector((state) => state.user)
    const [email, setEmail] = useState(user?.email);
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập mật khẩu mới
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleOnchange = (setter) => (value) => setter(value);
    const handleSendOTP = async () => {
        try {
            setLoading(true);
            const res = await EmailService.forgotPassword(email);
            if (res.status === 200) {
                message.success('Mã OTP đã được gửi đến email của bạn');
                setStep(2);
            } else {
                message.error(res.data.message.e || 'Gửi OTP thất bại');
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message?.e || err.response?.data?.message || err.message || 'Đã có lỗi xảy ra khi gửi OTP';
            console.error('Lỗi gửi OTP:', err.response?.data || err.message || err);
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToAccount = () => {
        navigate('/account');
    };
    const handleLogOut = async () => {
        try {
            await UserService.updateLogoutStatus(user?.id,user?.access_token)
            await UserService.logoutUser();
            localStorage.removeItem('access_token');
            dispatch(resetUser());
            dispatch(resetOrder())
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            message.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }
        if (!otp) {
            message.error('Vui lòng nhập mã OTP');
            return;
        }
        try {
            setLoading(true);
            const res = await EmailService.resetPassword({email, otp, newPassword });
            if (res.status === 200) {
                message.success('Đặt lại mật khẩu thành công, mời đăng nhập lại');
                handleLogOut()
                navigate('/sign_in');
            } else {
                const errorMsg = res.data?.message?.e || res.data?.message || 'Đặt lại mật khẩu thất bại';
                message.error(errorMsg);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message?.e || err.response?.data?.message || err.message || 'Đã có lỗi xảy ra khi đặt lại mật khẩu';
            console.error('Lỗi đặt lại mật khẩu:', err.response?.data || err.message || err);
            message.error(errorMsg);
        } finally {
            setLoading(false);
        }
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
                    <p style={{ textAlign: 'center', fontSize: '20px' }}>ĐẶT LẠI MẬT KHẨU</p>

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
                                loading={loading}
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
                                <WrapperTextLight onClick={handleBackToAccount}>Quay lại thông tin người dùng</WrapperTextLight>
                            </p>
                        </>
                    ) : (
                        <>
                            <p style={{ marginBottom: '8px' }}>
                                Vui lòng nhập mã OTP đã được gửi đến email <strong>{email}</strong>
                            </p>
                            {/* Input OTP (có thể thêm nếu cần) */}
                            <InputForm
                                style={{ marginBottom: '20px' }}
                                placeholder="Mã OTP*"
                                value={otp}
                                onChange={handleOnchange(setOtp)}
                            />

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

                            <ButtonComponent
                                disabled={!newPassword || !confirmPassword}
                                onClick={handleResetPassword}
                                size="large"
                                loading={loading}
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
                            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                                <WrapperTextLight onClick={handleBackToAccount}>Quay lại thông tin người dùng</WrapperTextLight>
                            </p>

                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default ResetPasswordPage;