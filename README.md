để chạy local: trong frontend vào .env chọn lại đường dẫn REACT_APP_API_URL=http://localhost:3001/api
trong backend tại index.js: chọn lại origin thành local
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));