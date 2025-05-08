# API Documentation: Login History

## GET `/api/login-history/:id`
Lấy lịch sử đăng nhập của người dùng theo ID

### Request

#### URL Parameters
| Parameter | Type     | Required | Description               |
|-----------|----------|----------|---------------------------|
| id        | string   | Yes      | ID của người dùng (ObjectId) |

### Response

#### Success Response (200 OK)
```json
{
    "status": "OK",
    "data": [
        {
            "_id": "65a1b2c3d4e5f67890123456",
            "user": "65a1b2c3d4e5f67890123456",
            "loginAt": "2023-12-15T08:30:00.000Z",
            "ipAddress": "192.168.1.1",
            "device": "Chrome on Windows",
            "__v": 0
        },
        {
            "_id": "65a1b2c3d4e5f67890123457",
            "user": "65a1b2c3d4e5f67890123456",
            "loginAt": "2023-12-14T10:15:00.000Z",
            "ipAddress": "192.168.1.2",
            "device": "Safari on iPhone",
            "__v": 0
        }
    ]
}