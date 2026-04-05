import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Neighborhoods = () => {
  const doctors = [
    {
      id: 1,
      name: "Al Aziziya",
      location: "South Riyadh",
      image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png", // Thay bằng ảnh thật
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Dhahra Laban",
      location: "West Riyadh",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/028/287/529/small_2x/portrait-of-a-female-doctor-with-a-stethoscope-on-a-white-background-healthcare-and-medical-concept-generative-ai-free-png.png",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Al Malaz",
      location: "Central Riyadh",
      image: "https://static.vecteezy.com/system/resources/thumbnails/030/662/014/small_2x/handsome-doctor-over-isolated-white-background-generative-ai-free-png.png",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Al Olaya",
      location: "North Riyadh",
      image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-16 lg:px-24 bg-white relative">
      <div className="max-w-[1800px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2B3467] mb-4">
            Neighborhoods We <br /> Serve in Riyadh
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Experience healthcare without the hassle. Get fast medical support right where you are. Professional care delivered to your home with ease.
          </p>
        </div>
        <div className="relative px-10">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, el: ".custom-pagination" }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {doctors.map((doc) => (
              <SwiperSlide key={doc.id}>
                <div className="bg-[#F0F5FF] rounded-[40px] p-8 pt-12 h-[450px] relative overflow-hidden group border border-transparent hover:border-blue-100 transition-all">
                  <div className="h-full w-full flex justify-center items-end">
                    <img src={doc.image} alt={doc.name} className="h-[80%] object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl p-4 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <img src={doc.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-gray-100" />
                      <div>
                        <h4 className="text-sm font-bold text-[#2B3467]">{doc.name}</h4>
                        <p className="text-[11px] text-gray-400 font-medium">{doc.location}</p>
                      </div>
                    </div>
                    <div className="bg-[#2B3467] text-white p-2 rounded-full cursor-pointer hover:bg-emerald-500 transition-colors">
                      <Icon icon="mdi:arrow-top-right" width="18" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-custom absolute top-1/2 -left-2 -translate-y-1/2 z-10 bg-white border border-gray-100 p-3 rounded-full shadow-md text-[#2B3467] hover:bg-[#2B3467] hover:text-white transition-all">
            <Icon icon="mdi:chevron-left" width="24" />
          </button>
          <button className="swiper-button-next-custom absolute top-1/2 -right-2 -translate-y-1/2 z-10 bg-white border border-gray-100 p-3 rounded-full shadow-md text-[#2B3467] hover:bg-[#2B3467] hover:text-white transition-all">
            <Icon icon="mdi:chevron-right" width="24" />
          </button>
          <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
        </div>
      </div>
      <style>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #CBD5E1;
          opacity: 1;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
          background: #2B3467;
        }
      `}</style>
    </section>
  );
};

export default Neighborhoods;
