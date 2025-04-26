const OrderService = require('../services/OrderService')

const createOrder = async (req, res) => {
  try {
    // lấy ra các thông tin cần thiết từ body của req đc gửi từ ui xuống để tạo Order mới 
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      phone,
      totalDiscount,
      shippingMethod
    } = req.body
    // nếu thiếu 1 trường thì báo lỗi
    if ( !orderItems || !paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !phone || totalDiscount === null ||  !shippingMethod) {
        return res.status(200).json({
            status: 'Lỗi',
            message: 'Cần điền đầy đủ thông tin giao hàng'
        })
      }
    console.log('respon', req.body)
    // thực hiện gọi dịch vụ tạo proudct mới
    const ketqua = await OrderService.createOrder(req.body)
    return res.status(200).json(ketqua)
  } catch (e) {
    return res.status(404).json({
      massage: e
    })
  }
}

const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id
    if (!orderId) {
      return res.status(200).json({
        message: 'Không tìm thấy đơn hàng'
      })
    }
    const ketqua = await OrderService.getOrderDetails(orderId)
    res.status(200).json(ketqua)
  } catch (e) {
    res.status(500).json({
      message: 'Lỗi',
      error: e.message
    })
  }
}

const getOrderByUser = async (req, res) => {
  try {
    const userId = req.user.id
  } catch (e) {
    res.status(500).json({
      message: 'Lỗi',
      error: e.message
    })
  }
}

module.exports = {
  createOrder,
  getOrderDetails
}