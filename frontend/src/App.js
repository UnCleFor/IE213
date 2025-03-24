import React, { Fragment } from 'react';

// Triển khai react router
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'

// Lấy ra mảng routes chứa các đường dẫn
import { routes } from './routes/index'

// Thêm default vào tất cả trang trừ trang NotFound
import DefaultComponent from './components/DefaultComponent/DefaultComponent'

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
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