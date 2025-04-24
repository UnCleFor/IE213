const CartService = require('../services/CartService');

// Lấy giỏ hàng của user (từ access token)
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await CartService.getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Lỗi lấy giỏ hàng', error });
  }
};

// Thêm sản phẩm vào giỏ hàng
const addItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, amount } = req.body;
    const cart = await CartService.addToCart(userId, productId, amount);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi thêm sản phẩm vào giỏ', error });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ
const updateItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, amount } = req.body;
    const cart = await CartService.updateCartItem(userId, productId, amount);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật số lượng', error });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const cart = await CartService.removeFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa sản phẩm', error });
  }
};

// Xóa toàn bộ giỏ hàng
const clear = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await CartService.clearCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa toàn bộ giỏ', error });
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clear
};
