import { useState, useEffect } from "react";

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

// 1. Sửa interface Service để khớp hoàn toàn với API trả về
interface Service {
  service_id: number;
  category_id: number;
  image: string | null;
  name: string;        // Khớp với "name" từ API
  description: string | null;
  min_price: string;   // API trả về string "500000.00"
  max_price: string;
  unit: string;
  status: string;
}

const BookingPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    contact_number: "",
    doctor_id: 1,
    service_id: "", 
    date: "",
    time: "",
    noted: ""
  });

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]); 
  const [loading, setLoading] = useState(false);
  
  const token = localStorage.getItem("token");
  const BASE_URL = "https://xay-dung-phan-mem-web-hs0s.onrender.com";

  // 2. Hàm lấy danh sách dịch vụ (Đã tối ưu logic check data)
  const fetchServices = async () => {
    try {
      const response = await fetch(`${BASE_URL}/services`, {
        headers: { "Accept": "application/json" }
      });
      const result = await response.json();
      
      // Kiểm tra cấu trúc { status: "success", data: [...] }
      if (result.status === "success" && Array.isArray(result.data)) {
        setServices(result.data);
      } else if (Array.isArray(result)) {
        setServices(result);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách dịch vụ:", error);
    }
  };

  const fetchAppointments = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${BASE_URL}/appointments`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json" 
        },
      });
      const result = await response.json();
      if (result.status === "success") {
        setAppointments(result.data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!");
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
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("🎉 Đặt lịch thành công!");
        setFormData({ 
          fullname: "", contact_number: "", doctor_id: 1, 
          service_id: "", date: "", time: "", noted: "" 
        });
        fetchAppointments();
      } else {
        alert("Lỗi: " + (result.message || "Dữ liệu không hợp lệ"));
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Không thể kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* FORM ĐẶT LỊCH */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl h-fit border border-slate-100">
          <h2 className="text-2xl font-black text-blue-900 mb-6 uppercase tracking-tight">
            Đặt Lịch Khám
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Họ và tên khách hàng</label>
              <input 
                type="text" placeholder="Nguyễn Văn A" required
                className="w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.fullname}
                onChange={(e) => setFormData({...formData, fullname: e.target.value})}
              />
            </div>

            {/* --- PHẦN CHỌN DỊCH VỤ (ĐÃ FIX) --- */}
            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Chọn Dịch vụ</label>
              <select 
                required
                className="w-full p-3 mt-1 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.service_id}
                onChange={(e) => setFormData({...formData, service_id: e.target.value})}
              >
                <option value="">-- Vui lòng chọn dịch vụ --</option>
                {services.map((svc) => (
                  <option key={svc.service_id} value={svc.service_id}>
                    {svc.name} - Từ {Number(svc.min_price).toLocaleString()}đ
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Chọn Bác sĩ</label>
              <select 
                className="w-full p-3 mt-1 border rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.doctor_id}
                onChange={(e) => setFormData({...formData, doctor_id: Number(e.target.value)})}
              >
                <option value="1">Bác sĩ chuyên khoa I - Đặng Văn A</option>
                <option value="2">Thạc sĩ Bác sĩ - Trần Thị B</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Số điện thoại liên hệ</label>
              <input 
                type="tel" placeholder="090xxxxxxx" required
                className="w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.contact_number}
                onChange={(e) => setFormData({...formData, contact_number: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 ml-1">Ngày khám</label>
                <input 
                  type="date" required className="w-full p-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 ml-1">Giờ khám</label>
                <input 
                  type="time" required className="w-full p-3 mt-1 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 ml-1">Ghi chú triệu chứng</label>
              <textarea 
                placeholder="Ví dụ: Đau răng khôn, nhức nướu..." 
                className="w-full p-3 mt-1 border rounded-xl h-24 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.noted}
                onChange={(e) => setFormData({...formData, noted: e.target.value})}
              ></textarea>
            </div>

            <button 
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black text-white transition-all shadow-lg ${
                loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              }`}
            >
              {loading ? "ĐANG GỬI..." : "GỬI YÊU CẦU ĐẶT LỊCH"}
            </button>
          </form>
        </div>

        {/* CỘT PHẢI: DANH SÁCH LỊCH HẸN */}
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Lịch Hẹn Hệ Thống</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              {appointments.length} Lịch hẹn
            </span>
          </div>

          <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
            {appointments.map((item) => (
              <div 
                key={item.appointment_id} 
                className="group p-5 border border-slate-100 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border-l-8 border-l-blue-500"
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
                
                <div className="mt-4 flex gap-4 text-sm font-medium text-slate-600">
                  <span className="flex items-center gap-1">📅 {item.date}</span>
                  <span className="flex items-center gap-1">⏰ {item.time}</span>
                </div>
                
                {item.noted && (
                  <div className="mt-3 p-3 bg-white rounded-lg text-sm italic text-slate-500 border border-dashed border-slate-200">
                    "{item.noted}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;