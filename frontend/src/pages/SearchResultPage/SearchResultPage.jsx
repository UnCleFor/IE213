// src/pages/SearchResultPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchProductsByName } from "../../services/ProductService";
import { Row, Col } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import { Typography, Pagination } from "antd"
import LoadingComponent from '../../components/LoadingComponent/Loading'

const SearchResultPage = () => {
  const { state } = useLocation(); // { keyword: 'sofa' }
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Title } = Typography;

  useEffect(() => {
    if (state?.keyword) {
      fetchProducts();
    }
  }, [state]);

  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  })

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

  //
  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: [pageSize] })
  }
  //
  return (
    <ContainerComponent>
      <div style={{ padding: "16px 0" }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Kết quả tìm kiếm: "{state?.keyword}"</Title>
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
