import { Modal, Button } from 'antd';
import React from 'react';

// Tạo Modal riêng cho Trang
const ModalComponent = ({ title = 'Modal', open = false, onCancel, onOk, children, ...rests }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={null} // Tắt các nút mặc định của Ant Design
      {...rests}
    >
      {children}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <Button onClick={onCancel} style={{ marginRight: '8px' }}>Hủy</Button>
        <Button type="primary" onClick={onOk}>Xóa</Button>
      </div>
    </Modal>
  );
};

export default ModalComponent;