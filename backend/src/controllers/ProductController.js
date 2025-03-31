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

module.exports = {
    createProduct,
    updateProduct
}