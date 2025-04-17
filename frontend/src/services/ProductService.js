import axios from "axios";

export const getAllProduct = async () => {
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
