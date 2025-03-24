import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import ChinhSachDoiTraPage from "../pages/ChinhSachDoiTraPage/ChinhSachDoiTraPage"
// Mảng routes trong file routes/index.js chứa các đường dẫn
export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    },
    {
        path: '/aboutus',
        page: AboutUsPage,
        isShowHeader: true
    },
    {
        path: '/chinhsachdoitra',
        page: ChinhSachDoiTraPage,
        isShowHeader: true
    }
]
