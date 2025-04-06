const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')
// validator cho email (npm install email-validator)
var validator = require("email-validator");

const createUser = async (req,res) => {
    try {
        // lấy ra các thông tin cần thiết từ body của req đc gửi từ ui xuống để tạo user mới 
        const {name, email, password, confirmPassword, phone } = req.body
        
        // check email có hợp lệ ko
        const isCheckEmail = validator.validate(email);
        
        // nếu thiếu 1 trường thì báo lỗi
        if ( !name || !email || !password || !confirmPassword ) {
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
            message: e
        })
    }
}

const loginUser = async (req,res) => {
    try {
        // lấy ra các thông tin cần thiết từ body của req đc gửi từ ui xuống để tạo user mới 
        const { email, password } = req.body
        console.log('req.body')
        
        // check email có hợp lệ ko
        const isCheckEmail = validator.validate(email);
        console.log(email, password)
        // nếu thiếu 1 trường thì báo lỗi
        if ( !email || !password ) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Cần điền đầy đủ thông tin'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Email bị lỗi'
            })
        } 
        
        // thực hiện gọi dịch vụ tạo user mới
        const ketqua = await UserService.loginUser(req.body)
        return res.status(200).json(ketqua)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req,res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Thiếu userId'
            })
        }
        // thực hiện gọi dịch vụ tạo user mới
        const ketqua = await UserService.updateUser(userId, data)
        return res.status(200).json(ketqua)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req,res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Mật khẩu nhập lại không trùng khớp'
            })
        }
        
        // thực hiện xóa user
        const ketqua = await UserService.deleteUser(userId)
        return res.status(200).json(ketqua)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req,res) => {
    try {
        // thực hiện gọi dịch vụ tạo user mới
        const ketqua = await UserService.getAllUser()
        return res.status(200).json(ketqua)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req,res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Mật khẩu nhập lại không trùng khớp'
            })
        }
        
        // thực hiện gọi dịch vụ tạo user mới
        const ketqua = await UserService.getDetailsUser(userId)
        return res.status(200).json(ketqua)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req,res) => {
    try {
        const token = req.headers.token?.split(' ')[1];
        if (!token) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Token bị thiếu'
            })
        }
        
        const ketqua = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(ketqua)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}