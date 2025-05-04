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

// Mock ProductService
jest.mock('../backend/src/services/ProductService');

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

    describe('createProduct', () => {
        it('should return error when missing required fields', async () => {
            req.body = { name: 'Test Product' }; // Thiếu các trường bắt buộc khác

            await createProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'Lỗi',
                message: 'Cần điền đầy đủ thông tin'
            });
        });

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

    describe('updateProduct', () => {
        it('should return error when missing productId', async () => {
            await updateProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            });
        });

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

    describe('getDetailsProduct', () => {
        it('should return error when missing productId', async () => {
            await getDetailsProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            });
        });

        it('should get product details successfully', async () => {
            req.params.id = '123';
            const mockProduct = { id: '123', name: 'Test Product' };
            ProductService.getDetailsProduct.mockResolvedValue(mockProduct);

            await getDetailsProduct(req, res);

            expect(ProductService.getDetailsProduct).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProduct);
        });

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

    describe('deleteProduct', () => {
        it('should return error when missing productId', async () => {
            await deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Product Id là bắt buộc'
            });
        });

        it('should delete product successfully', async () => {
            req.params.id = '123';
            const mockResponse = { status: 'OK' };
            ProductService.deleteProduct.mockResolvedValue(mockResponse);

            await deleteProduct(req, res);

            expect(ProductService.deleteProduct).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

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

    describe('getAllProduct', () => {
        it('should get all products with default parameters', async () => {
            const mockProducts = [{ id: '1' }, { id: '2' }];
            ProductService.getAllProduct.mockResolvedValue(mockProducts);

            await getAllProduct(req, res);

            expect(ProductService.getAllProduct).toHaveBeenCalledWith(null, 0, undefined, undefined, undefined);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
        });

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

    describe('getAllType', () => {
        it('should get all product types successfully', async () => {
            const mockTypes = ['chair', 'table', 'sofa'];
            ProductService.getAllType.mockResolvedValue(mockTypes);

            await getAllType(req, res);

            expect(ProductService.getAllType).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockTypes);
        });

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

    describe('deleteManyProduct', () => {
        it('should return error when missing ids', async () => {
            await deleteManyProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'ERR',
                message: 'Thiếu danh sách id'
            });
        });

        it('should delete multiple products successfully', async () => {
            req.body = { ids: ['1', '2', '3'] };
            const mockResponse = { status: 'OK', deletedCount: 3 };
            ProductService.deleteManyProduct.mockResolvedValue(mockResponse);

            await deleteManyProduct(req, res);

            expect(ProductService.deleteManyProduct).toHaveBeenCalledWith(['1', '2', '3']);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

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

    describe('searchProducts', () => {
        it('should search products successfully', async () => {
            req.query = { keyword: 'chair' };
            const mockProducts = [{ id: '1', name: 'Comfort Chair' }];
            ProductService.searchProducts.mockResolvedValue(mockProducts);

            await searchProducts(req, res);

            expect(ProductService.searchProducts).toHaveBeenCalledWith('chair');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProducts);
        });

        it('should handle search error', async () => {
            req.query = { keyword: 'chair' };
            ProductService.searchProducts.mockRejectedValue(new Error('Search failed'));

            await searchProducts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error searching products' });
        });
    });

    describe('getAllColors', () => {
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

    describe('filterProducts', () => {
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

    describe('getNewestProducts', () => {
        it('should get newest products with default parameters', async () => {
            const mockResponse = { data: [{ id: '1' }], total: 1 };
            ProductService.getNewestProducts.mockResolvedValue(mockResponse);

            await getNewestProducts(req, res);

            expect(ProductService.getNewestProducts).toHaveBeenCalledWith(null, 0);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

        it('should get newest products with limit and page', async () => {
            req.query = { limit: '10', page: '2' };
            const mockResponse = { data: [{ id: '1' }], total: 1 };
            ProductService.getNewestProducts.mockResolvedValue(mockResponse);

            await getNewestProducts(req, res);

            expect(ProductService.getNewestProducts).toHaveBeenCalledWith(10, 2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

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

    describe('getDiscountedProducts', () => {
        it('should get discounted products with default parameters', async () => {
            const mockResponse = { data: [{ id: '1', discount: 20 }], total: 1 };
            ProductService.getDiscountedProducts.mockResolvedValue(mockResponse);

            await getDiscountedProducts(req, res);

            expect(ProductService.getDiscountedProducts).toHaveBeenCalledWith(null, 0);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });

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