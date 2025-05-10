import { message } from 'antd';

// Hàm thành công
const success = (mes = 'Thành công') => {
    message.success(mes);
};

// Hàm lỗi
const error = (mes = 'Lỗi') => {
    message.error(mes);
};

// Hàm cảnh báo
const warning = (mes = 'Cảnh báo') => {
    message.warning(mes);
};

// Export các hàm
export { success, error, warning };