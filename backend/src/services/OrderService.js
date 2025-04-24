const Order = require('../models/OrderProductModel')

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
    //   const { name, email, password, confirmPassword, phone, avatar } = newOrder;
  
    //   try {
    //     const checkOrder = await Order.findOne({ email: email });
  
    //     if (checkOrder !== null) {
    //       resolve({
    //         status: 'ERR',
    //         message: 'Email đã được sử dụng'
    //       });
    //       return;
    //     }
  
    //     const hash = bcrypt.hashSync(password, 10);
  
    //     const OrderData = {
    //       name,
    //       email,
    //       password: hash,
    //       phone
    //     };
  
    //     // Chỉ thêm avatar nếu có
    //     if (avatar) {
    //       OrderData.avatar = avatar;
    //     }
  
    //     const createdOrder = await Order.create(OrderData);
  
    //     if (createdOrder) {
    //       resolve({
    //         status: "OK",
    //         message: "Tạo thành công",
    //         data: createdOrder
    //       });
    //     }
  
    //   } catch (e) {
    //     reject(e);
    //   }
    });
  };

module.exports = {
    createOrder
}