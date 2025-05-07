const userController = require('../backend/src/controllers/UserController');
const UserService = require('../backend/src/services/UserService');
const UserModel = require('../backend/src/models/UserModel');
const EmailService = require('../backend/src/services/EmailService');
const LoginHistory = require('../backend/src/models/LoginHistoryModel');
const mongoose = require('../backend/node_modules/mongoose');
// Mock các dependencies
jest.mock('../backend/src/services/UserService');
jest.mock('../backend/src/models/UserModel', () => ({
    findOne: jest.fn(),
    updateOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
}));
jest.mock('../backend/src/services/EmailService');
jest.mock('../backend/src/models/UserModel');
jest.mock('../backend/src/models/LoginHistoryModel');

describe('User Controller Tests', () => {
    let req, res;

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });

    describe('createUser', () => {
        it('should return error when missing required fields', async () => {
            req.body = {}; // Không có đủ thông tin trong body

            await userController.createUser(req, res); // Gọi hàm createUser

            // Kiểm tra phản hồi trả về
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Cần điền đầy đủ thông tin'
            });
        });

        it('should return error for invalid email', async () => {
            req.body = {
                name: 'Test User',
                email: 'invalid-email',
                password: 'ValidPass1!',
                confirmPassword: 'ValidPass1!',
                phone: '0987654321'
            };

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Email không hợp lệ'
            });
        });

        it('should return error for password mismatch', async () => {
            req.body = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'ValidPass1!',
                confirmPassword: 'Different1!',
                phone: '0987654321'
            };

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Mật khẩu nhập lại không trùng khớp'
            });
        });

        it('should return error for invalid phone number', async () => {
            req.body = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'ValidPass1!',
                confirmPassword: 'ValidPass1!',
                phone: '1234567890' // Số không hợp lệ
            };

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Số điện thoại không hợp lệ (phải là số điện thoại Việt Nam)'
            });
        });

        it('should return error for weak password', async () => {
            req.body = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'weak',
                confirmPassword: 'weak',
                phone: '0987654321'
            };

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
            });
        });

        it('should create user successfully with valid data', async () => {
            req.body = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'ValidPass1!',
                confirmPassword: 'ValidPass1!',
                phone: '0987654321'
            };

            const mockResponse = { status: 'OK', data: { id: '123' } };
            UserService.createUser.mockResolvedValue(mockResponse); // Mock kết quả trả về của createUser

            await userController.createUser(req, res);

            expect(UserService.createUser).toHaveBeenCalledWith(req.body); // Kiểm tra việc gọi createUser với tham số chính xác
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        it('should handle system error', async () => {
            req.body = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'ValidPass1!',
                confirmPassword: 'ValidPass1!',
                phone: '0987654321'
            };

            const error = new Error('Database error');
            UserService.createUser.mockRejectedValue(error); // Mock lỗi trả về từ createUser

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Database error'
            });
        });
    });
});

