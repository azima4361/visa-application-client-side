import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from './Layouts/MainLayout.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Home from './Pages/Home.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Default route for "/"
        element: <Home />,
      },
      {
        path:'/login',
        element: <Login></Login>,
      },
      {
        path:'/register',
        element:<Register></Register>,
      },
    ]
  },
  

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>
);
