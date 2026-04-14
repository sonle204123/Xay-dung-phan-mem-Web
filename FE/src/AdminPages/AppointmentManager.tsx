import React, { useState, useEffect } from 'react';
import api from '../Config/api'; 

const AppointmentManager: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // LẤY QUYỀN NGƯỜI DÙNG TỪ LOCALSTORAGE
  const userInfoStr = localStorage.getItem('userInfo');
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userRole = user?.role_id || 0; 

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await api.get('/appointments'); 
      
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

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const statusFormatted = newStatus.toLowerCase();
      await api.put(`/appointments/${id}/status`, { status: statusFormatted });
      alert(`Đã cập nhật trạng thái thành công!`);
      fetchAppointments(); 
    } catch (error: any) {
      console.error("Lỗi cập nhật:", error.response?.data);
      alert('Không thể cập nhật: ' + (error.response?.data?.message || 'Lỗi phân quyền'));
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Admin xác nhận xóa vĩnh viễn lịch hẹn này?")) {
      try {
        await api.delete(`/appointments/${id}`);
        alert('Đã xóa thành công!');
        fetchAppointments();
      } catch (error) {
        alert('Lỗi: Chỉ Admin mới có quyền xóa dữ liệu này.');
      }
    }
  };

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
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              {userRole === 1 ? 'Quản trị viên' : userRole === 3 ? 'Lễ tân' : 'Bác sĩ'}
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
                <th className="p-4 font-bold text-center">Trạng thái</th>
                <th className="p-4 font-bold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={5} className="p-10 text-center text-blue-600 font-bold italic">Đang đồng bộ dữ liệu...</td></tr>
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments.map((app) => (
                  <tr key={app.appointment_id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 text-slate-400 font-mono text-xs">#{app.appointment_id}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{app.fullname}</div>
                      <div className="text-xs text-slate-500 font-medium">{app.contact_number}</div>
                    </td>
                    
                    {/* CỘT THỜI GIAN ĐÃ ĐƯỢC FORMAT CẮT BỚT GIÂY */}
                    <td className="p-4 text-slate-700 font-medium text-sm">
                        {app.date}
                        <div className="text-[10px] text-slate-400 italic font-normal">
                          {/* Dùng slice(0, 5) để biến 08:30:00 thành 08:30 */}
                          {app.time ? app.time.slice(0, 5) : 'Chưa xếp giờ'}
                        </div>
                    </td>

                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                        app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {app.status === 'pending' ? 'Đang chờ' : 
                         app.status === 'confirmed' ? 'Đã duyệt' : 'Đã hủy'}
                      </span>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        {(userRole === 1 || userRole === 3) && app.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(app.appointment_id, 'confirmed')}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-md transition-all active:scale-95"
                            >
                              DUYỆT
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(app.appointment_id, 'cancelled')}
                              className="bg-slate-200 hover:bg-slate-300 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                            >
                              HỦY
                            </button>
                          </>
                        )}

                        {userRole === 1 && (
                          <button 
                            onClick={() => handleDelete(app.appointment_id)}
                            className="bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                          >
                            XÓA
                          </button>
                        )}
                        
                        {app.status !== 'pending' && userRole !== 1 && (
                          <span className="text-slate-300 text-[10px] font-bold italic">ĐÃ XỬ LÝ</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center">
                    <div className="text-slate-400 italic text-sm font-medium">Không tìm thấy dữ liệu lịch hẹn phù hợp.</div>
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