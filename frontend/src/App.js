import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import "@fortawesome/fontawesome-free/css/all.min.css";
//import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, resetUser } from './redux/slices/userSlide';
import Loading from './components/LoadingComponent/Loading';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const { storageData, decoded } = handleDecoded()
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
    } else {
      setIsLoading(false) // Nếu không có token thì dừng loading luôn
    }
  }, [])

  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    console.log('access_token đây:', storageData)
    // KHÔNG cần JSON.parse nếu token là chuỗi JWT
    try {
      if (storageData && typeof storageData === 'string')
        {decoded = jwtDecode(storageData)}
    } catch (e) {
      console.error("❌ Lỗi khi decode access_token:", e)
    }
  
    return { decoded, storageData }
  }
  

  // Add a request interceptor
  UserService.axiosJWT.interceptors.request.use(async function (config) {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = storageRefreshToken
    const decodedRefreshToken = jwtDecode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      } else {
          dispatch(resetUser())
      }
    } 
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  const handleGetDetailUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = storageRefreshToken
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken }))
    setIsLoading(false)
  }

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
