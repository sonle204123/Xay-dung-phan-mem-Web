import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import api from "../../Config/api"; // Import trạm trung chuyển API

// Khai báo Props để kết nối với App.tsx
interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Vui lòng nhập Email"),
    password: Yup.string()
      .min(6, "Mật khẩu phải ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setErrorMessage("");
        
        // 1. Gọi API gửi thông tin đăng nhập
        const res = await api.post('/login', {
          email: values.email,
          password: values.password
        });

        // 2. Lấy dữ liệu Backend trả về (Bắt buộc Backend phải trả về token và thông tin user)
        const token = res.data.token; 
        const user = res.data.user; // Chứa thông tin như họ tên, role_id...
        
        // 3. Lưu vào bộ nhớ máy (Két sắt)
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        // Lưu chuỗi JSON thông tin user để các trang khác hiện tên hiển thị (VD: Xin chào, Nguyễn Văn A)
        if (user) {
          localStorage.setItem("userInfo", JSON.stringify(user)); 
        }
        
        // 4. Báo cho hệ thống biết đã đăng nhập
        setIsLoggedIn(true);

        // 5. PHÂN LUỒNG CHUYỂN TRANG DỰA VÀO QUYỀN (ROLE)
        // Nếu Backend trả về role_id là 1 (Admin), 2 (Bác sĩ), 3 (Lễ tân)
        if (user && (user.role_id === 1 || user.role_id === 2 || user.role_id === 3)) {
           alert(`Đăng nhập thành công! Chào mừng ${user.role_id === 1 ? 'Quản trị viên' : 'Nhân sự'} quay lại.`);
           navigate("/admin"); // Bay vào khu làm việc
        } else {
           // Role khác (VD: 4 - Khách hàng) hoặc không có role thì mặc định là Khách
           alert("Đăng nhập thành công! Đang chuyển đến Trang chủ SmileCare.");
           navigate("/"); // Bay ra ngoài xem tin tức, đặt lịch
        }

      } catch (error: any) {
        // Bắt lỗi khi nhập sai pass hoặc email không tồn tại
        if (error.response && (error.response.status === 401 || error.response.status === 404)) {
          setErrorMessage("Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!");
        } else {
          setErrorMessage("Lỗi kết nối đến máy chủ. Vui lòng thử lại sau.");
          console.error("Lỗi đăng nhập:", error);
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Đăng Nhập SmileCare</h2>

        {/* Hiện thông báo lỗi nếu đăng nhập thất bại */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email" name="email"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-colors ${
                formik.touched.email && formik.errors.email ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200 bg-slate-50"
              }`}
              placeholder="example@smilecare.com"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <input
              type="password" name="password"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-colors ${
                formik.touched.password && formik.errors.password ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200 bg-slate-50"
              }`}
              placeholder="••••••••"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={formik.isSubmitting} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Đang xử lý..." : "Đăng nhập hệ thống"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-6">
          Khách hàng mới?{" "}
          <Link to="/signin" className="text-blue-600 font-bold hover:underline">Tạo tài khoản</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;