const { authMiddleWare, authUserMiddleWare } = require('../backend/src/middleware/authMiddleware');
const jwt = require('../backend/node_modules/jsonwebtoken');

jest.mock('../backend/node_modules/jsonwebtoken');

describe('authMiddleWare', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer validtoken'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should call next() if user is admin', () => {
    const mockUser = { id: '123', isAdmin: true };
    jwt.verify.mockImplementation((token, secret, cb) => cb(null, mockUser));

    authMiddleWare(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user is not admin', () => {
    const mockUser = { id: '123', isAdmin: false };
    jwt.verify.mockImplementation((token, secret, cb) => cb(null, mockUser));

    authMiddleWare(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Không có quyền',
      status: 'ERROR'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    jwt.verify.mockImplementation((token, secret, cb) =>
      cb(new Error('Invalid token'), null)
    );

    authMiddleWare(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token không hợp lệ',
      status: 'ERROR'
    });
    expect(next).not.toHaveBeenCalled();
  });
});

describe('authUserMiddleWare', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        token: 'Bearer validtoken'
      },
      params: {
        id: '123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should call next() if user is admin', () => {
    const mockUser = { id: '123', isAdmin: true };
    jwt.verify.mockImplementation((token, secret, cb) => cb(null, mockUser));

    authUserMiddleWare(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it('should call next() if user id matches param', () => {
    const mockUser = { id: '123', isAdmin: false };
    jwt.verify.mockImplementation((token, secret, cb) => cb(null, mockUser));

    authUserMiddleWare(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it('should return 404 if user not admin and id mismatch', () => {
    const mockUser = { id: '456', isAdmin: false };
    jwt.verify.mockImplementation((token, secret, cb) => cb(null, mockUser));

    authUserMiddleWare(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'The authentication',
      status: 'ERROR'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if token is invalid (let controller handle)', () => {
    jwt.verify.mockImplementation((token, secret, cb) =>
      cb(new Error('Invalid token'), null)
    );

    authUserMiddleWare(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeUndefined();
  });
});
