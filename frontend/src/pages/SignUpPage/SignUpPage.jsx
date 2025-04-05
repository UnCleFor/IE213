import React from "react"
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style"
import InputForm from "../../components/InputForm/InputForm"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import logo from '../../assets/images/beautihome.png'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

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

    const handleNavigateSignIn = () => {
        navigate('/sign_in')
    }
    const handleSignUp = () => {
        console.log('sign_up', name, phone, email, password, confirmPassword)
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}>
            <div style={{width:'800px', height:'500px', borderRadius:'6px', background: '#fff', display: 'flex'}}>
                <WrapperContainerLeft>
                    <Image src={logo} preview={false} alt="image-logo" width='300px' height='300px'/>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <p style={{ textAlign: 'center', fontSize: '20px' }}>ĐĂNG KÝ</p>
                    <InputForm style={{margin: '20px 0 10px 0'}} placeholder="Họ và tên*" value={name} onChange={handleOnchange(setName)}/>
                    <InputForm style={{marginBottom: '10px'}} placeholder='Số điện thoại' value={phone} onChange={handleOnchange(setPhone)}/>
                    <InputForm style={{marginBottom: '10px'}} placeholder='Email*' value={email} onChange={handleOnchange(setEmail)}/>
                    <div style={{ position: 'relative' }}>
                        <span 
                        onClick={() => setIsShowPassword(!isShowPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}
                        >{
                            isShowPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )
                        }
                        </span>
                        <InputForm style={{marginBottom: '10px'}} placeholder='Mật khẩu*' type={isShowPassword ? "text" : "password"} 
                            value={password} onChange={handleOnchange(setPassword)}/>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span 
                        onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                        style={{
                            zIndex: 10,
                            position: 'absolute',
                            top: '4px',
                            right: '8px'
                        }}
                        >{
                            isShowConfirmPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )
                        }
                        </span>
                        <InputForm style={{marginBottom: '10px'}} placeholder='Xác nhận mật khẩu*' type={isShowPassword ? "text" : "password"}
                            value={confirmPassword} onChange={handleOnchange(setConfirmPassword)}/>
                    </div>                                      
                    <ButtonComponent
                        disabled={!name.length || !email.length || !password.length || !confirmPassword.length}
                        onClick={handleSignUp}
                        size="large"
                        styleButton={{ 
                            backgroundColor: 'brown',
                            padding: '10px',
                            width: '100%',
                            margin: '13px 0 13px 0'
                        }}
                        styleTextButton={{ color: 'white', fontSize: '16px' }}
                        textButton="ĐĂNG KÝ"               
                    ></ButtonComponent>
                    <p>Bạn đã có tài khoản? <span><WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></span></p>              
                </WrapperContainerRight>
            </div>            
        </div>
    )
}
export default SignUpPage