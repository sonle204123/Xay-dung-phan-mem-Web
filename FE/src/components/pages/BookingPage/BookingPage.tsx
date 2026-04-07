import { useState } from "react";

const BookingPage = () => {
  const [formData, setFormData] = useState({
    doctor_id: 1, // Mặc định hoặc cho chọn từ list
    contact_number: "",
    date: "",
    time: "",
    noted: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Lấy token từ login

    if (!token) {
      alert("Vui lòng đăng nhập để đặt lịch!");
      return;
    }

    try {
      const response = await fetch("https://xay-dung-phan-mem-web-hs0s.onrender.com/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Đặt lịch thành công! Chúng tôi sẽ liên hệ sớm.");
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-20 bg-blue-50 px-4">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Đặt Lịch Khám</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Số điện thoại liên hệ" required
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, contact_number: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="date" required className="p-3 border rounded-xl"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
            <input 
              type="time" required className="p-3 border rounded-xl"
              onChange={(e) => setFormData({...formData, time: e.target.value})}
            />
          </div>
          <textarea 
            placeholder="Ghi chú triệu chứng..." className="w-full p-3 border rounded-xl h-32"
            onChange={(e) => setFormData({...formData, noted: e.target.value})}
          ></textarea>
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
            GỬI YÊU CẦU ĐẶT LỊCH
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;