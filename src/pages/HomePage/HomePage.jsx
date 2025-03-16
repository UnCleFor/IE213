import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import SliderComponent from '../../components/SliderComponent/SliderComponent'

import { WrapperTypeProduct } from './style'

import slider1 from '../../assets/images/slide1.webp'
import slider2 from '../../assets/images/slide2.webp'
import slider3 from '../../assets/images/slide3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
const HomePage = () => {
  const arr = ['Bàn', 'Ghế', 'Tủ']
  return (
    <div>

      {/* Phân loại sản phẩm */}
      <WrapperTypeProduct>
        {arr.map((item) => {
          return (
            <TypeProduct name={item} key={item} />
          )
        })}
      </WrapperTypeProduct>

      {/* Slider sản phẩm */}
      <SliderComponent arrImages={[slider1,slider2,slider3]}/>

      <div style={{marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px', paddingLeft:'200px'}}>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
      </div>
     
      HomePage
    </div>
  )
}

export default HomePage
