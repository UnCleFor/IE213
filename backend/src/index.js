const express = require("express");
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get('/',(req,res) => {
    return res.send('Hello world hehe')
});

app.listen(port,() => {
    console.log('Server is running in port: ',+port)
})
// dùng lệnh "npm start" để chạy server ở cổng 3001, nhớ cd vào backend trước