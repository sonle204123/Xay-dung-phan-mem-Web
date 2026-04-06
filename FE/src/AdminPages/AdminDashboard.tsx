import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import AppointmentManager from './AppointmentManager';
import ServiceForm from './ServiceForm';
import CreateUser from './CreateUser';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Cột Sidebar bên trái */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-yellow-500">Admin Panel</h2>
          <p className="text-slate-400 text-sm mt-1">Hệ thống SmileCare</p>
        </div>
        
        <ul className="flex-1 px-4 py-6 space-y-2">
          <li 
            className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`} 
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Thống kê tổng quát
          </li>
          <li 
            className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'appointments' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`} 
            onClick={() => setActiveTab('appointments')}
          >
            📅 Quản lý lịch hẹn
          </li>
          <li 
            className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'services' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`} 
            onClick={() => setActiveTab('services')}
          >
            ⚙️ Quản lý Dịch vụ
          </li>
          <li 
            className={`p-3 rounded-lg cursor-pointer transition-colors ${activeTab === 'users' ? 'bg-blue-600 text-white font-semibold shadow-md' : 'text-slate-300 hover:bg-slate-800'}`} 
            onClick={() => setActiveTab('users')}
          >
            👥 Quản lý Người dùng
          </li>
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
            <span className="font-semibold text-slate-700">Xin chào, Admin!</span>
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold border border-blue-200">
              AD
            </div>
          </div>
        </div>
        
        {/* Render nội dung dựa trên Tab đang chọn */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'appointments' && <AppointmentManager />}
          {activeTab === 'services' && <ServiceForm />}
          {activeTab === 'users' && <CreateUser />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;