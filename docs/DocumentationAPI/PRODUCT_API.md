# API Documentation: Product Service

## 1. Tạo sản phẩm mới
### POST `/api/products`
Tạo một sản phẩm mới trong hệ thống

#### Request
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (required)
```

**Body (JSON):**
| Field        | Type     | Required | Description                     |
|--------------|----------|----------|---------------------------------|
| name         | string   | Yes      | Tên sản phẩm                   |
| image        | string   | Yes      | URL hình ảnh                   |
| type         | string   | Yes      | Loại sản phẩm                  |
| price        | number   | Yes      | Giá sản phẩm                   |
| countInStock | number   | Yes      | Số lượng tồn kho               |
| description  | string   | No       | Mô tả sản phẩm                 |
| colors       | array    | No       | Danh sách màu sắc              |
| discount     | number   | No       | % giảm giá (0-100)             |

**Example:**
```json
{
  "name": "Ghế sofa da cao cấp",
  "image": "https://example.com/sofa.jpg",
  "type": "sofa",
  "price": 15000000,
  "countInStock": 10,
  "description": "Ghế sofa làm từ da bò nhập khẩu",
  "colors": ["đỏ", "đen"],
  "discount": 15
}
```

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Tạo sản phẩm thành công",
  "data": {
    "_id": "60a1b2c3d4e5f67890123456",
    "name": "Ghế sofa da cao cấp"
  }
}
```

**Validation Error (200):**
```json
{
  "status": "ERR",
  "message": "Cần điền đầy đủ thông tin"
}
```

## 2. Cập nhật sản phẩm
### PUT `/api/products/:id`
Cập nhật thông tin sản phẩm

#### Request
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (required)
```

**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID sản phẩm       |

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

## 3. Lấy chi tiết sản phẩm
### GET `/api/products/:id`
Lấy thông tin chi tiết một sản phẩm

#### Request
**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID sản phẩm       |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": {
    "_id": "60a1b2c3d4e5f67890123456",
    "name": "Ghế sofa da cao cấp",
    "price": 15000000
  }
}
```

## 4. Xóa sản phẩm
### DELETE `/api/products/:id`
Xóa một sản phẩm

#### Request
**Headers:**
```
Authorization: Bearer <token> (required)
```

**URL Parameters:**
| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | ID sản phẩm       |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "message": "Xóa thành công"
}
```

## 5. Lấy danh sách sản phẩm
### GET `/api/products`
Lấy danh sách sản phẩm với phân trang và lọc

#### Query Parameters:
| Parameter | Type    | Description                          |
|-----------|---------|--------------------------------------|
| limit     | number  | Số sản phẩm mỗi trang               |
| page      | number  | Trang hiện tại                      |
| sort      | string  | Sắp xếp (price_asc, price_desc)     |
| filter    | string  | Lọc theo loại sản phẩm              |
| label     | string  | Lọc theo nhãn                       |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [
    {
      "_id": "60a1b2c3d4e5f67890123456",
      "name": "Ghế sofa da cao cấp"
    }
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```

## 6. Lấy tất cả loại sản phẩm
### GET `/api/products/types`
Lấy danh sách tất cả loại sản phẩm

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": ["sofa", "bàn", "tủ"]
}
```

## 7. Xóa nhiều sản phẩm
### POST `/api/products/delete-many`
Xóa nhiều sản phẩm cùng lúc

#### Request
**Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (required)
```

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
  "message": "Đã xóa 2 sản phẩm"
}
```

## 8. Tìm kiếm sản phẩm
### GET `/api/products/search`
Tìm kiếm sản phẩm theo từ khóa

#### Query Parameters:
| Parameter | Type    | Description                  |
|-----------|---------|------------------------------|
| keyword   | string  | Từ khóa tìm kiếm            |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [
    {
      "_id": "60a1b2c3d4e5f67890123456",
      "name": "Ghế sofa da cao cấp"
    }
  ]
}
```

## 9. Lọc sản phẩm nâng cao
### GET `/api/products/filter`
Lọc sản phẩm theo nhiều tiêu chí

#### Query Parameters:
| Parameter | Type    | Description                          |
|-----------|---------|--------------------------------------|
| colors    | string  | Màu sắc (có thể nhiều màu)          |
| type      | string  | Loại sản phẩm                       |
| room      | string  | Phòng (phòng khách, phòng ngủ...)   |
| minPrice  | number  | Giá tối thiểu                       |
| maxPrice  | number  | Giá tối đa                          |
| sortBy    | string  | Cách sắp xếp (price_asc, price_desc)|

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [...],
  "meta": {
    "total": 5,
    "filters": {
      "colors": ["đỏ", "đen"],
      "priceRange": {
        "minPrice": 1000000,
        "maxPrice": 20000000
      }
    }
  }
}
```

## 10. Sản phẩm mới nhất
### GET `/api/products/newest`
Lấy danh sách sản phẩm mới nhất

#### Query Parameters:
| Parameter | Type    | Description                  |
|-----------|---------|------------------------------|
| limit     | number  | Giới hạn số lượng           |
| page      | number  | Trang hiện tại              |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [...],
  "total": 10
}
```

## 11. Sản phẩm giảm giá
### GET `/api/products/discounted`
Lấy danh sách sản phẩm đang giảm giá

#### Query Parameters:
| Parameter | Type    | Description                  |
|-----------|---------|------------------------------|
| limit     | number  | Giới hạn số lượng           |
| page      | number  | Trang hiện tại              |

#### Response
**Success (200):**
```json
{
  "status": "OK",
  "data": [...],
  "total": 5
}
```