import axios from "axios"
export const axiosJWT = axios.create()

export const getLoginHistory = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/login-history/get-login-history/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
  return res.data;
};