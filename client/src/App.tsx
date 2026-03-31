import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/shop/Navbar";
import Footer from "./components/shop/Footer";
import ProtectedRoute from "./components/shop/ProtectedRoute";
import Home from "./pages/shop/Home";
import ProductList from "./pages/shop/ProductList";
import ProductDetail from "./pages/shop/ProductDetail";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import OrderSuccess from "./pages/shop/OrderSuccess";
import OrderHistory from "./pages/shop/OrderHistory";
import Wishlist from "./pages/shop/Wishlist";
import Login from "./pages/shop/Login";
import Register from "./pages/shop/Register";
import Profile from "./pages/shop/Profile";
import AdminLayout from "./pages/shop/admin/AdminLayout";
import Dashboard from "./pages/shop/admin/Dashboard";
import ManageProducts from "./pages/shop/admin/ManageProducts";
import ManageOrders from "./pages/shop/admin/ManageOrders";
import ManageUsers from "./pages/shop/admin/ManageUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" toastOptions={{ style: { borderRadius: "0.75rem", fontSize: "0.875rem" } }} />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/order-success/:orderId" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                  <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<ManageProducts />} />
                    <Route path="orders" element={<ManageOrders />} />
                    <Route path="users" element={<ManageUsers />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
