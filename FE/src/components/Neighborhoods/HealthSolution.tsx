import  { useState } from "react";
import { Icon } from "@iconify/react";

const HealthSolution = () => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <section className="py-20 px-4 md:px-16 lg:px-24 bg-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative h-full flex items-center justify-center">
            <div className="relative rounded-[48px] overflow-hidden shadow-2xl h-[500px] md:h-[600px] w-full">
              {/* Ảnh minh họa (Bạn hãy thay bằng ảnh thật) */}
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" alt="Healthcare Solution" className="w-full h-full object-cover" />

              {/* LỚP OVERLAY CHỨA MŨI TÊN CHỈ RA BÊN PHẢI */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20 flex items-center justify-end p-10 pointer-events-none">
                <div className="animate-bounce-horizontal bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30 shadow-2xl">
                  <Icon icon="mdi:arrow-right-bold" className="text-white text-6xl drop-shadow-lg" />
                </div>
              </div>

              {/* Tag nổi */}
              <div className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-xl border-l-4 border-[#F26924]">
                <p className="text-xs text-gray-500 font-bold uppercase">Ưu đãi</p>
                <p className="text-lg font-extrabold text-[#1D4ED8]">Giảm 20% Chi phí khám</p>
              </div>
            </div>
          </div>
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-extrabold text-[#1D4ED8] mb-4">Giải Pháp Chăm Sóc Toàn Diện</h2>
              <div className="w-20 h-1.5 bg-[#F26924] rounded-full"></div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Icon icon="mdi:hospital-marker" className="text-[#F26924]" width="24" />
                Khi nào nên tới bệnh viện?
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 text-sm">
                {["Đau nhức kéo dài > 24h", "Chảy máu không cầm được", "Sưng tấy vùng nướu/mặt", "Sốt cao do viêm nhiễm"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Icon icon="mdi:check-circle" className="text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Icon icon="mdi:alert-circle-outline" className="text-[#F26924]" width="24" />
                Cách nhận biết triệu chứng
              </h3>
              <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 relative group">
                <p className="text-gray-700 leading-relaxed pr-16">
                  Răng nhạy cảm với nóng lạnh, nướu đỏ, hoặc hơi thở có mùi lạ thường là dấu hiệu cảnh báo sớm. Hãy quan sát kỹ gương mặt hàng ngày.
                </p>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                    showSolution ? "bg-[#F26924] text-white rotate-45" : "bg-white text-[#1D4ED8] hover:scale-110"
                  }`}
                >
                  <Icon icon={showSolution ? "mdi:close" : "mdi:lightbulb-on"} width="24" />
                </button>
              </div>
            </div>
            <div className={`overflow-hidden transition-all duration-700 ${showSolution ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="bg-emerald-50 p-6 rounded-[32px] border border-emerald-100 space-y-3">
                <h4 className="font-bold text-emerald-700 flex items-center gap-2">
                  <Icon icon="mdi:medical-bag" />
                  Giải pháp dành cho bạn:
                </h4>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Sử dụng kem đánh răng chuyên dụng, súc miệng nước muối pha loãng và quan trọng nhất là <strong>đặt lịch khám định kỳ 6 tháng/lần</strong> để xử lý tận gốc vấn đề.
                </p>
              </div>
            </div>
            <div className="pt-6">
              <button className="bg-[#1D4ED8] text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-blue-700 transition-all flex items-center gap-3 group">
                Liên hệ ngay với chuyên gia
                <Icon icon="mdi:arrow-right" className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default HealthSolution;
