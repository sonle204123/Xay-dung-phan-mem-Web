import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout/Layout.tsx";
import Home from "./components/Layout/Home.tsx";
import SignIn from "./components/Register/Register.tsx";
import Login from "./components/Login/Login.tsx";
import Error from "./components/Error/Error.tsx";
import NewsPage from "./components/NewsPage/NewsPage.tsx";
import ContactPage from "./components/pages/Contact/ContactPage.tsx";
import AboutPage from "./components/pages/About/AboutPage.tsx";
import AdminDashboard from "./AdminPages/AdminDashboard.tsx"; // Đã sửa .js thành .tsx
import ServicePage from "./components/pages/ServicePage/ServicePage.tsx";
import ProductPage from "./components/pages/ProductPage/ProductPage.tsx";
import ReviewPage from "./components/pages/ReviewPage/ReviewPage.tsx";
import BookingPage from "./components/pages/BookingPage/BookingPage.tsx";

// IMPORT GIAO DIỆN KHÁCH HÀNG
// Sửa đường dẫn cũ thành đường dẫn mới trỏ vào thư mục AdminPages
import CustomerDashboard from './AdminPages/CustomerDashboard';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tin-tuc" element={<NewsPage />} />
        <Route path="lien-he" element={<ContactPage />} />
        <Route path="gioi-thieu" element={<AboutPage />} />
        <Route path="san-pham" element={<ProductPage />} />
        <Route path="dich-vu" element={<ServicePage />} />
        <Route path="danh-gia" element={<ReviewPage />} />
        <Route path="dat-lich" element={<BookingPage />} />
      </Route>

      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signin" element={<SignIn />} />

      {/* ROUTE DÀNH CHO ADMIN / BÁC SĨ / LỄ TÂN */}
      <Route 
        path="/admin" 
        element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />} 
      />

      {/* ROUTE DÀNH CHO KHÁCH HÀNG (BỆNH NHÂN) */}
      <Route 
        path="/my-dashboard" 
        element={isLoggedIn ? <CustomerDashboard /> : <Navigate to="/login" />} 
      />

      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;