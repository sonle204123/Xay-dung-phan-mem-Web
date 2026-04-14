import { useState } from 'react';
import { Icon } from '@iconify/react';
import Anh1 from "../../assets/anh1.jpg"
import Anh2 from "../../assets/anh2.jpg"
// import Anh1 from "../../assets/anh1.jpg"
const MedicalServices = () => {
  const [activeService, setActiveService] = useState('Dialysis');

  const topServices = [
    { id: 'Laboratory', name: 'Xét nghiệm tại nhà', icon: 'mdi:microscope' },
    { id: 'Vaccine', name: 'Tiêm chủng tại giae', icon: 'tabler:vaccine' },
    { id: 'Dialysis', name: 'Lọc máu / Chạy thận nhân tạo', icon: 'mdi:medical-bag' },
    { id: 'Radiology', name: 'Chẩn đoán hình ảnh tại nhà', icon: 'guidance:mri-pet' },
    { id: 'Visiting', name: 'Bác sĩ thăm khám tận nhà', icon: 'mdi:doctor' },
  ];

  return (
    <section className="py-20 px-4 md:px-16 lg:px-24 bg-white font-sans">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20">
          {topServices.map((service) => (
            <div 
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center transition-all duration-300 border-2 ${
                activeService === service.id 
                ? 'bg-white border-emerald-100 shadow-xl shadow-emerald-100/50' 
                : 'bg-gray-50 border-transparent hover:bg-white hover:shadow-lg'
              }`}>
                <Icon 
                  icon={service.icon} 
                  className={`text-4xl md:text-5xl transition-colors ${
                    activeService === service.id ? 'text-emerald-500' : 'text-emerald-400 opacity-70'
                  }`}
                />
              </div>
              <p className={`mt-4 text-center text-sm font-semibold max-w-[100px] leading-tight ${
                activeService === service.id ? 'text-blue-900' : 'text-gray-400'
              }`}>
                {service.name}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 space-y-6">
            <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
              DỊCH VỤ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 leading-tight">
              Mang dịch vụ chăm sóc y tế chuyên nghiệp trực tiếp đến tận cửa nhà bạn để hồi phục nhanh hơn và an toàn hơn — Mọi lúc, mọi nơi, dễ dàng và luôn sẵn sàng.
            </h2>
            <button className="flex items-center gap-3 bg-[#2B3467] text-white px-6 py-3 rounded-full hover:bg-blue-900 transition-all group">
              <span className="font-semibold">Khám phá thêm</span>
              <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
                <Icon icon="mdi:arrow-right" />
              </div>
            </button>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="relative h-[350px] rounded-[40px] overflow-hidden shadow-2xl group">
              <img 
                src={Anh1} 
                alt="Doctor in Riyadh"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full">
                <span className="text-xs font-bold text-gray-700">Bác sĩ tại địa danh</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <p className="text-white font-medium text-sm max-w-[180px]">
                  Bác sĩ gia đình đáng tin cậy, luôn túc trực ở bất cứ đâu.
                </p>
                <div className="bg-blue-900 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-500 transition-colors">
                  <Icon icon="mdi:arrow-top-right" width="20" />
                </div>
              </div>
            </div>

            <div className="relative h-[350px] rounded-[40px] overflow-hidden shadow-2xl group">
              <img 
              src={Anh2}
                // src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80" 
                alt="Home Visit Doctor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full">
                <span className="text-xs font-bold text-gray-700">Bác sĩ thăm khám tận nhà</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-medium text-sm mb-4">
                  Tiếp cận dịch vụ chăm sóc y tế chuyên nghiệp — để chữa lành, phục hồi và sống khỏe mạnh.
                </p>
                <div className="flex gap-3">
                  <div className="p-2 border border-white/50 rounded-full text-white hover:bg-white hover:text-blue-900 transition-all cursor-pointer">
                    <Icon icon="mdi:chevron-left" width="24" />
                  </div>
                  <div className="p-2 border border-white/50 rounded-full text-white hover:bg-white hover:text-blue-900 transition-all cursor-pointer">
                    <Icon icon="mdi:chevron-right" width="24" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalServices;