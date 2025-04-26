import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Select, InputNumber, Pagination } from 'antd';
import axios from 'axios';
import CardComponent from '../../components/CardComponent/CardComponent';
import ContainerComponent from '../../components/ContainerComponent/ContainerComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation } from 'react-router-dom';
import * as ProductService from '../../services/ProductService'
import LoadingComponent from '../../components/LoadingComponent/Loading'
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';


const { Option } = Select;
const { Title } = Typography;

const TypeProduct = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [products, setProducts] = useState([]);
  const { state } = useLocation()
  const { label, filterBy } = state || {}
  const [loading, setLoading] = useState(false)
  //console.log('state nè (label)', state?.label)
  // const fetchProducts = async () => {
  //   try {
  //     let url = `${process.env.REACT_APP_API_URL}/product/get-all`;
  //     if (type) {
  //       url += `?filter=type&filter=${type}`;
  //     }
  //     const res = await axios.get(url);
  //     setProducts(res.data.data);
  //   } catch (error) {
  //     console.error('Lỗi khi lấy danh sách sản phẩm:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [type]);

  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  })

  const fetchProductType = async (filterBy, label, page, limit) => {
    setLoading(true)
    const res = await ProductService.getProductType(filterBy, label, page, limit)
    if (res?.status == 'OK') {
      setLoading(false)
      setProducts(res?.data)
      setPanigate({ ...panigate, total: res?.totalPage })
    } else {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   let newProduct = []
  //   if (searchDebounce) {
  //     newProduct = products?.filter((pro) => pro?.name === searchDebounce)
  //     console.log('newProducts', newProduct)
  //     setProducts(newProduct)
  //   }
  // }, [searchDebounce])
  // console.log('searchProduct', searchProduct)

  useEffect(() => {
    if (label && filterBy) {
      fetchProductType(filterBy, label, panigate.page, panigate.limit)
    }
  }, [filterBy, label, panigate.page, panigate.limit])

  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: [pageSize] })
  }

  console.log('filter nè:', filterBy)

  const [category, setCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const handleFilter = () => {
    console.log("Lọc theo:", { category, minPrice, maxPrice, sortBy });
    // TODO: gọi API hoặc filter dữ liệu tại đây
  };

  return (
    <ContainerComponent>
      <div style={{ padding: "16px 0" }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>{label}</Title>

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
                marginBottom: '10px',
                width: '100%'
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
        <LoadingComponent isLoading={loading}>
          <Row gutter={[16, 24]} style={{ padding: 0 }}>
            {products.length > 0 ? (
              products?.filter((pro) => {
                if (searchDebounce === '') {
                  return pro
                } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                  return pro
                }
              })?.map((product) => (
                <Col key={product._id} xs={12} sm={12} md={8} lg={6} xl={6}>
                  <CardComponent
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.description}
                    discount={product.discount}
                    size={product.size}
                    colors={product.colors}
                  />
                </Col>
              ))
            ) : (
              <Col span={24} style={{ textAlign: 'center' }}>
                <p>Không tìm thấy sản phẩm phù hợp.</p>
              </Col>
            )}
          </Row>
        </LoadingComponent>

        {/* Phân trang */}
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

export default TypeProduct;