describe('loginUser', () => {
    let req, res;

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {},
            ip: '127.0.0.1',
            get: jest.fn().mockReturnValue('test-user-agent'),
            headers: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };

        // Mock default implementations
        LoginHistory.create.mockResolvedValue({ _id: 'login123' });
        UserModel.findByIdAndUpdate.mockResolvedValue(true);
    });

    it('should return error when missing email or password', async () => {
        req.body = {}; // Không có email hoặc password trong body

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Cần điền đầy đủ thông tin'
        });
    });

    it('should return error for invalid email', async () => {
        req.body = {
            email: 'invalid-email',
            password: 'password'
        };

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Email bị lỗi'
        });
    });

    it('should return error when user not found', async () => {
        req.body = {
            email: 'nonexistent@example.com',
            password: 'password'
        };

        UserModel.findOne.mockResolvedValue(null);

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Người dùng không tồn tại'
        });
    });

    it('should return error when account is already logged in elsewhere', async () => {
        req.body = {
            email: 'test@example.com',
            password: 'password'
        };

        UserModel.findOne.mockResolvedValue({
            _id: 'user123',
            email: 'test@example.com',
            isLoggedIn: true,
            isBlocked: false
        });

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Tài khoản này đã được đăng nhập ở nơi khác'
        });
    });

    it('should return error when account is blocked', async () => {
        req.body = {
            email: 'blocked@example.com',
            password: 'password'
        };

        UserModel.findOne.mockResolvedValue({
            _id: 'user123',
            email: 'blocked@example.com',
            isLoggedIn: false,
            isBlocked: true
        });

        await userController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Tài khoản đã bị chặn'
        });
    });

    it('should login successfully with valid credentials', async () => {
        req.body = {
            email: 'test@example.com',
            password: 'password'
        };

        const mockUser = {
            _id: 'user123',
            email: 'test@example.com',
            isLoggedIn: false,
            isBlocked: false
        };

        const mockResponse = {
            status: 'OK',
            access_token: 'access-token',
            refresh_token: 'refresh-token',
            userData: { id: 'user123' }
        };

        UserModel.findOne.mockResolvedValue(mockUser);
        UserService.loginUser.mockResolvedValue(mockResponse);

        await userController.loginUser(req, res);

        // Verify service was called with correct arguments
        expect(UserService.loginUser).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password'
        });

        // Verify login history was recorded
        expect(LoginHistory.create).toHaveBeenCalledWith({
            user: 'user123',
            ipAddress: '127.0.0.1',
            userAgent: 'test-user-agent',
            status: 'success',
            loginAt: expect.any(Date)
        });

        // Verify user status was updated
        expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith('user123', {
            isLoggedIn: true,
            lastActive: expect.any(Date),
            currentSession: 'login123'
        });

        // Verify response
        expect(res.cookie).toHaveBeenCalledWith('refresh-token', 'refresh-token', {
            HttpOnly: true,
            Secure: true,
            sameSite: 'None',
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle login service error', async () => {
        req.body = {
            email: 'test@example.com',
            password: 'password'
        };

        const mockUser = {
            _id: 'user123',
            email: 'test@example.com',
            isLoggedIn: false,
            isBlocked: false
        };

        UserModel.findOne.mockResolvedValue(mockUser);
        UserService.loginUser.mockRejectedValue(new Error('Invalid credentials'));

        await userController.loginUser(req, res);

        // Verify error handling
        expect(LoginHistory.create).toHaveBeenCalledWith({
            user: 'user123',
            ipAddress: '127.0.0.1',
            userAgent: 'test-user-agent',
            status: 'failed',
            failureReason: 'Invalid credentials',
            loginAt: expect.any(Date)
        });

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: expect.any(Error)
        });
    });
});

describe('updateUser', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should return error when missing userId', async () => {
        req.params = {};

        await userController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Thiếu userId'
        });
    });

    it('should return error for invalid email format', async () => {
        req.params = { id: '123' };
        req.body = { email: 'invalid-email' };

        await userController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Email không hợp lệ'
        });
    });

    it('should return error for invalid phone format', async () => {
        req.params = { id: '123' };
        req.body = { phone: '123456789' }; // Invalid Vietnamese phone

        await userController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Số điện thoại không hợp lệ (phải là số điện thoại Việt Nam)'
        });
    });

    it('should return error for weak password', async () => {
        req.params = { id: '123' };
        req.body = { password: 'weak' };

        await userController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
        });
    });

    it('should update user successfully with valid data', async () => {
        req.params = { id: '123' };
        req.body = {
            name: 'Updated Name',
            email: 'valid@example.com',
            phone: '0987654321',
            password: 'ValidPass1!'
        };

        const mockResponse = { status: 'OK', data: { id: '123' } };
        UserService.updateUser.mockResolvedValue(mockResponse);

        await userController.updateUser(req, res);

        expect(UserService.updateUser).toHaveBeenCalledWith('123', req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle update error', async () => {
        req.params = { id: '123' };
        req.body = { name: 'Updated Name' };

        const error = new Error('Update failed');
        UserService.updateUser.mockRejectedValue(error);

        await userController.updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Update failed'
        });
    });
});

describe('deleteUser', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should return error when missing userId', async () => {
        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Mật khẩu nhập lại không trùng khớp'
        });
    });

    it('should delete user successfully', async () => {
        req.params = { id: '123' };
        const mockResponse = { status: 'OK' };
        UserService.deleteUser.mockResolvedValue(mockResponse);

        await userController.deleteUser(req, res);

        expect(UserService.deleteUser).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle delete error', async () => {
        req.params = { id: '123' };
        const error = new Error('Delete failed');
        UserService.deleteUser.mockRejectedValue(error);

        await userController.deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: error
        });
    });
});

describe('getAllUser', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should return all users successfully', async () => {
        const mockUsers = [
            { id: '1', name: 'User 1' },
            { id: '2', name: 'User 2' }
        ];
        UserService.getAllUser.mockResolvedValue(mockUsers);

        await userController.getAllUser(req, res);

        expect(UserService.getAllUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle get all users error', async () => {
        const error = new Error('Get all failed');
        UserService.getAllUser.mockRejectedValue(error);

        await userController.getAllUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: error
        });
    });
});

