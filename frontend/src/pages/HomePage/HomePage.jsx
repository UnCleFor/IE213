import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import SliderComponent from '../../components/SliderComponent/SliderComponent'

import { WrapperTypeProduct } from './style'

import slider1 from '../../assets/images/slide1.webp'
import slider2 from '../../assets/images/slide2.webp'
import slider3 from '../../assets/images/slide3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'

import { Col, Row } from 'antd';
import ContainerComponent from '../../components/ContainerComponent/ContainerComponent'
const style = {
 
  padding: '16px 0',
};
const HomePage = () => {
  const arr = ['Bàn', 'Ghế', 'Tủ']
  return (
    <div>

      {/* Phân loại sản phẩm */}
      {/* <WrapperTypeProduct>
        {arr.map((item) => {
          return (
            <TypeProduct name={item} key={item} />
          )
        })}
      </WrapperTypeProduct> */}

      {/* Slider sản phẩm */}
      <SliderComponent arrImages={[slider1,slider2,slider3]}/>
      <ContainerComponent>
        
      
      
      <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      >
      <Col className="gutter-row" span={6}>
        <div style={style}><CardComponent/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}><CardComponent/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}><CardComponent/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}><CardComponent/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}><CardComponent/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={style}><CardComponent/></div>
      </Col>
    </Row>
      </ContainerComponent>
    </div>
  )
}

export default HomePage
