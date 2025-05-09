# API Documentation: Middleware

## Authentication Middleware

### `authMiddleWare`
Middleware xác thực quyền admin

#### Request
**Headers**
| Header          | Type     | Required | Description               |
|-----------------|----------|----------|---------------------------|
| Authorization   | string   | Yes      | Bearer token (JWT)        |

#### Response

##### Success
- Tiếp tục xử lý request nếu token hợp lệ và user là admin

##### Error Responses
**401 Unauthorized**
```json
{
    "message": "Token không hợp lệ",
    "status": "ERROR"
}
```

**403 Forbidden**
```json
{
    "message": "Không có quyền",
    "status": "ERROR"
}
```

---

## User Authentication Middleware

### `authUserMiddleWare`
Middleware xác thực quyền truy cập user

#### Request
**Headers**
| Header  | Type     | Required | Description               |
|---------|----------|----------|---------------------------|
| token   | string   | Yes      | Bearer token (JWT)        |

**URL Parameters**
| Parameter | Type     | Required | Description               |
|-----------|----------|----------|---------------------------|
| id        | string   | Yes      | ID của người dùng (ObjectId) |

#### Response

##### Success
- Tiếp tục xử lý request nếu:
  - Token hợp lệ VÀ
  - User là admin HOẶC user ID trùng với ID trong params

##### Error Response
**404 Not Found**
```json
{
    "message": "The authentication",
    "status": "ERROR"
}
```

---

## Activity Tracking Middleware

### `trackActivity`
Middleware theo dõi hoạt động người dùng

#### Behavior
- Cập nhật trường `lastActive` khi có `req.user`
- Không ảnh hưởng đến luồng xử lý nếu có lỗi
- Luôn gọi `next()` để tiếp tục middleware chain

#### Requirements
- Yêu cầu `req.user` được thiết lập từ middleware xác thực trước đó

#### Error Handling
- Lỗi sẽ được log ra console nhưng không trả về response lỗi

---

## Usage Examples

### Admin Routes
```javascript
router.get('/admin-only', authMiddleWare, adminController);
```

### User-specific Routes
```javascript
router.get('/users/:id/profile', authUserMiddleWare, userController);
```

### Activity Tracking
```javascript
// Sử dụng sau middleware xác thực
router.use(authMiddleWare);
router.use(trackActivity);
```