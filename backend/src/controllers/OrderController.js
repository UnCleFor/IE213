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

const getOrderDetails = async (req, res) => {
    try {
      const orderId = req.params.id
      if (!orderId) {
        return res.status(200).json({ message: 'Không tìm thấy đơn hàng' })
      }
      const ketqua = await OrderService.getOrderDetails(orderId)
      res.status(200).json(ketqua)
    } catch (err) {
      res.status(500).json({ message: 'Lỗi server', error: err.message })
    }
  }

const getAllOrders = async (req, res) => {
  try {
    const ketqua = await OrderService.getAllOrders()
    return res.status(200).json(ketqua)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: err.message })
  }
}

const updatedOrder = async (req, res) => {
  try {
    const OrderId = req.params.id
    const data = req.body
    if (!OrderId) {
      return res.status(200).json({
        status: 'ERR',
        message: 'Order Id là bắt buộc'
      })
    }
    const ketqua = await OrderService.updateOrder(OrderId, data)
    return res.status(200).json(ketqua)
  } catch (e) {
    return res.status(404).json(
      {
        message: e
      }
    )
  }
}

const deleteOrder= async (req, res) => {
    try {
        const OrderId = req.params.id
        if(!OrderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Order Id là bắt buộc'
            })
        }
        const ketqua = await OrderService.deleteOrder(OrderId)
        return res.status(200).json(ketqua)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteManyOrder = async (req, res) => {
    try {
        const ids = req.body.ids
        if(!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Thiếu danh sách id'
            })
        }
        const ketqua = await OrderService.deleteManyOrder(ids)
        return res.status(200).json(ketqua)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrders,
    updatedOrder,
    deleteOrder,
    deleteManyOrder
}