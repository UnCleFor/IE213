const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    
    const token = req.headers.token?.split(' ')[1]; 
    //console.log("Token nhận được:", token);
    
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
           //console.log("JWT Error:", err.message); // In lỗi ra console
            return res.status(404).json({
                message: "loi chuoi token",
                status: "ERROR",
            });
        }
    
        //const { payload } = user
        if (user.isAdmin) {
            //console.log('true')
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}
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
module.exports = {
    authMiddleWare,
    authUserMiddleWare
}