import axios from "axios";
import { axiosJWT } from "./UserService";

/**
 * Tạo đơn hàng mới
 * @param {Object} data - Thông tin đơn hàng
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>} - Kết quả từ server
 */
export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
    data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
  );
  return res.data;
};

/**
 * Lấy tất cả đơn hàng
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>} - Danh sách đơn hàng
 */
export const getAllOrders = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
  return res.data
}

/**
 * Lấy chi tiết đơn hàng theo ID
 * @param {string} id - ID đơn hàng
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>} - Thông tin chi tiết đơn hàng
 */
export const getDetailOrder = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get_order/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
  return res.data
}

/**
 * Cập nhật đơn hàng theo ID
 * @param {string} id - ID đơn hàng
 * @param {Object} data - Dữ liệu cập nhật
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>} - Kết quả cập nhật
 */
export const updatedOrder = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/order/update/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

/**
 * Xoá đơn hàng theo ID
 * @param {string} id - ID đơn hàng
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>} - Kết quả xoá
 */
export const deleteOrder = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/order/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

/**
 * Xoá nhiều đơn hàng
 * @param {Array} data - Danh sách ID đơn hàng cần xoá
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>} - Kết quả xoá nhiều
 */
export const deleteManyOrder = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/order/delete-many`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

/**
 * Lấy đơn hàng theo ID người dùng
 * @param {string} userId - ID người dùng
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>} - Danh sách đơn hàng của người dùng
 */
export const getOrderByUserId = async (userId, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/order/get_order_byuser/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

/**
 * Gửi yêu cầu tạo URL thanh toán VNPAY
 * @param {Object} data - Thông tin thanh toán
 * @returns {Promise<Object>} - Đường dẫn thanh toán trả về từ server
 */
export const createPaymentUrl = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/payment/vnpay/create_payment_url`, data);
  return res;
};