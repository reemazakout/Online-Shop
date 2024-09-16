import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Componants/Layout/Layout.jsx";
import Register from "./Pages/Register/Register.jsx";
import Notfound from "./Pages/Notfound/Notfound.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login/Login.jsx";
import Home from "./Pages/Home/Home.jsx";
import ProtectedRoute from "./Componants/ProtectedRoute/ProtectedRoute.jsx";
import AuthLayout from "./Componants/AuthLayout/AuthLayout.jsx";
import UserProvider from "./Context/User.context.jsx";
import ProductDetails from "./Pages/ProductDetails/ProductDetails.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import CartProvider from "./Context/Cart.context.jsx";
import Checkout from "./Pages/Checkout/Checkout.jsx";
import WishList from "./Pages/WishList/WishList.jsx";
import WishListProvider from "./Context/WishList.context.jsx";
import AllOrders from "./Pages/AllOrders/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Product from "./Pages/Product/Product.jsx";
import Categories from "./Pages/Categories/Categories.jsx";
import CategoriesDetails from "./Pages/CategoriesDetails/CategoriesDetails.jsx";
import Brands from "./Pages/Brands/Brands.jsx";
import BrandDetails from "./Pages/BrandDetails/BrandDetails.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import VerfyRestpasswoed from "./Pages/VerfyRestpasswoed/VerfyRestpasswoed.jsx";
import UpdateLogedUser from "./Pages/UpdateLogedUser/UpdateLogedUser.jsx";
import SubCategory from "./Componants/SubCategory/SubCategory.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/categories/:id",
        element: <CategoriesDetails />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      { path: "/Brands/:id", element: <BrandDetails /> },
      { path: "/categories/:id/subcategories", element: <SubCategory /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/wishlist", element: <WishList /> },
      { path: "/cart", element: <Cart /> },
      { path: "/allorders", element: <AllOrders /> },
      { path: "/product", element: <Product /> },
      { path: "/Brands", element: <Brands /> },
      { path: "/categories", element: <Categories /> },
      { path: "/forgetPassword", element: <ForgotPassword /> },
      { path: "/send-code", element: <VerfyRestpasswoed /> },
      { path: "/resetpassword", element: <UpdateLogedUser /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

const myClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={myClient}>
      <UserProvider>
        <WishListProvider>
          <CartProvider>
            <RouterProvider router={routes} />
            <Toaster />
            <ReactQueryDevtools position="right" />
          </CartProvider>
        </WishListProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
