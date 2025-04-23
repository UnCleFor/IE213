const User = require('../models/UserModel')
// bcrypt để mã hóa mật khẩu
const bcrypt = require('bcrypt')
const { generalAccessToken,generalRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
      const { name, email, password, confirmPassword, phone, avatar } = newUser;
  
      try {
        const checkUser = await User.findOne({ email: email });
  
        if (checkUser !== null) {
          resolve({
            status: 'ERR',
            message: 'Email đã được sử dụng'
          });
          return;
        }
  
        const hash = bcrypt.hashSync(password, 10);
  
        const userData = {
          name,
          email,
          password: hash,
          phone
        };
  
        // Chỉ thêm avatar nếu có
        if (avatar) {
          userData.avatar = avatar;
        }
  
        const createdUser = await User.create(userData);
  
        if (createdUser) {
          resolve({
            status: "OK",
            message: "Tạo thành công",
            data: createdUser
          });
        }
  
      } catch (e) {
        reject(e);
      }
    });
  };
  
const loginUser = (userLogin) => {
    return new Promise( async(resolve,reject) => {
        // lấy các trường ra từ input
        const { email, password } = userLogin
        try {
            // biến kiểm tra coi mail có trong database ko
            const checkUser = await User.findOne({
                email: email
            })
            // nếu === null thì chưa có => thông báo chưa có tài khoản
            if (checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'Tài khoản này chưa được đăng kí'
                })
            }
            // so sánh password nhập vào với password đã mã hóa
            const comparePassword = bcrypt.compareSync(password,checkUser.password)
            //console.log('comparePassword',comparePassword)
            // nếu so mật khẩu sai thì báo tk hoặc mk sai
            if (!comparePassword) {
                resolve({
                    status:"ERR",
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
                status:"OK",
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
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra xem người dùng có tồn tại không
            const checkUser = await User.findOne({ _id: id });

            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'Tài khoản này chưa được đăng ký'
                });
                return;
            }

            // Kiểm tra xem email mới có trùng với email của người dùng khác không
            if (data.email) {
                const checkEmail = await User.findOne({ email: data.email });
                // Nếu email khác với email cũ và email này đã tồn tại, trả về lỗi
                if (checkEmail && checkEmail._id.toString() !== id) {
                    resolve({
                        status: 'ERR',
                        message: 'Email đã được sử dụng bởi tài khoản khác'
                    });
                    return;
                }
            }

            // Cập nhật thông tin người dùng
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            console.log('updateUser', updatedUser);

            resolve({
                status: 'OK',
                message: 'Cập nhật người dùng thành công'
            });

        } catch (e) {
            reject(e);
        }
    });
};


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
                    status: 'ERR',
                    message: 'Tài khoản này chưa được đăng kí'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
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
                status: 'OK',
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
                    status: 'ERR',
                    message: 'Tài khoản này chưa được đăng kí'
                })
            }

            resolve({
                status: 'OK',
                message: 'Thành công',
                data: user
            })
            
        }
        catch(e) {
            reject(e)
        }
    })
}

const deleteManyUser = (ids) => {
    return new Promise( async(resolve,reject) => {
        try {
            await User.deleteMany({_id:ids})
            resolve({
                status: 'OK',
                message: 'Xoá thông tin thành công'
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
    getDetailsUser,
    deleteManyUser
}