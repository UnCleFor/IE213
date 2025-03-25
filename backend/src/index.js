const express = require("express");
const dotenv = require('dotenv');
const mongoose  = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

//
app.use(bodyParser.json())
// định tuyến
routes(app);

// Kết nối mongodb
mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('Ket noi database thanh cong')
})
.catch((err) => {
    console.log('Loi')
})

app.use(bodyParser.json())

app.listen(port,() => {
    console.log('Server is running in port: ',+port)
})
// dùng lệnh "npm start" để chạy server ở cổng 3001, nhớ cd vào backend trước