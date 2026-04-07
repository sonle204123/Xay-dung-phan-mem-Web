import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import AppointmentManager from './AppointmentManager';
import ServiceForm from './ServiceForm';
import CreateUser from './CreateUser';
import CategoryManager from './CategoryManager'; 
import PatientManager from './PatientManager';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. LẤY THÔNG TIN NGƯỜI DÙNG TỪ KÉT SẮT
  const userInfoStr = localStorage.getItem('userInfo');
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userRole = user?.role_id || 0; // Lấy role_id (1, 2, hoặc 3)

  // 2. CẤU HÌNH MENU PHÂN QUYỀN
  // Mảng này quy định: Nút nào được phép hiện cho Role nào
  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Thống kê tổng quát', icon: '📊', allowedRoles: [1] }, // Chỉ Admin
    { id: 'appointments', label: 'Quản lý lịch hẹn', icon: '📅', allowedRoles: [1, 2, 3] }, // Cả 3 đều xem được
    { id: 'categories', label: 'Quản lý Danh mục', icon: '📑', allowedRoles: [1] }, // Chỉ Admin
    { id: 'services', label: 'Quản lý Dịch vụ', icon: '⚙️', allowedRoles: [1] }, // Chỉ Admin
    { id: 'users', label: 'Quản lý Người dùng', icon: '👥', allowedRoles: [1] }, // Chỉ Admin
    { id: 'patients', label: 'Hồ sơ Bệnh nhân', icon: '🏥', allowedRoles: [1, 2, 3] }
  ];

  // Lọc ra danh sách Menu mà người dùng hiện tại được phép xem
  const allowedMenus = MENU_ITEMS.filter(menu => menu.allowedRoles.includes(userRole));

  // Tự động chọn Tab đầu tiên mà họ được phép xem làm mặc định
  const [activeTab, setActiveTab] = useState<string>(allowedMenus.length > 0 ? allowedMenus[0].id : '');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Nếu không có quyền nào (không phải nhân viên), đá văng ra ngoài
  useEffect(() => {
    if (![1, 2, 3].includes(userRole)) {
      alert("Bạn không có quyền truy cập trang quản trị!");
      navigate('/');
    }
  }, [userRole, navigate]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Cột Sidebar bên trái */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-yellow-500">Admin Panel</h2>
          <p className="text-slate-400 text-sm mt-1">Hệ thống SmileCare</p>
        </div>
        
        <ul className="flex-1 px-4 py-6 space-y-2">
          {/* 3. TỰ ĐỘNG VẼ MENU DỰA TRÊN QUYỀN */}
          {allowedMenus.map(menu => (
            <li 
              key={menu.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${activeTab === menu.id ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`} 
              onClick={() => setActiveTab(menu.id)}
            >
              <span>{menu.icon}</span> {menu.label}
            </li>
          ))}
        </ul>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout} 
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors shadow-sm"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Khu vực nội dung chính bên phải */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
          <h3 className="text-xl font-bold text-slate-800">Hệ thống quản trị Nha Khoa</h3>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-semibold text-slate-700">{user?.fullname || 'Nhân viên'}</div>
              <div className="text-xs font-bold text-blue-600">
                {userRole === 1 ? 'QUẢN TRỊ VIÊN' : userRole === 2 ? 'BÁC SĨ' : 'LỄ TÂN'}
              </div>
            </div>
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold border border-blue-200">
              {user?.fullname ? user.fullname.charAt(0).toUpperCase() : 'NV'}
            </div>
          </div>
        </div>
        
        {/* Render nội dung dựa trên Tab đang chọn */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'appointments' && <AppointmentManager />}
          {activeTab === 'categories' && <CategoryManager />}
          {activeTab === 'services' && <ServiceForm />}
          {activeTab === 'users' && <CreateUser />}
          {activeTab === 'patients' && <PatientManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;