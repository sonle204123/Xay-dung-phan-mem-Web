import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Icon } from '@iconify/react';
import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Trang Nguyễn",
      role: "Bệnh nhân niềng răng",
      content: "Tôi đã sử dụng dịch vụ của nha khoa cho một cuộc khám sức khỏe tổng quát tại nhà và rất hài lòng. Bác sĩ thân thiện, giải thích cực kỳ chi tiết và chuyên nghiệp.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Anh Tuấn",
      role: "Bệnh nhân trồng răng sứ",
      content: "Dịch vụ điều dưỡng tại nhà thực sự xuất sắc. Họ đã giúp tôi chăm sóc mẹ sau khi cô ấy phải thực hiện một ca phẫu thuật lớn. Rất đáng đồng tiền bát gạo!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Minh Hoà",
      role: "Bệnh nhân tẩy trắng răng",
      content: "Phòng khám rất sạch sẽ, trang thiết bị hiện đại. Tôi thích cách các bạn chăm sóc khách hàng sau khi làm xong dịch vụ. Sẽ giới thiệu cho bạn bè.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    }
  ];

  return (
    <section className="py-24 px-4 md:px-16 lg:px-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
            <Icon icon="mdi:star-outline" />
            <span>Đánh giá từ khách hàng</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1e293b]">
            Cảm nhận của <span className="text-emerald-500">Bệnh nhân</span>
          </h2>
          <div className="flex justify-center mt-2">
             <div className="w-24 h-1 bg-emerald-500 rounded-full"></div>
             <div className="w-4 h-1 bg-emerald-200 rounded-full ml-2"></div>
          </div>
        </div>

        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.testi-pagination' }}
            breakpoints={{
              1024: { slidesPerView: 2 }, // Hiện 2 cột trên máy tính
            }}
            className="!pb-16"
          >
            {reviews.map((rev) => (
              <SwiperSlide key={rev.id}>
                <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-50 relative group hover:border-emerald-100 transition-all duration-300">
                  
                  <div className="absolute top-8 right-10 text-emerald-50/50 group-hover:text-emerald-100 transition-colors">
                    <Icon icon="bi:quote" width="80" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex gap-1 mb-6">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Icon key={i} icon="material-symbols:star-rounded" className="text-yellow-400 text-xl" />
                      ))}
                    </div>

                    <p className="text-gray-600 italic leading-relaxed mb-8 text-lg">
                      "{rev.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={rev.avatar} 
                          alt={rev.name} 
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-lg">
                          <Icon icon="mdi:check-decagram" width="16" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1e293b] text-lg">{rev.name}</h4>
                        <p className="text-emerald-500 text-sm font-medium">{rev.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testi-pagination flex justify-center gap-2 mt-8"></div>
        </div>
      </div>

      <style>{`
        .testi-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #e2e8f0;
          opacity: 1;
          transition: all 0.3s;
        }
        .testi-pagination .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 5px;
          background: #10b981;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;