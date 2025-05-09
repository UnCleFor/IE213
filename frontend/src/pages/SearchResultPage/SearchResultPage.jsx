// src/pages/SearchResultPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Row, Col, Typography, Pagination } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import LoadingComponent from '../../components/LoadingComponent/Loading'

import { fetchProductsByName } from "../../services/ProductService";

const SearchResultPage = () => {
  // Lấy keyword từ state khi điều hướng đến trang này
  const { state } = useLocation(); // { keyword: 'sofa' }

  // State chứa sản phẩm tìm được và trạng thái loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Truy cập thông tin người dùng từ Redux
  const { Title } = Typography;
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (state?.keyword) {
      fetchProducts();
    }
  }, [state]);

  // State phân trang
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  })

  // Hàm gọi API để lấy sản phẩm theo tên
  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetchProductsByName(state.keyword);
    if (res?.status === "OK") {
      setLoading(false)
      setProducts(res.data);
      setPanigate({ ...panigate, total: res?.totalPage })
    }
    setLoading(false);
  };

  // Hàm xử lý khi chuyển trang (chưa có phân trang thực sự ở server-side)
  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: [pageSize] })
  }

  return (
    <ContainerComponent>
      <div style={{ padding: "16px 0" }}>
        {/* Tiêu đề kết quả tìm kiếm */}
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Kết quả tìm kiếm: "{state?.keyword}"</Title>

        {/* Hiển thị loading hoặc danh sách sản phẩm */}
        <LoadingComponent isLoading={loading}>
          {loading ? (
            <p style={{ textAlign: 'center' }}>Đang tải sản phẩm...</p>
          ) : (
            <Row gutter={[16, 24]}>
              {products.length > 0 ? (
                products.map((product) => (
                  <Col key={product._id} xs={12} sm={12} md={8} lg={6}>
                    <CardComponent
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      description={product.description}
                      id={product._id}
                      discount={product.discount}
                      size={product.size}
                      colors={product.colors}
                      countInStock={product.countInStock}
                      _id={product._id}
                      user={user?.id}
                    />
                  </Col>
                ))
              ) : (
                <Col span={24} style={{ textAlign: 'center' }}>
                  <p>Không tìm thấy sản phẩm phù hợp.</p>
                </Col>
              )}
            </Row>
          )}</LoadingComponent>

        {/* Phân trang (hiện chỉ dùng client-side) */}
        <Pagination
          defaultCurrent={panigate.page + 11}
          total={panigate?.total}
          onChange={onChange}
          pageSize={8}
          style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}
        />
      </div>
    </ContainerComponent>
  );
};

export default SearchResultPage;
