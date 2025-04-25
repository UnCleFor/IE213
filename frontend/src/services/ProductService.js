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