const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const User = require('../models/UserModel')

  // Xác thực và kiểm tra quyền admin
const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(401).json({
          message: "Token không hợp lệ",
          status: "ERROR"
        });
      }
  
      if (user.isAdmin) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({
          message: "Không có quyền",
          status: "ERROR"
        });
      }
    });
  };
  
  // Middleware xác thực người dùng
const authUserMiddleWare = (req, res, next) => {
    
    const token = req.headers.token?.split(' ')[1]; 
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return next()
        }
        req.user = user; // gán user vào req.user để controller đọc được
        if (user.isAdmin || user.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    });
}

  // Middleware theo dõi hoạt động của user
const trackActivity = async (req, res, next) => {
  if (req.user) {
      try {
          await User.findByIdAndUpdate(req.user._id, {
              lastActive: new Date()
          });
      } catch (e) {
          console.error('Lỗi khi cập nhật hoạt động:', e);
      }
  }
  next();
};

module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    trackActivity
}