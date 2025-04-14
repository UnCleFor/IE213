import React, { useState } from 'react';
import { Row, Col, Pagination, Select, InputNumber, Button, Typography } from 'antd';
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

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

  const onChange = (page) => {
    console.log("Page:", page);
    // TODO: xử lý phân trang thực tế
  };

  return (
    <ContainerComponent>
      <div style={{ padding: "16px 0" }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Sản phẩm</Title>

        {/* Bộ lọc + sắp xếp */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }} justify="start">
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Loại sản phẩm"
              style={{ width: '100%' }}
              onChange={(value) => setCategory(value)}
              allowClear
            >
              <Option value="sofa">Sofa</Option>
              <Option value="ban">Bàn</Option>
              <Option value="ghe">Ghế</Option>
              <Option value="giuong">Giường</Option>
            </Select>
          </Col>

          <Col xs={12} sm={6} md={4}>
            <InputNumber
              placeholder="Giá từ"
              style={{ width: '100%' }}
              min={0}
              onChange={(value) => setMinPrice(value)}
            />
          </Col>

          <Col xs={12} sm={6} md={4}>
            <InputNumber
              placeholder="Giá đến"
              style={{ width: '100%' }}
              min={0}
              onChange={(value) => setMaxPrice(value)}
            />
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Sắp xếp"
              style={{ width: '100%' }}
              onChange={(value) => setSortBy(value)}
              allowClear
            >
              <Option value="price_asc">Giá thấp đến cao</Option>
              <Option value="price_desc">Giá cao đến thấp</Option>
              <Option value="name_asc">Tên A-Z</Option>
              <Option value="name_desc">Tên Z-A</Option>
            </Select>
          </Col>

          <Col xs={24} sm={6} md={4}>
            {/* <Button type="primary" style={{ width: '100%' }} onClick={handleFilter}>
              Lọc
            </Button> */}
            <ButtonComponent
                            //onClick={handleUpdate}
                            size="middle"
                            styleButton={{
                                backgroundColor: 'brown',
                                //padding: '12px 28px',
                                borderRadius: '8px',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                marginBottom:'10px',
                                width:'100%'
                            }}
                            styleTextButton={{
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                            textButton="Xem chi tiết"
                            onClick={handleFilter}
                        />
          </Col>
        </Row>

        {/* Lưới sản phẩm */}
        <Row gutter={[16, 24]}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} xs={12} sm={12} md={8} lg={6} xl={6}>
              <CardComponent />
            </Col>
          ))}
        </Row>

        {/* Phân trang */}
        <Pagination
          defaultCurrent={1}
          total={50}
          pageSize={8}
          onChange={onChange}
          style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}
        />
      </div>
    </ContainerComponent>
  );
};

export default ProductsPage;
