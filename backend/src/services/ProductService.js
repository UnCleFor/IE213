const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        // Lấy ra các giá trị của product
        const { name, image, type, price, countInStock, description } = newProduct
        try {
            // Kiểm tra product đã tồn tại
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'Oki',
                    message: 'Tên sản phẩm đã tồn tại'
                })
            }
            // Tạo product mới
            const createProduct = await Product.create({
                name, image, type, price, countInStock, description
            })
            if (createProduct) {
                resolve({
                    status: "Oki",
                    message: "Tạo thành công",
                    data: createProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'Oki',
                    message: 'Product không tồn tại'
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'Oki',
                message: 'Cập nhật thành công',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct
}