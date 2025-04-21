import React from 'react'
import { useSelector } from 'react-redux'

const OrderPage = () => {
  const order = useSelector((state) => state.order)
  console.log('order', order)

  // Video 52  23:39  
  return (
    <div>
      OrderPage
    </div>
  )
}

export default OrderPage
