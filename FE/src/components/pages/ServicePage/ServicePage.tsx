import { useEffect, useState } from "react";

interface Category {
  category_id: number;
  name: string;
  description: string;
}

const ServicePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://xay-dung-phan-mem-web-hs0s.onrender.com/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => console.error("Lỗi fetch categories:", err));
  }, []);

  if (loading) return <div className="text-center py-20">Đang tải dịch vụ...</div>;

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-4">Dịch Vụ Chuyên Khoa</h2>
      <p className="text-center text-gray-500 mb-12">Chúng tôi cung cấp các giải pháp nha khoa toàn diện cho nụ cười của bạn.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.category_id} className="group p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <span className="text-3xl group-hover:filter group-hover:invert">🦷</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">{cat.name}</h3>
            <p className="text-gray-600 leading-relaxed">{cat.description}</p>
            <button className="mt-6 font-semibold text-blue-600 flex items-center gap-2 hover:gap-4 transition-all">
              Tìm hiểu thêm <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;