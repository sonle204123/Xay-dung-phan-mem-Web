const reviews = [
  { id: 1, name: "Anh Hoàng", content: "Dịch vụ bọc răng sứ rất chuyên nghiệp, bác sĩ tận tâm.", rating: 5 },
  { id: 2, name: "Chị Lan", content: "Phòng khám sạch sẽ, nhân viên tư vấn nhiệt tình.", rating: 5 },
  { id: 3, name: "Chú Minh", content: "Lấy cao răng không đau, giá cả rất hợp lý. Tôi sẽ ghé lại", rating: 4 },
];

const ReviewPage = () => {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Khách Hàng Nói Gì Về Chúng Tôi</h2>
      <div className="flex justify-center mb-12">
        <div className="flex text-yellow-400 text-2xl">★★★★★</div>
        <span className="ml-2 font-bold">4.9/5 dựa trên 1000+ đánh giá</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-6 bg-white border rounded-2xl shadow-sm text-left">
            <div className="flex text-yellow-400 mb-3">
              {[...Array(rev.rating)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p className="text-gray-600 italic mb-4">"{rev.content}"</p>
            <div className="font-bold text-gray-800">- {rev.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;