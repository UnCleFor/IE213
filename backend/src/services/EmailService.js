const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config()

const sendEmailCreateOrder = async (email, orderItems) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = ''
    orderItems.forEach((order) => {
        listItem += `<div>
        <div>Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VNĐ</b></div>
        <div><img src=${order.image} alt="sản phẩm"/></div>
        </div>`
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: "khanhnganle12.2@gmail.com", // list of receivers
        subject: "Bạn đã đặt hàng tại BeauteHome", // Subject line
        text: "Hello world!", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công tại BeauteHome</b></div>${listItem}`, // html body
    });
}

module.exports = {
    sendEmailCreateOrder
}