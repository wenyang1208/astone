import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from "./pages/home"
// ...
import About from "./pages/about"
import ProductView from './pages/product/productView';
import CreateProduct from './pages/product/createProduct';
import NotFound from './pages/404';
import routes from './routes';
function App() {
  // initialize a browser router
  const router = createBrowserRouter([
    {
      // parent route component
      // element: <Layout />,

      // Custom error page
      errorElement: <NotFound />,

      // child route components
      children: routes
    },
  ])

  return (
      <RouterProvider router={router} />
  )
}

export default App