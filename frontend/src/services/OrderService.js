import axios from "axios";
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
  console.log('token nhận được', access_token)
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

export const createPaymentUrl = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/payment/vnpay/create_payment_url`, data);
  return res;
};