import React from "react";
import PathConstants from "./pathConstants"; 
import ProtectedRoute from "../services/ProtectedRoute";


const Home = React.lazy(() => import("../pages/home"));
const About = React.lazy(() => import("../pages/about"));
const ProductView = React.lazy(() => import("../pages/product/productView"));
const SellerProductView = React.lazy(() => import("../pages/product/sellerProductView"));
const ProductList = React.lazy(() => import("../pages/seller/productList"));
const CreateProduct = React.lazy(() => import("../pages/product/createProduct"));
const Women = React.lazy(() => import("../pages/women"));
const Men = React.lazy(() => import("../pages/men"));
const Sell = React.lazy(() => import("../pages/seller/sell"));
const Unisex = React.lazy(() => import("../pages/unisex"));
const Support = React.lazy(() => import("../pages/support"));
const FAQ = React.lazy(() => import("../pages/faq"));
const Login = React.lazy(() => import("../pages/login"));
const SignUp = React.lazy(() => import("../pages/signup"));
const Settings = React.lazy(() => import("../pages/settings"));
const LoginSeller = React.lazy(() => import("../pages/seller/loginSeller"));
const SignUpSeller = React.lazy(() => import("../pages/seller/signupSeller"));
const SellerProfile = React.lazy(() => import("../pages/seller/sellerProfile"));
const CompareProducts = React.lazy(() => import("../pages/compareproducts"));
const Checkout = React.lazy(() => import("../pages/checkout"));
const OrderConfirmation = React.lazy(() => import("../pages/orderConfirmation"));
const SellerForgotPassword = React.lazy(() => import("../pages/seller/sellerForgotPassword"));
const SellerChangePassword = React.lazy(() => import("../pages/seller/sellerChangePassword"));
const ForgotPassword = React.lazy(() => import("../pages/forgotPassword"));
const ChangePassword = React.lazy(() => import("../pages/changePassword"));
const SellerDashboard = React.lazy(() => import("../pages/seller/dashboard"));
const Finance = React.lazy(() => import("../pages/seller/finance"));
<<<<<<< HEAD
const Shipment = React.lazy(() => import("../pages/seller/shipment"));
=======
const PrivacyPolicy = React.lazy(() => import("../pages/privacyPolicy"));
const ReturnPolicy = React.lazy(() => import("../pages/returnPolicy"));
>>>>>>> df80d8f60d0417ca8f800ca3ac18bf9f841fdbad


const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.ABOUT, element: <About /> },
    { path: `${PathConstants.BUYERPRODUCTVIEW}/:id`, element: <ProductView /> },
    { path: `${PathConstants.SELLERPRODUCTVIEW}/:id`, element: <SellerProductView />},
    { path: PathConstants.PRODUCTSLIST, element: <ProtectedRoute><ProductList /></ProtectedRoute> },
    { path: PathConstants.CREATE_PRODUCT, element: <CreateProduct /> },
    { path: PathConstants.WOMEN, element: <Women /> },
    { path: PathConstants.MEN, element: <Men /> },
    { path: PathConstants.UNISEX, element: <Unisex /> },
    { path: PathConstants.SUPPORT, element: <Support /> },
    { path: PathConstants.FAQ, element: <FAQ /> },
    { path: PathConstants.SELL, element: <Sell /> },
    { path: PathConstants.LOGIN, element: <Login /> },
    { path: PathConstants.SIGNUP, element: <SignUp /> },
    { path: PathConstants.SETTINGS, element: <Settings /> },
    { path: PathConstants.LOGIN_SELLER, element: <LoginSeller /> },
    { path: PathConstants.SIGNUP_SELLER, element: <SignUpSeller /> },
    { path: PathConstants.SELLER_PROFILE, element: <ProtectedRoute><SellerProfile /></ProtectedRoute> },
    { path: PathConstants.COMPARE_PRODUCTS, element: <CompareProducts /> },
    { path: PathConstants.CHECKOUT, element: <Checkout /> },
    { path: PathConstants.ORDER_CONFIRMARION, element: <OrderConfirmation /> },
    { path: PathConstants.SELLER_FORGOT_PASSWORD, element: <SellerForgotPassword /> },
    { path: `${PathConstants.SELLER_CHANGE_PASSWORD}/:id`, element: <SellerChangePassword/> },
    { path: PathConstants.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: `${PathConstants.CHANGE_PASSWORD}/:id`, element: <ChangePassword/> },
    { path : PathConstants.SELLER_DASHBOARD, element: <ProtectedRoute><SellerDashboard /></ProtectedRoute> },
    { path : PathConstants.SELLER_FINANCE, element: <ProtectedRoute><Finance /></ProtectedRoute> },
    { path : PathConstants.SELLER_SHIPMENT, element: <ProtectedRoute><Shipment /></ProtectedRoute> },
    {path: PathConstants.PRIVACY_POLICY, element: <PrivacyPolicy />},
    {path: PathConstants.RETURN_POLICY, element: <ReturnPolicy />}
]

export default routes
