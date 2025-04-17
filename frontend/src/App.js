import React, { Fragment, useEffect } from 'react';


// Triển khai react router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Lấy ra mảng routes chứa các đường dẫn
import { routes } from './routes/index'

// Thêm default vào tất cả trang trừ trang NotFound
import DefaultComponent from './components/DefaultComponent/DefaultComponent'

import "@fortawesome/fontawesome-free/css/all.min.css";
import { isJsonString } from './utils';
import { jwtDecode } from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slices/userSlide';
import axios from 'axios';
//
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const {storageData,decoded} = handleDecoded()
      if (decoded?.id) {
        handleGetDetailUser(decoded?.id, storageData)
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
    // Do something before request is sent
    const currentTime = new Date()
    const {storageData,decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime()/1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
    console.log('res',res)
  }


  // useEffect(() => {
  //   fetchApi()
  // }, [])
  //console.log('process.env.REACT_API_URL_BACKEND', process.env.REACT_API_URL_BACKEND)
  //const fetchApi = async() => {
  //  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
  //  return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query', query)

  return (
    <div>
      <Router> {/* BrowserRouter để quản lý đường dẫn */}
        <Routes> {/* Routes chứa danh sách các đường dẫn */}
          {routes.map((route) => { // Lặp qua mảng routes và tạo ra một phần tử route tương ứng
            const Page = route.page; // Lấy page tương ứng với từng route

            // Nếu route.isShowHeader true thì sử dụng DefaultComponent (trong đó có Header), ngược lại sử dụng Fragment
            // Layout sẽ chứa header,... của trang
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;

            return (
              // Layout sẽ được bọc quanh nội dung của trang nhằm hiển thị Header
              <Route key={route.path} path={route.path} element={<Layout><Page /></Layout>} /> // Tạo Route với path và page
            );
          })}
        </Routes>
      </Router>

    </div>
  )
}
export default App