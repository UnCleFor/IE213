# API Documentation: Order Service

## 1. Tạo đơn hàng mới
### POST `/api/orders`
Tạo đơn hàng mới và cập nhật tồn kho sản phẩm

#### Request
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (nếu có)
```

**Body (JSON):**
| Field         | Type     | Required | Description                          |
|---------------|----------|----------|--------------------------------------|
| orderItems    | Array    | Yes      | Danh sách sản phẩm trong đơn hàng    |
| paymentMethod | string   | Yes      | Phương thức thanh toán               |
| itemsPrice    | number   | Yes      | Tổng giá sản phẩm                    |
| shippingPrice | number   | Yes      | Phí vận chuyển                       |
| totalPrice    | number   | Yes      | Tổng thanh toán                      |
| fullName      | string   | Yes      | Tên người nhận                      |
| address       | string   | Yes      | Địa chỉ giao hàng                    |
| phone         | string   | Yes      | Số điện thoại                        |
| totalDiscount | number   | Yes      | Tổng giảm giá (0 nếu không có)       |

**Example:**
```json
{
  "orderItems": [
    {
      "product": "60a1b2c3d4e5f67890123456",
      "name": "Ghế sofa",
      "amount": 1,
      "image": "url-to-image",
      "price": 5000000
    }
  ],
  "paymentMethod": "COD",
  "itemsPrice": 5000000,
  "shippingPrice": 50000,
  "totalPrice": 5050000,
  "fullName": "Nguyễn Văn A",
  "address": "123 Đường ABC, Hà Nội",
  "phone": "0912345678",
  "totalDiscount": 0
}
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Tạo đơn hàng thành công",
  "data": {
    "_id": "60a1b2c3d4e5f67890123456",
    "orderItems": [...],
    "totalPrice": 5050000
  }
}
```

**Error (400):**
```json
{
  "status": "Lỗi",
  "message": "Sản phẩm Ghế sofa không đủ hàng. Còn 0 sản phẩm"
}
```

**Validation Error (200):**
```json
{
  "status": "Lỗi",
  "message": "Thiếu thông tin: paymentMethod, address"
}
```

## 2. Lấy chi tiết đơn hàng
### GET `/api/orders/:id`
Lấy thông tin chi tiết đơn hàng theo ID

#### Request
**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID của đơn hàng   |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": {
    "_id": "60a1b2c3d4e5f67890123456",
    "orderItems": [...],
    "status": "Đang xử lý"
  }
}
```

**Error (404):**
```json
{
  "message": "Không tìm thấy đơn hàng"
}
```

## 3. Lấy tất cả đơn hàng
### GET `/api/orders`
Lấy danh sách tất cả đơn hàng (quản trị)

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [
    {
      "_id": "60a1b2c3d4e5f67890123456",
      "totalPrice": 5050000,
      "status": "Đang xử lý"
    }
  ]
}
```

## 4. Cập nhật đơn hàng
### PUT `/api/orders/:id`
Cập nhật thông tin đơn hàng (thường dùng để cập nhật trạng thái)

#### Request
**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID của đơn hàng   |

**Body (JSON):**
```json
{
  "status": "Đã giao hàng"
}
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Cập nhật thành công"
}
```

## 5. Xóa đơn hàng
### DELETE `/api/orders/:id`
Xóa đơn hàng theo ID

#### Request
**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID của đơn hàng   |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Xóa đơn hàng thành công"
}
```

## 6. Xóa nhiều đơn hàng
### POST `/api/orders/delete-many`
Xóa nhiều đơn hàng cùng lúc

#### Request
**Body (JSON):**
```json
{
  "ids": ["60a1b2c3d4e5f67890123456", "60a1b2c3d4e5f67890123457"]
}
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Đã xóa 2 đơn hàng"
}
```

## 7. Lấy đơn hàng theo người dùng
### GET `/api/orders/user/:userId`
Lấy tất cả đơn hàng của một người dùng

#### Request
**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| userId    | string | Yes      | ID của người dùng |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [
    {
      "_id": "60a1b2c3d4e5f67890123456",
      "totalPrice": 5050000,
      "status": "Đang xử lý"
    }
  ]
}

