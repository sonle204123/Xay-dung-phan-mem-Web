import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout/Layout.tsx";
import Home from "./components/Layout/Home.tsx";
import SignIn from "./components/SignIn/SignIn.tsx";
import Login from "./components/Login/Login.tsx";
import Error from "./components/Error/Error.tsx";
import NewsPage from "./components/NewsPage/NewsPage.tsx";
import ContactPage from "./components/pages/Contact/ContactPage.tsx";
import AboutPage from "./components/pages/About/AboutPage.tsx";

// --- IMPORT CÁC TRANG ADMIN (Trí nhớ kiểm tra đúng đường dẫn file nhé) ---
import AdminDashboard from "./AdminPages/AdminDashboard.tsx";

function App() {
  // Trạng thái đăng nhập (lấy từ localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <Routes>
      {/* 1. KHU VỰC CHO KHÁCH HÀNG (Dùng Layout chung) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tin-tuc" element={<NewsPage />} />
        <Route path="lien-he" element={<ContactPage />} />
        <Route path="gioi-thieu" element={<AboutPage />} />
        <Route path="san-pham" element={<div>Trang sản phẩm SmileCare</div>} />
      </Route>

      {/* 2. KHU VỰC ĐĂNG NHẬP / ĐĂNG KÝ (Không dùng Layout khách hàng) */}
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signin" element={<SignIn />} />

      {/* 3. KHU VỰC QUẢN TRỊ (ADMIN) - BẢO MẬT CHẶT CHẼ */}
      <Route 
        path="/admin" 
        element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />} 
      />

      {/* 4. TRANG LỖI */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;