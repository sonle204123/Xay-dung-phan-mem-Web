import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import api from "../../Config/api"; 

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Vui lòng nhập họ và tên"),
    email: Yup.string().email("Email không đúng định dạng").required("Vui lòng nhập Email"),
    password: Yup.string().min(6, "Mật khẩu phải ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp')
      .required('Vui lòng xác nhận mật khẩu')
  });

  const formik = useFormik({
    initialValues: { fullname: "", email: "", password: "", confirmPassword: "" },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setServerMessage({ type: "", text: "" });
        
        // Gọi API Đăng ký. Gửi fullname, email và password xuống Database
        await api.post('/register', {
          fullname: values.fullname,
          email: values.email,
          password: values.password
        });

        setServerMessage({ type: "success", text: "Đăng ký thành công! Đang chuyển hướng..." });
        
        // Đăng ký xong thì tự động đẩy về trang Login sau 2 giây
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          setServerMessage({ type: "error", text: "Email này đã được sử dụng!" });
        } else {
          setServerMessage({ type: "error", text: "Lỗi hệ thống. Vui lòng thử lại sau." });
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Đăng Ký Tài Khoản</h2>

        {serverMessage.text && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center font-medium ${serverMessage.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
            {serverMessage.text}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Họ và Tên</label>
            <input
              type="text" name="fullname"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-colors ${formik.touched.fullname && formik.errors.fullname ? "border-red-500" : "border-slate-300 bg-slate-50"}`}
              placeholder="Nguyễn Văn A"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullname}
            />
            {formik.touched.fullname && formik.errors.fullname && <p className="text-red-500 text-xs mt-1">{formik.errors.fullname}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email" name="email"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-colors ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-slate-300 bg-slate-50"}`}
              placeholder="email@smilecare.com"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mật khẩu</label>
            <input
              type="password" name="password"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-colors ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-slate-300 bg-slate-50"}`}
              placeholder="••••••••"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Xác nhận mật khẩu</label>
            <input
              type="password" name="confirmPassword"
              className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 transition-colors ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : "border-slate-300 bg-slate-50"}`}
              placeholder="••••••••"
              onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>}
          </div>
          
          <button type="submit" disabled={formik.isSubmitting} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md mt-4 disabled:opacity-50">
            {formik.isSubmitting ? "Đang xử lý..." : "Đăng ký tài khoản"}
          </button>
        </form>

        <p className="text-sm text-center text-slate-600 mt-6">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-yellow-600 font-bold hover:underline">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;