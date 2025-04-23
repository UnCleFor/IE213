const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config()

const sendEmailCreateOrder = async () => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'khanhnganle12.2@gmail.com', // sender address
            to: "khanhnganle12.2@gmail.com", // list of receivers
            subject: "Bạn đã đặt hàng tại BeauteHome", // Subject line
            text: "Hello world?", // plain text body
            html: "<div><b>Bạn đã đặt hàng thành công tại BeauteHome</b></div>", // html body
        });
    }
}

module.exports = {
    sendEmailCreateOrder
}