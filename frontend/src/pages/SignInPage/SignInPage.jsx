import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import logo from "../../assets/images/beautihome.png";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/Message';
import { jwtDecode } from "jwt-decode";
import { useDispatch} from 'react-redux'
import { updateUser, resetUser } from "../../redux/slices/userSlide";
const SignInPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //    const mutation = useMutationHooks(
    //        data => UserService.loginUser(data)
    //  )
    //    const {data, isLoading} = mutation

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    const { data,isSuccess,isError } = mutation
    // useEffect(()=>{
    //     console.log('location', location)
    //     if(isSuccess &&  data?.status !== 'ERR'){
    //         if(location?.state) {
    //             navigate(location?.state)
    //         } else {
    //             navigate('/')
    //         }
    //         localStorage.setItem('access_token', data?.access_token)
    //         localStorage.setItem('refresh_token', data?.refresh_token)

    //         if(data?.access_token){
    //             const decoded = jwtDecode(data?.access_token)
    //             console.log('decoded',decoded)
    //             if(decoded?.id){
    //                 handleGetDetailUser(decoded?.id,data?.access_token)
    //             }
    //         }
    //     }
    // },[isSuccess])
    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
          console.log('📦 Token trả về từ server:', data?.access_token)
          console.log('📦 Refresh token:', data?.refresh_token)
      
          // Nếu không phải chuỗi, không lưu
          if (typeof data?.access_token !== 'string') {
            console.error('❌ access_token không phải chuỗi!')
          }
      
          if (data?.access_token) {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
      
            const decoded = jwtDecode(data.access_token)
            console.log('✅ Token decode được:', decoded)
      
            handleGetDetailUser(decoded.id, data.access_token).then(() => {
              navigate(location?.state || '/')
            })
          }
        }
      }, [isSuccess])      
      
    const handleGetDetailUser = async (id,token) => {
        const storage = localStorage.getItem('refresh_token')
        const refreshToken = storage
        const res = await UserService.getDetailUser(id,token)
        dispatch(updateUser({...res?.data,access_token: token, refreshToken}))
        //console.log('res',res)
    }

    const isLoading = mutation.isPending

    console.log('mutation', mutation)

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
          message.success('Đăng nhập thành công!');
        } else if (data?.status === 'ERR') {
          message.error(data?.message);
        }
      }, [isSuccess, isError]);

    const handleNavigateSignUp = () => {
        navigate('/sign_up')
    }
    const handleOnchange = (setter) => (value) => setter(value)

    const handleSignIn = () => {
        mutation.mutate({ email, password })
        console.log('sign_in', email, password)
    }
    const handleForgotPass = () => {
        navigate('/forgot-password')
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

                    {data?.status === 'Lỗi' && (
                        <span style={{ color: 'red' }}>{data?.message}</span>
                    )}

                    
                    <Loading isLoading={isLoading}>
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
                        ></ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight onClick={handleForgotPass}>Quên mật khẩu</WrapperTextLight></p>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </Col>
            </Row>
        </div>
    );
};

export default SignInPage;
