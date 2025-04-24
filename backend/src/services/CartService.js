const Cart = require('../models/Cart');

// Lấy giỏ hàng của người dùng dựa trên userId từ token
const getCartByUserId = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (userId, productId, amount) => {
  const cart = await getCartByUserId(userId);  // Thay vì dùng userId từ ngoài, lấy từ req.user.id
  const item = cart.items.find(i => i.product.toString() === productId);
  if (item) {
    item.amount += amount;
  } else {
    cart.items.push({ product: productId, amount });
  }
  await cart.save();
  return cart;
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateCartItem = async (userId, productId, amount) => {
  const cart = await getCartByUserId(userId);  // Thay vì dùng userId từ ngoài, lấy từ req.user.id
  const item = cart.items.find(i => i.product.toString() === productId);
  if (item) {
    item.amount = amount;
    await cart.save();
  }
  return cart;
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (userId, productId) => {
  const cart = await getCartByUserId(userId);  // Thay vì dùng userId từ ngoài, lấy từ req.user.id
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  return cart;
};

// Xóa toàn bộ giỏ hàng
const clearCart = async (userId) => {
  const cart = await getCartByUserId(userId);  // Thay vì dùng userId từ ngoài, lấy từ req.user.id
  cart.items = [];
  await cart.save();
  return cart;
};

module.exports = {
  getCartByUserId,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
