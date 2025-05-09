const Order = require('../models/OrderProductModel');
const Product = require('../models/ProductModel');
const product = require('../models/ProductModel')
const EmailService = require('../services/EmailService')

const createOrder = (newOrder) => {   // tạo đơn hàng mới
  return new Promise(async (resolve, reject) => {
    const { orderItems, paymentMethod, shippingMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, user, totalDiscount, email, isPaid } = newOrder;
    try {
      const createdOrder = await Order.create({ // tạo đơn hàng trong MongoDB
        orderItems,
        shippingAddress: {
          fullName,
          address,
          phone,
        },
        itemsPrice,
        paymentMethod,
        shippingPrice,
        totalPrice,
        user,
        totalDiscount,
        shippingMethod,
        state: 'Đã đặt',
        isPaid: isPaid
      });

      if (createdOrder) {   // gửi mail xác nhận đơn hàng
        await EmailService.sendEmailCreateOrder(email, orderItems, totalPrice, totalDiscount, shippingPrice);
        resolve({
          status: "OK",
          message: "Tạo thành công",
          data: createdOrder
        });
      }
      resolve({})
    } catch (e) {
      console.log('e', e)
      reject(e);
    }
  });
};

const getOrderDetails = (orderId) => {    // lấy chi tiết đơn hàng
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById(orderId)
        .populate('orderItems.product') // nếu có populate sp
        .populate('user');

      if (!order) {
        resolve({
          status: 'ERR',
          message: 'Không tìm thấy đơn hàng'
        });
      } else {
        resolve({
          status: 'OK',
          message: 'Lấy chi tiết đơn hàng thành công',
          data: order
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllOrders = () => {    // lấy tất cả đơn hàng
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find().sort({ createdAt: -1 }).exec(); // mới nhất xếp trước
      resolve({
        status: 'OK',
        message: 'Thành công',
        data: allOrder
      })
    }
    catch (e) {
      reject(e)
    }
  })
}
const updateOrder = (id, data) => {   // cập nhật đơn hàng
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findOne({ _id: id });
      if (!checkOrder) {
        resolve({
          status: 'ERR',
          message: 'Đơn hàng không tồn tại'
        });
        return;
      }
      if (data.state === 'Đã hủy') {    // hoàn lại tồn kho khi hủy đơn
        data.cancelledAt = new Date();
        for (const item of checkOrder.orderItems) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { countInStock: item.amount }
          });
        }
      }
      const updatedOrder = await Order.findByIdAndUpdate( // cập nhật
        id,
        {
          $set: data,
          $push: { statusHistory: { status: data.status || checkOrder.status, updatedAt: new Date() } }
        },
        { new: true }
      );
      resolve({
        status: 'OK',
        message: 'Cập nhật đơn hàng thành công',
        data: updatedOrder
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteOrder = (id) => {   // xóa một đơn hàng
  return new Promise(async (resolve, reject) => {
      try {
          const checkOrder = await Order.findOne({
              _id: id
          })
          if (checkOrder=== null) {
              resolve({
                  status: 'OK',
                  message: 'Order không tồn tại'
              })
          }
          await Order.findByIdAndDelete(id)
          resolve({
              status: 'OK',
              message: 'Xóa order thành công'
          })
      } catch (e) {
          reject(e)
      }
  })
}

const deleteManyOrder = (ids) => {    // xóa nhiều đơn hàng cùng lúc
  return new Promise(async (resolve, reject) => {
      try {
          await Order.deleteMany({_id: ids})
          resolve({
              status: 'OK',
              message: 'Xóa các đơn hàng thành công'
          })
      } catch (e) {
          reject(e)
      }
  })
}

const getOrderByUser = (userId) => {    // lấy ds đơn hàng theo user
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await Order.find({
        user: userId
      }).sort({
        createdAt: -1
      });
      resolve({
        status: 'OK',
        message: 'Thành công',
        data: orders
      });
    } catch (error) {
      reject({
        status: 'ERR',
        message: error.message
      });
    }
  });
};

module.exports = {
  createOrder,
  getOrderDetails,
  getAllOrders,
  updateOrder,
  deleteOrder,
  deleteManyOrder,
  getOrderByUser
}