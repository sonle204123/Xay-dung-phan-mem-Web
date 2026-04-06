import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactPage: React.FC = () => {
  // Cấu hình Validation bằng Yup
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Vui lòng nhập họ và tên'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
      .min(10, "Số điện thoại phải có ít nhất 10 số")
      .required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    message: Yup.string().required('Vui lòng nhập lời nhắn'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      email: '',
      branch: 'Cơ sở Quận 7 - STU',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Dữ liệu liên hệ:', values);
      alert('Cảm ơn bạn! SmileCare sẽ liên hệ sớm nhất.');
      formik.resetForm();
    },
  });

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* BÊN TRÁI: FORM LIÊN HỆ */}
        <div className="flex-1 w-full">
          <nav className="text-sm text-gray-400 mb-6">
            Trang chủ <span className="mx-2">»</span> <span className="text-yellow-600">Liên hệ</span>
          </nav>

          <h1 className="text-3xl font-serif text-yellow-700 mb-2 uppercase tracking-wide">
            Đến với nha khoa thẩm mỹ SmileCare
          </h1>
          <p className="text-gray-600 mb-8 italic">
            Trải nghiệm sự khác biệt đến từ đội ngũ chuyên nghiệp.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Họ tên */}
              <div>
                <input
                  type="text"
                  placeholder="Họ và tên *"
                  className={`w-full p-3 border rounded-full outline-none focus:ring-1 focus:ring-yellow-500 ${formik.errors.fullName && formik.touched.fullName ? 'border-red-500' : 'border-gray-200'}`}
                  {...formik.getFieldProps('fullName')}
                />
              </div>

              {/* Số điện thoại */}
              <div>
                <input
                  type="text"
                  placeholder="Số điện thoại liên hệ *"
                  className={`w-full p-3 border rounded-full outline-none focus:ring-1 focus:ring-yellow-500 ${formik.errors.phone && formik.touched.phone ? 'border-red-500' : 'border-gray-200'}`}
                  {...formik.getFieldProps('phone')}
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email liên hệ *"
                  className={`w-full p-3 border rounded-full outline-none focus:ring-1 focus:ring-yellow-500 ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-200'}`}
                  {...formik.getFieldProps('email')}
                />
              </div>

              {/* Chọn cơ sở */}
              <div>
                <select
                  className="w-full p-3 border border-gray-200 rounded-full outline-none focus:ring-1 focus:ring-yellow-500 bg-white"
                  {...formik.getFieldProps('branch')}
                >
                  <option>Cơ sở Quận 7 - STU</option>
                  <option>Cơ sở Quận 1</option>
                  <option>Cơ sở Quận 10</option>
                </select>
              </div>
            </div>

            {/* Lời nhắn */}
            <div>
              <textarea
                placeholder="Lời nhắn"
                rows={4}
                className={`w-full p-4 border rounded-2xl outline-none focus:ring-1 focus:ring-yellow-500 ${formik.errors.message && formik.touched.message ? 'border-red-500' : 'border-gray-200'}`}
                {...formik.getFieldProps('message')}
              ></textarea>
            </div>

            <p className="text-xs text-gray-400 italic">
              * Thông tin của bạn sẽ được bảo mật!
            </p>

            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-10 rounded-full transition-all duration-300 uppercase tracking-widest shadow-lg"
            >
              Gửi thông tin
            </button>
          </form>
        </div>

        {/* BÊN PHẢI: HÌNH ẢNH MINH HỌA */}
        <div className="flex-1 hidden md:block relative">
          <div className="absolute inset-0 bg-yellow-50 rounded-full opacity-20 scale-110 blur-3xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000" 
            alt="SmileCare Doctor" 
            className="relative z-10 w-full rounded-2xl shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
          />
          {/* Logo hoặc biểu tượng trang trí */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl z-20">
            <span className="text-4xl font-bold text-yellow-600">Smile</span>
            <span className="text-4xl font-light text-gray-400">Care</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;