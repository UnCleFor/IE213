import axios from "axios"
export const axiosJWT = axios.create()
export const getAllProduct = async (search, limit) => {
  let res = {}
  if (search.length > 0) {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`)
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`)
  }
  return res.data
}

// gán cơ bản search = 0 và ko gắn limit vào url để khi gọi getAllProduct() ko tham số bên admin thì nó lấy ra đc
// export const getAllProduct = async (search = 0 , limit) => {
//   let res = {}
//   if (search.length > 0) {
//     res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}?limit=${limit}`)
//   } else {
//     res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
//   }
//   return res.data
// }

export const getAllProductAdmin = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  return res.data
}



// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//     return res.data
// }

export const createProduct = async (data) => {
  const token = localStorage.getItem('access_token');
  console.log("Token gửi đi:", token);
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
export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
  return res.data
}
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

export const getProductType = async (filterBy, label, page, limit) => {
  if (filterBy) {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=${filterBy}&label=${label}&limit=${limit}&page=${page}`)
    return res.data
  }
};

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

export const fetchProductsByName = async (keyword) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/search?keyword=${keyword}`
  );
  return res.data;
};

// export const filterProducts = async (filters) => {
//   try {
//     const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/filter`, {
//       params: {
//         colors: filters.colors?.join(','),
//         minPrice: filters.minPrice,
//         maxPrice: filters.maxPrice,
//         sortBy: filters.sortBy,
//         type: filters.type
//       }
//     });
//     return res.data.data;
//   } catch (error) {
//     console.error("Lỗi khi lọc sản phẩm:", error);
//     throw error;
//   }
// };

export const filterProducts = async (filters = {}) => {
  try {
    // Chuẩn bị params
    const params = {
      ...(filters.colors && { colors: filters.colors }), // Đã được xử lý từ component
      ...(filters.type && { type: filters.type }),
      ...(filters.room && { room: filters.room }),      
      ...(filters.minPrice && { minPrice: filters.minPrice }),
      ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
      ...(filters.sortBy && { sortBy: filters.sortBy })
    };

    console.log('[FRONTEND] Params gửi đi:', params);

    // Gọi API với params đầy đủ
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

export const getDiscountedProducts = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-discounted`)
  return res.data
}
export const getNewestProducts = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-newest`)
  return res.data
}
