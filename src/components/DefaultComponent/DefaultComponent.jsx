import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import NavbarComponent from '../NavbarComponent/NavbarComponent';

// DefaultComponent là một layout bọc quanh nội dung chính của trang
const DefaultComponent = ({ children }) => { 
  return (
    <div>
      {/* HeaderComponent sẽ được hiển thị ở tất cả các trang sử dụng layout này */}
      <HeaderComponent /> 

      <NavbarComponent/>

      {/* children đại diện cho nội dung của từng trang (component được truyền vào) */}
      {children}  
    </div>
  );
};
export default DefaultComponent
