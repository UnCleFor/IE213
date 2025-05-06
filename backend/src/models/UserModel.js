const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: String },
        address: { type: String },
        avatar: { type: String },
        resetPasswordOTP: String,
        resetPasswordExpire: Date,
        
        isLoggedIn: { type: Boolean, default: false },
        lastActive: { type: Date },
        currentSession: { type: mongoose.Schema.Types.ObjectId, ref: 'LoginHistory' },

        isBlocked: {
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