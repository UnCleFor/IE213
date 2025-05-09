const mongoose = require('../backend/node_modules/mongoose');
const { getLoginHistory } = require('../backend/src/controllers/LoginHistoryController');
const LoginHistory = require('../backend/src/models/LoginHistoryModel');

// Mock model LoginHistory để không phải gọi database thật khi test
jest.mock('../backend/src/models/LoginHistoryModel', () => ({
    find: jest.fn().mockReturnThis(),
    sort: jest.fn()
}));

// Mô tả test suite cho hàm getLoginHistory
describe('getLoginHistory', () => {
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

    // Test case 1: Trả về lỗi 400 nếu ID không hợp lệ
    it('should return 400 if id is invalid', async () => {
        req.params.id = 'invalid-id';
        await getLoginHistory(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERROR',
            message: 'ID người dùng không hợp lệ'
        });
    });

    // Test case 2: Trả về lịch sử đăng nhập nếu ID hợp lệ
    it('should return login history if id is valid', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        req.params.id = id;
        const mockHistory = [
            { loginAt: new Date(), ipAddress: '127.0.0.1' },
            { loginAt: new Date(), ipAddress: '192.168.0.1' }
        ];
        LoginHistory.find.mockReturnValueOnce({
            sort: jest.fn().mockResolvedValueOnce(mockHistory)
        });
        await getLoginHistory(req, res);
        expect(LoginHistory.find).toHaveBeenCalledWith({ user: id });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'OK',
            data: mockHistory
        });
    });

    // Test case 3: Trả về lỗi 500 khi có lỗi server
    it('should return 500 on server error', async () => {
        const id = new mongoose.Types.ObjectId().toString();
        req.params.id = id;
        LoginHistory.find.mockImplementation(() => {
            throw new Error('DB error');
        });
        await getLoginHistory(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'ERROR',
            message: 'Lỗi server khi lấy lịch sử đăng nhập'
        });
    });
});
