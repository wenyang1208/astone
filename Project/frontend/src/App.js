import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
// ...
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
    <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
    </Suspense>
  )
}

export default App