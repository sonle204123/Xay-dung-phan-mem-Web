import { useFormik } from "formik";
import * as Yup from "yup";
function Login() {
  const validationSchema = Yup.object({
    email: Yup.string().email("Email không đúng định dạng").required("Vui lòng nhập Email"),
    password: Yup.string().min(6, "Mật khẩu phải ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
  });

  // 2. Khởi tạo Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Dữ liệu đăng nhập:", values);
      alert("Đăng nhập thành công! Kiểm tra console log nhé.");
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng Nhập</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                formik.touched.email && formik.errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="example@gmail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p> : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                formik.touched.password && formik.errors.password ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="••••••••"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p> : null}
          </div>
          <button type="submit" className="w-full bg-cyan-950 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md mt-2">
            Đăng nhập
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Chưa có tài khoản?{" "}
          <a href="#" className="text-dark hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
