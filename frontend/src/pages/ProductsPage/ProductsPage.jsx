import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Pagination, Select, InputNumber, Button, Typography } from 'antd';
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';

const { Option } = Select;
const { Title } = Typography;

const ProductsPage = () => {
  const [category, setCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortBy, setSortBy] = useState(null); // 👈 Thêm state sắp xếp

  const handleFilter = () => {
    console.log("Lọc theo:", { category, minPrice, maxPrice, sortBy });
    // TODO: gọi API hoặc filter dữ liệu tại đây
  };

  // const onChange = (page) => {
  //   console.log("Page:", page);
  //   // TODO: xử lý phân trang thực tế
  // };

  // //ds sản phẩm
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
  //       setProducts(res.data.data);
  //     } catch (error) {
  //       console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);




  return (
    <ContainerComponent>
      
    </ContainerComponent>
  );
};

export default ProductsPage;
