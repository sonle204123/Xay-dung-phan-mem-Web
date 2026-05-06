import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU ---
interface Appointment {
  appointment_id: number;
  fullname: string;
  contact_number: string;
  date: string;
  time: string;
  noted: string;
  status: string;
}

interface Service {
  service_id: number;
  category_id: number;
  image: string | null;
  name: string;
  description: string | null;
  min_price: string;
  max_price: string;
  unit: string;
  status: string;
}

// --- SCHEMA VALIDATION VỚI YUP ---
const validationSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Họ tên phải ít nhất 3 ký tự")
    .required("Vui lòng nhập họ tên khách hàng"),
  contact_number: Yup.string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không đúng định dạng Việt Nam")
    .required("Vui lòng nhập số điện thoại"),
  service_id: Yup.string().required("Vui lòng chọn dịch vụ"),
  doctor_id: Yup.number().required("Vui lòng chọn bác sĩ"),
  date: Yup.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), "Ngày khám không được ở quá khứ")
    .required("Vui lòng chọn ngày khám"),
  time: Yup.string().required("Vui lòng chọn giờ khám"),
  noted: Yup.string().max(500, "Ghi chú không quá 500 ký tự"),
});

const BookingPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const BASE_URL = "https://xay-dung-phan-mem-web-hs0s.onrender.com";

  // --- FORMIK SETUP ---
  const formik = useFormik({
    initialValues: {
      fullname: "",
      contact_number: "",
      doctor_id: 1,
      service_id: "",
      date: "",
      time: "",
      noted: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!token) {
        alert("Vui lòng đăng nhập!");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(values)
        });

        const result = await response.json();

        if (response.ok) {
          alert("🎉 Đặt lịch thành công!");
          formik.resetForm(); // Reset form về ban đầu
          fetchAppointments(); 
        } else {
          alert("Lỗi: " + (result.message || "Dữ liệu không hợp lệ"));
        }
      } catch (error) {
        alert("Lỗi kết nối đến server!");
      } finally {
        setLoading(false);
      }
    },
  });

  // --- FETCH DATA ---
  const fetchServices = async () => {
    try {
      const response = await fetch(`${BASE_URL}/services`);
      const result = await response.json();
      if (result.status === "success" && Array.isArray(result.data)) {
        setServices(result.data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách dịch vụ:", error);
    }
  };

  const fetchAppointments = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${BASE_URL}/appointments`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const result = await response.json();
      if (result.status === "success") setAppointments(result.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchServices();
  }, []);

  // Helper hiển thị lỗi
  const ErrorMsg = ({ name }: { name: keyof typeof formik.values }) => (
    formik.touched[name] && formik.errors[name] ? (
      <div className="text-red-500 text-xs mt-1 ml-1 font-medium">{formik.errors[name] as string}</div>
    ) : null
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* --- CỘT TRÁI: FORM ĐẶT LỊCH --- */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl h-fit border border-slate-100">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              Role: {userRole === "receptionist" ? "Lễ Tân" : "Khách Hàng"}
            </span>
            <h2 className="text-2xl font-black text-blue-900 mt-2 uppercase tracking-tight">
              {userRole === "receptionist" ? "Tạo Lịch Cho Khách" : "Đặt Lịch Khám"}
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Họ Tên */}
            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Họ và tên khách hàng</label>
              <input
                
                type="text"
                placeholder="Nguyễn Văn A"
                className={`w-full p-3 mt-1 border rounded-xl focus:ring-2 outline-none transition-all ${
                    formik.touched.fullname && formik.errors.fullname ? 'border-red-400 focus:ring-red-200' : 'focus:ring-blue-500'
                }`}
                {...formik.getFieldProps('fullname')}
              />
              <ErrorMsg name="fullname" />
            </div>

            {/* Chọn Dịch Vụ */}
            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Chọn Dịch vụ</label>
              <select
                
                className={`w-full p-3 mt-1 border rounded-xl bg-white outline-none focus:ring-2 ${
                    formik.touched.service_id && formik.errors.service_id ? 'border-red-400' : 'focus:ring-blue-500'
                }`}
                {...formik.getFieldProps('service_id')}
              >
                <option value="">-- Vui lòng chọn dịch vụ --</option>
                {services.map((svc) => (
                  <option key={svc.service_id} value={svc.service_id}>
                    {svc.name} - Từ {Number(svc.min_price).toLocaleString()}đ
                  </option>
                ))}
              </select>
              <ErrorMsg name="service_id" />
            </div>

            {/* Bác Sĩ */}
            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Bác sĩ phụ trách</label>
              <select
                
                className="w-full p-3 mt-1 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
                {...formik.getFieldProps('doctor_id')}
              >
                <option value="1">Bác sĩ Đặng Văn A (Nha khoa)</option>
                <option value="2">Bác sĩ Trần Thị B (Tổng quát)</option>
              </select>
            </div>

            {/* Số Điện Thoại */}
            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Số điện thoại</label>
              <input
                type="tel"
                placeholder="090xxxxxxx"
                className={`w-full p-3 mt-1 border rounded-xl focus:ring-2 outline-none ${
                    formik.touched.contact_number && formik.errors.contact_number ? 'border-red-400' : 'focus:ring-blue-500'
                }`}
                {...formik.getFieldProps('contact_number')}
              />
              <ErrorMsg name="contact_number" />
            </div>

            {/* Ngày và Giờ */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 ml-1">Ngày khám</label>
                <input
                  type="date"
                  className={`w-full p-3 mt-1 border rounded-xl outline-none ${
                    formik.touched.date && formik.errors.date ? 'border-red-400' : ''
                  }`}
                  {...formik.getFieldProps('date')}
                />
                <ErrorMsg name="date" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 ml-1">Giờ khám</label>
                <input
                  type="time"
                  className={`w-full p-3 mt-1 border rounded-xl outline-none ${
                    formik.touched.time && formik.errors.time ? 'border-red-400' : ''
                  }`}
                  {...formik.getFieldProps('time')}
                />
                <ErrorMsg name="time" />
              </div>
            </div>

            {/* Ghi Chú */}
            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Ghi chú triệu chứng</label>
              <textarea
                placeholder="Triệu chứng hiện tại..."
                className="w-full p-3 mt-1 border rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500"
                {...formik.getFieldProps('noted')}
              ></textarea>
              <ErrorMsg name="noted" />
            </div>

            <button
              type="submit"
              disabled={loading || !formik.isValid}
              className={`w-full py-4 rounded-xl font-black text-white transition-all shadow-lg ${
                loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              } ${!formik.isValid && 'opacity-70 cursor-not-allowed'}`}
            >
              {loading ? "ĐANG XỬ LÝ..." : "GỬI YÊU CẦU ĐẶT LỊCH"}
            </button>
          </form>
        </div>

        {/* --- CỘT PHẢI: DANH SÁCH LỊCH HẸN (Giữ nguyên logic hiển thị của bạn) --- */}
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
           {/* ... Phần danh sách giữ nguyên như cũ ... */}
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              {userRole === "receptionist" ? "Quản Lý Toàn Bộ Lịch" : "Lịch Hẹn Của Bạn"}
            </h2>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
              {appointments.length} Lịch hẹn
            </span>
          </div>

          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
            {appointments.map((item) => (
              <div
                key={item.appointment_id}
                className={`group p-5 border border-slate-100 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border-l-8 ${
                  item.status.toLowerCase() === 'pending' ? 'border-l-amber-400' : 'border-l-emerald-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-lg text-slate-900">{item.fullname}</h4>
                    <p className="text-blue-600 font-bold text-sm">{item.contact_number}</p>
                  </div>
                  <span className={`text-[10px] px-3 py-1 rounded-full uppercase font-black tracking-widest ${
                    item.status.toLowerCase() === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="mt-4 flex gap-6 text-sm font-bold text-slate-600">
                  <span className="flex items-center gap-1">📅 {item.date}</span>
                  <span className="flex items-center gap-1">⏰ {item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;