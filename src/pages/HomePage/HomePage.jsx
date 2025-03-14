import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import SliderComponent from '../../components/SliderComponent/SliderComponent'

import { WrapperTypeProduct } from './style'

import slider1 from '../../assets/images/slide1.webp'
import slider2 from '../../assets/images/slide2.webp'
import slider3 from '../../assets/images/slide3.webp'
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

      HomePage
    </div>
  )
}

export default HomePage
