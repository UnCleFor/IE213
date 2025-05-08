# API Documentation: AI Chat

## POST `/api/chat`
Gửi tin nhắn đến AI trợ lý ảo và nhận phản hồi

### Request

#### Headers
| Key               | Value              | Required |
|-------------------|--------------------|----------|
| Content-Type      | application/json   | Yes      |
| Authorization     | Bearer <token>     | Tùy chọn (nếu API của bạn yêu cầu) |

#### Body (JSON)
| Field   | Type   | Required | Description                          |
|---------|--------|----------|--------------------------------------|
| message | string | Yes      | Nội dung tin nhắn cần gửi đến AI     |

**Example:**
```json
{
  "message": "Bạn có bàn ghế sofa nào màu xanh không?"
}