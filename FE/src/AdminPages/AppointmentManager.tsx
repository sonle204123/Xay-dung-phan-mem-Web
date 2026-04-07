import React, { useState, useEffect } from 'react';
import api from '../Config/api'; // Dùng api.ts để gửi Token

const AppointmentManager: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // LẤY QUYỀN NGƯỜI DÙNG TỪ KÉT SẮT
  const userInfoStr = localStorage.getItem('userInfo');
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userRole = user?.role_id || 0; 

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // ĐÃ SỬA LỖI: Gọi đúng API lịch hẹn, không gọi /services nữa
      const res = await api.get('/appointments'); 
      setAppointments(res.data);
    } catch (error) {
      console.error("Lỗi khi tải lịch hẹn:", error);
    }
  };

  const handleConfirm = async (id: number) => {
    try {
      await api.put(`/admin/appointments/${id}`, { status: 'Confirmed' });
      alert('Đã xác nhận lịch hẹn thành công!');
      fetchAppointments();
    } catch (error) {
      alert('Lỗi xác nhận lịch hẹn. Vui lòng kiểm tra quyền hoặc kết nối.');
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
        <h2 className="text-2xl font-bold text-slate-800">
          📅 Quản lý lịch hẹn SmileCare
          <span className="ml-3 text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Góc nhìn: {userRole === 1 ? 'Admin' : userRole === 2 ? 'Bác sĩ' : 'Lễ tân'}
          </span>
        </h2>
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
                  
                  {/* CỘT THAO TÁC: NƠI PHÉP MÀU PHÂN QUYỀN XUẤT HIỆN */}
                  <td className="p-4 text-center flex justify-center gap-2">
                    
                    {/* QUYỀN CỦA LỄ TÂN (3) VÀ ADMIN (1) */}
                    {(userRole === 1 || userRole === 3) && app.status === 'Pending' && (
                      <>
                        <button onClick={() => handleConfirm(app.appointment_id)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
                          Xác nhận
                        </button>
                        <button onClick={() => alert("Chức năng Hủy Lịch đang được Backend xây dựng")} className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
                          Hủy
                        </button>
                      </>
                    )}

                    {/* QUYỀN CỦA BÁC SĨ (2) VÀ ADMIN (1) */}
                    {(userRole === 1 || userRole === 2) && app.status === 'Confirmed' && (
                      <button onClick={() => alert("Chức năng Tạo Bệnh Án đang được Backend xây dựng")} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
                        Bệnh án
                      </button>
                    )}

                    {/* QUYỀN ĐỘC TÔN CỦA ADMIN (1) */}
                    {userRole === 1 && (
                      <button onClick={() => alert("Chức năng Xóa Vĩnh Viễn đang được Backend xây dựng")} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors">
                        Xóa
                      </button>
                    )}

                    {/* Nếu không có nút nào thỏa mãn điều kiện để hiện */}
                    {app.status === 'Confirmed' && userRole === 3 && (
                      <span className="text-slate-400 font-semibold text-sm italic">Đã xác nhận</span>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500 italic">Không có dữ liệu lịch hẹn nào phù hợp hoặc đang tải...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManager;