import React from "react"
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style"
import InputForm from "../../components/InputForm/InputForm"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import logo from '../../assets/images/beautihome.png'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'

const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh'}}>
            <div style={{width:'800px', height:'500px', borderRadius:'6px', background: '#fff', display: 'flex'}}>
                <WrapperContainerLeft>
                    <Image src={logo} preview={false} alt="image-logo" width='300px' height='300px'/>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <p style={{ textAlign: 'center', fontSize: '20px' }}>ĐĂNG KÝ</p>
                    <InputForm style={{margin: '20px 0 10px 0'}} placeholder="Họ và tên*"/>
                    <InputForm style={{marginBottom: '10px'}} placeholder='Số điện thoại'/>
                    <InputForm style={{marginBottom: '10px'}} placeholder='Email*'/>
                    <div style={{ position: 'relative' }}>
                        <span style={{
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
                        <InputForm style={{marginBottom: '10px'}} placeholder='Mật khẩu*' type={isShowPassword ? "text" : "password"}/>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span style={{
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
                        <InputForm style={{marginBottom: '10px'}} placeholder='Xác nhận mật khẩu*' type={isShowPassword ? "text" : "password"}/>
                    </div>                                      
                    <ButtonComponent
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
                    <p>Bạn đã có tài khoản? <span><WrapperTextLight>Đăng nhập</WrapperTextLight></span></p>              
                </WrapperContainerRight>
            </div>            
        </div>
    )
}
export default SignUpPage