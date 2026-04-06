import React from 'react';
import { Icon } from '@iconify/react';

const AboutPage: React.FC = () => {
  const achievements = [
    { icon: "healthicons:doctor-male", count: "20+", label: "Bác sĩ chuyên gia" },
    { icon: "fluent:patient-24-filled", count: "15.000+", label: "Khách hàng hài lòng" },
    { icon: "heroicons:academic-cap-20-solid", count: "10+", label: "Năm kinh nghiệm" },
    { icon: "mdi:award", count: "15", label: "Giải thưởng uy tín" },
  ];

  return (
    <div className="bg-white">
      {/* SECTION 1: HERO - GIỚI THIỆU CHUNG */}
      <section className="relative py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 z-10">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Về chúng tôi</span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6 leading-tight font-sans">
              SmileCare – Kiến tạo <br />
              <span className="text-yellow-600">Nụ cười hoàn mỹ</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Được thành lập với sứ mệnh mang lại sức khỏe răng miệng và vẻ đẹp tự tin cho cộng đồng, 
              SmileCare tự hào là hệ thống nha khoa tiêu chuẩn quốc tế hàng đầu tại Việt Nam. 
              Chúng tôi không chỉ chữa trị, chúng tôi chăm sóc nụ cười của bạn bằng cả trái tim.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                Xem dịch vụ
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all">
                Liên hệ ngay
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000" 
              alt="SmileCare Clinic" 
              className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[450px]"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: CON SỐ ẤN TƯỢNG */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {achievements.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <Icon icon={item.icon} className="text-4xl mb-4 text-yellow-400" />
                <span className="text-3xl font-bold mb-2">{item.count}</span>
                <span className="text-blue-100 text-sm uppercase tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: GIÁ TRỊ CỐT LÕI */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Tại sao chọn SmileCare?</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:microscope" className="text-3xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-800">Công nghệ hiện đại</h3>
            <p className="text-slate-600">Sở hữu trang thiết bị nhập khẩu 100% từ Châu Âu và Hoa Kỳ, đảm bảo chính xác và an toàn tuyệt đối.</p>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="fa6-solid:user-doctor" className="text-3xl text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-800">Đội ngũ chuyên gia</h3>
            <p className="text-slate-600">Các bác sĩ giàu kinh nghiệm, tu nghiệp tại nước ngoài, tận tâm với từng bệnh nhân.</p>
          </div>

          <div className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:heart-pulse" className="text-3xl text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-800">Dịch vụ tận tâm</h3>
            <p className="text-slate-600">Chính sách bảo hành rõ ràng, hỗ trợ trả góp 0% và chăm sóc khách hàng 24/7.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: TẦM NHÌN & SỨ MỆNH */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center gap-2">
              <Icon icon="mdi:target" /> Tầm nhìn
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Trở thành chuỗi hệ thống nha khoa thẩm mỹ dẫn đầu về chất lượng chuyên môn và trải nghiệm khách hàng tại khu vực Đông Nam Á vào năm 2030.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              <Icon icon="mdi:lightbulb-on" /> Sứ mệnh
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              SmileCare ra đời để giúp mọi người xóa tan nỗi sợ nha khoa, biến việc chăm sóc răng miệng trở thành một trải nghiệm thư giãn và hạnh phúc.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;