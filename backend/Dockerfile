# Sử dụng Node.js làm image cơ bản
FROM node:18

# Đặt thư mục làm việc bên trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt lại các dependency (bao gồm bcrypt)
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà ứng dụng backend sử dụng (ví dụ: 4000)
EXPOSE 3001

# Lệnh chạy ứng dụng
CMD ["npm", "start"]