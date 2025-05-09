const {
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
} = require('../backend/src/controllers/ProductController');
const ProductService = require('../backend/src/services/ProductService');

// Mock ProductService để kiểm thử
jest.mock('../backend/src/services/ProductService');

// Mô tả test suite cho ProductController
describe('Product Controller', () => {
    let req, res;
    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            body: {},
            params: {},
            query: {},
            cookies: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
            clearCookie: jest.fn()
        };
    });

    // Test suite cho hàm tạo sản phẩm
    describe('createProduct', () => {

        // Test case 1: Trả về lỗi khi thiếu các trường bắt buộc
        it('should return error when missing required fields', async () => {
            req.body = { name: 'Test Product' };
            await createProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'Lỗi',
                message: 'Cần điền đầy đủ thông tin'
            });
        });

        // Test case 2: Tạo sản phẩm thành công với dữ liệu hợp lệ
        it('should create product successfully with valid data', async () => {
            req.body = {
                name: 'Test Product',
                image: 'image.jpg',
                type: 'chair',
                price: 100,
                countInStock: 10,
                description: 'Test description'
            };
            const mockResponse = { status: 'OK', data: { id: '123' } };
            ProductService.createProduct.mockResolvedValue(mockResponse);
            await createProduct(req, res);
            expect(ProductService.createProduct).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        // Test case 3: Xử lý lỗi khi tạo sản phẩm
        it('should handle create product error', async () => {
            req.body = {
                name: 'Test Product',
                image: 'image.jpg',
                type: 'chair',
                price: 100,
                countInStock: 10
            };
            const error = new Error('Database error');
            ProductService.createProduct.mockRejectedValue(error);
            await createProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error
            });
        });
    });

    // Test suite cho hàm cập nhật sản phẩm
    describe('updateProduct', () => {

        // Test case 1: Trả về lỗi khi thiếu productId
        it('should return error when missing productId', async () => {
            await updateProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            });
        });

        // Test case 2: Cập nhật sản phẩm thành công
        it('should update product successfully', async () => {
            req.params.id = '123';
            req.body = { name: 'Updated Product' };
            const mockResponse = { status: 'OK' };
            ProductService.updateProduct.mockResolvedValue(mockResponse);
            await updateProduct(req, res);
            expect(ProductService.updateProduct).toHaveBeenCalledWith('123', req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        // Test case 3: Xử lý lỗi khi cập nhật
        it('should handle update error', async () => {
            req.params.id = '123';
            req.body = { name: 'Updated Product' };
            const error = new Error('Update failed');
            ProductService.updateProduct.mockRejectedValue(error);
            await updateProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error
            });
        });
    });

    // Test suite cho hàm lấy chi tiết sản phẩm
    describe('getDetailsProduct', () => {

        // Test case 1: Trả về lỗi khi thiếu productId
        it('should return error when missing productId', async () => {
            await getDetailsProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            });
        });

        // Test case 2: Lấy chi tiết sản phẩm thành công
        it('should get product details successfully', async () => {
            req.params.id = '123';
            const mockProduct = { id: '123', name: 'Test Product' };
            ProductService.getDetailsProduct.mockResolvedValue(mockProduct);
            await getDetailsProduct(req, res);
            expect(ProductService.getDetailsProduct).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

        // Test case 3: Xử lý lỗi khi lấy chi tiết
        it('should handle get details error', async () => {
            req.params.id = '123';
            const error = new Error('Not found');
            ProductService.getDetailsProduct.mockRejectedValue(error);
            await getDetailsProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error
            });
        });
    });

    // Test suite cho hàm xóa sản phẩm
    describe('deleteProduct', () => {

        // Test case 1: Trả về lỗi khi thiếu productId
        it('should return error when missing productId', async () => {
            await deleteProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            });
        });

        // Test case 2: Xóa sản phẩm thành công
        it('should delete product successfully', async () => {
            req.params.id = '123';
            const mockResponse = { status: 'OK' };
            ProductService.deleteProduct.mockResolvedValue(mockResponse);

            await deleteProduct(req, res);

            expect(ProductService.deleteProduct).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        // Test case 3: Xử lý lỗi khi xóa
        it('should handle delete error', async () => {
            req.params.id = '123';
            const error = new Error('Delete failed');
            ProductService.deleteProduct.mockRejectedValue(error);

            await deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error
            });
        });
    });

    // Test suite cho hàm lấy tất cả sản phẩm
    describe('getAllProduct', () => {

        // Test case 1: Lấy tất cả sản phẩm với tham số mặc định
        it('should get all products with default parameters', async () => {
            const mockProducts = [{ id: '1' }, { id: '2' }];
            ProductService.getAllProduct.mockResolvedValue(mockProducts);
            await getAllProduct(req, res);
            expect(ProductService.getAllProduct).toHaveBeenCalledWith(null, 0, undefined, undefined, undefined);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
        });

        // Test case 2: Lấy tất cả sản phẩm với các tham số truy vấn
        it('should get all products with query parameters', async () => {
            req.query = {
                limit: '10',
                page: '2',
                sort: 'price_asc',
                filter: 'chair',
                label: 'new'
            };
            const mockProducts = [{ id: '1' }, { id: '2' }];
            ProductService.getAllProduct.mockResolvedValue(mockProducts);
            await getAllProduct(req, res);
            expect(ProductService.getAllProduct).toHaveBeenCalledWith(10, 2, 'price_asc', 'chair', 'new');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
        });

        // Test case 3: Xử lý lỗi khi lấy tất cả sản phẩm
        it('should handle get all products error', async () => {
            const error = new Error('Database error');
            ProductService.getAllProduct.mockRejectedValue(error);

            await getAllProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error
            });
        });
    });

    // Test suite cho hàm lấy tất cả loại sản phẩm
    describe('getAllType', () => {

        // Test case 1: Lấy tất cả loại sản phẩm thành công
        it('should get all product types successfully', async () => {
            const mockTypes = ['chair', 'table', 'sofa'];
            ProductService.getAllType.mockResolvedValue(mockTypes);
            await getAllType(req, res);
            expect(ProductService.getAllType).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTypes);
        });

        // Test case 2: Xử lý lỗi khi lấy loại sản phẩm
        it('should handle get all types error', async () => {
            const error = new Error('Database error');
            ProductService.getAllType.mockRejectedValue(error);
            await getAllType(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error
            });
        });
    });

    // Test suite cho hàm xóa nhiều sản phẩm
    describe('deleteManyProduct', () => {

        // Test case 1: Trả về lỗi khi thiếu danh sách id
        it('should return error when missing ids', async () => {
            await deleteManyProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Thiếu danh sách id'
            });
        });

        // Test case 2: Xóa nhiều sản phẩm thành công
        it('should delete multiple products successfully', async () => {
            req.body = { ids: ['1', '2', '3'] };
            const mockResponse = { status: 'OK', deletedCount: 3 };
            ProductService.deleteManyProduct.mockResolvedValue(mockResponse);
            await deleteManyProduct(req, res);
            expect(ProductService.deleteManyProduct).toHaveBeenCalledWith(['1', '2', '3']);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        // Test case 3: Xử lý lỗi khi xóa nhiều sản phẩm
        it('should handle delete many error', async () => {
            req.body = { ids: ['1', '2', '3'] };
            const error = new Error('Delete failed');
            ProductService.deleteManyProduct.mockRejectedValue(error);
            await deleteManyProduct(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: error
            });
        });
    });

    // Test suite cho hàm tìm kiếm sản phẩm
    describe('searchProducts', () => {

        // Test case 1: Tìm kiếm sản phẩm thành công
        it('should search products successfully', async () => {
            req.query = { keyword: 'chair' };
            const mockProducts = [{ id: '1', name: 'Comfort Chair' }];
            ProductService.searchProducts.mockResolvedValue(mockProducts);
            await searchProducts(req, res);
            expect(ProductService.searchProducts).toHaveBeenCalledWith('chair');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
        });

        // Test case 2: Xử lý lỗi khi tìm kiếm
        it('should handle search error', async () => {
            req.query = { keyword: 'chair' };
            ProductService.searchProducts.mockRejectedValue(new Error('Search failed'));
            await searchProducts(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error searching products' });
        });
    });

    // Test suite cho hàm lấy tất cả màu sắc
    describe('getAllColors', () => {

        // Test case 1: Lấy tất cả màu sắc thành công
        it('should get all colors successfully', async () => {
            const mockColors = ['red', 'blue', 'green'];
            ProductService.getAllColors.mockResolvedValue(mockColors);
            await getAllColors(req, res);
            expect(ProductService.getAllColors).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                data: mockColors,
            });
        });

        // Test case 2: Xử lý lỗi khi lấy màu sắc
        it('should handle get colors error', async () => {
            const error = new Error('Database error');
            ProductService.getAllColors.mockRejectedValue(error);
            await getAllColors(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Lỗi server khi lấy danh sách màu sắc'
            });
        });
    });

    // Test suite cho hàm lọc sản phẩm
    describe('filterProducts', () => {

        // Test case 1: Lọc sản phẩm với nhiều tiêu chí
        it('should filter products with multiple criteria', async () => {
            req.query = {
                colors: 'red,blue',
                type: 'chair',
                room: 'living',
                minPrice: '100',
                maxPrice: '500',
                sortBy: 'price_asc'
            };
            const mockProducts = [{ id: '1', name: 'Red Chair' }];
            ProductService.filterProducts.mockResolvedValue(mockProducts);
            await filterProducts(req, res);
            expect(ProductService.filterProducts).toHaveBeenCalledWith(req.query);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'OK',
                data: mockProducts,
                meta: {
                    total: mockProducts.length,
                    filters: {
                        colors: 'red,blue',
                        type: 'chair',
                        priceRange: { minPrice: '100', maxPrice: '500' }
                    }
                }
            });
        });

        // Test case 2: Xử lý lỗi khi lọc
        it('should handle filter error', async () => {
            req.query = { colors: 'red' };
            const error = new Error('Filter failed');
            ProductService.filterProducts.mockRejectedValue(error);
            await filterProducts(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Lỗi khi lọc sản phẩm',
                error: undefined // Trong môi trường production
            });
        });
    });

    // Test suite cho hàm lấy sản phẩm mới nhất
    describe('getNewestProducts', () => {

        // Test case 1: Lấy sản phẩm mới nhất với tham số mặc định
        it('should get newest products with default parameters', async () => {
            const mockResponse = { data: [{ id: '1' }], total: 1 };
            ProductService.getNewestProducts.mockResolvedValue(mockResponse);
            await getNewestProducts(req, res);
            expect(ProductService.getNewestProducts).toHaveBeenCalledWith(null, 0);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        // Test case 2: Lấy sản phẩm mới nhất với limit và page
        it('should get newest products with limit and page', async () => {
            req.query = { limit: '10', page: '2' };
            const mockResponse = { data: [{ id: '1' }], total: 1 };
            ProductService.getNewestProducts.mockResolvedValue(mockResponse);
            await getNewestProducts(req, res);
            expect(ProductService.getNewestProducts).toHaveBeenCalledWith(10, 2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        // Test case 3: Xử lý lỗi khi lấy sản phẩm mới nhất
        it('should handle get newest products error', async () => {
            const error = new Error('Database error');
            ProductService.getNewestProducts.mockRejectedValue(error);
            await getNewestProducts(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: error.message || 'Lỗi khi lấy sản phẩm mới nhất'
            });
        });
    });

    // Test suite cho hàm lấy sản phẩm giảm giá
    describe('getDiscountedProducts', () => {

        // Test case 1: Lấy sản phẩm giảm giá với tham số mặc định
        it('should get discounted products with default parameters', async () => {
            const mockResponse = { data: [{ id: '1', discount: 20 }], total: 1 };
            ProductService.getDiscountedProducts.mockResolvedValue(mockResponse);
            await getDiscountedProducts(req, res);
            expect(ProductService.getDiscountedProducts).toHaveBeenCalledWith(null, 0);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        // Test case 2: Xử lý lỗi khi lấy sản phẩm giảm giá
        it('should handle get discounted products error', async () => {
            const error = new Error('Database error');
            ProductService.getDiscountedProducts.mockRejectedValue(error);
            await getDiscountedProducts(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: error.message || 'Lỗi khi lấy sản phẩm giảm giá'
            });
        });
    });
});