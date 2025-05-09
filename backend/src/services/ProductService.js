const Product = require('../models/ProductModel')

const createProduct = (newProduct) => { // tạo sp mới
    return new Promise(async (resolve, reject) => {
      const {
        // Thông tin cơ bản
        name,
        image,
        images=[],
        description = '',
  
        // Phân loại sản phẩm
        room = '',
        type,
        brand = '',
        origin = '',
  
        // Tồn kho và giá
        price,
        countInStock,
        discount = 0,
        selled = 0,
  
        // Thuộc tính chi tiết
        colors = [],
        size = {}
      } = newProduct;
  
      try {     // kiểm tra tên sp đã tồn tại chưa
        const checkProduct = await Product.findOne({ name });
  
        if (checkProduct !== null) {
          return resolve({
            status: 'ERR',
            message: 'Tên sản phẩm đã tồn tại'
          });
        }
  
        const createdProduct = await Product.create({   // tạo mới sp
          name,     // tên sp
          image,    // ảnh đại diện
          images,   // ds ảnh phụ
          description,  // mô tả sp
  
          room,     // phòng (phòng khách, phòng ngủ...)
          type,     // loại sản phẩm: bàn, ghế, tủ...
          brand,    // thương hiệu
          origin,   // xuất xứ
  
          price,    // giá sp
          countInStock, // số lượng trong kho
          discount, // giảm giá
          selled,   // số lượng đã bán
  
          colors,   // nhiều màu
          size      // kích thước
        });
  
        resolve({
          status: "OK",
          message: "Tạo sản phẩm thành công",
          data: createdProduct
        });
  
      } catch (e) {
        reject(e);
      }
    });
  };
const updateProduct = (id, data) => {   // cập nhật sp
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({    // kiểm tra sp tồn tại
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'Product không tồn tại'
                })
            }

            if (data.name) {    // kiểm tra trùng tên
                const checkProduct = await Product.findOne({ name: data.name });
                if (checkProduct && checkProduct._id.toString() !== id) {
                    resolve({
                        status: 'ERR',
                        message: 'Tên sản phẩm trùng'
                    });
                    return;
                }
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {  // cập nhật sp
                new: true
            })
            resolve({
                status: 'OK',
                message: 'Cập nhật thành công',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {     // lấy thông tin chi tiết 1 sp
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })

            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'Product không tồn tại'
                })
            }

            resolve({
                status: 'OK',
                message: 'Tìm thành công',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {     // xóa 1 sp theo ID
    // Tạo xử lý bât đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })

            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'Product không tồn tại'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Xóa thành công'
            })
        } catch (e) {
            reject(e)
        }
    })
}

// lấy ds sp với phân trang, lọc, sắp xếp
const getAllProduct = (limit, page, sort, filter, value) => {
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            // Filter
            if (filter && value) {
                const label = filter;
                const filterValue = value;

                const allProductFilter = await Product.aggregate([
                    {
                        $match: {
                            [label]: { $regex: filterValue, $options: 'i' }
                        }
                    },
                    { $skip: page * limit },
                    { $limit: limit }
                ]);

                const totalFiltered = await Product.aggregate([
                    {
                        $match: {
                            [label]: { $regex: filterValue, $options: 'i' }
                        }
                    },
                    { $count: "total" }
                ]);
                const totalProduct = totalFiltered[0]?.total || 0;
                
                resolve({
                    status: 'OK',
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
                return resolve({
                    status: 'OK',
                    message: 'Tìm thành công',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            if(!limit) {    // nếu không có sort hay filter
                allProduct = await Product.find()
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit)
            }
            return resolve({
                status: 'OK',
                message: 'Tìm thành công',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllType = () => {      // lấy tất cả loại sp
    // Tạo xử lý bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {  
            const allType = await Product.distinct('type')
            return resolve({
                status: 'OK',
                message: 'Tìm thành công',
                data: allType, 
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {    // xóa nhiều sp theo ds ID
    // Tạo xử lý bât đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({_id: ids})
            resolve({
                status: 'OK',
                message: 'Xóa các sản phẩm thành công'
            })
        } catch (e) {
            reject(e)
        }
    })
}

const searchProducts = async (keyword) => { // tìm kiếm sp (Atlas Search)
    return new Promise(async (resolve, reject) => {
      try {
        const products = await Product.aggregate([
          {
            $search: {
              index: "default",
              autocomplete: {
                query: keyword,
                path: "name",
                //tokenOrder: "sequential",
                fuzzy: {
                  maxEdits: 1,
                  prefixLength: 2,
                }
              }
            }
          },
          {
            $limit: 20
          }
        ]);
  
        resolve({
          status: "OK",
          message: "Tìm kiếm thành công",
          data: products,
        });
      } catch (e) {
        console.error("Lỗi khi tìm kiếm:", e); // 👈 LOG ra lỗi
        reject(e);
      }
    });
  };

  const getAllColors = () => {      // lấy ds màu sắc (duy nhất)
    return new Promise(async (resolve, reject) => {
        try {  
            const allColors = await Product.distinct('colors')
            return resolve({
                status: 'OK',
                message: 'Tìm thành công',
                data: allColors, 
            })
        } catch (e) {
            reject(e)
        }
    })
}

const filterProducts = async (filters) => {     // lọc nâng cao
  const { colors, type, room, minPrice, maxPrice, sortBy } = filters;

  const query = {};

  // Lọc theo loại sản phẩm
  if (type) {
    query.type = type;
  }
  if (room) {
    query.room = room;
  }  

  // Lọc theo màu sắc
  if (colors) {
    const colorArray = typeof colors === 'string' ? colors.split(',') : colors;
    query.colors = { $in: colorArray.filter(Boolean) };
  }

  // Lọc theo giá
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Sắp xếp
  const sortOptions = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    name_asc: { name: 1 },
    name_desc: { name: -1 },
  };
  const sort = sortOptions[sortBy] || { createdAt: -1 };

  // Thực hiện truy vấn
  const products = await Product.find(query).sort(sort).lean();

  return products;
};  

const getNewestProducts = (limit, page) => {    // lấy ds sp mới nhất
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();
            const objectSort = { createdAt: -1 }; // -1 để sắp xếp từ mới nhất đến cũ nhất
            
            let products;
            if (!limit) {
                products = await Product.find().sort(objectSort);
            } else {
                products = await Product.find()
                    .sort(objectSort)
                    .limit(limit)
                    .skip(page * limit);
            }
            
            resolve({
                status: 'OK',
                message: 'Lấy sản phẩm mới nhất thành công',
                data: products,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: limit ? Math.ceil(totalProduct / limit) : 1
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDiscountedProducts = (limit, page) => {    // lấy sp có giảm giá
    return new Promise(async (resolve, reject) => {
        try {
            // Chỉ đếm sản phẩm có discount > 0
            const totalProduct = await Product.countDocuments({ discount: { $gt: 0 } });
            const objectSort = { discount: -1 }; // -1 để sắp xếp từ cao nhất đến thấp nhất
            
            let products;
            if (!limit) {
                products = await Product.find({ discount: { $gt: 0 } }).sort(objectSort);
            } else {
                products = await Product.find({ discount: { $gt: 0 } })
                    .sort(objectSort)
                    .limit(limit)
                    .skip(page * limit);
            }
            
            resolve({
                status: 'OK',
                message: 'Lấy sản phẩm giảm giá thành công',
                data: products,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: limit ? Math.ceil(totalProduct / limit) : 1
            });
        } catch (e) {
            reject(e);
        }
    });
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
    getNewestProducts,
    getDiscountedProducts
}