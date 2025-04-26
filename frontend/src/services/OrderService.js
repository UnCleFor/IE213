import {
    axiosJWT
} from "./UserService";

// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//     return res.data
// }

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

export const getAllOrders = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    })
    return res.data
  }

  export const getDetailOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get_order/${id}`, {
      headers: {
        token: `Bearer ${access_token}`,
      }
    })
    return res.data
  }
  
export const updatedOrder = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/order/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};