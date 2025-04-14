import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage"
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage"
import ChinhSachDoiTraPage from "../pages/ChinhSachDoiTraPage/ChinhSachDoiTraPage"
import ChinhSachBaoMatPage from "../pages/ChinhSachBaoMatPage/ChinhSachBaoMatPage"
import DieuKhoanDVPage from "../pages/DieuKhoanDVPage/DieuKhoanDVPage"
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import CartPage from "../pages/CartPage/CartPage";
import OrderHistoryPage from '../pages/OrderHistoryPage/OrderHistoryPage'
import OrderDetailPage from "../pages/OrderDetailPage/OrderDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
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
        path: '/product_details',
        page: ProductDetailsPage,
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
    },
    {
        path: '/chinhsachbaomat',
        page: ChinhSachBaoMatPage,
        isShowHeader: true
    },
    {
        path: '/dieukhoandichvu',
        page: DieuKhoanDVPage,
        isShowHeader: true
    },
    {
        path: '/sign_in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign_up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '/order_history',
        page: OrderHistoryPage,
        isShowHeader: true
    },
    {
        path: '/order_detail',
        page: OrderDetailPage,
        isShowHeader: true
    },
    {
        path: '/account',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/checkout',
        page: CheckOutPage,
        isShowHeader: true
    }
]
