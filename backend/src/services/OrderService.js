const Order = require('../models/OrderProductModel')

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
      const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, user, totalDiscount } = newOrder;
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
        });
        console.log('createdOrder', createdOrder)
        if (createdOrder) {
          resolve({
            status: "OK",
            message: "Tạo thành công",
            data: createdOrder
          });
        }
  
      } catch (e) {
        console.log('e', e)
        reject(e);
      }
    });
  };

module.exports = {
    createOrder
}