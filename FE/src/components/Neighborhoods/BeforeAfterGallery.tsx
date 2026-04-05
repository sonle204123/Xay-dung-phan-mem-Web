import  { useState } from "react";

const BeforeAfterGallery = () => {
  const [activeTab, setActiveTab] = useState("Răng sứ");

  const categories = ["Trồng răng Implant", "Răng sứ", "Niềng răng"];

  const projects = [
    {
      id: 1,
      category: "Răng sứ",
      patientName: "Nguyễn Thị Tuyết Viên",
      portrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop",
      before: "https://img.freepik.com/free-photo/close-up-woman-showing-unhealthy-teeth_23-2149173169.jpg",
      after: "https://img.freepik.com/free-photo/perfect-smile-woman-with-white-teeth_23-2149173173.jpg",
    },
    {
      id: 2,
      category: "Răng sứ",
      patientName: "Nguyễn Trọng Dũng",
      portrait: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop",
      before: "https://img.freepik.com/free-photo/unhealthy-teeth-man_23-2149173155.jpg",
      after: "https://img.freepik.com/free-photo/handsome-man-smiling-with-perfect-teeth_23-2149173158.jpg",
    },
    {
      id: 3,
      category: "Răng sứ",
      patientName: "Nguyễn Thị Thanh Huyền",
      portrait: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop",
      before: "https://img.freepik.com/free-photo/young-woman-with-dental-problems_23-2149173145.jpg",
      after: "https://img.freepik.com/free-photo/beauty-portrait-smiling-woman-with-teeth-whitening_23-2149173148.jpg",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-16 lg:px-24 bg-gray-50">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-700">
            Khách hàng <span className="text-[#F26924]">của chúng tôi</span>
          </h2>
          <p className="text-sm font-bold text-gray-500 mt-4 uppercase tracking-widest">HÌNH ẢNH TRƯỚC SAU CỦA KHÁCH HÀNG</p>
        </div>
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === cat ? "bg-[#F26924] border-[#F26924] text-white shadow-lg" : "bg-white border-gray-200 text-gray-600 hover:border-[#F26924] hover:text-[#F26924]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item) => (
            <div key={item.id} className="group bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="flex h-[320px]">
                <div className="w-[45%] h-full relative overflow-hidden">
                  <img src={item.portrait} alt={item.patientName} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-[#F26924]/80 p-1.5 rounded-lg">
                    <p className="text-[10px] text-white font-bold leading-none">
                      Nha khoa
                      <br />
                      VĂN ANH
                    </p>
                  </div>
                </div>
                <div className="w-[55%] h-full flex flex-col gap-1 p-1 bg-gray-100">
                  <div className="relative h-1/2 overflow-hidden rounded-tr-[20px]">
                    <img src={item.before} alt="Trước" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">TRƯỚC</span>
                  </div>
                  <div className="relative h-1/2 overflow-hidden rounded-br-[20px]">
                    <img src={item.after} alt="Sau" className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-[#F26924] text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg">SAU</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F26924] p-4 flex items-center gap-3">
                <div className="w-0.5 h-8 bg-white/40"></div>
                <div>
                  <p className="text-white text-xs opacity-90">Khách hàng:</p>
                  <h4 className="text-white font-bold text-sm tracking-wide">{item.patientName}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
