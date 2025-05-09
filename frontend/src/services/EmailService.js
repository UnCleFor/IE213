import axios from 'axios';

/**
 * Gửi yêu cầu quên mật khẩu tới server
 * @param {string} email - Email của người dùng cần đặt lại mật khẩu
 * @returns {Promise} - Kết quả phản hồi từ server
 */
export const forgotPassword = (email) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/user/forgot-password`, { email });
};


/**
 * Gửi yêu cầu đặt lại mật khẩu với token và mật khẩu mới
 * @param {Object} data - Dữ liệu gồm token, email và mật khẩu mới
 * @returns {Promise} - Kết quả phản hồi từ server
 */
export const resetPassword = (data) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/user/reset-password`, data);
};