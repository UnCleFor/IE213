const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    loginAt: { type: Date, default: Date.now },
    logoutAt: { type: Date },
    status: { type: String, enum: ['success', 'failed'], required: true },
    failureReason: { type: String }
  },
  { timestamps: true }
);
const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);
module.exports = LoginHistory