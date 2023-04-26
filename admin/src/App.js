import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Order from "./pages/Order";
import Customer from "./pages/Customer";
import CategoryList from "./pages/CategoryList";
import ProductList from "./pages/ProductList";
import AddCategory from "./pages/AddCategory";
import AddProducts from "./pages/AddProducts";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";
import ViewEnq from "./pages/ViewEnq";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="orders" element={<Order />} />
          <Route path="customers" element={<Customer />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="product" element={<AddProducts />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="category/:id" element={<AddCategory />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="coupon-list" element={<CouponList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
