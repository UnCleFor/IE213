const ProductService = require('../services/ProductService')

const createProduct = async (req,res) => {
    try {
        // lấy ra các thông tin cần thiết từ body của req đc gửi từ ui xuống để tạo product mới 
        const {name, image, type, price, countInStock, description } = req.body     
        // nếu thiếu 1 trường thì báo lỗi
        if ( !name || !image || !type || !price || !countInStock ) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Cần điền đầy đủ thông tin'
            })
        }
        // // thực hiện gọi dịch vụ tạo proudct mới
        console.log('respon', req.body)
        const ketqua = await ProductService.createProduct(req.body)
        return res.status(200).json(ketqua)
    } catch(e){
        return res.status(404).json({
            massage: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            })
        }
        const ketqua = await ProductService.updateProduct(productId, data)
        return res.status(200).json(ketqua)
    } catch(e) {
        return res.status(404).json(
            {
                message: e
            }
        )
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id

        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            })
        }

        const ketqua = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(ketqua)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            })
        }
        const ketqua = await ProductService.deleteProduct(productId)
        return res.status(200).json(ketqua)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const ketqua = await ProductService.getAllProduct(Number(limit) || 10, Number(page) || 0, sort, filter)
        return res.status(200).json(ketqua)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllType = async (req, res) => {
    try {
        const ketqua = await ProductService.getAllType()
        return res.status(200).json(ketqua)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getAllType
}