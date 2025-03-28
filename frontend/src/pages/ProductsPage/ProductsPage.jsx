import React from 'react'
import ContainerComponent from "../../components/ContainerComponent/ContainerComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
//import { WrapperProducts } from './style';
import { Col, Pagination, Row } from 'antd';
const style = {

  padding: '16px 0',
};

const ProductsPage = () => {
  const onChange = () => { }
  return (
    <ContainerComponent>
      <div>
        <p style={{ textAlign: 'center', fontSize: '35px' }}>Sản phẩm</p>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
          >
          <Col className="gutter-row" span={6}>
            <div style={style}><CardComponent /></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}><CardComponent /></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}><CardComponent /></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}><CardComponent /></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}><CardComponent /></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}><CardComponent /></div>
          </Col>
        </Row>
        <Pagination defaultCurrent={2} total={10} onChange={onChange} style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 10px 0' }} />
        
      </div>
    </ContainerComponent>
    
  )
}

export default ProductsPage
