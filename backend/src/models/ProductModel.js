const mongoose = require('mongoose')

    // đại diện cho sản phẩm
const productSchema = new mongoose.Schema(
    {
        // Thông tin cơ bản
        name: { type: String, required: true, unique: true },   // tên sp
        image: { type: String, required: true }, // ảnh đại diện
        images: [{ type: String }],              // danh sách ảnh phụ
        description: { type: mongoose.Schema.Types.Mixed, required: false },    // mô tả sp

        // Phân loại sản phẩm
        room: { type: String, required: false },     // Phòng: phòng khách, phòng ngủ, v.v.
        type: { type: String, required: true },      // Loại sản phẩm: bàn, ghế, tủ...
        brand: { type: String, required: false },    // Thương hiệu: IKEA, Hòa Phát...
        origin: { type: String, required: false },   // Xuất xứ: Việt Nam, Nhật, Mỹ...

        // Tồn kho và giá
        price: { type: Number, required: true },    // giá sp
        countInStock: { type: Number, required: true }, // số lượng trong kho
        discount: { type: Number },                 // giảm giá
        selled: { type: Number },                   // số lượng đã bán

        // Thuộc tính chi tiết
        colors: [{ type: String }], // Nhiều màu: đỏ, xanh, vàng...
        size: {                     // kích thước
            length: { type: Number },
            width: { type: Number },
            height: { type: Number }
        }
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model("Product", productSchema);
module.exports = Product;