describe('getDetailsUser', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should return error when missing userId', async () => {
        await userController.getDetailsUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Mật khẩu nhập lại không trùng khớp'
        });
    });

    it('should return user details successfully', async () => {
        req.params = { id: '123' };
        const mockUser = { id: '123', name: 'Test User' };
        UserService.getDetailsUser.mockResolvedValue(mockUser);

        await userController.getDetailsUser(req, res);

        expect(UserService.getDetailsUser).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle get details error', async () => {
        req.params = { id: '123' };
        const error = new Error('Get details failed');
        UserService.getDetailsUser.mockRejectedValue(error);

        await userController.getDetailsUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: error
        });
    });
});

describe('logoutUser', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should logout successfully', async () => {
        await userController.logoutUser(req, res);

        expect(res.clearCookie).toHaveBeenCalledWith('refresh-token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'OK',
            message: 'Đăng xuất thành công'
        });
    });

    it('should handle logout error', async () => {
        const error = new Error('Logout failed');
        res.clearCookie.mockImplementation(() => {
            throw error;
        });

        await userController.logoutUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
});

describe('deleteManyUser', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should return error when missing ids', async () => {
        await userController.deleteManyUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Thiếu ds id của user'
        });
    });

    it('should delete multiple users successfully', async () => {
        req.body = { ids: ['1', '2', '3'] };
        const mockResponse = { status: 'OK', deletedCount: 3 };
        UserService.deleteManyUser.mockResolvedValue(mockResponse);

        await userController.deleteManyUser(req, res);

        expect(UserService.deleteManyUser).toHaveBeenCalledWith(['1', '2', '3']);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle delete many error', async () => {
        req.body = { ids: ['1', '2', '3'] };
        const error = new Error('Delete many failed');
        UserService.deleteManyUser.mockRejectedValue(error);

        await userController.deleteManyUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: error
        });
    });
});

describe('getUserEmail', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should return error when missing userId', async () => {
        await userController.getUserEmail(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Thiếu id user'
        });
    });

    it('should return user email successfully', async () => {
        req.params = { id: '123' };
        const mockResponse = { email: 'test@example.com' };
        UserService.getUserEmail.mockResolvedValue(mockResponse);

        await userController.getUserEmail(req, res);

        expect(UserService.getUserEmail).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle get email error', async () => {
        req.params = { id: '123' };
        const error = new Error('Get email failed');
        UserService.getUserEmail.mockRejectedValue(error);

        await userController.getUserEmail(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: error
        });
    });
});

describe('forgotPassword', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should return error when email does not exist', async () => {
        req.body = { email: 'nonexistent@example.com' };
        UserModel.findOne.mockResolvedValue(null);

        await userController.forgotPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email không tồn tại trong hệ thống'
        });
    });

    it('should send OTP email successfully', async () => {
        req.body = { email: 'test@example.com' };
        const mockUser = {
            email: 'test@example.com',
            resetPasswordOTP: null,
            resetPasswordExpire: null,
            save: jest.fn().mockResolvedValue(true)
        };

        UserModel.findOne.mockResolvedValue(mockUser);
        EmailService.sendOTPEmail.mockResolvedValue(true);

        await userController.forgotPassword(req, res);

        expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
        expect(mockUser.resetPasswordOTP).toBeDefined();
        expect(mockUser.resetPasswordExpire).toBeDefined();
        expect(EmailService.sendOTPEmail).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'OK',
            message: 'OTP đã được gửi về email'
        });
    });

    it('should handle forgot password error', async () => {
        req.body = { email: 'test@example.com' };
        const error = new Error('Email service down');
        UserModel.findOne.mockRejectedValue(error);

        await userController.forgotPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: error.message
        });
    });
});

