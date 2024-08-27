import React from "react";
import PathConstants from "./pathConstants"; 


const Home = React.lazy(() => import("../pages/home"));
const About = React.lazy(() => import("../pages/about"));
const ProductView = React.lazy(() => import("../pages/product/productView"));
const SellerProductView = React.lazy(() => import("../pages/product/sellerProductView"));
const ProductList = React.lazy(() => import("../pages/product/productList"));
const CreateProduct = React.lazy(() => import("../pages/product/createProduct"));
const Women = React.lazy(() => import("../pages/women"));
const Men = React.lazy(() => import("../pages/men"));
const Sell = React.lazy(() => import("../pages/sell"));
const Unisex = React.lazy(() => import("../pages/unisex"));
const Support = React.lazy(() => import("../pages/support"));
const Login = React.lazy(() => import("../pages/login"));
const SignUp = React.lazy(() => import("../pages/signup"));
const CompareProducts = React.lazy(() => import("../pages/compareproducts"));
const Checkout = React.lazy(() => import("../pages/checkout"));
const OrderConfirmation = React.lazy(() => import("../pages/orderConfirmation"));


const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.ABOUT, element: <About /> },
    { path: `${PathConstants.BUYERPRODUCTVIEW}/:id`, element: <ProductView /> },
    { path: `${PathConstants.SELLERPRODUCTVIEW}/:id`, element: <SellerProductView /> },
    { path: PathConstants.PRODUCTSLIST, element: <ProductList /> },
    { path: PathConstants.CREATE_PRODUCT, element: <CreateProduct /> },
    { path: PathConstants.WOMEN, element: <Women /> },
    { path: PathConstants.MEN, element: <Men /> },
    { path: PathConstants.UNISEX, element: <Unisex /> },
    { path: PathConstants.SUPPORT, element: <Support /> },
    { path: PathConstants.SELL, element: <Sell /> },
    { path: PathConstants.LOGIN, element: <Login /> },
    { path: PathConstants.SIGNUP, element: <SignUp /> },
    { path: PathConstants.COMPARE_PRODUCTS, element: <CompareProducts /> },
    { path: PathConstants.CHECKOUT, element: <Checkout /> },
    { path: PathConstants.ORDER_CONFIRMARION, element: <OrderConfirmation /> },


]

export default routes
