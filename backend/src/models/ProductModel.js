const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        // 🧾 Thông tin cơ bản
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true }, // ảnh đại diện
        images: [{ type: String }],              // danh sách ảnh phụ
        description: { type: mongoose.Schema.Types.Mixed, required: false },

        // 🏷️ Phân loại sản phẩm
        room: { type: String, required: false },     // Phòng: phòng khách, phòng ngủ, v.v.
        type: { type: String, required: true },      // Loại sản phẩm: bàn, ghế, tủ...
        brand: { type: String, required: false },    // Thương hiệu: IKEA, Hòa Phát...
        origin: { type: String, required: false },   // Xuất xứ: Việt Nam, Nhật, Mỹ...

        // 📦 Tồn kho và giá
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        discount: { type: Number },
        selled: { type: Number },

        // 🎨 Thuộc tính chi tiết
        colors: [{ type: String }], // Nhiều màu: đỏ, xanh, vàng...
        size: {
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