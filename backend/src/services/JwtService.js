const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

// tạo access_token để mã hóa dữ liệu gửi đi
const generalAccessToken = async (payload) => {
    //console.log('ASTPayload:', payload);
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN , { expiresIn: '1h' });
    return access_token;
};

// nếu access_token hết hạn thì dùng refresh token để làm mới lại access_token
const generalRefreshToken = async (payload) => {
    //console.log('Payload:', payload);
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refresh_token
};

module.exports = {
    generalAccessToken,
    generalRefreshToken
};
