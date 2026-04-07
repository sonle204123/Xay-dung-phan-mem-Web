import { useEffect, useState } from "react";

interface Service {
  service_id: number;
  name: string;
  min_price: number;
  image_url?: string;
}

const ProductPage = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("https://xay-dung-phan-mem-web-hs0s.onrender.com/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-16 px-4 max-w-[1800px] mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Gói Điều Trị & Sản Phẩm</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <div key={s.service_id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <span className="text-4xl">💎</span> {/* Thay bằng s.image_url nếu có */}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{s.name}</h3>
              <p className="text-blue-600 font-bold mb-4">
                Giá từ: {s.min_price?.toLocaleString('vi-VN')}đ
              </p>
              <button className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;