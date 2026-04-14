import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Banner1 from "../../assets/banner1.jpg"
function Banner() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };
  // const doctorImageUrl =
  //   "";

  return (
    <div className="bg-white px-4 md:px-16 lg:px-24 py-12">
      <div className="bg-[#1D4ED8] rounded-[48px] p-10 md:p-16 flex flex-col md:flex-row items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" patternUnits="userSpaceOnUse" width="32" height="32">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>

        <div className="md:w-1/2 text-white pr-6 z-10 relative">
          <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-down">
            Tận tâm vì Sức khỏe và Hạnh phúc Lâu dài.
          </h2>

          <p className="text-sm md:text-base text-blue-100 mb-10 max-w-lg leading-relaxed opacity-90">
            Chúng tôi cung cấp dịch vụ chăm sóc y tế tập trung vào bệnh nhân, được hỗ trợ bởi đội ngũ bác sĩ giàu kinh nghiệm, công nghệ hiện đại và các phương pháp điều trị dựa trên bằng chứng khoa học.
          </p>

          <button className="bg-white text-[#1D4ED8] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition duration-300 shadow-lg transform hover:scale-105 active:scale-95">
            Bắt đầu ngay
          </button>
        </div>
        <div className="md:w-1/2 relative mt-12 md:mt-0 z-10 flex justify-center md:justify-end items-end h-full">
          <img src={Banner1} alt="Doctor" className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0 object-contain drop-shadow-2xl" />

          <div className="absolute top-1/2 -right-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-white/10 max-w-xs shadow-xl animate-fade-in-right delay-200">
            <div className="flex -space-x-4">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="p1" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="p2" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white text-[#1D4ED8] text-xs font-bold flex items-center justify-center">5.5k</div>
            </div>
            <div>
              <p className="text-gray-600 text-xs font-semibold leading-tight ">Trusted By Happy Patients For Exceptional Care</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative -mt-16 z-20 bg-white shadow-2xl rounded-full p-5 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between border border-gray-100 gap-6 sm:gap-0">
        <div className="flex items-center gap-4 sm:border-r sm:border-gray-200 sm:pr-8 md:pr-12 w-full sm:w-auto">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">
            <Icon icon="mdi:calendar-month" width="28" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Ngày tháng: (Dates)</p>
            <p className="text-sm font-semibold text-gray-900 tabular-nums">{formatDateTime(currentDateTime)}</p>
          </div>
        </div>

        {/* Specialist */}
        <div className="flex items-center gap-4 sm:border-r sm:border-gray-200 sm:px-8 md:px-12 w-full sm:w-auto">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">
            <Icon icon="mdi:doctor" width="28" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Chuyên gia: (Specialist)</p>
            <p className="text-sm font-semibold text-gray-900 uppercase">Viet Nam</p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:px-8 md:px-12 w-full sm:w-auto">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">
            <Icon icon="mdi:location-enter" width="28" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">Vị trí: (Location)</p>
            <p className="text-sm font-semibold text-gray-900 uppercase">Viet Nam</p>
          </div>
        </div>

        {/* Nút Search */}
        <button className="bg-[#1D4ED8] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#1e40af] transition flex items-center gap-2 shadow-lg transform hover:scale-105 w-full sm:w-auto justify-center">
          <Icon icon="mdi:magnify" width="20" />
          Search Doctor
        </button>
      </div>
    </div>
  );
}

export default Banner;
