import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Componants/Layout/Layout";
import Login from "./Componants/Login/Login";
import NotFound from "./Componants/Not/NotFound";
import Register from "./Componants/Register/Register";
import Products from "./Componants/Products/Products";
import Catigories from "./Componants/Catigories/Catigories";
import Brands from './Componants/Brand/Brands';
import Profile from "./Componants/Profile/Profile";
import ForgetPass from './Componants/ForgetPass/ForgetPass';
import AdminHomePage from "./Componants/Admin/HomeAdmin/AdminHomePage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Componants/Context/Authentication";
import ProtectedRoute from "./Componants/Test/Test";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Componants/productDetails/ProductDetails";
import { CartextProvider } from "./Componants/Context/CartContext";
import CartProduct from "./Componants/CartOfProduct/CartProduct";


function App() {
  let QueruClient = new QueryClient () ;
  const appRouter = createBrowserRouter([
    {
        path : '/' , element : <AuthProvider ><Layout/></AuthProvider> , 
        children : [
          {
            path : '/' , element : 
              <ProtectedRoute>
                  <Products/>
              </ProtectedRoute>           
          },
          {
            path : '/product' , element :
             <ProtectedRoute>
               <Products/>
              </ProtectedRoute>
          },
          {
            path : '/cart' , element :
            <ProtectedRoute>
              <CartProduct/>
            </ProtectedRoute>
          },
          {
            path : '/productdetails/:id' , element :
            <ProtectedRoute>
              <ProductDetails/>
            </ProtectedRoute> 
          },
          {
            path : '/profile' , element :
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          },
          {
            path : '/catigores' , element : 
            <ProtectedRoute>            
              <Catigories/>
            </ProtectedRoute>
          },
          {
            path : '/brand' , element : 
            <ProtectedRoute>
              <Brands/>
            </ProtectedRoute>
          },
          {
            path : '/login' , element : <Login/>
          },
          {
            path : '/forgetpass' , element : <ForgetPass/>
          },
          {
            path : '/register' , element : <Register/>
          },
          {
            path : '*' , element : 
            <ProtectedRoute>
              <NotFound/>
            </ProtectedRoute>
          }
        ]
    },
    {
      path : '/admin' , element : <AdminHomePage/>
    }
  ])

  return <>
    <QueryClientProvider client={QueruClient}>
      <CartextProvider>
        <RouterProvider router={appRouter}/>
        <Toaster/>
      </CartextProvider>
    </QueryClientProvider>
  </>
}

export default App;
