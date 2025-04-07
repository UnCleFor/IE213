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

const refreshTokenJwtService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
           // console.log('Token nhận được:', token);

            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, decoded) => {
                if (err) {
                    return resolve({
                        status: 'ERR',
                        message: 'Token không hợp lệ',
                    });
                }

                console.log('User decoded từ token:', decoded);

                // Truy cập thông tin đúng từ decoded
                const access_token = await generalAccessToken({
                    id: decoded.id,
                    isAdmin: decoded?.isAdmin,
                });

                console.log('access_token mới:', access_token);

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
