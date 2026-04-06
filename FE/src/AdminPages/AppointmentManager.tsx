import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentManager: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
    const res = await axios.get('https://xay-dung-phan-mem-web-hs0s.onrender.com/api/services');
    setAppointments(res.data);

    } catch (error) {
      console.error("Lỗi khi tải lịch hẹn:", error);
    }
  };

  const handleConfirm = async (id: number) => {
    try {
      await axios.put(`https://xay-dung-phan-mem-web-hs0s.onrender.com/api/admin/appointments/${id}`, { status: 'Confirmed' });
      alert('Đã xác nhận lịch hẹn thành công!');
      fetchAppointments();
    } catch (error) {
      alert('Lỗi xác nhận lịch hẹn');
    }
  };

  // Logic tìm kiếm
  const filteredAppointments = appointments.filter(app => 
    app.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone?.includes(searchTerm)
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Quản lý lịch hẹn SmileCare</h2>
        <input 
          type="text" 
          placeholder="Tìm tên hoặc số điện thoại..." 
          className="p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-72 bg-slate-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
              <th className="p-4 font-semibold">Mã LH</th>
              <th className="p-4 font-semibold">Tên khách hàng</th>
              <th className="p-4 font-semibold">SĐT Liên hệ</th>
              <th className="p-4 font-semibold">Thời gian hẹn</th>
              <th className="p-4 font-semibold">Trạng thái</th>
              <th className="p-4 font-semibold text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app) => (
                <tr key={app.appointment_id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600">#{app.appointment_id}</td>
                  <td className="p-4 font-bold text-slate-800">{app.patient_name}</td>
                  <td className="p-4 text-slate-700 font-medium">{app.phone}</td>
                  <td className="p-4 text-slate-700">{app.appointment_date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {app.status === 'Pending' ? (
                      <button 
                        onClick={() => handleConfirm(app.appointment_id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
                      >
                        Xác nhận
                      </button>
                    ) : (
                      <span className="text-slate-400 font-semibold text-sm">Đã xử lý</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 italic">Không có dữ liệu lịch hẹn nào phù hợp.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManager;