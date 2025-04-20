import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [
    ],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,

    // tham chiếu đến bảng user
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    delivered: '',
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            console.log({state, action})
        },
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct } = orderSlide.actions

export default orderSlide.reducer