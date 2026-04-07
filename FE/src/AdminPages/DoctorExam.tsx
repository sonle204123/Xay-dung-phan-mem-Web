import React, { useState, useEffect } from 'react';
import api from '../Config/api';

const DoctorExam: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resPatients, resServices] = await Promise.all([
          api.get('/customers'),
          api.get('/services')
        ]);
        setPatients(resPatients.data);
        setServices(resServices.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu khám bệnh:", error);
      }
    };
    loadData();
  }, []);

  // Xử lý chọn/bỏ chọn dịch vụ (Mảng services gửi lên Backend)
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
      // Gọi API: POST /histories
      const payload = {
        customer_id: selectedPatient,
        date: new Date().toISOString().split('T')[0], // Lấy ngày hiện tại YYYY-MM-DD
        noted: note,
        services: selectedServices // Mảng ID các dịch vụ bác sĩ đã chỉ định
      };

      await api.post('/histories', payload);
      alert("Đã lưu kết quả khám và tạo hóa đơn thành công!");
      
      // Reset trang để khám cho người tiếp theo
      setNote('');
      setSelectedServices([]);
      setSelectedPatient('');
    } catch (error) {
      alert("Lỗi khi lưu bệnh án. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* CỘT TRÁI: CHỌN BỆNH NHÂN & GHI CHÚ */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">1. Thông tin buổi khám</h3>
          
          <label className="block text-sm font-semibold text-slate-700 mb-2">Chọn bệnh nhân đang khám</label>
          <select 
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl mb-4 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Chọn bệnh nhân --</option>
            {patients.map(p => (
              <option key={p.customer_id} value={p.customer_id}>{p.fullname} - {p.contact_number}</option>
            ))}
          </select>

          <label className="block text-sm font-semibold text-slate-700 mb-2">Chẩn đoán & Ghi chú</label>
          <textarea 
            rows={5}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            placeholder="Nhập tình trạng răng miệng, hướng điều trị..."
          ></textarea>
        </div>
      </div>

      {/* CỘT PHẢI: CHỌN DỊCH VỤ ĐÃ THỰC HIỆN */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">2. Chỉ định dịch vụ (Tạo hóa đơn)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map(s => (
              <div 
                key={s.service_id}
                onClick={() => toggleService(s.service_id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedServices.includes(s.service_id) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">{s.name}</span>
                  {selectedServices.includes(s.service_id) && <span className="text-blue-600">✔</span>}
                </div>
                <div className="text-sm text-blue-700 font-semibold">{Number(s.min_price).toLocaleString()}đ</div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            <div>
              <span className="text-slate-500">Đã chọn:</span>
              <span className="ml-2 font-bold text-lg text-slate-800">{selectedServices.length} dịch vụ</span>
            </div>
            <button 
              onClick={handleFinishExam}
              disabled={loading}
              className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-all ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? "Đang lưu..." : "HOÀN TẤT & XUẤT HÓA ĐƠN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorExam;