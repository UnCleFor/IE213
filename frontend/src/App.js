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

  // useEffect(() => {
  //   const { storageData, decoded } = handleDecoded()
  //   if (decoded?.id) {
  //     handleGetDetailUser(decoded?.id, storageData)
  //   } else {
  //     setIsLoading(false) // Nếu không có token thì dừng loading luôn
  //   }
  // }, [])

  useEffect(() => {
    if (user?.access_token) {
      const { decoded } = handleDecoded()
      console.log("✅ Token sau khi user load:", decoded)
    } else {
      console.warn("⏳ Chưa có access_token để decode")
    }
  }, [user?.access_token])
  

  // const handleDecoded = () => {
  //   let storageData = user?.access_token || localStorage.getItem('access_token')
  //   let decoded = {}

  //   // KHÔNG cần JSON.parse nếu token là chuỗi JWT
  //     //test
  //     if (storageData) {
  //       console.log('🔍 Token type:', typeof storageData);
  //       console.log('🔍 Token length:', storageData.length);
  //       console.log('🔍 First 10 chars:', storageData.substring(0, 10));
  //       console.log('🔍 Is JSON?', isJsonString(storageData));
  //     } else {
  //       console.warn('⚠️ Không tìm thấy token nào');
  //       return { decoded: {}, storageData: null };
  //     }
  //   //    
  //   try {
  //     //test
  //     const actualToken = isJsonString(storageData) 
  //     ? JSON.parse(storageData) 
  //     : storageData;

  //   console.log('🔍 Token trước khi decode:', actualToken);
  //     //
  //     if (storageData && typeof storageData === 'string')
  //       {decoded = jwtDecode(storageData)}
  //   } catch (e) {
  //     console.error("❌ Lỗi khi decode access_token:", e)
  //   }
  
  //   return { decoded, storageData }
  // }
  function testToken() {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    console.log('Test decode:', jwtDecode(testToken)); 
  }
  testToken();
  ///
  const handleDecoded = () => {
    console.log('🛠️ Bắt đầu handleDecoded'); 
    // 1. Lấy token từ nhiều nguồn
    const storageData = user?.access_token || localStorage.getItem('access_token');
    
    // 2. Debug chi tiết
    console.group('[DEBUG] Token Analysis');
    console.log('Raw token:', storageData);
    console.log('Type:', typeof storageData);
    if (typeof storageData === 'string') {
      console.log('Length:', storageData.length);
      console.log('First 10 chars:', storageData.substring(0, 10));
      console.log('Is JWT format:', /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(storageData));
    }
    console.groupEnd();
  
    // 3. Xử lý token không tồn tại
    if (!storageData || typeof storageData !== 'string') {
      console.error('Token không tồn tại trong storage', storageData);
      return { decoded: {}, storageData: null };
    }
  
    // 4. Chuẩn hóa token
    let tokenToDecode;
    try {
      tokenToDecode = typeof storageData === 'string' 
        ? storageData.trim() 
        : JSON.stringify(storageData);
    } catch (e) {
      console.error('Lỗi chuẩn hóa token:', e);
      return { decoded: {}, storageData: null };
    }
  
    // 5. Kiểm tra JWT format cơ bản
    if (!tokenToDecode || tokenToDecode.split('.').length !== 3) {
      console.error('Token không đúng định dạng JWT:', tokenToDecode);
      return { decoded: {}, storageData: null };
    }
  
    // 6. Thử decode
    try {
      console.log('1. Trước khi decode');
      const decoded = jwtDecode(tokenToDecode);
      console.log('✅ Decoded token xong:', decoded);
      return { decoded, storageData: tokenToDecode };
    } catch (e) {
      console.error('❌ Lỗi decode chi tiết:', {
        error: e.message,
        tokenSample: tokenToDecode.substring(0, 10) + '...',
        tokenLength: tokenToDecode.length
      });
      return { decoded: {}, storageData: null };
    }
  };

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
