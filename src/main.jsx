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
import PrivateRoute from './Layouts/PrivateRoute.jsx';
import AddVisa from './components/AddVisa.jsx';

import MyApplication from './components/MyApplication.jsx';
import MyAddedVisa from './components/MyaddedVisa.jsx';
import All from './components/All.jsx';
import VisaDetails from './components/VisaDetails.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Default route for "/"
        element: <Home />,
        loader: ()=>  fetch("http://localhost:5000/all"),
      },
      {
        path:'/all',
        element:<All></All>,
        loader: ()=>  fetch("http://localhost:5000/all"),
        
      },
      {
        path:'/add',
        element:<PrivateRoute><AddVisa></AddVisa></PrivateRoute>
      },
      {
        path:'/my-added-visa',
        element:<PrivateRoute><MyAddedVisa></MyAddedVisa></PrivateRoute>
      },
      {
        path:'/applications',
        element:<PrivateRoute><MyApplication></MyApplication></PrivateRoute>,
        loader:()=> fetch(`http://localhost:5000/applications`) 
      },
      {
        path:'/visa/:id',
        element:<PrivateRoute><VisaDetails></VisaDetails></PrivateRoute>,
        loader:({params})=> fetch(`http://localhost:5000/visa/${params.id}`) 
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
