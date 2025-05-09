const mongoose = require('mongoose')

    // đại diện cho đơn đặt hàng
const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true},  // tên sp
                amount: { type: Number, required: true },   // số lượng
                image:  { type: String, required: true},    // ảnh sp
                price: { type: Number, required: true },    // giá từng sp
                // tham chiếu đến bảng Product
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',             // tham chiếu đến bảng product
                    required: true,
                },
            },
        ],
        shippingAddress: {      // địa chỉ giao hàng
            fullName: { type: String, required: true},  // tên
            address: { type: String, required: true},   // địa chỉ
            phone: { type: String, required: true},     // sdt
        },
        paymentMethod: { type: String, required: true},     // phương thức thanh toán
        shippingMethod: { type: String, required: true},    // phương thức giao hàng

        // tổng hợp chi phí
        itemsPrice:  { type: Number, required: true},   // giá sản phẩm
        totalDiscount:  { type: Number, required: true}, // tổng giảm giá
        shippingPrice:  { type: Number, required: true}, // phí giao hàng
        totalPrice:  { type: Number, required: true},   // tổng đơn hàng
        
        // tham chiếu đến bảng user
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true,
        },

        isPaid: { type: Boolean, default: false}, // đã/chưa thanh toán 
        paidAt: { type: Date},  // ngày thanh toán
        isDelivered: { type: Boolean, default: false}, // đã/chưa giao
        delivered: { type: Date},   // ngày giao hàng
        
        // tình trạng đơn hàng
        state: { type: String, required: true}
    },
    {
        timestamps: true
    }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;