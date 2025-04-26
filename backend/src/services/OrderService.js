const Order = require('../models/OrderProductModel');
const Product = require('../models/ProductModel');
const product = require('../models/ProductModel')
const EmailService = require('../services/EmailService')

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
      const { orderItems, paymentMethod, shippingMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, user, totalDiscount, email } = newOrder;
      try {
        console.log('orderItems', {orderItems})
        const product = await Product.findOneAndUpdate({
          _id: product,
        })
        // const createdOrder = await Order.create({
        //   orderItems,
        //   shippingAddress: {
        //     fullName,
        //     address,
        //     phone,
        //   },
        //   itemsPrice,
        //   paymentMethod,
        //   shippingPrice,
        //   totalPrice,
        //   user,
        //   totalDiscount,
        //   shippingMethod
        // });

        // if (createdOrder) {
        //   resolve({
        //     status: "OK",
        //     message: "Tạo thành công",
        //     data: createdOrder
        //   });
        // }
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

module.exports = {
    createOrder,
    getOrderDetails
}