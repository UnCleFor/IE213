const LoginHistory = require('../models/LoginHistoryModel');
const mongoose = require('mongoose')
const getLoginHistory = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate input
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'ID người dùng không hợp lệ'
            });
        }

        // Lấy lịch sử đăng nhập, sắp xếp theo thời gian giảm dần
        const history = await LoginHistory.find({ user: id })
            .sort({ loginAt: -1 })
           
        res.status(200).json({
            status: 'OK',
            data: history
        });
    } catch (error) {
        console.error('Error getting login history:', error);
        res.status(500).json({
            status: 'ERROR',
            message: 'Lỗi server khi lấy lịch sử đăng nhập'
        });
    }
};

module.exports = {
    getLoginHistory
}