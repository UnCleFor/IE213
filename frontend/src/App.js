import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import "@fortawesome/fontawesome-free/css/all.min.css";
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slices/userSlide';
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
    const token = localStorage.getItem('access_token')
    let decoded = {}
    if (token) {
      try {
        decoded = jwtDecode(token)
      } catch (err) {
        console.log('JWT decode error:', err)
      }
    }
    return { decoded, storageData: token }
  }

  // Add a request interceptor
  UserService.axiosJWT.interceptors.request.use(async function (config) {
    const currentTime = new Date()
    const { storageData, decoded } = handleDecoded()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
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
