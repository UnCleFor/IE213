const UserService = require('../services/UserService')
// validator cho email (npm install email-validator)
var validator = require("email-validator");

const createUser = async (req,res) => {
    try {
        // lấy ra các thông tin cần thiết từ body của req đc gửi từ ui xuống để tạo user mới 
        const {name, email, password, confirmPassword, phone } = req.body
        
        // check email có hợp lệ ko
        const isCheckEmail = validator.validate(email);
        
        // nếu thiếu 1 trường thì báo lỗi
        if ( !name || !email || !password || !confirmPassword || !phone ) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Cần điền đầy đủ thông tin'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Email bị lỗi'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Mật khẩu nhập lại không trùng khớp'
            })
        }
        
        // thực hiện gọi dịch vụ tạo user mới
        const ketqua = await UserService.createUser(req.body)
        return res.status(200).json(ketqua)
    }
    catch(e){
        return res.status(404).json({
            massage: e
        })
    }
}

const loginUser = async (req,res) => {
    try {
        // lấy ra các thông tin cần thiết từ body của req đc gửi từ ui xuống để tạo user mới 
        const {name, email, password, confirmPassword, phone } = req.body
        
        // check email có hợp lệ ko
        const isCheckEmail = validator.validate(email);
        
        // nếu thiếu 1 trường thì báo lỗi
        if ( !name || !email || !password || !confirmPassword || !phone ) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Cần điền đầy đủ thông tin'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Email bị lỗi'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Mật khẩu nhập lại không trùng khớp'
            })
        }
        
        // thực hiện gọi dịch vụ tạo user mới
        const ketqua = await UserService.loginUser(req.body)
        return res.status(200).json(ketqua)
    }
    catch(e){
        return res.status(404).json({
            massage: e
        })
    }
}
module.exports = {
    createUser,
    loginUser
}