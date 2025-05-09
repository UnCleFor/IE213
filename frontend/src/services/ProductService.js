import axios from "axios"

// Tạo một instance axios để sử dụng với JWT
export const axiosJWT = axios.create()

/**
 * Lấy tất cả sản phẩm theo từ khóa tìm kiếm và giới hạn số lượng
 * @param {string} search - Từ khóa tìm kiếm (nếu có)
 * @param {number} limit - Số lượng sản phẩm muốn lấy
 * @returns {Promise<Object>} - Danh sách sản phẩm
 */
export const getAllProduct = async (search, limit) => {
  let res = {}
  if (search.length > 0) {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`)
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`)
  }
  return res.data
}

/**
 * Lấy tất cả sản phẩm (chức năng cho admin)
 * @returns {Promise<Object>} - Danh sách sản phẩm
 */
export const getAllProductAdmin = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  return res.data
}

/**
 * Tạo sản phẩm mới
 * @param {Object} data - Dữ liệu sản phẩm
 * @returns {Promise<Object>} - Kết quả tạo sản phẩm
 */
export const createProduct = async (data) => {
  const token = localStorage.getItem('access_token');
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }
  );
  return res.data;
}

/**
 * Lấy chi tiết sản phẩm theo ID
 * @param {string} id - ID sản phẩm
 * @returns {Promise<Object>} - Thông tin chi tiết sản phẩm
 */
export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
  return res.data
}

/**
 * Cập nhật sản phẩm
 * @param {string} id - ID sản phẩm
 * @param {Object} data - Dữ liệu cập nhật
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>}
 */
export const updateProduct = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`,
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
 * Xóa sản phẩm theo ID
 * @param {string} id - ID sản phẩm
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>}
 */
export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

/**
 * Lấy danh sách sản phẩm theo loại, nhãn, phân trang
 * @param {string} filterBy - Loại bộ lọc (ví dụ: "category")
 * @param {string} label - Giá trị cần lọc
 * @param {number} page - Trang hiện tại
 * @param {number} limit - Số sản phẩm mỗi trang
 * @returns {Promise<Object>}
 */
export const getProductType = async (filterBy, label, page, limit) => {
  if (filterBy) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=${filterBy}&label=${label}&limit=${limit}&page=${page}`)
    return res.data
  }
};

/**
 * Xóa nhiều sản phẩm cùng lúc
 * @param {Array<string>} data - Danh sách ID sản phẩm cần xóa
 * @param {string} access_token - Token xác thực
 * @returns {Promise<Object>}
 */
export const deleteManyProduct = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/product/delete-many`,
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
 * Tìm sản phẩm theo từ khóa
 * @param {string} keyword - Từ khóa tìm kiếm
 * @returns {Promise<Object>}
 */
export const fetchProductsByName = async (keyword) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/search?keyword=${keyword}`
  );
  return res.data;
};

/**
 * Lọc sản phẩm theo nhiều điều kiện: màu sắc, loại, phòng, giá, sắp xếp
 * @param {Object} filters - Các điều kiện lọc
 * @returns {Promise<Array>} - Danh sách sản phẩm phù hợp
 */
export const filterProducts = async (filters = {}) => {
  try {
    const params = {
      ...(filters.colors && { colors: filters.colors }),
      ...(filters.type && { type: filters.type }),
      ...(filters.room && { room: filters.room }),
      ...(filters.minPrice && { minPrice: filters.minPrice }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
      ...(filters.sortBy && { sortBy: filters.sortBy })
    };

    console.log('[FRONTEND] Params gửi đi:', params);

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/filter`, {
      params
    });

    if (!res.data?.data) {
      throw new Error('API trả về dữ liệu không hợp lệ');
    }

    return res.data.data;
  } catch (error) {
    console.error('[FRONTEND ERROR]', {
      url: `${process.env.REACT_APP_API_URL}/product/filter`,
      error: error.response?.data || error.message,
      stack: error.stack
    });
    throw error;
  }
};

/**
 * Lấy danh sách sản phẩm đang giảm giá
 * @returns {Promise<Object>}
 */
export const getDiscountedProducts = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-discounted`)
  return res.data
}

/**
 * Lấy danh sách sản phẩm mới nhất
 * @returns {Promise<Object>}
 */
export const getNewestProducts = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-newest`)
  return res.data
}
