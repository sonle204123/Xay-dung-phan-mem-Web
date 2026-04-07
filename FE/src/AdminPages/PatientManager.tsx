import React, { useState, useEffect } from 'react';
import api from '../Config/api';

const PatientManager: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [formData, setFormData] = useState({ fullname: '', contact_number: '', gender: 'Nam', address: '' });
  
  // Lấy quyền từ két sắt
  const userInfoStr = localStorage.getItem('userInfo');
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userRole = user?.role_id || 0;

  useEffect(() => {
    fetchPatients();
  }, []);

  // Gọi API: GET /customers
  const fetchPatients = async () => {
    try {
      const res = await api.get('/customers');
      setPatients(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách bệnh nhân:", error);
    }
  };

  // Gọi API: POST /customers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/customers', formData);
      alert('Đã tạo hồ sơ bệnh nhân thành công!');
      setFormData({ fullname: '', contact_number: '', gender: 'Nam', address: '' });
      fetchPatients();
    } catch (error) {
      alert('Lỗi tạo hồ sơ. Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <div className="space-y-8">
      {/* KHU VỰC THÊM HỒ SƠ (Dành cho Lễ tân và Bác sĩ) */}
      {(userRole === 2 || userRole === 3 || userRole === 1) && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            📝 Tạo hồ sơ bệnh nhân mới
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên</label>
              <input type="text" required value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại</label>
              <input type="text" required value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="090123..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Giới tính</label>
              <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md">
                Tạo hồ sơ
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DANH SÁCH BỆNH NHÂN */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6">👥 Danh sách Hồ sơ Bệnh nhân</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-4 font-semibold">Mã HS</th>
                <th className="p-4 font-semibold">Họ Tên</th>
                <th className="p-4 font-semibold">Số điện thoại</th>
                <th className="p-4 font-semibold">Giới tính</th>
                <th className="p-4 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {patients.length > 0 ? patients.map(p => (
                <tr key={p.id || p.customer_id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-500">#{p.id || p.customer_id}</td>
                  <td className="p-4 font-bold text-slate-800">{p.fullname}</td>
                  <td className="p-4 text-slate-600">{p.contact_number}</td>
                  <td className="p-4 text-slate-600">{p.gender}</td>
                  <td className="p-4 text-center">
                    {/* Bác sĩ được phép tạo lịch sử khám (Bệnh án) */}
                    {userRole === 2 && (
                       <button onClick={() => alert("Chuyển sang trang Ghi bệnh án...")} className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                         Khám bệnh
                       </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="p-6 text-center text-slate-500">Chưa có hồ sơ bệnh nhân.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientManager;