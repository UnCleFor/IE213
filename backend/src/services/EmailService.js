const nodemailer = require('nodemailer')
const dotenv = require('dotenv');

dotenv.config()

    // gửi email xác nhận đặt hàng
const sendEmailCreateOrder = async (email, orderItems, totalPrice, totalDiscount, shippingFee) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,     // email gửi đi
            pass: process.env.MAIL_PASSWORD,    // mật khẩu
        },
    });

    let listItem = '';
    let totalAmount = 0;

    // duyệt qua ds sp trong đơn hàng
    orderItems.forEach((order) => {
        const itemTotalPrice = order.price * order.amount;
        totalAmount += itemTotalPrice;
        listItem += `
        <div>
            <div>Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price.toLocaleString('vi-VN')} VNĐ</b></div>
            <div>Tổng giá: <b>${itemTotalPrice.toLocaleString('vi-VN')} VNĐ</b></div>  <!-- Giá của sản phẩm sau khi nhân với số lượng -->
        </div>`;
    });

    // làm tròn giá trị
    totalAmount = Math.round(totalAmount);
    totalDiscount = Math.round(totalDiscount);
    shippingFee = Math.round(shippingFee);

    const finalTotalPrice = totalAmount - totalDiscount + shippingFee;

    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Bạn đã đặt hàng tại BeauteHome", // Subject line
        text: "Hello world!", // plain text body
        html: `
            <div><b>Bạn đã đặt hàng thành công tại BeauteHome</b></div>
            ${listItem}
            <div>Giảm giá: <b>${totalDiscount.toLocaleString('vi-VN')} VNĐ</b></div>
            <div>Phí vận chuyển: <b>${shippingFee.toLocaleString('vi-VN')} VNĐ</b></div>
            <div>Tổng cộng (bao gồm giảm giá và phí vận chuyển): <b>${finalTotalPrice.toLocaleString('vi-VN')} VNĐ</b></div>
        `, // html body
    });
}

    // gửi email chứa mã OTP
const sendOTPEmail = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: `"BeautyHome" <${process.env.MAIL_ACCOUNT}>`,
        to: to,
        subject,
        text,
    });
};

module.exports = {
    sendEmailCreateOrder,
    sendOTPEmail
}