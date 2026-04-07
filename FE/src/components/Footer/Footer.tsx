import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8FAFC] pt-16 pb-8 px-4 md:px-16 lg:px-24 border-t border-gray-100">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:medical-bag" className="text-blue-600 text-3xl" />
              <span className="text-2xl font-bold text-blue-900">
                Med<span className="text-blue-500 text-xl font-medium font-sans">xpert</span>
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed">
              Danh bạ y tế tin cậy của bạn để tìm kiếm bác sĩ, phòng khám và bệnh viện đã được chứng nhận—tất cả ở cùng một nơi. Trao quyền cho bệnh nhân. Kết nối dịch vụ chăm sóc.
            </p>

            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Địa chỉ Email.."
                className="w-full bg-white py-3 pl-4 pr-32 rounded-full border border-gray-200 outline-none focus:border-blue-400 text-sm transition-all shadow-sm"
              />
              <button className="absolute right-1 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md">
                Đăng ký
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-800">Theo dõi chúng tôi trên:</p>
              <div className="flex gap-3">
                {[
                  { icon: "ri:twitter-x-line", bg: "bg-white text-gray-800" },
                  { icon: "mdi:linkedin", bg: "bg-blue-600 text-white" },
                  { icon: "mdi:instagram", bg: "bg-white text-gray-800" },
                  { icon: "mdi:facebook", bg: "bg-white text-gray-800" },
                ].map((social, idx) => (
                  <Link key={idx} to="#" className={`${social.bg} w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-gray-100 hover:scale-110 transition-transform`}>
                    <Icon icon={social.icon} width="20" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-blue-950 mb-6">Liên kết nhanh</h4>
            <ul className="space-y-4">
              {[
                { name: "Trang chủ", path: "/" },
                { name: "Về chúng tôi", path: "#" },
                { name: "Tìm bác sĩ", path: "#" },
                { name: "Tin tức", path: "#" },
                { name: "Liên hệ", path: "#" },
                { name: "Đánh giá", path: "#" }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-blue-950 mb-6">Danh mục chuyên khoa</h4>
            <ul className="space-y-4">
              {[
                "Bác sĩ tổng quát",
                "Nha sĩ",
                "Bác sĩ tim mạch",
                "Bác sĩ da liễu",
                "Vật lý trị liệu",
                "Xét nghiệm & Chẩn đoán"
              ].map((cat) => (
                <li key={cat}>
                  <Link to="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-blue-950 mb-6">Thông tin liên hệ</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <div className="mt-1 text-gray-600">
                  <Icon icon="mdi:email-outline" width="20" />
                </div>
                <span className="text-sm text-gray-500">support@medxpert.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-gray-600">
                  <Icon icon="mdi:map-marker-outline" width="20" />
                </div>
                <span className="text-sm text-gray-500">
                  123 Đường Số 1,
                  <br />
                  Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 text-gray-600 rotate-90">
                  <Icon icon="mdi:phone-outline" width="20" />
                </div>
                <span className="text-sm text-gray-500">0123-456-789</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Bản quyền © {currentYear} Medxpert. Bảo lưu mọi quyền.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="#" className="hover:text-blue-600">
              Chính sách bảo mật
            </Link>
            <span>|</span>
            <Link to="#" className="hover:text-blue-600">
              Điều khoản & Điều kiện
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;