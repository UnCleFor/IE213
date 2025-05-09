import { createSlice } from '@reduxjs/toolkit'

// Trạng thái ban đầu của đơn hàng
const initialState = {
    orderItems: [], // Danh sách sản phẩm trong giỏ hàng
    orderItemsSelected: [], // Danh sách sản phẩm được chọn để thanh toá
    shippingAddress: {}, // Địa chỉ giao hàng
    paymentMethod: '', // Phương thức thanh toán
    itemsPrice: 0, // Tổng giá sản phẩm
    shippingPrice: 0, // Phí vận chuyển
    taxPrice: 0, // Thuế
    totalPrice: 0, // Tổng giá trị đơn hàng

    user: '', // Người mua hàng (liên kết với bảng user)
    isPaid: false, // Đã thanh toán hay chưa
    paidAt: '', // Thời gian thanh toán
    isDelivered: false,  // Đã giao hàng hay chưa
    deliveredAt: '', // Thời gian giao hàng

    isErrorOrder: false, // Trạng thái lỗi khi đặt hàng
    isSucessOrder: false, // Trạng thái đặt hàng thành công
    isBuyNow: false  // Trạng thái "Mua ngay"
}

// Tạo slice cho đơn hàng
export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // Thêm sản phẩm vào giỏ hàng
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            console.log('itemOrder', itemOrder)

            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }

            state.isBuyNow = false // Không phải trạng thái "Mua ngay"
        },

        // Mua ngay 1 sản phẩm
        buyNowProduct: (state, action) => {
            const { orderItem } = action.payload
            state.orderItems = [orderItem] // Chỉ chứa sản phẩm này
            state.orderItemsSelected = [orderItem]  // Được chọn để thanh toán luôn
            state.isBuyNow = true // Đánh dấu là mua ngay
        },

        // Tăng số lượng sản phẩm
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

        // Giảm số lượng sản phẩm
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

        // Xóa 1 sản phẩm khỏi giỏ hàng
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct)
            state.orderItems = itemOrder
            state.orderItemsSelected = itemOrderSelected
        },

        // Xóa nhiều sản phẩm khỏi giỏ hàng (dựa vào danh sách được chọn)
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            state.orderItems = itemOrders
            state.orderItemsSelected = itemOrdersSelected
        },

        // Cập nhật danh sách sản phẩm được chọn để thanh toán
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

        // Reset toàn bộ trạng thái đơn hàng
        resetOrder: () => initialState,
    }
})

// Export các action ra để dùng ở các componen
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