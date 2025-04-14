import React from 'react'
import { WrapperInput, WrapperLabel } from './style.js'
import { Input } from 'antd'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.jsx'

const ProfilePage = () => {
    return (
        <div
            style={{
                maxWidth: '700px',
                margin: '40px auto',
                padding: '40px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>
                Thông tin người dùng
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <WrapperInput>
                    <WrapperLabel>Họ và tên</WrapperLabel>
                    <Input placeholder='Họ và tên' />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel>Email</WrapperLabel>
                    <Input placeholder='Email' />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel>Số điện thoại</WrapperLabel>
                    <Input placeholder='Số điện thoại' />
                </WrapperInput>

                <WrapperInput>
                    <WrapperLabel>Địa chỉ</WrapperLabel>
                    <Input placeholder='Địa chỉ' />
                </WrapperInput>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <ButtonComponent
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
        </div>
    )
}

export default ProfilePage