const express = require("express");
const router  = express.Router()
const ProductController = require("../controllers/ProductController")
const { authMiddleWare } = require("../middleware/authMiddleware")

// tạo mới sp
router.post("/create", authMiddleWare, ProductController.createProduct)

// cập nhật sp theo ID
router.put("/update/:id", authMiddleWare, ProductController.updateProduct)

// lấy thông tin chi tiết một sp theo ID
router.get("/get-details/:id", ProductController.getDetailsProduct)

// xóa một sp theo ID
router.delete("/delete/:id", authMiddleWare, ProductController.deleteProduct)

// lấy tất cả sp
router.get("/get-all", ProductController.getAllProduct)

// lấy tất cả loại sp
router.get("/get-all-type", ProductController.getAllType)

// xóa nhiều sp
router.post("/delete-many",authMiddleWare, ProductController.deleteManyProduct)

// tìm kiếm sp theo tên
router.get('/search', ProductController.searchProducts);

// lấy tất cả màu sắc của sp
router.get('/colors', ProductController.getAllColors);

// lọc sp
router.get('/filter', ProductController.filterProducts);

// lấy ds sp mới nhất
router.get("/get-newest", ProductController.getNewestProducts)

// lấy ds sp giảm giá
router.get("/get-discounted", ProductController.getDiscountedProducts)

module.exports = router