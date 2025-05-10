import React from 'react'
import { WrapperInputStyle } from './style'

// Tạo Thanh tìm kiếm riêng cho Trang
const InputForm = (props) => {
  const { placeholder = 'Nhap text', ...rests } = props

  const handleOnchangeInput = (e) => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }
  
  return (
    <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput}/>
  )
}

export default InputForm