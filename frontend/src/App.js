import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, resetUser } from './redux/slices/userSlide';
import Loading from './components/LoadingComponent/Loading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true) // State để kiểm soát hiển thị loading
  const user = useSelector((state) => state.user) // Lấy thông tin user từ Redux store

  // Hàm decode access_token để lấy thông tin user
  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = null
    try {
      if (storageData.split('.').length === 3 && typeof storageData === 'string') { decoded = jwtDecode(storageData) }
    } catch (e) {
      console.error("Lỗi khi decode access_token:", e)
    }
    return { decoded, storageData }
  }

  // Effect chạy khi component mount, kiểm tra và lấy thông tin user nếu có token
  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [])

  // Hàm gọi API lấy chi tiết thông tin user dựa trên id
  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    setIsLoading(false);
  };

  // Cấu hình interceptor cho axiosJWT để tự động refresh token khi hết hạn
  UserService.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        try {
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
      {/* Component Loading hiển thị khi đang tải dữ liệu */}
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              const ischeckAuth = !route.isPrivate || user?.isAdmin;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    ischeckAuth
                      ? <Layout><Page /></Layout>
                      : <Navigate to="*" replace /> // Chuyển hướng sang trang 404 nếu chưa xác thực
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
