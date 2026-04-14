import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Config/api';

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kéo dữ liệu của khách hàng đang đăng nhập
    const fetchCustomerData = async () => {
      try {
        // Gọi API lấy thông tin cá nhân
        const profileRes = await api.get('/user'); 
        setProfile(profileRes.data);

        // Gọi API lấy danh sách lịch khám của người này
        const aptRes = await api.get('/my-appointments');
        setAppointments(aptRes.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu khách hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-xl font-bold text-blue-600">Đang tải hồ sơ...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Xin chào, {profile?.fullname || 'Quý khách'} 👋</h1>
            <p className="text-slate-500">Chào mừng bạn đến với trung tâm nha khoa SmileCare</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold rounded-xl transition-colors border border-red-100"
          >
            Đăng xuất
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CỘT TRÁI: THÔNG TIN CÁ NHÂN */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-4 mb-4">Hồ sơ cá nhân</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 font-medium">Họ và tên</p>
                <p className="font-bold text-slate-800">{profile?.fullname || 'Chưa cập nhật'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Email liên hệ</p>
                <p className="font-bold text-slate-800">{profile?.email || 'Chưa cập nhật'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Số điện thoại</p>
                <p className="font-bold text-slate-800">{profile?.phone || 'Chưa cập nhật'}</p>
              </div>
            </div>
            <button className="mt-6 w-full py-2 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors">
              Chỉnh sửa hồ sơ
            </button>
          </div>

          {/* CỘT PHẢI: LỊCH SỬ ĐẶT KHÁM */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-4 mb-4">Lịch sử đặt khám của bạn</h3>
            
            <div className="space-y-4">
              {appointments.length > 0 ? appointments.map((apt, index) => (
                <div key={index} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-800 text-lg">{apt.date} | {apt.time}</div>
                    <div className="text-slate-500 mt-1">Dịch vụ: <span className="font-semibold">{apt.service_name || 'Khám tổng quát'}</span></div>
                    <div className="text-sm text-slate-400 mt-1">Bác sĩ: {apt.doctor_name || 'Đang xếp lịch'}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      apt.status === 'Đang chờ' ? 'bg-yellow-100 text-yellow-700' :
                      apt.status === 'Đã xác nhận' ? 'bg-blue-100 text-blue-700' :
                      apt.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 text-slate-500">
                  <div className="text-4xl mb-3">🦷</div>
                  <p>Bạn chưa có lịch hẹn khám nào.</p>
                  <button onClick={() => navigate('/booking')} className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700">
                    Đặt lịch ngay
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;