describe('resetPassword', () => {
    let req, res; // Định nghĩa req và res ở phạm vi này

    beforeEach(() => {
        // Reset mocks trước mỗi test
        jest.clearAllMocks();

        req = {
            body: {},
            params: {},
            cookies: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });
    it('should return error when missing required fields', async () => {
        req.body = {};

        await userController.resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Thiếu thông tin yêu cầu'
        });
    });

    it('should return error for weak password', async () => {
        req.body = {
            email: 'test@example.com',
            otp: '123456',
            newPassword: 'weak'
        };

        await userController.resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
        });
    });

    it('should return error when email does not exist', async () => {
        req.body = {
            email: 'nonexistent@example.com',
            otp: '123456',
            newPassword: 'ValidPass1!'
        };

        UserModel.findOne.mockResolvedValue(null);

        await userController.resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Email không tồn tại'
        });
    });

    it('should return error for incorrect OTP', async () => {
        req.body = {
            email: 'test@example.com',
            otp: 'wrong-otp',
            newPassword: 'ValidPass1!'
        };

        const mockUser = {
            email: 'test@example.com',
            resetPasswordOTP: 'correct-otp',
            resetPasswordExpire: Date.now() + 10000
        };

        UserModel.findOne.mockResolvedValue(mockUser);

        await userController.resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Mã OTP không đúng'
        });
    });

    it('should return error for expired OTP', async () => {
        req.body = {
            email: 'test@example.com',
            otp: '123456',
            newPassword: 'ValidPass1!'
        };

        const mockUser = {
            email: 'test@example.com',
            resetPasswordOTP: '123456',
            resetPasswordExpire: Date.now() - 10000 // Expired
        };

        UserModel.findOne.mockResolvedValue(mockUser);

        await userController.resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Mã OTP đã hết hạn'
        });
    });

    it('should reset password successfully', async () => {
        req.body = {
            email: 'test@example.com',
            otp: '123456',
            newPassword: 'ValidPass1!'
        };

        const mockUser = {
            email: 'test@example.com',
            resetPasswordOTP: '123456',
            resetPasswordExpire: Date.now() + 10000,
            password: 'old-hash',
            save: jest.fn().mockResolvedValue(true)
        };

        UserModel.findOne.mockResolvedValue(mockUser);

        await userController.resetPassword(req, res);

        expect(mockUser.password).not.toBe('old-hash');
        expect(mockUser.resetPasswordOTP).toBeUndefined();
        expect(mockUser.resetPasswordExpire).toBeUndefined();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'OK',
            message: 'Đặt lại mật khẩu thành công'
        });
    });

    it('should handle reset password error', async () => {
        req.body = {
            email: 'test@example.com',
            otp: '123456',
            newPassword: 'ValidPass1!'
        };

        const error = new Error('Database error');
        UserModel.findOne.mockRejectedValue(error);

        await userController.resetPassword(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: error.message
        });
    });
});

describe('updateLogoutStatus', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('should return error if userId is missing', async () => {
        await userController.updateLogoutStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Thiếu userId'
        });
    });

    it('should return success if logout status is updated', async () => {
        req.params.id = 'user123';
        UserService.updateLogoutStatus.mockResolvedValue({ status: 'OK', message: 'Đã đăng xuất' });

        await userController.updateLogoutStatus(req, res);

        expect(UserService.updateLogoutStatus).toHaveBeenCalledWith('user123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'OK',
            message: 'Đã đăng xuất'
        });
    });

    it('should return error if service throws', async () => {
        req.params.id = 'user123';
        UserService.updateLogoutStatus.mockRejectedValue(new Error('Lỗi logout'));

        await userController.updateLogoutStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERR',
            message: 'Lỗi logout'
        });
    });
});

describe('blockUser', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        jest.clearAllMocks();
    });

    it('should return error if user id is invalid', async () => {
        req.params.id = 'invalid-id';
        req.body.data = true;

        await userController.blockUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERROR',
            message: 'ID người dùng không hợp lệ'
        });
    });

    it('should return error if user not found', async () => {
        req.params.id = new mongoose.Types.ObjectId().toString();
        req.body.data = true;

        UserModel.findByIdAndUpdate.mockResolvedValue(null);

        await userController.blockUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERROR',
            message: 'Không tìm thấy người dùng'
        });
    });

    it('should return success if user is blocked', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        req.params.id = id;
        req.body.data = true;

        const mockUser = { _id: id, isBlocked: true };
        UserModel.findByIdAndUpdate.mockResolvedValue(mockUser);

        await userController.blockUser(req, res);

        expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
            id,
            { isBlocked: true },
            { new: true }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'OK',
            message: 'Đã chặn người dùng',
            data: mockUser
        });
    });

    it('should return success if user is unblocked', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        req.params.id = id;
        req.body.data = false;

        const mockUser = { _id: id, isBlocked: false };
        UserModel.findByIdAndUpdate.mockResolvedValue(mockUser);

        await userController.blockUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'OK',
            message: 'Đã bỏ chặn người dùng',
            data: mockUser
        });
    });

    it('should handle server error', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        req.params.id = id;
        req.body.data = true;

        UserModel.findByIdAndUpdate.mockRejectedValue(new Error('DB lỗi'));

        await userController.blockUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERROR',
            message: 'DB lỗi'
        });
    });
});