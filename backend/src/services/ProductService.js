const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        // Lấy ra các giá trị của product
        const {
            name,
            image,
            type,
            price,
            countInStock,
            description
        } = newProduct
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
                name,
                image,
                type,
                price,
                countInStock,
                description
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
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {
                new: true
            })
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

const getDetailsProduct = (id) => {
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            if (product === null) {
                resolve({
                    status: 'Oki',
                    message: 'Product không tồn tại'
                })
            }

            resolve({
                status: 'Oki',
                message: 'Tìm thành công',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    // Tạo xử lý bât đồng bộ
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
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'Oki',
                message: 'Xóa thành công'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()

            // Filter
            if (filter) {
                const label = filter[0]
                const value = filter[1]
                const allProductFilter = await Product.find({
                    [label]: {
                        '$regex': value
                    }
                })
                resolve({
                    status: 'Oki',
                    message: 'Lọc thành công',
                    data: allProductFilter,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            // Sort
            if (sort) {
                // Tạo ra một objectSort để lưu trữ thông tin sort
                const objectSort = {}
                objectSort[sort[1]] = sort[0]

                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'Oki',
                    message: 'Tìm thành công',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: 'Oki',
                message: 'Tìm thành công',
                data: allProduct,
                total: totalProduct,
                pageCurrent: page + 1,
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}