import React from 'react';
import NewsCard from './NewsCard';

const NewsPage: React.FC = () => {
  // Dữ liệu mẫu (Sau này bạn sẽ fetch từ Backend/Database của bạn mình)
  const newsData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      category: "Kiến thức nha khoa",
      title: "5 Cách chăm sóc răng miệng tại nhà chuẩn nha khoa SmileCare",
      description: "Việc đánh răng đúng cách thôi là chưa đủ, hãy cùng chuyên gia SmileCare tìm hiểu các bước chăm sóc răng toàn diện...",
      date: "06/04/2026"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
      category: "Công nghệ",
      title: "Công nghệ niềng răng trong suốt Invisalign có gì đặc biệt?",
      description: "SmileCare cập nhật công nghệ niềng răng hiện đại nhất giúp bạn tự tin giao tiếp ngay cả khi đang chỉnh nha.",
      date: "05/04/2026"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1593054941019-866465451997?auto=format&fit=crop&q=80&w=800",
      category: "Ưu đãi",
      title: "Ưu đãi 30% dịch vụ lấy cao răng cho sinh viên STU",
      description: "Chương trình đồng hành cùng sinh viên, SmileCare mang đến nụ cười rạng rỡ với chi phí cực kỳ ưu đãi...",
      date: "04/04/2026"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề trang */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Tin Tức & <span className="text-blue-600">Kiến Thức SmileCare</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về công nghệ nha khoa và mẹo chăm sóc nụ cười mỗi ngày.
          </p>
        </div>

        {/* Lưới tin tức */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <NewsCard 
              key={news.id}
              image={news.image}
              category={news.category}
              title={news.title}
              description={news.description}
              date={news.date}
            />
          ))}
        </div>

        {/* Nút xem thêm trang (Phân trang mẫu) */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white border border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-sm">
            Xem tất cả bài viết
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;