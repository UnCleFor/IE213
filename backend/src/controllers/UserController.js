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
        
        // nếu thiếu 1 trường thì báo ERR
        if ( !name || !email || !password || !confirmPassword ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Cần điền đầy đủ thông tin'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email bị lỗi'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
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
        
        
        // check email có hợp lệ ko
        const isCheckEmail = validator.validate(email);
        //console.log(email, password)
        // nếu thiếu 1 trường thì báo lỗi
        if ( !email || !password ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Cần điền đầy đủ thông tin'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email bị lỗi'
            })
        } 
        
        // thực hiện gọi dịch vụ tạo user mới
        const ketqua = await UserService.loginUser(req.body)
        //tách phần refresh token ra khỏi kết quả và tạo ra newResponse để lưu lại kết quả sau khi tách
        const {refresh_token, ...newResponse} = ketqua
        //bỏ refresn token vào cookie
        res.cookie('refresh-token',refresh_token,{
            HttpOnly: true,
            Secure:false,
            sameSite: 'Strict',
        })
        return res.status(200).json(newResponse)
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
                status: 'ERR',
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
                status: 'ERR',
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
                status: 'ERR',
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
    console.log('req.cookies',req.cookies)
    try {
        // lấy refresh token trong cookie
        const token = req.cookies['refresh-token']; // ✅ đúng giá trị
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Token bị thiếu'
            })
        }
        
        const ketqua = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(ketqua)
        return
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    try {
      res.clearCookie('refresh-token', {
        httpOnly: true,
        secure: false,      // true nếu dùng HTTPS (trên prod)
        sameSite: 'lax',    // hoặc 'strict' nếu muốn an toàn hơn
      });
  
      return res.status(200).json({
        status: 'OK',
        message: 'Đăng xuất thành công'
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  };
  

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
}