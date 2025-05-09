# TÀI NGUYÊN CUỐI KÌ  
**IE213.P21 - Kỹ thuật phát triển hệ thống Web**  

## Thông tin cơ bản  
**GVHD:** ThS. Võ Tấn Khoa  
**Tên đề tài:** Xây dựng website bán đồ nội thất The Beaute House  

## Danh sách thành viên  

| STT | Họ và tên           | MSSV     | Ghi chú      |
|-----|---------------------|----------|--------------|
| 1   | Nguyễn Thanh Nhã    | 22520994 | Nhóm trưởng  |
| 2   | Lê Quốc Thái        | 22521318 |              |
| 3   | Lê Thái Khánh Ngân  | 22520930 |              |
| 4   | Phan Võ Mỹ Huyền    | 22520591 |              |
| 5   | Trần Công Hiển      | 22520425 |              |

## Danh sách liên kết  
- **Drive:** [https://drive.google.com/drive/folders/1UR5-nwDWV7avxDCURRyuXK4VxV8XMZj9?usp=sharing]
- **Github:** [https://github.com/UnCleFor/IE213.git]
- **Link đến video demo:** Đang bổ sung  
- **Link đến video báo cáo:** Đang bổ sung  
- **Link deploy project:** [https://ie213.vercel.app/]

## Tổ chức folder
📦 repository
├── 📂 backend/ (Node.js + Express API)
├── 📂 docs/ (tài liệu báo cáo, hướng dẫn sử dụng, Documentation API)
├── 📂 frontend/ (React.js UI)
├── 📂 tests/ (các bài kiểm thử tự động)
├── 📄 .gitignore (bỏ qua file không cần thiết)
├── 📄 docker-compose.yml (triển khai Docker)
├── 📄 package.json (dependencies)
└── 📄 README.md (tài nguyên cuối kì, hướng dẫn cài đặt và sử dụng hệ thống)

## Hướng dẫn cài đặt và sử dụng hệ thống trên local

### Cấu hình quan trọng cho Local

| Thành phần | File cấu hình |                      Giá trị mẫu                     |           Mục đích        |
|------------|---------------|------------------------------------------------------|---------------------------|
| Frontend   |    `.env`     | `REACT_APP_API_URL=http://localhost:3001/api`        | Kết nối tới API local     |
| Backend    |    `index.js` | `origin: 'http://localhost:3000'`                    | Cho phép CORS từ frontend |

### Cài đặt thủ công không dùng Docker

1. Clone repository
git clone https://github.com/UnCleFor/IE213.git
cd ie213

2. Cài đặt backend
Trong ../backend/src/index.js chỉnh cấu hình cors origin thành http://localhost:3000
cd backend
npm install

3. Cài đặt frontend
Trong ../frontend/.env chỉnh cấu hình REACT_APP_API_URL thành http://localhost:3001/api
cd ../frontend
npm install

4. Khởi chạy development
4.1. Terminal 1 (backend)
cd ../backend
npm run dev

4.2. Terminal 2 (frontend)
cd ../frontend
npm start

### Triển khai với Docker
1. Cài đặt Docker
Đảm bảo đã cài đặt Docker và Docker Compose

2. Khởi chạy hệ thống
docker-compose up --build

3. Truy cập ứng dụng
Frontend: http://localhost:3000
Backend API: http://localhost:3001

### Hướng dẫn sử dụng hệ thống

Truy cập http://localhost:3000/login

Tài khoản admin: thanhnha123@gmail.com / 123123

Tài khoản user: Người dùng tự đăng ký tài khoản