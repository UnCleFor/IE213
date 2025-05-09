const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

// tạo access_token để mã hóa dữ liệu gửi đi
const generalAccessToken = async (payload) => {
    //console.log('ASTPayload:', payload);
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN , { expiresIn: '365d' });
    return access_token;
};

// nếu access_token hết hạn thì dùng refresh token để làm mới lại access_token
const generalRefreshToken = async (payload) => {
    //console.log('Payload:', payload);
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '3650d' });
    return refresh_token
};

// xử lý logic khi client gửi refresh token để lấy access token mới
const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {

            // xác thực refresh token
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, decoded) => {
                if (err) {
                    return resolve({
                        status: 'ERR',
                        message: 'Token không hợp lệ',
                    });
                }

                // Truy cập thông tin đúng từ decoded
                const access_token = await generalAccessToken({
                    id: decoded.id,
                    isAdmin: decoded?.isAdmin,
                });

                resolve({
                    status: 'OK',
                    message: 'Refresh token thành công',
                    access_token
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
};
