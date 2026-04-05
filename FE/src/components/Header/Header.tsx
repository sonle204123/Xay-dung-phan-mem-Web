import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Trang Chủ", path: "/" },
    { name: "Sản Phẩm", path: "/san-pham" },
    { name: "Dịch Vụ", path: "/dich-vu" },
    { name: "Giới Thiệu", path: "/gioi-thieu" },
    { name: "Liên Hệ", path: "/lien-he" },
    { name: "Đặt Lịch", path: "/dat-lich" },
    { name: "Tin Tức", path: "/tin-tuc" },
    { name: "Đánh Giá", path: "/danh-gia" },
  ];

  return (
    <header className="w-full">
      <div className="bg-[#F26924]/90 py-2">
        <div className="flex justify-between items-center max-w-[1800px] mx-auto">
          <h2 className="text-white text-sm md:text-lg font-medium hidden sm:block">Nha Khoa Chúng Tôi</h2>

          <div className="flex flex-wrap items-center gap-4 text-white text-xs md:text-sm">
            <div className="hidden lg:flex items-center gap-1">
              <Icon icon="mdi:location" width="18" />
              <span>123 Đường ABC, Quận 8, TP.HCM</span>
            </div>

            <div className="flex items-center gap-1">
              <Icon icon="mdi:clock" width="18" />
              <span>8:00-18:30</span>
            </div>

            <div className="flex items-center gap-1">
              <Icon icon="ic:baseline-phone" width="18" />
              <Link to="tel:+8423456789" className="hover:underline font-bold">
                +8423 456 789
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link to="#" className="p-1 bg-blue-900 rounded-full hover:bg-blue-700 transition">
                <Icon icon="ic:baseline-facebook" width="16" />
              </Link>
              <Link to="#" className="p-1 bg-blue-600 rounded-full hover:bg-blue-400 transition">
                <Icon icon="simple-icons:zalo" width="16" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV BAR */}
      <div className="bg-amber-100 shadow-md px-4 md:px-10 lg:px-20 relative">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/assets/logo.jpg" alt="Logo" className="h-14 w-auto rounded-md object-cover" />
          </div>
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.path} className="px-3 py-2 text-gray-800 font-medium hover:text-[#F26924] transition-colors whitespace-nowrap text-sm xl:text-base">
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 border-l border-gray-300 pl-4">
              <Link to="/login" className="flex items-center gap-1 text-sm font-semibold hover:text-[#F26924]">
                <Icon icon="mdi:user" width="20" />
                Đăng Nhập
              </Link>
              <Link to="/register" className="flex items-center gap-1 text-sm font-semibold bg-[#F26924] text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 transition">
                Đăng Ký
              </Link>
            </div>

            <button className="lg:hidden text-gray-800 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              <Icon icon={isOpen ? "mdi:close" : "mdi:menu"} width="32" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl z-50 animate-fade-in-down">
            <div className="flex flex-col p-4 space-y-3">
              {menuItems.map((item, index) => (
                <Link key={index} to={item.path} onClick={() => setIsOpen(false)} className="text-gray-700 hover:text-[#F26924] font-medium py-2 border-b border-gray-50">
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" className="flex items-center justify-center gap-2 py-3 border rounded-lg">
                  <Icon icon="mdi:user" width="20" /> Đăng Nhập
                </Link>
                <Link to="/register" className="flex items-center justify-center gap-2 py-3 bg-[#F26924] text-white rounded-lg">
                  Đăng Ký
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
