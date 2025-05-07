const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const User = require('../models/UserModel')

const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        console.log("JWT Error:", err.message);
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
  
const authUserMiddleWare = (req, res, next) => {
    
    const token = req.headers.token?.split(' ')[1]; 
    //console.log("Token nhận được:", token);
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
           // console.log("JWT Error:", err.message); // In lỗi ra console
            // return res.status(401).json({
            //     message: "giai ma token sai",
            //     status: "ERROR",
            // });
            return next()
        }
        req.user = user; // ✅ GÁN user VÀO req.user để controller đọc được
        //const { payload } = user
        if (user.isAdmin || user.id === userId) {
            //console.log('true')
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    });
}

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