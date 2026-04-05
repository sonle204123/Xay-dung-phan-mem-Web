import { useFormik } from "formik";
import * as Yup from "yup";
function SignIn() {
  const signInSchema = Yup.object({
    email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    password: Yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").max(20, "Mật khẩu không được quá 20 ký tự").required("Vui lòng nhập mật khẩu"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: () => {
      alert("Đăng nhập thành công!");
    },
  });
  // console.log(formik.handleChange);
  // console.log('Formik Object:', formik);
  // console.log('Values hiện tại:', formik.values);
  // console.log('Lỗi hiện tại:', formik.errors);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      \
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h2>
        <form action="" className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="">
            <label htmlFor="email" className="text-sm block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              placeholder="Nhập email của bạn"
              type="email"
              name="email"
              id="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  transition-colors}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <p>{formik.touched.email && formik.errors.email ? <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p> : null}</p>
          </div>

          <div className="">
            <label htmlFor="password" className="text-sm block font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              placeholder="Nhập mật khẩu của bạn"
              {...formik.getFieldProps("password")}
              type="password"
              name="password"
              id="password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  transition-colors`}
            />
            <p>{formik.touched.password && formik.errors.password ? <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p> : null}</p>
          </div>
          <button type="submit" className="w-full bg-amber-300 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md mt-2">
            Đăng Nhập
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Chưa có tài khoản?
          <a href="#" className="text-blue-400 hover:underline">
            Đăng Ký Ngay{" "}
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
