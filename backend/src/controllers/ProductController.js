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
        const { limit, page, sort, filter, label } = req.query
        const ketqua = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter, label)
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

const deleteManyProduct = async (req, res) => {
    try {
        const ids = req.body.ids
        if(!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Thiếu danh sách id'
            })
        }
        const ketqua = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(ketqua)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const searchProducts = async (req, res) => {
    try {
      const { keyword } = req.query;
      const products = await ProductService.searchProducts(keyword);
      return res.status(200).json( products);
    } catch (e) {
      return res.status(500).json({ message: 'Error searching products' });
    }
  };

const getAllColors = async (req, res) => {
    try {
        const colors = await ProductService.getAllColors();
        
        return res.status(200).json({
            status: 'OK',
            data: colors,
        });
    } catch (error) {
        console.error('Lỗi lấy màu sắc:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Lỗi server khi lấy danh sách màu sắc'
        });
    }
}; 

const filterProducts = async (req, res) => {
    try {
      console.log('[BACKEND] Query nhận được:', req.query);
      
      const { colors, type, room, minPrice, maxPrice, sortBy } = req.query;
      const query = {};
  
      // 1. Lọc theo type
      if (type) {
        query.type = type;
      }
      if (room) {
        query.room = room;
      }  
      // 2. Lọc theo màu (xử lý cả string và array)
      if (colors) {
        const colorArray = typeof colors === 'string' ? colors.split(',') : colors;
        query.colors = { $in: colorArray.filter(Boolean) };
      }
  
      // 3. Lọc theo giá
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
  
      // 4. Sắp xếp
      const sortOptions = {
        price_asc: { price: 1 },
        price_desc: { price: -1 },
        name_asc: { name: 1 },
        name_desc: { name: -1 }
      };
      const sort = sortOptions[sortBy] || { createdAt: -1 };
  
      console.log('[BACKEND] Query cuối cùng:', { query, sort });
  
      // 5. Thực hiện query
      const products = await ProductService.filterProducts(req.query);
  
      return res.status(200).json({
        status: 'OK',
        data: products,
        meta: {
          total: products.length,
          filters: { colors, type, priceRange: { minPrice, maxPrice } }
        }
      });
  
    } catch (error) {
      console.error('[BACKEND ERROR]', {
        message: error.message,
        stack: error.stack,
        query: req.query
      });
      return res.status(500).json({
        status: 'ERR',
        message: 'Lỗi khi lọc sản phẩm',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
  
  const getNewestProducts = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const response = await ProductService.getNewestProducts(
            limit ? Number(limit) : null,
            page ? Number(page) : 0
        );
        
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in getNewestProducts:', e);
        return res.status(404).json({
            status: 'ERR',
            message: e.message || 'Lỗi khi lấy sản phẩm mới nhất'
        });
    }
};
const getDiscountedProducts = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const response = await ProductService.getDiscountedProducts(
            limit ? Number(limit) : null,
            page ? Number(page) : 0
        );
        
        return res.status(200).json(response);
    } catch (e) {
        console.error('Error in getDiscountedProducts:', e);
        return res.status(404).json({
            status: 'ERR',
            message: e.message || 'Lỗi khi lấy sản phẩm giảm giá'
        });
    }
};
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    getAllType,
    deleteManyProduct,
    searchProducts,
    getAllColors,
    filterProducts,
    getDiscountedProducts,
    getNewestProducts
}