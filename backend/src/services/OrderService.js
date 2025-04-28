const Order = require('../models/OrderProductModel');
const Product = require('../models/ProductModel');
const product = require('../models/ProductModel')
const EmailService = require('../services/EmailService')

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const { orderItems, paymentMethod, shippingMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, user, totalDiscount, email } = newOrder;
    try {
      const createdOrder = await Order.create({
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
      });

      if (createdOrder) {
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

const getOrderDetails = (orderId) => {
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

const getAllOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find().sort({ createdAt: -1 }).exec();
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
const updateOrder = (id, data) => {
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
      // Validate order status transitions
      if (data.isDelivered && !checkOrder.isPaid) {
        resolve({
          status: 'ERR',
          message: 'Không thể giao hàng khi chưa thanh toán'
        });
        return;
      }
      if (data.paymentMethod && checkOrder.isPaid) {
        resolve({
          status: 'ERR',
          message: 'Không thể thay đổi phương thức thanh toán sau khi đã thanh toán'
        });
        return;
      }
      if (data.state === 'Đã hủy') {
        data.cancelledAt = new Date();
      }
      const updatedOrder = await Order.findByIdAndUpdate(
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

const deleteOrder = (id) => {
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

const deleteManyOrder = (ids) => {
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

const getOrderByUser = (userId) => {
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