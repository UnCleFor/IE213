const {
  createOrder,
  getOrderDetails,
  getAllOrders,
  updatedOrder,
  deleteOrder,
  deleteManyOrder,
  getOrderByUser
} = require('../backend/src/controllers/OrderController');
const OrderService = require('../backend/src/services/OrderService');
const Products = require('../backend/src/models/ProductModel');

// Mock các service và model để kiểm thử
jest.mock('../backend/src/services/OrderService');
jest.mock('../backend/src/models/ProductModel');

// Mô tả test suite cho Order Controller
describe('Order Controller', () => {
  let req, res;
  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      body: {},
      params: {},
      query: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  // Test suite cho hàm tạo đơn hàng
  describe('createOrder', () => {

    // Test case 1: Trả về lỗi khi thiếu thông tin bắt buộc
    it('should return error when missing required fields', async () => {
      req.body = { paymentMethod: 'COD' }; // Thiếu các trường bắt buộc khác
      await createOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Lỗi',
        message: expect.stringContaining('Thiếu thông tin:')
      });
    });

    // Test case 2: Trả về lỗi khi sản phẩm hết hàng
    it('should return error when product is out of stock', async () => {
      req.body = {
        orderItems: [{ product: 'product1', amount: 5, name: 'Product 1' }],
        paymentMethod: 'COD',
        itemsPrice: 100,
        shippingPrice: 10,
        totalPrice: 110,
        fullName: 'John Doe',
        address: '123 Street',
        phone: '0123456789',
        totalDiscount: 0
      };
      Products.findById.mockResolvedValue({
        countInStock: 3,
        selled: 0,
        save: jest.fn()
      });
      await createOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'Lỗi',
        message: expect.stringContaining('không đủ hàng')
      });
    });

    // Test case 3: Tạo đơn hàng thành công với dữ liệu hợp lệ
    it('should create order successfully with valid data', async () => {
      req.body = {
        orderItems: [{ product: 'product1', amount: 2, name: 'Product 1' }],
        paymentMethod: 'COD',
        itemsPrice: 100,
        shippingPrice: 10,
        totalPrice: 110,
        fullName: 'John Doe',
        address: '123 Street',
        phone: '0123456789',
        totalDiscount: 0
      };
      const mockProduct = {
        countInStock: 5,
        selled: 0,
        save: jest.fn()
      };
      Products.findById.mockResolvedValue(mockProduct);
      const mockResponse = { status: 'OK', data: { id: 'order1' } };
      OrderService.createOrder.mockResolvedValue(mockResponse);
      await createOrder(req, res);

      // Kiểm tra đã trừ tồn kho
      expect(mockProduct.countInStock).toBe(3);
      expect(mockProduct.selled).toBe(2);
      expect(mockProduct.save).toHaveBeenCalled();

      // Kiểm tra gọi service tạo order
      expect(OrderService.createOrder).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    // Test case 4: Xử lý lỗi khi tạo đơn hàng
    it('should handle create order error', async () => {
      req.body = {
        orderItems: [{ product: 'product1', amount: 2, name: 'Product 1' }],
        paymentMethod: 'COD',
        itemsPrice: 100,
        shippingPrice: 10,
        totalPrice: 110,
        fullName: 'John Doe',
        address: '123 Street',
        phone: '0123456789',
        totalDiscount: 0
      };
      Products.findById.mockResolvedValue({
        countInStock: 5,
        selled: 0,
        save: jest.fn()
      });
      const error = new Error('Database error');
      OrderService.createOrder.mockRejectedValue(error);
      await createOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        massage: error
      });
    });
  });

  // Test suite cho hàm lấy chi tiết đơn hàng
  describe('getOrderDetails', () => {

    // Test case 1: Trả về lỗi khi thiếu orderId
    it('should return error when missing orderId', async () => {
      await getOrderDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Không tìm thấy đơn hàng'
      });
    });

    // Test case 2: Lấy chi tiết đơn hàng thành công
    it('should get order details successfully', async () => {
      req.params.id = 'order1';
      const mockOrder = { id: 'order1', status: 'completed' };
      OrderService.getOrderDetails.mockResolvedValue(mockOrder);

      await getOrderDetails(req, res);

      expect(OrderService.getOrderDetails).toHaveBeenCalledWith('order1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrder);
    });

    // Test case 3: Xử lý lỗi khi lấy chi tiết đơn hàng
    it('should handle get order details error', async () => {
      req.params.id = 'order1';
      const error = new Error('Order not found');
      OrderService.getOrderDetails.mockRejectedValue(error);
      await getOrderDetails(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Lỗi server',
        error: 'Order not found'
      });
    });
  });

  // Test suite cho hàm lấy tất cả đơn hàng
  describe('getAllOrders', () => {

    // Test case 1: Lấy tất cả đơn hàng thành công
    it('should get all orders successfully', async () => {
      const mockOrders = [{ id: 'order1' }, { id: 'order2' }];
      OrderService.getAllOrders.mockResolvedValue(mockOrders);
      await getAllOrders(req, res);
      expect(OrderService.getAllOrders).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrders);
    });

    // Test case 2: Xử lý lỗi khi lấy tất cả đơn hàng
    it('should handle get all orders error', async () => {
      const error = new Error('Database error');
      OrderService.getAllOrders.mockRejectedValue(error);
      await getAllOrders(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Lỗi server',
        error: 'Database error'
      });
    });
  });

  // Test suite cho hàm cập nhật đơn hàng
  describe('updatedOrder', () => {

    // Test case 1: Trả về lỗi khi thiếu orderId
    it('should return error when missing orderId', async () => {
      await updatedOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'ERR',
        message: 'Order Id là bắt buộc'
      });
    });

    // Test case 2: Cập nhật đơn hàng thành công
    it('should update order successfully', async () => {
      req.params.id = 'order1';
      req.body = { status: 'shipped' };
      const mockResponse = { status: 'OK' };
      OrderService.updateOrder.mockResolvedValue(mockResponse);
      await updatedOrder(req, res);
      expect(OrderService.updateOrder).toHaveBeenCalledWith('order1', req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    // Test case 3: Xử lý lỗi khi cập nhật đơn hàng
    it('should handle update order error', async () => {
      req.params.id = 'order1';
      req.body = { status: 'shipped' };
      const error = new Error('Update failed');
      OrderService.updateOrder.mockRejectedValue(error);
      await updatedOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: error
      });
    });
  });

  // Test suite cho hàm xóa đơn hàng
  describe('deleteOrder', () => {

    // Test case 1: Trả về lỗi khi thiếu orderId
    it('should return error when missing orderId', async () => {
      await deleteOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'ERR',
        message: 'Order Id là bắt buộc'
      });
    });

    // Test case 2: Xóa nhiều đơn hàng thành công
    it('should delete order successfully', async () => {
      req.params.id = 'order1';
      const mockResponse = { status: 'OK' };
      OrderService.deleteOrder.mockResolvedValue(mockResponse);
      await deleteOrder(req, res);
      expect(OrderService.deleteOrder).toHaveBeenCalledWith('order1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    // Test case 3: Xử lý lỗi khi xóa nhiều đơn hàng
    it('should handle delete order error', async () => {
      req.params.id = 'order1';
      const error = new Error('Delete failed');
      OrderService.deleteOrder.mockRejectedValue(error);
      await deleteOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: error
      });
    });
  });

  // Test suite cho hàm xóa nhiều đơn hàng
  describe('deleteManyOrder', () => {

    // Test case 1: Trả về lỗi khi thiếu danh sách id
    it('should return error when missing ids', async () => {
      await deleteManyOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'ERR',
        message: 'Thiếu danh sách id'
      });
    });

    // Test case 2: Xóa nhiều đơn hàng thành công
    it('should delete multiple orders successfully', async () => {
      req.body = { ids: ['order1', 'order2'] };
      const mockResponse = { status: 'OK', deletedCount: 2 };
      OrderService.deleteManyOrder.mockResolvedValue(mockResponse);
      await deleteManyOrder(req, res);
      expect(OrderService.deleteManyOrder).toHaveBeenCalledWith(['order1', 'order2']);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    // Test case 3: Xử lý lỗi khi xóa nhiều đơn hàng
    it('should handle delete many orders error', async () => {
      req.body = { ids: ['order1', 'order2'] };
      const error = new Error('Delete failed');
      OrderService.deleteManyOrder.mockRejectedValue(error);
      await deleteManyOrder(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: error
      });
    });
  });

  // Test suite cho hàm lấy đơn hàng theo user
  describe('getOrderByUser', () => {

    // Test case 1: Trả về lỗi khi thiếu userId
    it('should return error when missing userId', async () => {
      await getOrderByUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'ERR',
        message: 'User Id là bắt buộc'
      });
    });

    // Test case 2: Lấy đơn hàng theo user thành công
    it('should get orders by user successfully', async () => {
      req.params.userId = 'user1';
      const mockOrders = [{ id: 'order1', user: 'user1' }];
      OrderService.getOrderByUser.mockResolvedValue(mockOrders);
      await getOrderByUser(req, res);
      expect(OrderService.getOrderByUser).toHaveBeenCalledWith('user1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockOrders);
    });

    // Test case 3: Xử lý lỗi khi lấy đơn hàng theo user
    it('should handle get orders by user error', async () => {
      req.params.userId = 'user1';
      const error = new Error('Not found');
      OrderService.getOrderByUser.mockRejectedValue(error);
      await getOrderByUser(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Not found'
      });
    });
  });
});