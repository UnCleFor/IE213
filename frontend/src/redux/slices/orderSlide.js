import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {},
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
    deliveredAt: '',
    isErrorOrder: false,
    isSucessOrder: false,
    isBuyNow: false // Thêm trạng thái mua ngay
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            console.log('itemOrder', itemOrder)
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }
            state.isBuyNow = false // Đánh dấu không phải mua ngay
        },
        // Thêm reducer mới cho chức năng mua ngay
        buyNowProduct: (state, action) => {
            const { orderItem } = action.payload
            // Xóa tất cả sản phẩm hiện có trong giỏ hàng
            state.orderItems = [orderItem]
            // Chọn sản phẩm này để thanh toán ngay
            state.orderItemsSelected = [orderItem]
            // Đánh dấu là mua ngay
            state.isBuyNow = true
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            if (itemOrder) {
                itemOrder.amount++;
            }
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
            if (itemOrder && itemOrder.amount > 1) {
                itemOrder.amount--;
            }
            if (itemOrderSelected && itemOrderSelected.amount > 1) {
                itemOrderSelected.amount--;
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload

            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct)
            state.orderItems = itemOrder
            state.orderItemsSelected = itemOrderSelected
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload

            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))

            state.orderItems = itemOrders
            state.orderItemsSelected = itemOrdersSelected
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected = []
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order)
                }
            })
            state.orderItemsSelected = orderSelected
        },
        resetOrder: () => initialState,
    }
})

// Action creators are generated for each case reducer function
export const { 
    addOrderProduct, 
    buyNowProduct, // Thêm action buyNowProduct vào exports
    increaseAmount, 
    decreaseAmount, 
    removeOrderProduct, 
    removeAllOrderProduct, 
    selectedOrder, 
    resetOrder 
} = orderSlide.actions

export default orderSlide.reducer