const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const PaymentRouter = require('./PaymentRouter')
const OrderRouter = require('./OrderRouter')
const LoginHistoryRouter = require('./LoginHistoryRouter')
const OpenAiController = require('./OpenAiRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter)        // các api liên quan user
    app.use('/api/product', ProductRouter)  // các api liên quan sp
    app.use('/api/order', OrderRouter)      // api xử lý đơn hàng
    app.use('/api/payment', PaymentRouter)  // api thanh toán
    app.use('/api/login-history', LoginHistoryRouter)   // api lấy lịch sử đăng nhập/đăng xuất
    app.use('/api/chat', OpenAiController)  // api chatbotAI
}
module.exports = routes