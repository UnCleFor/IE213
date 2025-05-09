import axios from "axios"

// Tạo một instance của axios để có thể tuỳ biến riêng
export const axiosJWT = axios.create();

/**
 * Lấy lịch sử đăng nhập của người dùng theo ID
 * @param {string} id - ID của người dùng
 * @param {string} access_token - Token xác thực JWT
 * @returns {Promise<Object>} - Dữ liệu lịch sử đăng nhập từ server
 */
export const getLoginHistory = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/login-history/get-login-history/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`, // Gửi token qua header để xác thực
    }
  });
  return res.data;
};