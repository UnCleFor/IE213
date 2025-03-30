const User = require('../models/UserModel')
// bcrypt để mã hóa mật khẩu
const bcrypt = require('bcrypt')
const { generalAccessToken,generalRefreshToken } = require('./JwtService')
const createUser = (newUser) => {
    return new Promise( async(resolve,reject) => {
        // lấy các trường ra từ input
        const {name, email, password, confirmPassword, phone } = newUser
        try {
            // biến kiểm tra coi mail có được xài chưa
            const checkUser = await User.findOne({
                email: email
            })
            // nếu khác null thì tức là đã có, == null tức là chưa có
            if (checkUser !== null){
                resolve({
                    status: 'Oki',
                    message: 'Email xài gòi á pà'
                })
            }
            // hàm băm mật khẩu thành các kí tự đặt biệt với key = 10
            const hash = bcrypt.hashSync(password,10)
            // console.log('hash',hash)
            // tạo user mới
            const createUser = await User.create({
                name, 
                email, 
                password: hash, 
                phone
            })
            // thông báo khi tạo user thành công
            if (createUser) {
                resolve({
                    status:"Oki",
                    message: "Tạo thành công",
                    data: createUser
                })
            }
            
        }
        catch(e) {
            reject(e)
        }
    })
}
const loginUser = (userLogin) => {
    return new Promise( async(resolve,reject) => {
        // lấy các trường ra từ input
        const {name, email, password, confirmPassword, phone } = userLogin
        try {
            // biến kiểm tra coi mail có trong database ko
            const checkUser = await User.findOne({
                email: email
            })
            // nếu === null thì chưa có => thông báo chưa có tài khoản
            if (checkUser === null){
                resolve({
                    status: 'Ô nô',
                    message: 'Tài khoản này chưa được đăng kí'
                })
            }
            // so sánh password nhập vào với password đã mã hóa
            const comparePassword = bcrypt.compareSync(password,checkUser.password)
            //console.log('comparePassword',comparePassword)
            // nếu so mật khẩu sai thì báo tk hoặc mk sai
            if (!comparePassword) {
                resolve({
                    status:"Ô nô",
                    message: "Mật khẩu hoặc tài khoản sai",
                })
            }
            // tạo cái chuỗi này để mã hóa dữ liệu để bảo mật web
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            //console.log('access_token',access_token)

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            // nếu đúng thì báo đăng nhập thành công 
            // và trả về access_token chứa dữ liệu mã hóa của thông tin người đăng nhập
            resolve({
                status:"Ố dè",
                message: "Đăng nhập thành công",
                access_token,
                refresh_token
            })
            
        }
        catch(e) {
            reject(e)
        }
    })
}
const updateUser = (id, data) => {
    return new Promise( async(resolve,reject) => {
        try {
            // biến kiểm tra coi mail có trong database ko
            const checkUser = await User.findOne({
                _id: id
            })
            // nếu === null thì chưa có => thông báo chưa có tài khoản
            if (checkUser === null){
                resolve({
                    status: 'Ô nô',
                    message: 'Tài khoản này chưa được đăng kí'
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true})
            console.log('updateUser',updateUser)
            resolve({
                status:"Ố dè",
                message: "Cập nhật người dùng thành công"
            })
            
        }
        catch(e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise( async(resolve,reject) => {
        try {
            // biến kiểm tra coi mail có trong database ko
            const checkUser = await User.findOne({
                _id: id
            })

            // nếu === null thì chưa có => thông báo chưa có tài khoản
            if (checkUser === null){
                resolve({
                    status: 'Ô nô',
                    message: 'Tài khoản này chưa được đăng kí'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'Ố dè',
                message: 'Xoá thông tin thành công'
            })
            
        }
        catch(e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise( async(resolve,reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'Ố dè',
                message: 'Thành công',
                data: allUser
            })
        }
        catch(e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise( async(resolve,reject) => {
        try {
            // biến kiểm tra coi mail có trong database ko
            const user = await User.findOne({
                _id: id
            })

            // nếu === null thì chưa có => thông báo chưa có tài khoản
            if (user === null){
                resolve({
                    status: 'Ô nô',
                    message: 'Tài khoản này chưa được đăng kí'
                })
            }

            resolve({
                status: 'Ố dè',
                message: 'Thành công',
                data: user
            })
            
        }
        catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
}