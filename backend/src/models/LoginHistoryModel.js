const mongoose = require('mongoose');

  // lưu lịch sử đăng nhập của user
const loginHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // tham chiếu đến user đăng nhập
    ipAddress: { type: String },  // IP máy thực hiện đăng nhập
    userAgent: { type: String },  // thông tin thiết bị
    loginAt: { type: Date, default: Date.now }, // thời điểm đăng nhập
    logoutAt: { type: Date }, // thời điểm đăng xuất
    status: { type: String, enum: ['success', 'failed'], required: true },  // kết quả (thành công/ thất bại)
    failureReason: { type: String } // lý do thất bại (nếu có)
  },
  { timestamps: true }  // tự động thêm createAt và updateAt
);
const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);
module.exports = LoginHistory