import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
// ...
import NotFound from './pages/404';
import routes from './routes';
import { ThemeProvider } from '@mui/material';
import theme from './styles/theme';
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
    <ThemeProvider theme={theme}>
      <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>

  )
}

export default App