import React, { useState } from "react";
import { Row, Col, Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import logo from "../../assets/images/beautihome.png";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleNavigateSignUp = () => {
        navigate('/sign_up')
    }
    const handleOnchange = (setter) => (value) => setter(value)
    const handleSignIn = () => {
        console.log('sign_in', email, password)
    }
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
                    <p style={{ textAlign: 'center', fontSize: '20px' }}>ĐĂNG NHẬP</p>

                    {/* Input Email */}
                    <InputForm style={{ marginBottom: '10px' }} placeholder="Email*" value={email} onChange={handleOnchange(setEmail)} />

                    {/* Input Mật khẩu + Icon hiển thị mật khẩu */}
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
                                zIndex: 2, // ✅ thêm zIndex để icon nổi lên trên
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

                    {/* Button Đăng nhập */}
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
                    <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </Col>
            </Row>
        </div>
    );
};

export default SignInPage;
