import React, { useState, useEffect } from 'react';
import api from '../Config/api';

// --- Định nghĩa Interface để tránh lỗi TypeScript ---
interface Service {
  service_id: number;
  name: string;
  min_price: string;
  unit: string;
  category?: { name: string };
}

interface Patient {
  customer_id: number;
  id?: number;
  fullname: string;
  contact_number: string;
}

const DoctorExam: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Lấy thông tin bác sĩ từ localStorage
  const userInfoStr = localStorage.getItem('userInfo');
  const currentUser = userInfoStr ? JSON.parse(userInfoStr) : null;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resPatients, resServices] = await Promise.all([
          api.get('/customers'),
          api.get('/services')
        ]);
        
        // Lấy đúng mảng data bên trong (res.data.data) để tránh lỗi trắng trang
        const patientsData = resPatients.data?.status === 'success' ? resPatients.data.data : (Array.isArray(resPatients.data) ? resPatients.data : (resPatients.data.data || []));
        const servicesData = resServices.data?.status === 'success' ? resServices.data.data : (Array.isArray(resServices.data) ? resServices.data : (resServices.data.data || []));
        
        setPatients(Array.isArray(patientsData) ? patientsData : []);
        setServices(Array.isArray(servicesData) ? servicesData : []);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        alert("Không thể tải danh sách dịch vụ hoặc bệnh nhân!");
        setPatients([]);
        setServices([]);
      }
    };
    loadData();
  }, []);

  // Tính tổng tiền tạm tính
  const calculateTotal = () => {
    if (!Array.isArray(services)) return 0;
    return selectedServices.reduce((sum, serviceId) => {
      const service = services.find(s => s.service_id === serviceId);
      return sum + (service ? parseFloat(service.min_price) : 0);
    }, 0);
  };

  const toggleService = (id: number) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleFinishExam = async () => {
    if (!selectedPatient || selectedServices.length === 0) {
      alert("Vui lòng chọn bệnh nhân và ít nhất một dịch vụ!");
      return;
    }

    setLoading(true);
    try {
      // Biến đổi mảng ID thành mảng Object theo yêu cầu Backend
      const formattedServices = selectedServices.map(id => {
        const serviceInfo = services.find(s => s.service_id === id);
        return {
          service_id: id,
          price: serviceInfo ? parseFloat(serviceInfo.min_price) : 0,
          quantity: 1
        };
      });

      const payload = {
        customer_id: Number(selectedPatient),
        user_id: currentUser?.user_id || currentUser?.id,
        date: new Date().toISOString().split('T')[0],
        noted: note || "Khám bệnh",
        services: formattedServices 
      };

      console.log("Payload chuẩn gửi đi:", payload);

      const response = await api.post('/histories', payload);
      
      if (response.data?.status === 'success' || response.status === 200 || response.status === 201) {
        alert("🎉 Đã lưu kết quả khám thành công!");
        // Reset form
        setNote('');
        setSelectedServices([]);
        setSelectedPatient('');
      }
    } catch (error: any) {
      console.error("Lỗi chi tiết từ Server:", error.response?.data);
      const serverErrors = error.response?.data?.errors || error.response?.data?.message;
      
      if (serverErrors) {
        alert("Lỗi dữ liệu: " + (typeof serverErrors === 'string' ? serverErrors : JSON.stringify(serverErrors)));
      } else {
        alert("Có lỗi xảy ra khi lưu bệnh án!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 bg-slate-50 min-h-screen">
      {/* CỘT TRÁI: THÔNG TIN BỆNH NHÂN */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span>👤</span> Thông tin buổi khám
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-600 mb-2">Bệnh nhân</label>
            <select 
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Chọn bệnh nhân --</option>
              {Array.isArray(patients) && patients.map(p => (
                <option key={p.customer_id || p.id} value={p.customer_id || p.id}>
                  {p.fullname} - {p.contact_number}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2">Chẩn đoán của Bác sĩ</label>
            <textarea 
              rows={6}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Nhập tình trạng răng miệng..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: CHỌN DỊCH VỤ VÀ TÍNH TIỀN */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
          <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span>🦷</span> Chỉ định dịch vụ điều trị
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            {Array.isArray(services) && services.length > 0 ? (
              services.map(s => (
                <div 
                  key={s.service_id}
                  onClick={() => toggleService(s.service_id)}
                  className={`p-4 border-2 rounded-2xl cursor-pointer transition-all relative ${
                    selectedServices.includes(s.service_id) 
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                    : 'border-slate-100 hover:border-blue-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-800 leading-tight">{s.name}</span>
                    {selectedServices.includes(s.service_id) && (
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mb-2 uppercase font-semibold">
                      {s.category?.name || 'Dịch vụ'}
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                      <span className="text-blue-600 font-bold text-lg">
                          {Number(s.min_price).toLocaleString()}đ
                      </span>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-600 uppercase">
                          {s.unit}
                      </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400 italic">Đang tải danh sách dịch vụ...</p>
            )}
          </div>

          {/* TỔNG KẾT & GỬI */}
          <div className="mt-6 pt-6 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-slate-500 text-sm">Số lượng: <span className="font-bold text-slate-800">{selectedServices.length} mục</span></p>
                <p className="text-slate-500 text-sm">Bác sĩ: <span className="font-semibold text-slate-700">{currentUser?.fullname || 'Chưa cập nhật'}</span></p>
              </div>
              <div className="text-right">
                <p className="text-slate-600 text-sm font-semibold">Tổng cộng tạm tính:</p>
                <p className="text-3xl font-black text-red-600">{calculateTotal().toLocaleString()}đ</p>
              </div>
            </div>
            
            <button 
              onClick={handleFinishExam}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 active:scale-[0.98]'
              }`}
            >
              {loading ? "ĐANG XỬ LÝ..." : "HOÀN TẤT KHÁM & XUẤT HÓA ĐƠN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorExam;