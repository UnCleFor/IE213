import React from 'react'
import { Spin } from 'antd'

const Loading = ({ children, isLoading, delay = 200 }) => {
  if (!isLoading) return <>{children}</>

  return (
    <div style={{ position: 'relative' }}>
      <Spin
        spinning={true}
        delay={delay}
      //  tip="Đang xử lý..."
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        <div style={{ opacity: 0.5 }}>{children}</div>
      </Spin>
    </div>
  )
}

export default Loading
