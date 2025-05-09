# API Documentation: Payment Service

## 1. Tạo URL thanh toán VNPay
### POST `/api/payment/create-payment-url`
Tạo URL thanh toán để chuyển hướng sang cổng thanh toán VNPay

#### Request
**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
| Field      | Type     | Required | Description                          |
|------------|----------|----------|--------------------------------------|
| amount     | number   | Yes      | Số tiền thanh toán (VND)            |
| orderId    | string   | Yes      | Mã đơn hàng                         |
| bankCode   | string   | No       | Mã ngân hàng (nếu có)               |
| orderInfo  | string   | No       | Thông tin đơn hàng                  |
| orderType  | string   | No       | Loại hàng hóa                       |

**Example:**
```json
{
  "amount": 1000000,
  "orderId": "ORDER_12345",
  "bankCode": "VNBANK",
  "orderInfo": "Thanh toán đơn hàng ORDER_12345",
  "orderType": "fashion"
}
```

#### Response
**Success (200):**
```json
{
  "code": "00",
  "message": "success",
  "data": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?..."
}
```

**Validation Error (400):**
```json
{
  "code": "01",
  "message": "Số tiền phải là số và lớn hơn 0"
}
```

**Server Error (500):**
```json
{
  "code": "99",
  "message": "Lỗi hệ thống khi tạo URL thanh toán"
}
```

## 2. Xử lý kết quả thanh toán (Return URL)
### GET `/api/payment/vnpay-return`
Xử lý kết quả thanh toán khi khách hàng quay trở lại từ VNPay

#### Query Parameters
Tất cả các tham số callback từ VNPay

#### Response
Redirect đến các trang tương ứng:
- Thanh toán thành công: `/order-success`
- Hủy thanh toán: `/cart?payment_status=vnpay_cancel`
- Thanh toán thất bại: `/cart?payment_status=vnpay_fail`
- Lỗi hệ thống: `/cart?payment_status=vnpay_error`

## 3. Xử lý thông báo từ VNPay (IPN)
### GET `/api/payment/vnpay-ipn`
Xử lý thông báo tự động từ VNPay về trạng thái thanh toán

#### Query Parameters
Tất cả các tham số IPN từ VNPay

#### Response
**Success (200):**
```json
{
  "RspCode": "00",
  "Message": "Confirm Success"
}
```

**Invalid Checksum (200):**
```json
{
  "RspCode": "97",
  "Message": "Invalid checksum"
}
```

**Error (200):**
```json
{
  "RspCode": "99",
  "Message": "Error details"
}
```

## 4. Lấy lịch sử thanh toán
### GET `/api/payment/history`
Lấy lịch sử các giao dịch thanh toán

#### Query Parameters
| Parameter | Type   | Required | Description               |
|-----------|--------|----------|---------------------------|
| userId    | string | No       | Lọc theo người dùng       |
| status    | string | No       | Lọc theo trạng thái       |
| fromDate  | string | No       | Từ ngày (YYYY-MM-DD)      |
| toDate    | string | No       | Đến ngày (YYYY-MM-DD)     |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [
    {
      "orderId": "ORDER_12345",
      "amount": 1000000,
      "status": "Thành công",
      "paymentDate": "2023-05-20T10:30:00Z"
    }
  ]
}
```

## 5. Kiểm tra trạng thái thanh toán
### GET `/api/payment/check-status/:orderId`
Kiểm tra trạng thái thanh toán của đơn hàng

#### URL Parameters
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| orderId   | string | Yes      | Mã đơn hàng      |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": {
    "orderId": "ORDER_12345",
    "paymentStatus": "Thành công",
    "amount": 1000000,
    "paymentDate": "2023-05-20T10:30:00Z"
  }
}
```

**Error (404):**
```json
{
  "message": "Không tìm thấy giao dịch"
}
```

## 6. Hoàn tiền giao dịch
### POST `/api/payment/refund`
Yêu cầu hoàn tiền cho giao dịch

#### Request
**Body (JSON):**
| Field      | Type     | Required | Description                          |
|------------|----------|----------|--------------------------------------|
| orderId    | string   | Yes      | Mã đơn hàng cần hoàn tiền           |
| amount     | number   | Yes      | Số tiền hoàn                        |
| reason     | string   | No       | Lý do hoàn tiền                     |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Yêu cầu hoàn tiền đã được tiếp nhận"
}
```

**Error (400):**
```json
{
  "message": "Không thể hoàn tiền cho giao dịch đã hoàn thành"
}
```

## Mã lỗi
| Code | Description               |
|------|---------------------------|
| 00   | Thành công                |
| 01   | Lỗi validate dữ liệu      |
| 02   | Giao dịch không tồn tại   |
| 97   | Sai checksum              |
| 99   | Lỗi hệ thống              |