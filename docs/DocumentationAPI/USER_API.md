# API Documentation: User Service

## 1. Đăng ký tài khoản
### POST `/api/users/register`
Tạo tài khoản người dùng mới

#### Request
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
| Field           | Type     | Required | Description                          |
|-----------------|----------|----------|--------------------------------------|
| name            | string   | Yes      | Tên người dùng                      |
| email           | string   | Yes      | Email (định dạng hợp lệ)            |
| password        | string   | Yes      | Mật khẩu (8+ ký tự, chữ hoa/thường, số, ký tự đặc biệt) |
| confirmPassword | string   | Yes      | Nhập lại mật khẩu                   |
| phone           | string   | Yes      | Số điện thoại Việt Nam              |

**Example:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "Password@123",
  "confirmPassword": "Password@123",
  "phone": "0912345678"
}
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Đăng ký thành công",
  "data": {
    "_id": "60a1b2c3d4e5f67890123456",
    "name": "Nguyễn Văn A"
  }
}
```

**Validation Error (200):**
```json
{
  "status": "ERR",
  "message": "Mật khẩu phải có ít nhất 8 ký tự..."
}
```

## 2. Đăng nhập
### POST `/api/users/login`
Đăng nhập vào hệ thống

#### Request
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
| Field    | Type     | Required | Description       |
|----------|----------|----------|-------------------|
| email    | string   | Yes      | Email đăng nhập  |
| password | string   | Yes      | Mật khẩu         |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Đăng nhập thành công",
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi...",
  "user": {
    "_id": "60a1b2c3d4e5f67890123456",
    "name": "Nguyễn Văn A"
  }
}
```

**Error (200):**
```json
{
  "status": "ERR",
  "message": "Tài khoản đã được đăng nhập ở nơi khác"
}
```

## 3. Làm mới token
### GET `/api/users/refresh-token`
Làm mới access token bằng refresh token

#### Request
**Headers:**
```
Authorization: Bearer <refresh_token>
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "access_token": "eyJhbGciOi...",
  "refresh_token": "eyJhbGciOi..."
}
```

## 4. Đăng xuất
### POST `/api/users/logout`
Đăng xuất khỏi hệ thống

#### Request
**Headers:**
```
Authorization: Bearer <access_token>
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Đăng xuất thành công"
}
```

## 5. Quên mật khẩu
### POST `/api/users/forgot-password`
Yêu cầu đặt lại mật khẩu

#### Request
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
| Field | Type   | Required | Description  |
|-------|--------|----------|--------------|
| email | string | Yes      | Email đăng ký |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "OTP đã được gửi về email"
}
```

## 6. Đặt lại mật khẩu
### POST `/api/users/reset-password`
Đặt lại mật khẩu bằng OTP

#### Request
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
| Field       | Type     | Required | Description            |
|-------------|----------|----------|------------------------|
| email       | string   | Yes      | Email đăng ký         |
| otp         | string   | Yes      | Mã OTP 6 số           |
| newPassword | string   | Yes      | Mật khẩu mới          |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Đặt lại mật khẩu thành công"
}
```

## 7. Lấy thông tin người dùng
### GET `/api/users/:id`
Lấy thông tin chi tiết người dùng

#### Request
**Headers:**
```
Authorization: Bearer <access_token>
```

**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID người dùng     |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": {
    "_id": "60a1b2c3d4e5f67890123456",
    "name": "Nguyễn Văn A",
    "email": "user@example.com"
  }
}
```

## 8. Cập nhật thông tin
### PUT `/api/users/:id`
Cập nhật thông tin người dùng

#### Request
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token>
```

**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID người dùng     |

**Body (JSON):**
Các trường cần cập nhật

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Cập nhật thành công"
}
```

## 9. Chặn/Bỏ chặn người dùng
### PUT `/api/users/block/:id`
Chặn hoặc bỏ chặn người dùng

#### Request
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <access_token> (Admin)
```

**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID người dùng     |

**Body (JSON):**
```json
{
  "isBlocked": true
}
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Đã chặn người dùng",
  "data": {
    "_id": "60a1b2c3d4e5f67890123456",
    "isBlocked": true
  }
}
```

## 10. Lấy danh sách người dùng
### GET `/api/users`
Lấy danh sách tất cả người dùng (Admin)

#### Request
**Headers:**
```
Authorization: Bearer <access_token> (Admin)
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [
    {
      "_id": "60a1b2c3d4e5f67890123456",
      "name": "Nguyễn Văn A",
      "email": "user@example.com"
    }
  ]
}
```

## 11. Xóa người dùng
### DELETE `/api/users/:id`
Xóa người dùng (Admin)

#### Request
**Headers:**
```
Authorization: Bearer <access_token> (Admin)
```

**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID người dùng     |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Xóa thành công"
}
```