const OrderService = require('../services/OrderService')

const createOrder = async (req,res) => {
    try {
        // lấy ra các thông tin cần thiết từ body của req đc gửi từ ui xuống để tạo Order mới 
        const {paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, totalDiscount } = req.body     
        // nếu thiếu 1 trường thì báo lỗi
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !phone || !totalDiscount ) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Cần điền đầy đủ thông tin'
            })
        }
        // // thực hiện gọi dịch vụ tạo proudct mới
        console.log('respon', req.body)
        const ketqua = await OrderService.createOrder(req.body)
        return res.status(200).json(ketqua)
    } catch(e){
        return res.status(404).json({
            massage: e
        })
    }
}

module.exports = {
    createOrder
}