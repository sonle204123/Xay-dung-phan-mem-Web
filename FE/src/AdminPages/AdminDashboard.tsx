import React, { useState, useEffect, useRef } from "react"; // Thêm useRef
import { useNavigate } from "react-router-dom";
import Invoice from "./Invoice/Invoice.tsx";
import Dashboard from "./Dashboard";
import AppointmentManager from "./AppointmentManager";
import CategoryManager from "./CategoryManager";
import ServiceForm from "./ServiceForm";
import CreateUser from "./CreateUser";
import PatientManager from "./PatientManager";
import DoctorExam from "./DoctorExam";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State quản lý menu
  const menuRef = useRef<HTMLDivElement>(null); // Để xử lý click ra ngoài thì đóng menu

  // 1. LẤY THÔNG TIN NGƯỜI DÙNG
  const userInfoStr = localStorage.getItem("userInfo");
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userRole = user?.role_id || 0; 

  const MENU_ITEMS = [
    { id: "dashboard", label: "Thống kê tổng quát", icon: "📊", allowedRoles: [1] },
    { id: "appointments", label: "Quản lý lịch hẹn", icon: "📅", allowedRoles: [1, 2, 3] },
    { id: "patients", label: "Hồ sơ Bệnh nhân", icon: "🏥", allowedRoles: [1, 2, 3] },
    { id: "exam", label: "Khám bệnh & Điều trị", icon: "🩺", allowedRoles: [1, 2] },
    { id: "invoices", label: "Hóa đơn & Thống kê", icon: "💰", allowedRoles: [1, 2] },
    { id: "categories", label: "Quản lý Danh mục", icon: "📑", allowedRoles: [1] },
    { id: "services", label: "Quản lý Dịch vụ", icon: "⚙️", allowedRoles: [1] },
    { id: "users", label: "Quản lý Người dùng", icon: "👥", allowedRoles: [1] },
  ];

  const allowedMenus = MENU_ITEMS.filter((menu) => menu.allowedRoles.includes(userRole));
  const [activeTab, setActiveTab] = useState<string>(allowedMenus.length > 0 ? allowedMenus[0].id : "");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // Xử lý click ra ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (![1, 2, 3].includes(userRole)) {
      alert("Bạn không có quyền truy cập trang quản trị!");
      navigate("/");
    }
  }, [userRole, navigate]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* CỘT SIDEBAR BÊN TRÁI */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-yellow-500">Admin Panel</h2>
          <p className="text-slate-400 text-sm mt-1">Hệ thống SmileCare</p>
        </div>

        <ul className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {allowedMenus.map((menu) => (
            <li
              key={menu.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-3 ${activeTab === menu.id ? "bg-blue-600 text-white font-semibold shadow-md" : "text-slate-300 hover:bg-slate-800"}`}
              onClick={() => setActiveTab(menu.id)}
            >
              <span className="text-xl">{menu.icon}</span>
              <span>{menu.label}</span>
            </li>
          ))}
        </ul>

        {/* Nút đăng xuất nhanh ở Sidebar (Giữ lại hoặc bỏ tùy bạn) */}
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full py-2 px-4 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg text-sm transition-colors italic">
            🚪 Đăng xuất nhanh
          </button>
        </div>
      </div>

      {/* KHU VỰC NỘI DUNG CHÍNH BÊN PHẢI */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* THANH HEADER ĐIỀU HƯỚNG */}
        <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center shadow-sm z-50">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">SmileCare Workspace</h3>
          
          {/* USER SUBMENU CONTAINER */}
          <div className="relative" ref={menuRef}>
            <div 
              className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="text-right hidden md:block">
                <div className="font-semibold text-slate-700 leading-tight">{user?.fullname || "Nhân viên"}</div>
                <div className="text-[10px] font-black text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded-full uppercase">
                   {userRole === 1 ? "Admin" : userRole === 2 ? "Bác sĩ" : "Lễ tân"}
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center font-bold shadow-md border-2 border-white">
                {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "NV"}
              </div>
            </div>

            {/* DROPDOWN MENU */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-[100] animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-slate-50">
                  <p className="text-xs text-slate-400 font-medium">Tài khoản</p>
                  <p className="text-sm font-bold text-slate-700 truncate">{user?.email || "staff@smilecare.com"}</p>
                </div>
                
                <div className="p-2">
                  <button 
                    onClick={() => navigate("/")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors font-medium"
                  >
                    <span className="text-lg">🏠</span> Quay về Trang chủ
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-medium"
                  >
                    <span className="text-lg">🚪</span> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RENDER NỘI DUNG */}
        <div className="flex-1 overflow-auto p-8 bg-slate-50/50">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "appointments" && <AppointmentManager />}
          {activeTab === "patients" && <PatientManager />}
          {activeTab === "exam" && <DoctorExam />}
          {activeTab === "invoices" && <Invoice />}
          {activeTab === "categories" && <CategoryManager />}
          {activeTab === "services" && <ServiceForm />}
          {activeTab === "users" && <CreateUser />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;