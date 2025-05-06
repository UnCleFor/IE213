import axios from "axios"
export const axiosJWT = axios.create()
export const loginUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data, {
    withCredentials: true
  })
  return res.data
}

export const signupUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data)
  return res.data
}

export const getDetailUser = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  })
  return res.data
}

export const deleteUser = async (id, access_token) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  });
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
  return res.data
}

// export const refreshToken = async () => {
//   const res = await axios.post(
//     `${process.env.REACT_APP_API_URL}/user/refresh-token`, {}, // body
//     {
//       withCredentials: true
//     } // config
//   )
//   return res.data
// }
export const refreshToken = async (refreshToken) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`, {}, {// body
      headers: {
        token: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    })
  return res.data
}

export const logoutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/log-out`, {}, {
      withCredentials: true
    } // cần dòng này để cookie được gửi kèm
  );
  return res.data;
};

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

export const getUserEmail = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-email/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
  return res.data
}
export const updateLogoutStatus = async (id, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/log-out-status/${id}`, // route logout/:id
    {}, // Không cần body
    {
      headers: {
        token: `Bearer ${access_token}`,
      }
    }
  );
  return res.data;
};

export const blockUser = async (id, data,access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/block/${id}`,
    {data},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    }
  );
  return res.data;
};
