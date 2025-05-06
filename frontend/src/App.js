import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, resetUser } from './redux/slices/userSlide';
import Loading from './components/LoadingComponent/Loading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector((state) => state.user)
  
  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = null
  
    try {
      if (storageData.split('.').length === 3 && typeof storageData === 'string')
        {decoded = jwtDecode(storageData)}
    } catch (e) {
      console.error("❌ Lỗi khi decode access_token:", e)
    }
  
    return { decoded, storageData }
  }

  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
      setIsLoading(false)
    } else {
      setIsLoading(false) // Nếu không có token thì dừng loading luôn
    }
  }, [])
  
  // const handleGetDetailUser = async (id, token) => {
  //   let storageRefreshToken = localStorage.getItem('refresh_token')
  //   const refreshToken = storageRefreshToken
  //   console.log('refreshtoken',refreshToken)
  //   const res = await UserService.getDetailUser(id, token)
  //   dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }))
  //   setIsLoading(false)
  // }

  // Add a request interceptor
//   UserService.axiosJWT.interceptors.request.use(
//   async function (config) {
//     const currentTime = new Date();
//     const { decoded } = handleDecoded(); // decode access token

//     if (decoded?.exp < currentTime.getTime() / 1000) {
//       try {
//         // Gọi /refresh, server sẽ lấy refresh_token từ cookie HTTP-only
//         const data = await UserService.refreshToken(); 
//         config.headers['token'] = `Bearer ${data?.access_token}`;
//         localStorage.setItem('access_token', data?.access_token);
//       } catch (err) {
//         console.error('Refresh token hết hạn hoặc không hợp lệ:', err);
//         dispatch(resetUser());
//       }
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
const handleGetDetailUser = async (id, token) => {
  const res = await UserService.getDetailUser(id, token);
  dispatch(updateUser({ ...res?.data, access_token: token }));
  setIsLoading(false);
};

UserService.axiosJWT.interceptors.request.use(
  async function (config) {
    const currentTime = new Date();
    const { decoded } = handleDecoded(); // decode access token

    if (decoded?.exp < currentTime.getTime() / 1000) {
      try {
        // Gọi /refresh, server sẽ lấy refresh_token từ cookie HTTP-only
        const data = await UserService.refreshToken(); 
        config.headers['token'] = `Bearer ${data?.access_token}`;
        localStorage.setItem('access_token', data?.access_token);
      } catch (err) {
        console.error('Refresh token hết hạn hoặc không hợp lệ:', err);
        dispatch(resetUser());
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

  return (
    <div>
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              const ischeckAuth = !route.isPrivate || user?.isAdmin;
              console.log('isAdmin',user?.isAdmin)
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    ischeckAuth
                      ? <Layout><Page /></Layout>
                      : <Navigate to="/login" replace />
                  }
                />
              );
            })}
          </Routes>
        </Router>
      )}
    </div>
  )
}

export default App;
