import React from "react"
import PathConstants from "./pathConstants"

const Home = React.lazy(() => import("../pages/home"));
const About = React.lazy(() => import("../pages/about"));
const ProductView = React.lazy(() => import("../pages/product/productView"));
const CreateProduct = React.lazy(() => import("../pages/product/createProduct"));
const Women = React.lazy(() => import("../pages/women"));
const Men = React.lazy(() => import("../pages/men"));
const Sell = React.lazy(() => import("../pages/sell"));
const Unisex = React.lazy(() => import("../pages/unisex"));
const Support = React.lazy(() => import("../pages/support"));

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    // other mappings ...
    { path: PathConstants.ABOUT, element: <About /> },
    { path: PathConstants.PRODUCTS, element: <ProductView /> },
    { path: PathConstants.CREATE_PODUCT, element: <CreateProduct /> },
    { path: PathConstants.WOMEN, element: <Women /> },
    { path: PathConstants.MEN, element: <Men /> },
    { path: PathConstants.UNISEX, element: <Unisex /> },
    { path: PathConstants.SUPPORT, element: <Support /> },
    { path: PathConstants.SELL, element: <Sell /> },

]

export default routes
