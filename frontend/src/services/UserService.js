import axios from "axios"

// Tạo instance axiosJWT dùng cho các request cần gửi kèm access_token
export const axiosJWT = axios.create()

/**
 * Đăng nhập người dùng
 * @param {Object} data - {email, password}
 */
export const loginUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data, {
    withCredentials: true // gửi cookie từ server về client
  })
  return res.data
}

/**
 * Đăng ký người dùng
 * @param {Object} data - Thông tin người dùng
 */
export const signupUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
  return res.data
}

/**
 * Lấy thông tin chi tiết người dùng
 * @param {string} id - ID người dùng
 * @param {string} access_token - Token xác thực
 */
export const getDetailUser = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  })
  return res.data
}

/**
 * Xóa một người dùng
 * @param {string} id - ID người dùng
 * @param {string} access_token - Token xác thực
 */
export const deleteUser = async (id, access_token) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
  return res.data;
};

/**
 * Lấy danh sách toàn bộ người dùng (chỉ admin)
 * @param {string} access_token - Token xác thực
 */
export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
  return res.data
}

/**
 * Refresh access token sử dụng refresh token
 * @param {string} refreshToken - Token làm mới
 */
export const refreshToken = async (refreshToken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`, {}, // không có body
    {
      headers: {
        token: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    }
  )
  return res.data
}

/**
 * Đăng xuất người dùng
 */
export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/log-out`, {}, // không có body
    {
      withCredentials: true // cần để cookie được gửi đi
    }
  );
  return res.data;
};

/**
 * Cập nhật thông tin người dùng
 * @param {string} id - ID người dùng
 * @param {Object} data - Dữ liệu cập nhật
 * @param {string} access_token - Token xác thực
 */
export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    data, { // body
    headers: {
      token: `Bearer ${access_token}`,
    }
  }
  )
  return res.data
}

/**
 * Xóa nhiều người dùng (batch delete)
 * @param {Array} data - Danh sách ID người dùng
 * @param {string} access_token - Token xác thực
 */
export const deleteManyUser = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`,
    data,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });
  return res.data;
};

/**
 * Lấy email của người dùng
 * @param {string} id - ID người dùng
 * @param {string} access_token - Token xác thực
 */
export const getUserEmail = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-email/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
  return res.data
}

/**
 * Cập nhật trạng thái đăng xuất (vd: khi token hết hạn)
 * @param {string} id - ID người dùng
 * @param {string} access_token - Token xác thực
 */
export const updateLogoutStatus = async (id, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/log-out-status/${id}`,
    {}, // Không cần body
    {
      headers: {
        token: `Bearer ${access_token}`,
      }
    }
  );
  return res.data;
};

/**
 * Khóa / mở khóa người dùng
 * @param {string} id - ID người dùng
 * @param {Object} data - Trạng thái block { isBlocked: true/false }
 * @param {string} access_token - Token xác thực
 */
export const blockUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/block/${id}`,
    { data }, // truyền body dạng object
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }
  );
  return res.data;
};
