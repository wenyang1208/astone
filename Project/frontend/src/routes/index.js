import React from "react"
import PathConstants from "./pathConstants"

const Home = React.lazy(() => import("../pages/home"))
// other page components...
const About = React.lazy(() => import("../pages/about"))
const ProductView = React.lazy(() => import("../pages/product/productView"))
const CreateProduct = React.lazy(() => import("../pages/product/createProduct"))

const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    // other mappings ...
    { path: PathConstants.ABOUT, element: <About /> },
    { path: PathConstants.PRODUCTS, element: <ProductView /> },
    { path: PathConstants.CREATE_PODUCT, element: <CreateProduct /> },
]

export default routes
