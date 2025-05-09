const mongoose = require('mongoose')

    // đại diện cho người dùng
const userSchema = new mongoose.Schema(
    {
        name: { type: String },         // tên người dùng
        email: { type: String, required: true, unique: true },  // email
        password: { type: String, required: true },             // mật khẩu
        isAdmin: { type: Boolean, default: false, required: true }, // quyền admin (true/false)
        phone: { type: String },        // sdt
        address: { type: String },      // địa chỉ
        avatar: { type: String },       // ảnh đại diện
        
        // reset mật khẩu
        resetPasswordOTP: String,
        resetPasswordExpire: Date,
        
        isLoggedIn: { type: Boolean, default: false },  // trạng thái đăng nhập
        lastActive: { type: Date },                     // lần họat động gần nhất
        // tham chiếu session đang hoạt động
        currentSession: { type: mongoose.Schema.Types.ObjectId, ref: 'LoginHistory' },

        isBlocked: {        // tài khoản bị chặn (true/false)
            type: Boolean,
            default: false
          },
          
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;