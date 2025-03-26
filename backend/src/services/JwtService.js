const jwt = require('jsonwebtoken');
// tạo access_token để mã hóa dữ liệu gửi đi
const generalAccessToken = async (payload) => {
    //console.log('ASTPayload:', payload);
    const access_token = jwt.sign(payload, 'access_token', { expiresIn: '1h' });
    return access_token;
};
// nếu access_token hết hạn thì dùng refresh token để làm mới lại access_token
const generalRefreshToken = async (payload) => {
    //console.log('Payload:', payload);
    const access_token = jwt.sign(payload, 'refresh_token', { expiresIn: '365d' });
    return access_token
};

module.exports = {
    generalAccessToken,
    generalRefreshToken
};
