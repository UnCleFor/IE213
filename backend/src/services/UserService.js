const User = require('../models/UserModel')
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
            // tạo user mới
            const createUser = await User.create({
                name, 
                email, 
                password, 
                confirmPassword, 
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
module.exports = {
    createUser
}