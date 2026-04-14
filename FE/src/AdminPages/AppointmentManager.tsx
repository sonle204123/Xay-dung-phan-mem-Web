import React, { useState, useEffect } from 'react';
import api from '../Config/api'; 

const AppointmentManager: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // LẤY QUYỀN NGƯỜI DÙNG ĐỂ PHÂN QUYỀN NÚT BẤM
  const userInfoStr = localStorage.getItem('userInfo');
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userRole = user?.role_id || 0; 

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Gọi API /appointments (Đã check lỗi 404 từ hình trước của Trí)
      const res = await api.get('/appointments'); 
      
      // Khớp cấu trúc: res.data.data (Dựa trên hình ảnh Response bạn gửi)
      if (res.data && res.data.status === "success") {
        setAppointments(res.data.data);
      } else {
        setAppointments(Array.isArray(res.data) ? res.data : []);
      }
    } catch (error) {
      console.error("Lỗi khi tải lịch hẹn:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // HÀM CẬP NHẬT TRẠNG THÁI (Khớp API PUT /appointments/{id}/status)
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await api.put(`/appointments/${id}/status`, { status: newStatus });
      alert(`Đã chuyển trạng thái sang: ${newStatus}`);
      fetchAppointments();
    } catch (error) {
      alert('Lỗi cập nhật trạng thái. Vui lòng kiểm tra lại!');
    }
  };

  // HÀM XÓA (Khớp API DELETE /appointments/{id})
  const handleDelete = async (id: number) => {
    if (window.confirm("Admin có chắc chắn muốn xóa vĩnh viễn lịch hẹn này?")) {
      try {
        await api.delete(`/appointments/${id}`);
        alert('Đã xóa thành công!');
        fetchAppointments();
      } catch (error) {
        alert('Lỗi khi xóa. Chỉ Admin mới có quyền này.');
      }
    }
  };

  // Logic tìm kiếm an toàn dựa trên fullname và contact_number
  const filteredAppointments = Array.isArray(appointments) 
    ? appointments.filter(app => 
        app.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.contact_number?.includes(searchTerm)
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            📅 Quản lý lịch hẹn SmileCare
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">
              {userRole === 1 ? 'Admin' : userRole === 2 ? 'Bác sĩ' : 'Lễ tân'}
            </span>
          </h2>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Tìm tên hoặc số điện thoại..." 
              className="w-full p-3 pl-10 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 font-bold">Mã</th>
                <th className="p-4 font-bold">Khách hàng</th>
                <th className="p-4 font-bold">Thời gian hẹn</th>
                <th className="p-4 font-bold">Trạng thái</th>
                <th className="p-4 font-bold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={5} className="p-10 text-center text-blue-600 font-bold">Đang kết nối Database...</td></tr>
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments.map((app) => (
                  <tr key={app.appointment_id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="p-4 text-slate-400 font-mono text-xs">#{app.appointment_id}</td>
                    <td className="p-4">
                      {/* KHỚP TÊN TRƯỜNG: fullname và contact_number */}
                      <div className="font-bold text-slate-800">{app.fullname}</div>
                      <div className="text-xs text-slate-500">{app.contact_number}</div>
                    </td>
                    <td className="p-4 text-slate-700 font-medium text-sm">
                        {/* KHỚP TÊN TRƯỜNG: date và time */}
                        {app.date}
                        <div className="text-[10px] text-slate-400">{app.time}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        app.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {app.status === 'Pending' ? 'Đang chờ' : app.status === 'Confirmed' ? 'Đã duyệt' : 'Đã hủy'}
                      </span>
                    </td>
                    
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        {/* LỄ TÂN & ADMIN XỬ LÝ LỊCH CHỜ */}
                        {(userRole === 1 || userRole === 3) && app.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(app.appointment_id, 'Confirmed')}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                            >
                              Duyệt
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(app.appointment_id, 'Cancelled')}
                              className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                            >
                              Hủy
                            </button>
                          </>
                        )}

                        {/* ADMIN XÓA VĨNH VIỄN */}
                        {userRole === 1 && (
                          <button 
                            onClick={() => handleDelete(app.appointment_id)}
                            className="bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                          >
                            Xóa
                          </button>
                        )}
                        
                        {app.status !== 'Pending' && userRole !== 1 && (
                          <span className="text-slate-300 text-xs italic">Đã hoàn thành</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <div className="text-slate-400 italic">Không có lịch hẹn nào khớp với tên trường trong Database.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManager;